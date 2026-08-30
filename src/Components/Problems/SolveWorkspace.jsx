import React, { useState, useCallback } from "react"
import {
  ChevronLeft,
  Play,
  Send,
  Copy,
  Check,
  X,
  FileCode,
  RotateCcw,
  Info,
  Target,
  Zap,
  Clock,
} from "lucide-react"
import MonacoEditor from "../ui/MonacoEditor"
import OutputTerminal from "../ui/OutputTerminal"

const difficultyBadge = (d) => {
  if (d === "Easy") return "text-[#22c55e] bg-[#22c55e]/12 border-[#22c55e]/25"
  if (d === "Medium") return "text-[#f59e0b] bg-[#f59e0b]/12 border-[#f59e0b]/25"
  return "text-[#ef4444] bg-[#ef4444]/12 border-[#ef4444]/25"
}

const ProblemPanel = ({ problem }) => (
  <div className="w-[42%] min-w-[320px] flex flex-col border-r border-[#30363d] bg-[#161b22] shrink-0">
    <div className="px-5 py-2.5 border-b border-[#30363d]/60 flex items-center justify-between">
      <span className="text-[10px] font-mono font-bold text-[#6e7681] uppercase tracking-wider">Problem Statement</span>
      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border uppercase ${difficultyBadge(problem.difficulty)}`}>
        {problem.difficulty}
      </span>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-5 font-sans text-xs">
      <div>
        <h1 className="text-lg font-black text-[#e6edf3] font-mono mb-2">{problem.title}</h1>
        <div className="flex flex-wrap gap-1.5">
          {problem.topics.map((t) => (
            <span key={t} className="text-[10px] font-mono font-bold text-[#6e7681] bg-[#1c2128] border border-[#30363d] px-2.5 py-0.5 rounded-lg">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="text-[#8b949e] leading-relaxed space-y-2 border-t border-[#30363d]/60 pt-4">
        <p className="whitespace-pre-line">{problem.description}</p>
      </div>

      <div className="space-y-2.5 border-t border-[#30363d]/60 pt-4">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <Info size={11} className="text-[#f59e0b]" /> Examples
        </h3>
        {problem.examples.map((ex, i) => (
          <div key={i} className="rounded-lg bg-[#1c2128]/60 border border-[#30363d] overflow-hidden text-[11px]">
            <div className="px-3.5 py-1.5 bg-[#1c2128] border-b border-[#30363d]/60 text-[9px] font-mono font-bold text-[#6e7681] uppercase">
              Example {i + 1}
            </div>
            <div className="p-3.5 space-y-2 font-mono">
              <div>
                <span className="text-[#6e7681] text-[10px] block mb-0.5">Input:</span>
                <span className="text-[#8b949e]">{ex.input}</span>
              </div>
              <div>
                <span className="text-[#6e7681] text-[10px] block mb-0.5">Output:</span>
                <span className="text-[#22c55e]">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="text-[#6e7681] text-[10px] font-sans pt-1.5 border-t border-[#30363d]/40">
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1.5 border-t border-[#30363d]/60 pt-4 pb-2">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6e7681] flex items-center gap-1">
          <Target size={11} className="text-[#ef4444]" /> Constraints
        </h3>
        <ul className="space-y-1 font-mono text-[11px] text-[#6e7681]">
          {problem.constraints.map((c, i) => (
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

const CodeEditor = ({ starterCode, onRun, onSubmit, runStatus, submitStatus }) => {
  const [code, setCode] = useState(starterCode)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 flex flex-col bg-[#161b22] border-r border-[#30363d] min-w-0">
      <div className="h-10 flex items-center justify-between px-4 bg-[#0d1117] border-b border-[#30363d] shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] border-b-0 rounded-t-lg text-xs font-semibold text-[#e6edf3]">
            <FileCode size={13} className="text-[#8b5cf6]" />
            <span className="font-mono text-xs">solution.js</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#6e7681]">JavaScript</span>
          <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-[#21262d] text-[#6e7681] hover:text-[#e6edf3] transition-colors" title="Copy code">
            {copied ? <Check size={13} className="text-[#22c55e]" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      <MonacoEditor
        value={code}
        onChange={setCode}
        onRun={onRun}
        onSubmit={onSubmit}
      />

      <div className="h-8 flex items-center justify-between px-4 bg-[#0d1117] border-t border-[#30363d] shrink-0 text-[10px] font-mono text-[#6e7681] select-none">
        <div className="flex items-center gap-3">
          <span>JavaScript</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          {runStatus === "running" && (
            <span className="flex items-center gap-1 text-[#f59e0b]">
              <RotateCcw size={10} className="animate-spin" /> Running tests...
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
          {submitStatus === "submitted" && (
            <span className="flex items-center gap-1 text-[#22c55e]">
              <Check size={10} /> Accepted
            </span>
          )}
          {runStatus === "idle" && submitStatus === "idle" && <span>Ready</span>}
        </div>
      </div>

      <OutputTerminal status={runStatus} code={code} />

      <div className="h-14 flex items-center justify-end gap-3 px-4 bg-[#0d1117] border-t border-[#30363d] shrink-0">
        <button
          onClick={onRun}
          disabled={runStatus === "running" || submitStatus === "submitting"}
          className="flex items-center gap-1.5 px-5 py-2 text-xs font-mono font-bold text-[#8b949e] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-xl transition-colors disabled:opacity-50"
        >
          <Play size={12} /> Run
        </button>
        <button
          onClick={onSubmit}
          disabled={runStatus === "running" || submitStatus === "submitting" || submitStatus === "submitted"}
          className="flex items-center gap-1.5 px-6 py-2 text-xs font-mono font-bold text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-xl transition-colors disabled:opacity-50"
        >
          <Send size={12} /> Submit
        </button>
      </div>
    </div>
  )
}

const SolveWorkspace = ({ problem, onBack }) => {
  const [runStatus, setRunStatus] = useState("idle")
  const [submitStatus, setSubmitStatus] = useState("idle")

  const handleRun = useCallback(() => {
    setRunStatus("running")
    setTimeout(() => setRunStatus(Math.random() > 0.3 ? "passed" : "failed"), 1800)
  }, [])

  const handleSubmit = useCallback(() => {
    setSubmitStatus("submitting")
    setTimeout(() => {
      setSubmitStatus("submitted")
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }, 2200)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#8b949e] antialiased overflow-hidden">
      <header className="h-16 flex items-center justify-between px-6 bg-[#0d1117] border-b border-[#30363d] shrink-0 select-none">
        <div className="flex items-center gap-3.5">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold text-[#6e7681] hover:text-[#e6edf3] transition-colors">
            <ChevronLeft size={16} />
            <span>Problems</span>
          </button>
          <div className="w-px h-6 bg-[#30363d]" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#e6edf3] font-mono">{problem.title}</span>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${difficultyBadge(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#1c2128] border border-[#30363d] px-3.5 py-1.5 rounded-xl text-xs font-mono text-[#6e7681]">
            <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#22c55e]" /> 30:00</span>
            <span className="w-px h-3 bg-[#30363d]" />
            <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#f59e0b]" /> 256 MB</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#6e7681] bg-[#1c2128] border border-[#30363d] px-3 py-1 rounded-lg">
            #{problem.id}
          </span>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 overflow-hidden p-4 gap-4">
        <div className="w-full flex border border-[#30363d] rounded-2xl overflow-hidden bg-[#161b22]">
          <ProblemPanel problem={problem} />
          <CodeEditor
            starterCode={problem.starterCode}
            onRun={handleRun}
            onSubmit={handleSubmit}
            runStatus={runStatus}
            submitStatus={submitStatus}
          />
        </div>
      </div>
    </div>
  )
}

export default SolveWorkspace
