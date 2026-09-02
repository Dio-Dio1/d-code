from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import Problem, User
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/api/problems", tags=["problems"])


def problem_to_dict(p: Problem) -> dict:
    return {
        "id": p.id,
        "title": p.title,
        "difficulty": p.difficulty,
        "topics": p.topics or [],
        "acceptance": p.acceptance,
        "isDaily": p.is_daily,
        "description": p.description,
        "constraints": p.constraints or [],
        "examples": p.examples or [],
        "starterCode": p.starter_code,
    }


@router.get("")
async def list_problems(
    difficulty: Optional[str] = None,
    topic: Optional[str] = None,
    search: Optional[str] = None,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    query = select(Problem)

    if difficulty:
        query = query.where(Problem.difficulty == difficulty)
    if topic:
        query = query.where(Problem.topics.contains([topic]))
    if search:
        query = query.where(Problem.title.ilike(f"%{search}%"))

    query = query.order_by(Problem.id.asc())

    result = await db.execute(query)
    problems = [problem_to_dict(p) for p in result.scalars().all()]

    return {"problems": problems}


@router.get("/{problem_id}")
async def get_problem(
    problem_id: int,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Problem).where(Problem.id == problem_id))
    problem = result.scalar_one_or_none()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem_to_dict(problem)
