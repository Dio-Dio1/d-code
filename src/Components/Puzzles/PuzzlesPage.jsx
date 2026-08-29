import React, { useState } from "react"
import {
  Puzzle,
  Terminal,
  Clock,
  Zap,
  Trophy,
  Flame,
  Target,
  Check,
  X,
  ChevronRight,
  RotateCcw,
  Lightbulb,
} from "lucide-react"

import { puzzles, puzzleStats } from "../../data/puzzlesData"
import { difficultyBadge } from "../../utils/badges"

const PuzzlesPage = () => {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState({})
  const [showExplanation, setShowExplanation] = useState({})
  const [selectedPuzzle, setSelectedPuzzle] = useState(null)

  const safePuzzles = puzzles || []
  const safeStats = puzzleStats || {}

  const handleAnswer = (puzzleId, answerIndex) => {
    if (submitted[puzzleId]) return
    setAnswers({ ...answers, [puzzleId]: answerIndex })
  }

  const handleSubmit = (puzzleId) => {
    if (answers[puzzleId] === undefined) return
    setSubmitted({ ...submitted, [puzzleId]: true })
  }

  const handleReset = (puzzleId) => {
    setAnswers({ ...answers, [puzzleId]: undefined })
    setSubmitted({ ...submitted, [puzzleId]: false })
    setShowExplanation({ ...showExplanation, [puzzleId]: false })
  }

  const isCorrect = (puzzleId) => {
    const puzzle = safePuzzles.find((p) => p.id === puzzleId)
    return puzzle ? answers[puzzleId] === puzzle.correctAnswer : false
  }

  const totalSolved = safeStats.totalSolved || 0
  const totalAttempted = safeStats.totalAttempted || 1
  const accuracy = Math.round((totalSolved / totalAttempted) * 100)

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased p-4 md:p-8 flex justify-center">

      <div className="w-full max-w-7xl space-y-6">

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <Puzzle size={22} className="text-[#8b5cf6]" /> Puzzles
            </h1>
            <p className="text-xs font-mono text-[#6e7681] mt-1">Test your speed and syntax with daily rapid-fire coding puzzles</p>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {[
            { icon: Trophy, label: "Total Solved", value: totalSolved, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/12", border: "border-[#f59e0b]/25" },
            { icon: Target, label: "Accuracy", value: `${accuracy}%`, color: "text-[#22c55e]", bg: "bg-[#22c55e]/12", border: "border-[#22c55e]/25" },
            { icon: Flame, label: "Best Streak", value: safeStats.bestStreak || 0, color: "text-[#ef4444]", bg: "bg-[#ef4444]/12", border: "border-[#ef4444]/25" },
            { icon: Zap, label: "Total XP", value: (safeStats.totalXP || 0).toLocaleString(), color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/12", border: "border-[#3b82f6]/25" },
            { icon: Trophy, label: "Puzzle Rank", value: `#${safeStats.rank || "---"}`, color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/12", border: "border-[#8b5cf6]/25" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className={`rounded-xl bg-[#1c2128] border ${s.border} p-4 flex items-center gap-3.5`}>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.bg}`}>
                  <Icon size={20} className={s.color} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold font-mono text-[#e6edf3] leading-tight truncate">{s.value}</p>
                  <p className="text-[10px] font-bold text-[#6e7681] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              </div>
            )
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {safePuzzles.map((puzzle) => (
            <div
              key={puzzle.id}
              onClick={() => setSelectedPuzzle(puzzle.id)}
              className={`rounded-xl border overflow-hidden transition-all ${
                selectedPuzzle === puzzle.id
                  ? "border-[#8b5cf6]/50 ring-1 ring-[#8b5cf6]/20"
                  : "border-[#30363d] hover:border-[#484f58]"
              } bg-[#1c2128]`}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#30363d]">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#8b5cf6]/12 text-[#8b5cf6]">
                    <Terminal size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-xs font-extrabold text-[#e6edf3] uppercase tracking-wider">
                    {puzzle.title}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${difficultyBadge(puzzle.difficulty)}`}>
                    {puzzle.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-[#6e7681]">
                  <span>{(puzzle.solvedBy || 0).toLocaleString()} solved</span>
                  <span className="flex items-center gap-1.5 text-[#f59e0b] bg-[#f59e0b]/12 border border-[#f59e0b]/25 px-2 py-0.5 rounded-md font-mono text-[11px]">
                    <Clock size={12} />
                    +{puzzle.xp} XP
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-xl border border-[#30363d] bg-[#0d1117] overflow-hidden font-mono text-xs">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[#30363d]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/80" />
                      <span className="text-[11px] text-[#6e7681] font-semibold ml-2">puzzle.js</span>
                    </div>
                    <span className="text-[10px] text-[#484f58]">{puzzle.language}</span>
                  </div>
                  <pre className="p-4 text-[#8b949e] leading-relaxed overflow-x-auto">
                    <code>{puzzle.code}</code>
                  </pre>
                </div>

                <p className="text-xs font-bold text-[#e6edf3] flex items-center gap-2">
                  <Lightbulb size={14} className="text-[#f59e0b] shrink-0" /> {puzzle.question}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {(puzzle.answers || []).map((answer, i) => {
                    const isSelected = answers[puzzle.id] === i
                    const isSubmitted = submitted[puzzle.id]
                    const isAnswerCorrect = isSubmitted && i === puzzle.correctAnswer
                    const isWrong = isSubmitted && isSelected && i !== puzzle.correctAnswer

                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(puzzle.id, i)}
                        disabled={isSubmitted}
                        className={`rounded-xl border px-3 py-2.5 text-left text-xs font-mono font-semibold transition-all cursor-pointer ${
                          isAnswerCorrect
                            ? "border-[#22c55e]/50 bg-[#22c55e]/12 text-[#22c55e]"
                            : isWrong
                            ? "border-[#ef4444]/50 bg-[#ef4444]/12 text-[#ef4444]"
                            : isSelected
                            ? "border-[#8b5cf6]/50 bg-[#8b5cf6]/12 text-[#8b5cf6]"
                            : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:bg-[#8b5cf6]/8 hover:border-[#8b5cf6]/25 hover:text-[#8b5cf6]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                            isAnswerCorrect
                              ? "bg-[#22c55e]/12 text-[#22c55e]"
                              : isWrong
                              ? "bg-[#ef4444]/12 text-[#ef4444]"
                              : isSelected
                              ? "bg-[#8b5cf6]/12 text-[#8b5cf6]"
                              : "bg-[#21262d] text-[#484f58]"
                          }`}>
                            {isAnswerCorrect ? (
                              <Check size={10} strokeWidth={3} />
                            ) : isWrong ? (
                              <X size={10} strokeWidth={3} />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </span>
                          <span className="truncate">{answer}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-[#30363d] px-5 py-3 flex justify-between items-center">
                {!submitted[puzzle.id] ? (
                  <>
                    <span className="text-xs text-[#6e7681] font-medium">
                      {answers[puzzle.id] !== undefined ? "Ready to submit" : "Select an answer"}
                    </span>
                    <button
                      onClick={() => handleSubmit(puzzle.id)}
                      disabled={answers[puzzle.id] === undefined}
                      className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                        answers[puzzle.id] !== undefined
                          ? "text-[#e6edf3] bg-[#8b5cf6] hover:bg-[#7c3aed] cursor-pointer"
                          : "text-[#484f58] bg-[#21262d] cursor-not-allowed"
                      }`}
                    >
                      Submit <ChevronRight size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      {isCorrect(puzzle.id) ? (
                        <span className="text-xs font-bold text-[#22c55e] flex items-center gap-1.5">
                          <Check size={14} /> Correct! +{puzzle.xp} XP
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-[#ef4444] flex items-center gap-1.5">
                          <X size={14} /> Incorrect
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleReset(puzzle.id)}
                      className="text-xs font-bold text-[#6e7681] hover:text-[#e6edf3] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={13} /> Try Again
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PuzzlesPage
