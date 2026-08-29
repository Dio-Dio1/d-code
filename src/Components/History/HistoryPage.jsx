import React, { useState, useMemo } from "react"
import {
  History,
  Search,
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
} from "lucide-react"

import { matchHistory, solvedProblems } from "../../data/historyData"
import { difficultyBadge } from "../../utils/badges"

const TABS = [
  { key: "duels", label: "Duels" },
  { key: "solved", label: "Solved" },
]

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState("duels")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredDuels = useMemo(() => {
    let list = [...matchHistory]
    if (filter === "wins") list = list.filter((d) => d.result === "W")
    if (filter === "losses") list = list.filter((d) => d.result === "L")
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (d) =>
          d.opponent.toLowerCase().includes(q) ||
          d.problem.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q)
      )
    }
    return list
  }, [search, filter])

  const filteredProblems = useMemo(() => {
    let list = [...solvedProblems]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q)
      )
    }
    return list
  }, [search])

  const stats = useMemo(() => {
    const wins = matchHistory.filter((d) => d.result === "W").length
    const losses = matchHistory.filter((d) => d.result === "L").length
    const totalRating = matchHistory.reduce((a, d) => a + d.ratingChange, 0)
    return { wins, losses, totalRating, winRate: Math.round((wins / (wins + losses)) * 100) }
  }, [])

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased">
      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-5">

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <History size={22} className="text-[#6e7681]" /> History
            </h1>
            <p className="text-sm font-medium text-[#6e7681] mt-1">Your complete match and solving history</p>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {[
            { icon: Trophy, label: "Total Matches", value: matchHistory.length, color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/12", border: "border-[#f59e0b]/25" },
            { icon: Target, label: "Win Rate", value: `${stats.winRate}%`, color: "text-[#22c55e]", bg: "bg-[#22c55e]/12", border: "border-[#22c55e]/25" },
            { icon: TrendingUp, label: "Rating Change", value: `${stats.totalRating > 0 ? "+" : ""}${stats.totalRating}`, color: stats.totalRating > 0 ? "text-[#22c55e]" : "text-[#ef4444]", bg: stats.totalRating > 0 ? "bg-[#22c55e]/12" : "bg-[#ef4444]/12", border: stats.totalRating > 0 ? "border-[#22c55e]/25" : "border-[#ef4444]/25" },
            { icon: Zap, label: "Problems Solved", value: solvedProblems.length, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/12", border: "border-[#3b82f6]/25" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className={`rounded-xl bg-[#1c2128] border ${s.border} p-4 flex items-center gap-3.5`}>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.bg}`}>
                  <Icon size={20} className={s.color} strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold font-mono text-[#e6edf3] leading-tight truncate">{s.value}</p>
                  <p className="text-[11px] font-bold text-[#6e7681] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              </div>
            )
          })}
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 border-b border-[#30363d] sm:border-b-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 text-xs font-bold transition-colors ${
                  activeTab === tab.key
                    ? "text-[#8b5cf6]"
                    : "text-[#6e7681] hover:text-[#8b949e]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  <span className={`text-[10px] font-mono ${
                    activeTab === tab.key ? "text-[#8b5cf6]/70" : "text-[#484f58]"
                  }`}>
                    {tab.key === "duels" ? matchHistory.length : solvedProblems.length}
                  </span>
                </span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6] rounded-t-full hidden sm:block" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "duels" && (
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 text-xs font-bold bg-[#1c2128] border border-[#30363d] rounded-lg text-[#8b949e] focus:outline-none focus:border-[#8b5cf6] transition-all"
              >
                <option value="all">All Matches</option>
                <option value="wins">Wins Only</option>
                <option value="losses">Losses Only</option>
              </select>
            )}
            <div className="flex-1 relative max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7681]" />
              <input
                type="text"
                placeholder={activeTab === "duels" ? "Search opponents..." : "Search problems..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-[#1c2128] border border-[#30363d] rounded-lg text-[#8b949e] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all"
              />
            </div>
          </div>
        </div>

        {activeTab === "duels" && (
          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
            <div className="grid grid-cols-[50px_1fr_100px_80px_120px_100px_90px] gap-3 px-5 py-2.5 border-b border-[#30363d] text-[10px] font-extrabold uppercase tracking-wider text-[#6e7681] select-none">
              <span>Result</span>
              <span>Opponent</span>
              <span>Score</span>
              <span>Problem</span>
              <span>Time</span>
              <span>Rating</span>
              <span className="text-right">Date</span>
            </div>

            {filteredDuels.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#21262d] border border-[#30363d]">
                    <Search size={20} className="text-[#484f58]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#6e7681]">No matches found</p>
                <p className="text-xs text-[#484f58] mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]/60">
                {filteredDuels.map((duel) => (
                  <div
                    key={duel.id}
                    className="grid grid-cols-[50px_1fr_100px_80px_120px_100px_90px] gap-3 px-5 py-3 items-center hover:bg-[#21262d] transition-colors cursor-pointer group"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-extrabold font-mono ${
                        duel.result === "W"
                          ? "bg-[#22c55e]/12 text-[#22c55e] border border-[#22c55e]/25"
                          : "bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25"
                      }`}
                    >
                      {duel.result}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#e6edf3] group-hover:text-[#8b5cf6] transition-colors truncate">
                          {duel.opponent}
                        </span>
                        <span className="text-[10px] font-mono text-[#6e7681] bg-[#21262d] px-1.5 py-0.5 rounded shrink-0">
                          {duel.opponentRating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          duel.type === "Ranked"
                            ? "text-[#f59e0b] bg-[#f59e0b]/12 border-[#f59e0b]/25"
                            : "text-[#8b5cf6] bg-[#8b5cf6]/12 border-[#8b5cf6]/25"
                        }`}>
                          {duel.type}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-[#8b949e]">{duel.score}</span>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#8b949e] truncate">{duel.problem}</p>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${difficultyBadge(duel.difficulty)}`}>
                        {duel.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#6e7681]">
                      <Clock size={11} />
                      <span className="font-mono">{duel.time}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {duel.ratingChange !== 0 ? (
                        <>
                          {duel.ratingChange > 0 ? (
                            <TrendingUp size={12} className="text-[#22c55e]" />
                          ) : (
                            <TrendingDown size={12} className="text-[#ef4444]" />
                          )}
                          <span className={`text-xs font-mono font-bold ${
                            duel.ratingChange > 0 ? "text-[#22c55e]" : "text-[#ef4444]"
                          }`}>
                            {duel.ratingChange > 0 ? "+" : ""}{duel.ratingChange}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-mono text-[#484f58]">—</span>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-[#6e7681] text-right">{duel.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "solved" && (
          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_100px_120px_100px_80px] gap-3 px-5 py-2.5 border-b border-[#30363d] text-[10px] font-extrabold uppercase tracking-wider text-[#6e7681] select-none">
              <span>#</span>
              <span>Problem</span>
              <span>Difficulty</span>
              <span>Language</span>
              <span>Time</span>
              <span className="text-right">Solved</span>
            </div>

            {filteredProblems.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#21262d] border border-[#30363d]">
                    <Search size={20} className="text-[#484f58]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#6e7681]">No problems found</p>
                <p className="text-xs text-[#484f58] mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]/60">
                {filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="grid grid-cols-[60px_1fr_100px_120px_100px_80px] gap-3 px-5 py-3 items-center hover:bg-[#21262d] transition-colors cursor-pointer group"
                  >
                    <span className="text-xs font-mono font-bold text-[#484f58]">{problem.id}</span>
                    <span className="text-sm font-bold text-[#e6edf3] group-hover:text-[#8b5cf6] transition-colors truncate">
                      {problem.title}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border ${difficultyBadge(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs font-mono text-[#8b949e]">{problem.language}</span>
                    <div className="flex items-center gap-1.5 text-xs text-[#6e7681]">
                      <Clock size={11} />
                      <span className="font-mono">{problem.time}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6e7681] text-right">{problem.solvedAt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
