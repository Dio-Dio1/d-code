import React, { useState, useEffect, useCallback } from "react"
import {
  Clock,
  ChevronLeft,
  Play,
  Send,
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  X,
  FileCode,
  RotateCcw,
  Info,
  Target,
  Zap,
  Activity,
  EyeOff,
  Lock,
} from "lucide-react"
import MonacoEditor from "../ui/MonacoEditor"
import OutputTerminal from "../ui/OutputTerminal"
import {
  duelMatch,
  duelOpponent,
  duelProblem,
  duelInitialCode,
  player,
} from "../../data/dashboardData"

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

const difficultyColor = (d) => {
  if (d === "Easy") return "text-[#22c55e] bg-[#22c55e]/12 border-[#22c55e]/25"
  if (d === "Medium") return "text-[#f59e0b] bg-[#f59e0b]/12 border-[#f59e0b]/25"
  return "text-[#ef4444] bg-[#ef4444]/12 border-[#ef4444]/25"
}

const opponentCodeSnippets = [
  `function solve(input) {\n  const n = input.length;\n  let dp = new Array(n).fill(0);\n  for (let i = 0; i < n; i++) {\n    dp[i] = Math.max(dp[i-1] || 0, input[i]);\n  }\n  return dp[n - 1];\n}`,
  `function solve(input) {\n  const map = new Map();\n  let maxLen = 0;\n  for (let r = 0; r < input.length; r++) {\n    if (map.has(input[r])) {\n      // check window\n    }\n  }\n  return maxLen;\n}`,
]

