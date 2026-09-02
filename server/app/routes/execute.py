import asyncio
import json
import time
import tempfile
import os
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import Problem, User
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/api/execute", tags=["execute"])


class ExecuteRequest(BaseModel):
    problem_id: int
    code: str
    language: str
    mode: str = "run"


def build_js_wrapper(code: str, args_json: str) -> str:
    return f"""
const userCode = {json.dumps(code)};
const args = {args_json};

try {{
    const fnMatch = userCode.match(/function\\s+(\\w+)/);
    const fnName = fnMatch ? fnMatch[1] : null;

    if (!fnName) {{
        console.error('Could not find function name in code');
        process.exit(1);
    }}

    const caller = new Function(userCode + '\\nreturn ' + fnName + ';');
    const fn = caller();

    if (typeof fn !== 'function') {{
        console.error('Extracted name is not a function: ' + fnName);
        process.exit(1);
    }}

    const result = fn(...args);
    if (result === undefined) {{
        console.error('Function returned undefined. Make sure your function has a return statement.');
        process.exit(1);
    }}
    console.log(JSON.stringify(result));
}} catch (e) {{
    console.error(e.message || String(e));
    process.exit(1);
}}
"""


def build_py_wrapper(code: str, args_json: str) -> str:
    return f"""
import json, sys, re

user_code = {json.dumps(code)}
args = {args_json}

fn_match = re.search(r'def\\s+(\\w+)', user_code)
fn_name = fn_match.group(1) if fn_match else None

if not fn_name:
    print('Could not find function name in code', file=sys.stderr)
    sys.exit(1)

ns = {{}}
try:
    exec(user_code, ns)
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)

fn = ns.get(fn_name)
if not callable(fn):
    print(f'Extracted name is not a function: {{fn_name}}', file=sys.stderr)
    sys.exit(1)

try:
    result = fn(*args)
    if result is None:
        print('Function returned None. Make sure your function has a return statement.', file=sys.stderr)
        sys.exit(1)
    print(json.dumps(result))
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)
"""


async def run_single_test(code: str, language: str, args: list, timeout: float = 5.0) -> dict:
    args_json = json.dumps(args)

    if language == "javascript":
        wrapper = build_js_wrapper(code, args_json)
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
            f.write(wrapper)
            tmp_path = f.name
        try:
            proc = await asyncio.create_subprocess_exec(
                'node', tmp_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
            return {
                "stdout": stdout.decode().strip(),
                "stderr": stderr.decode().strip(),
                "exitCode": proc.returncode,
            }
        finally:
            os.unlink(tmp_path)

    elif language == "python":
        wrapper = build_py_wrapper(code, args_json)
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(wrapper)
            tmp_path = f.name
        try:
            proc = await asyncio.create_subprocess_exec(
                'python', tmp_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
            return {
                "stdout": stdout.decode().strip(),
                "stderr": stderr.decode().strip(),
                "exitCode": proc.returncode,
            }
        finally:
            os.unlink(tmp_path)

    return {"stdout": "", "stderr": f"Unsupported language: {language}", "exitCode": 1}


def normalize(val):
    if isinstance(val, str):
        return val.strip()
    return val


@router.post("")
async def execute_code(
    req: ExecuteRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Problem).where(Problem.id == req.problem_id))
    problem = result.scalar_one_or_none()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    test_cases = problem.test_cases or []
    if not test_cases:
        raise HTTPException(status_code=400, detail="No test cases available for this problem")

    cases_to_run = test_cases if req.mode == "submit" else test_cases[:3]

    results = []
    all_passed = True
    total_time = 0

    for i, tc in enumerate(cases_to_run):
        args = tc.get("args", [])
        expected = tc.get("expected")

        start = time.time()
        try:
            output = await run_single_test(req.code, req.language, args)
        except asyncio.TimeoutError:
            results.append({
                "testCase": i + 1, "passed": False, "args": args,
                "expected": expected, "actual": None,
                "error": "Time Limit Exceeded", "runtime": 5000,
            })
            all_passed = False
            continue
        except Exception as e:
            results.append({
                "testCase": i + 1, "passed": False, "args": args,
                "expected": expected, "actual": None,
                "error": str(e), "runtime": 0,
            })
            all_passed = False
            continue

        runtime = round((time.time() - start) * 1000)
        total_time += runtime

        if output["exitCode"] != 0:
            results.append({
                "testCase": i + 1, "passed": False, "args": args,
                "expected": expected, "actual": None,
                "error": output["stderr"] or "Runtime Error", "runtime": runtime,
            })
            all_passed = False
        else:
            try:
                actual = json.loads(output["stdout"])
            except Exception:
                actual = output["stdout"].strip()

            passed = normalize(actual) == normalize(expected)
            results.append({
                "testCase": i + 1, "passed": passed, "args": args,
                "expected": expected, "actual": actual,
                "error": "" if passed else "Wrong Answer", "runtime": runtime,
            })
            if not passed:
                all_passed = False

    tests_passed = sum(1 for r in results if r["passed"])
    tests_total = len(results)
    avg_runtime = round(total_time / tests_total) if tests_total else 0

    return {
        "status": "accepted" if all_passed else "wrong_answer",
        "testsPassed": tests_passed,
        "testsTotal": tests_total,
        "runtime": avg_runtime,
        "results": results,
    }