const MatchHeader = ({ timeLeft, onForfeit, onBack }) => (
  <header className="h-16 flex items-center justify-between px-5 bg-[#0d1117] border-b border-[#30363d] shrink-0 select-none">
    <div className="flex items-center gap-3.5 w-[24%]">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-[#6e7681] hover:text-[#e6edf3] transition-colors"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Exit</span>
      </button>
      <div className="w-px h-6 bg-[#30363d]" />
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#22c55e] bg-[#22c55e]/12 border border-[#22c55e]/25 px-2.5 py-1 rounded-md">
          {duelMatch.type}
        </span>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider border px-2.5 py-1 rounded-md ${difficultyColor(duelMatch.difficulty)}`}>
          {duelMatch.difficulty}
        </span>
      </div>
    </div>

    <div className="flex items-center justify-center gap-8 flex-1">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25 text-xs font-black font-mono">
          {player.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs font-black text-[#e6edf3] font-mono leading-none tracking-tight">{player.username.toUpperCase()}</p>
          <p className="text-[10px] font-mono text-[#6e7681] leading-none mt-1.5">{player.rating} ELO</p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-[#1c2128] border border-[#30363d] px-6 py-1 rounded-lg">
        <div className="flex items-center gap-2.5">
          <Clock size={18} className={timeLeft < 60 ? "text-[#ef4444] animate-pulse" : "text-[#22c55e]"} />
          <span className={`text-2xl font-black font-mono tracking-widest ${timeLeft < 60 ? "text-[#ef4444]" : "text-[#e6edf3]"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <span className="text-[8px] font-mono font-bold text-[#6e7681] uppercase tracking-[0.2em] leading-none mt-0.5">
          Time Remaining
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-left hidden sm:block">
          <p className="text-xs font-black text-[#e6edf3] font-mono leading-none tracking-tight">{duelOpponent.username.toUpperCase()}</p>
          <p className="text-[10px] font-mono text-[#6e7681] leading-none mt-1.5">{duelOpponent.rating} ELO</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25 text-xs font-black font-mono">
          {duelOpponent.avatar}
        </div>
      </div>
    </div>

    <div className="flex items-center justify-end gap-3 w-[24%]">
      <span className="text-[10px] font-mono text-[#6e7681] hidden md:inline">{duelMatch.matchId}</span>
      <button
        onClick={onForfeit}
        className="flex items-center gap-1.5 text-[11px] font-bold text-[#6e7681] hover:text-[#ef4444] transition-colors px-3 py-1.5 rounded-lg bg-[#1c2128] border border-[#30363d] hover:border-[#ef4444]/40"
      >
        <AlertTriangle size={13} />
        <span className="hidden sm:inline">Forfeit</span>
      </button>
    </div>
  </header>
)

const ProblemPanel = () => (
  <div className="w-[24%] min-w-[250px] max-w-[340px] flex flex-col border-r border-[#30363d] bg-[#161b22] shrink-0">
    <div className="px-4 py-2 border-b border-[#30363d]/60 flex items-center justify-between">
      <span className="text-[10px] font-mono font-bold text-[#6e7681] uppercase tracking-wider">Problem Statement</span>
      <span className="text-[10px] font-mono text-[#6e7681]">P1/1</span>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
      <div>
        <h1 className="text-base font-black text-[#e6edf3] font-mono mb-1">{duelProblem.title}</h1>
        <div className="flex items-center gap-3 text-[10px] font-mono text-[#6e7681]">
          <span className="flex items-center gap-1"><Clock size={10} /> {duelProblem.timeLimit}</span>
          <span className="flex items-center gap-1"><Zap size={10} /> {duelProblem.memoryLimit}</span>
        </div>
      </div>

      <div className="text-[#8b949e] leading-relaxed space-y-2 border-t border-[#30363d]/60 pt-3">
        <p className="whitespace-pre-line">{duelProblem.description}</p>
      </div>

      <div className="space-y-1.5 border-t border-[#30363d]/60 pt-3">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <FileCode size={11} className="text-[#8b5cf6]" /> Input Format
        </h3>
        <p className="text-[#8b949e] font-mono text-[11px] bg-[#1c2128] rounded-md p-2 border border-[#30363d]">
          {duelProblem.input}
        </p>
      </div>

      <div className="space-y-1.5 border-t border-[#30363d]/60 pt-3">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <Terminal size={11} className="text-[#22c55e]" /> Output Format
        </h3>
        <p className="text-[#8b949e] font-mono text-[11px] bg-[#1c2128] rounded-md p-2 border border-[#30363d]">
          {duelProblem.output}
        </p>
      </div>

      <div className="space-y-2 border-t border-[#30363d]/60 pt-3">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <Info size={11} className="text-[#f59e0b]" /> Examples
        </h3>
        {duelProblem.examples.map((ex, i) => (
          <div key={i} className="rounded-md bg-[#1c2128]/60 border border-[#30363d] overflow-hidden text-[11px]">
            <div className="px-2.5 py-1 bg-[#1c2128] border-b border-[#30363d]/60 text-[9px] font-mono font-bold text-[#6e7681] uppercase">
              Example {i + 1}
            </div>
            <div className="p-2.5 space-y-1.5 font-mono">
              <div>
                <span className="text-[#6e7681] text-[10px] block">IN:</span>
                <span className="text-[#8b949e]">{ex.input}</span>
              </div>
              <div>
                <span className="text-[#6e7681] text-[10px] block">OUT:</span>
                <span className="text-[#22c55e]">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="text-[#6e7681] text-[10px] font-sans pt-1 border-t border-[#30363d]/40">
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 border-t border-[#30363d]/60 pt-3 pb-2">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <Target size={11} className="text-[#ef4444]" /> Constraints
        </h3>
        <ul className="space-y-1 font-mono text-[11px] text-[#6e7681]">
          {duelProblem.constraints.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span className="text-[#484f58]">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)

const CodeEditor = ({ onRun, onSubmit, runStatus, submitStatus }) => {
  const [code, setCode] = useState(duelInitialCode)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-[46%] flex-1 flex flex-col bg-[#161b22] min-w-0">
      {/* Editor Tab Bar */}
      <div className="h-10 flex items-center justify-between px-4 bg-[#0d1117] border-b border-[#30363d] shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] border-b-0 rounded-t-lg text-xs font-semibold text-[#e6edf3]">
            <FileCode size={13} className="text-[#8b5cf6]" />
            <span className="font-mono text-xs">solution.js</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#6e7681]">Node.js v18</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-[#21262d] text-[#6e7681] hover:text-[#e6edf3] transition-colors"
            title="Copy code"
          >
            {copied ? <Check size={13} className="text-[#22c55e]" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <MonacoEditor
        value={code}
        onChange={setCode}
        onRun={onRun}
        onSubmit={onSubmit}
      />

      {/* Status Bar */}
      <div className="h-8 flex items-center justify-between px-4 bg-[#0d1117] border-t border-[#30363d] shrink-0 text-[10px] font-mono text-[#6e7681] select-none">
        <div className="flex items-center gap-3">
          <span>JavaScript</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          {runStatus === "running" && (
            <span className="flex items-center gap-1 text-[#f59e0b]">
              <RotateCcw size={10} className="animate-spin" /> Evaluating...
            </span>
          )}
          {runStatus === "passed" && (
            <span className="flex items-center gap-1 text-[#22c55e]">
              <Check size={10} /> Passed: 8/8
            </span>
          )}
          {runStatus === "failed" && (
            <span className="flex items-center gap-1 text-[#ef4444]">
              <X size={10} /> Failed: 5/8
            </span>
          )}
          {submitStatus === "submitting" && (
            <span className="flex items-center gap-1 text-[#f59e0b]">
              <RotateCcw size={10} className="animate-spin" /> Submitting...
            </span>
          )}
          {runStatus === "idle" && submitStatus === "idle" && (
            <span>Ready</span>
          )}
        </div>
      </div>

      {/* Output Terminal */}
      <OutputTerminal status={runStatus} code={code} />

      {/* Action Buttons */}
      <div className="h-14 flex items-center justify-end gap-3 px-4 bg-[#0d1117] border-t border-[#30363d] shrink-0">
        <button
          onClick={onRun}
          disabled={runStatus === "running" || submitStatus === "submitting"}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold text-[#8b949e] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-xl transition-colors disabled:opacity-50"
        >
          <Play size={12} />
          Run
        </button>
        <button
          onClick={onSubmit}
          disabled={runStatus === "running" || submitStatus === "submitting" || submitStatus === "submitted"}
          className="flex items-center gap-1.5 px-6 py-2 text-xs font-mono font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-xl transition-colors disabled:opacity-50"
        >
          <Send size={12} />
          Submit Solution
        </button>
      </div>
    </div>
  )
}

const OpponentTelemetryPanel = ({ myTestCount = 8, totalTests = 14 }) => {
  const [oppTests, setOppTests] = useState(10)
  const [oppSubmissions] = useState(3)
  const [snippetIdx, setSnippetIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setOppTests((prev) => Math.min(prev + 1, totalTests))
        setSnippetIdx((prev) => (prev + 1) % opponentCodeSnippets.length)
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [totalTests])

  const oppPercentage = Math.round((oppTests / totalTests) * 100)
  const myPercentage = Math.round((myTestCount / totalTests) * 100)
  const activeOpponentSnippet = opponentCodeSnippets[snippetIdx]

  return (
    <div className="w-[30%] min-w-[280px] flex flex-col bg-[#161b22] border-r border-[#30363d] shrink-0 font-mono select-none">
      <div className="px-4 py-2 border-b border-[#30363d]/60 flex items-center justify-between">
        <span className="text-[10px] font-bold text-[#6e7681] uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={12} className="text-[#ef4444]" /> Opponent Telemetry
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[#22c55e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" /> Live Feed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-[#1c2128] border border-[#30363d] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25 text-xs font-black">
                {duelOpponent.avatar}
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#e6edf3] leading-tight">{duelOpponent.username}</h2>
                <p className="text-[10px] text-[#6e7681]">{duelOpponent.rating} ELO</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#22c55e] bg-[#22c55e]/12 border border-[#22c55e]/25 px-2 py-0.5 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-ping" />
                Active Coding
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1c2128]/60 border border-[#30363d] rounded-lg p-3 space-y-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#6e7681] block">Match Head-to-Head</span>
          
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#8b5cf6] font-bold">YOU ({player.username})</span>
              <span className="text-[#6e7681]">{myTestCount} / {totalTests} Tests ({myPercentage}%)</span>
            </div>
            <div className="h-2 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
              <div className="h-full bg-[#8b5cf6] transition-all duration-500" style={{ width: `${myPercentage}%` }} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#ef4444] font-bold">{duelOpponent.username}</span>
              <span className="text-[#6e7681]">{oppTests} / {totalTests} Tests ({oppPercentage}%)</span>
            </div>
            <div className="h-2 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
              <div className="h-full bg-[#ef4444] transition-all duration-500" style={{ width: `${oppPercentage}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#1c2128]/50 border border-[#30363d] p-2.5 rounded-lg text-center">
            <span className="text-[9px] text-[#6e7681] uppercase font-bold block">Submissions</span>
            <span className="text-base font-black text-[#e6edf3] mt-0.5 block">{oppSubmissions}</span>
          </div>
          <div className="bg-[#1c2128]/50 border border-[#30363d] p-2.5 rounded-lg text-center">
            <span className="text-[9px] text-[#6e7681] uppercase font-bold block">Tests Passed</span>
            <span className="text-base font-black text-[#22c55e] mt-0.5 block">{oppTests} / {totalTests}</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#6e7681]">
            <span className="flex items-center gap-1">
              <EyeOff size={11} className="text-[#ef4444]" /> Opponent Screen Stream
            </span>
            <span className="flex items-center gap-1 text-[#484f58]">
              <Lock size={10} /> Blurred for privacy
            </span>
          </div>

          <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden group">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 pointer-events-none">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] bg-[#1c2128]/80 border border-[#30363d] px-2.5 py-1 rounded-md shadow-md backdrop-blur-sm flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" /> Live Telemetry
              </span>
            </div>

            <div className="p-3 font-mono text-[11px] leading-5 blur-[4.5px] select-none pointer-events-none opacity-75 transition-all">
              <div className="flex">
                <div className="w-6 text-right pr-2 text-[#484f58] select-none">
                  {activeOpponentSnippet.split("\n").map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="text-[#8b949e] flex-1 whitespace-pre">
                  {activeOpponentSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ForfeitModal = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="w-full max-w-sm bg-[#1c2128] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden font-sans">
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#e6edf3] font-mono">Forfeit Match?</h3>
            <p className="text-xs text-[#6e7681]">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-xs text-[#6e7681] leading-relaxed font-mono bg-[#0d1117] p-2.5 rounded-md border border-[#30363d]">
          You will lose this duel and your rating will decrease by <span className="text-[#ef4444] font-bold">-18 ELO</span>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-xs font-mono font-bold text-[#8b949e] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-xl transition-colors"
          >
            Keep Fighting
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-xs font-mono font-bold text-white bg-[#ef4444] hover:bg-[#dc2626] rounded-xl transition-colors"
          >
            Forfeit
          </button>
        </div>
      </div>
    </div>
  </div>
)

const DuelPage = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(duelMatch.timeLimit)
  const [showForfeit, setShowForfeit] = useState(false)
  const [runStatus, setRunStatus] = useState("idle")
  const [submitStatus, setSubmitStatus] = useState("idle")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRun = useCallback(() => {
    setRunStatus("running")
    setTimeout(() => {
      setRunStatus(Math.random() > 0.3 ? "passed" : "failed")
    }, 1800)
  }, [])

  const handleSubmit = useCallback(() => {
    setSubmitStatus("submitting")
    setTimeout(() => {
      setSubmitStatus("submitted")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 2200)
  }, [])

  const handleForfeitConfirm = useCallback(() => {
    setShowForfeit(false)
    onBack()
  }, [onBack])

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#8b949e] antialiased overflow-hidden">
      <MatchHeader
        timeLeft={timeLeft}
        onForfeit={() => setShowForfeit(true)}
        onBack={onBack}
      />

      <div className="flex-1 flex min-h-0 overflow-hidden p-4 gap-4">
        <div className="w-full flex border border-[#30363d] rounded-2xl overflow-hidden bg-[#161b22]">
          <ProblemPanel />
          <CodeEditor
            onRun={handleRun}
            onSubmit={handleSubmit}
            runStatus={runStatus}
            submitStatus={submitStatus}
          />
          <OpponentTelemetryPanel />
        </div>
      </div>

      {showForfeit && (
        <ForfeitModal
          onClose={() => setShowForfeit(false)}
          onConfirm={handleForfeitConfirm}
        />
      )}
    </div>
  )
}

export default DuelPage
