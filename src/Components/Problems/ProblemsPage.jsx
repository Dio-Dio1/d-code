import React, { useState, useMemo, useCallback } from "react"
import {
  Search,
  CheckCircle2,
  Circle,
  Flame,
  Trophy,
  Target,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Code2,
  Clock,
  Zap,
} from "lucide-react"

import { problems as allProblems, allTopics } from "../../data/problemsData"

const difficultyBadge = (d) => {
  if (d === "Easy") return "text-[#22c55e] bg-[#22c55e]/12 border-[#22c55e]/25"
  if (d === "Medium") return "text-[#f59e0b] bg-[#f59e0b]/12 border-[#f59e0b]/25"
  return "text-[#ef4444] bg-[#ef4444]/12 border-[#ef4444]/25"
}

const difficultyDot = (d) => {
  if (d === "Easy") return "bg-[#22c55e]"
  if (d === "Medium") return "bg-[#f59e0b]"
  return "bg-[#ef4444]"
}

const TABS = [
  { key: "all", label: "All" },
  { key: "unsolved", label: "Unsolved" },
  { key: "solved", label: "Solved" },
  { key: "daily", label: "Daily" },
]

const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 }

const SortIcon = ({ col, sortKey, sortDir }) => {
  if (sortKey !== col) return <ArrowUpDown size={12} className="text-[#484f58]" />
  return sortDir === "asc"
    ? <ArrowUp size={12} className="text-[#8b5cf6]" />
    : <ArrowDown size={12} className="text-[#8b5cf6]" />
}

const ProblemsPage = ({ onNavigateToProblem }) => {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("All")
  const [topicFilter, setTopicFilter] = useState("All")
  const [sortKey, setSortKey] = useState("id")
  const [sortDir, setSortDir] = useState("asc")
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"))
        return key
      }
      setSortDir("asc")
      return key
    })
  }, [])

  const filtered = useMemo(() => {
    let list = [...allProblems]

    if (activeTab === "solved") list = list.filter((p) => p.solved)
    else if (activeTab === "unsolved") list = list.filter((p) => !p.solved)
    else if (activeTab === "daily") list = list.filter((p) => p.isDaily)

    if (difficultyFilter !== "All") {
      list = list.filter((p) => p.difficulty === difficultyFilter)
    }

    if (topicFilter !== "All") {
      list = list.filter((p) => p.topics.includes(topicFilter))
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q)) ||
          p.difficulty.toLowerCase().includes(q) ||
          String(p.id).includes(q)
      )
    }

    list.sort((a, b) => {
      let cmp = 0
      if (sortKey === "id") cmp = a.id - b.id
      else if (sortKey === "title") cmp = a.title.localeCompare(b.title)
      else if (sortKey === "difficulty") cmp = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]
      else if (sortKey === "acceptance") cmp = a.acceptance - b.acceptance
      return sortDir === "asc" ? cmp : -cmp
    })

    return list
  }, [activeTab, difficultyFilter, topicFilter, search, sortKey, sortDir])

  const totalSolved = allProblems.filter((p) => p.solved).length
  const dailyProblem = allProblems.find((p) => p.isDaily)

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased">
      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-5">

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <Code2 size={22} className="text-[#8b5cf6]" /> Problems
            </h1>
            <p className="text-sm font-medium text-[#6e7681] mt-1">
              Practice and sharpen your competitive edge
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 text-xs bg-[#1c2128] border border-[#30363d] px-3.5 py-2 rounded-lg">
              <span className="flex items-center gap-1.5 font-semibold text-[#8b949e]">
                <Target size={13} className="text-[#22c55e]" />
                <strong className="text-[#22c55e] font-mono">{totalSolved}</strong>
                <span className="text-[#6e7681]">/ {allProblems.length} solved</span>
              </span>
              <span className="text-[#30363d]">|</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#8b949e]">
                <Flame size={13} className="text-[#ef4444]" />
                <span className="text-[#6e7681]">Streak</span>
                <strong className="text-[#f59e0b] font-mono">5d</strong>
              </span>
            </div>
          </div>
        </header>

        {dailyProblem && (
          <div className="rounded-xl bg-[#8b5cf6] border border-[#8b5cf6] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-white border border-white/20 shrink-0">
                <Zap size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/20 px-2 py-0.5 rounded-md">Daily Challenge</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${difficultyBadge(dailyProblem.difficulty)}`}>
                    {dailyProblem.difficulty}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-white mt-1">
                  #{dailyProblem.id} — {dailyProblem.title}
                </h3>
                <p className="text-xs text-white/70 mt-0.5">
                  {dailyProblem.topics.join(" · ")}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToProblem && onNavigateToProblem(dailyProblem)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#8b5cf6] bg-white hover:bg-white/90 rounded-lg transition-colors shrink-0"
            >
              <Clock size={13} />
              Solve Now
            </button>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7681]" />
              <input
                type="text"
                placeholder="Search problems by title, topic, or number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm font-medium bg-[#1c2128] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7681] hover:text-[#e6edf3] transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-lg border transition-all ${
                showFilters
                  ? "bg-[#8b5cf6]/12 text-[#8b5cf6] border-[#8b5cf6]/25"
                  : "bg-[#1c2128] text-[#6e7681] border-[#30363d] hover:text-[#e6edf3] hover:border-[#484f58]"
              }`}
            >
              <Filter size={14} />
              Filters
              {(difficultyFilter !== "All" || topicFilter !== "All") && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8b5cf6] text-[9px] font-black text-white">
                  {(difficultyFilter !== "All" ? 1 : 0) + (topicFilter !== "All" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-3 px-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e7681]">Difficulty</span>
                <div className="flex gap-1">
                  {["All", "Easy", "Medium", "Hard"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficultyFilter(d)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                        difficultyFilter === d
                          ? d === "Easy"
                            ? "bg-[#22c55e]/12 text-[#22c55e] border-[#22c55e]/25"
                            : d === "Medium"
                            ? "bg-[#f59e0b]/12 text-[#f59e0b] border-[#f59e0b]/25"
                            : d === "Hard"
                            ? "bg-[#ef4444]/12 text-[#ef4444] border-[#ef4444]/25"
                            : "bg-[#e6edf3]/10 text-[#e6edf3] border-[#e6edf3]/20"
                          : "bg-[#1c2128] text-[#6e7681] border-[#30363d] hover:text-[#e6edf3]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-[#30363d]">|</span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e7681]">Topic</span>
                <div className="relative">
                  <select
                    value={topicFilter}
                    onChange={(e) => setTopicFilter(e.target.value)}
                    className="appearance-none text-[11px] font-bold pl-3 pr-7 py-1.5 rounded-lg border bg-[#1c2128] text-[#8b949e] border-[#30363d] focus:outline-none focus:border-[#8b5cf6] cursor-pointer"
                  >
                    <option value="All">All Topics</option>
                    {allTopics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6e7681] pointer-events-none" />
                </div>
              </div>

              {(difficultyFilter !== "All" || topicFilter !== "All") && (
                <>
                  <span className="text-[#30363d]">|</span>
                  <button
                    onClick={() => { setDifficultyFilter("All"); setTopicFilter("All") }}
                    className="text-[11px] font-bold text-[#ef4444] hover:text-[#ef4444]/80 transition-colors"
                  >
                    Clear filters
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 border-b border-[#30363d]">
          {TABS.map((tab) => {
            const count =
              tab.key === "all"
                ? allProblems.length
                : tab.key === "solved"
                ? allProblems.filter((p) => p.solved).length
                : tab.key === "unsolved"
                ? allProblems.filter((p) => !p.solved).length
                : allProblems.filter((p) => p.isDaily).length
            return (
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
                    {count}
                  </span>
                </span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6] rounded-t-full" />
                )}
              </button>
            )
          })}
        </div>

        <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
          <div className="grid grid-cols-[48px_1fr_140px_100px_100px_90px] gap-4 px-5 py-2.5 border-b border-[#30363d] text-[10px] font-bold uppercase tracking-wider text-[#6e7681] select-none">
            <button onClick={() => handleSort("id")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">
              # <SortIcon col="id" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button onClick={() => handleSort("title")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">
              Title <SortIcon col="title" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span>Topics</span>
            <button onClick={() => handleSort("difficulty")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">
              Difficulty <SortIcon col="difficulty" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button onClick={() => handleSort("acceptance")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">
              Acceptance <SortIcon col="acceptance" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className="text-right">Status</span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#21262d] border border-[#30363d]">
                  <Search size={20} className="text-[#484f58]" />
                </div>
              </div>
              <p className="text-sm font-bold text-[#6e7681]">No problems found</p>
              <p className="text-xs text-[#6e7681] mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-[#30363d]/60">
              {filtered.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => onNavigateToProblem && onNavigateToProblem(problem)}
                  className="grid grid-cols-[48px_1fr_140px_100px_100px_90px] gap-4 px-5 py-3 items-center hover:bg-[#21262d] transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-mono font-bold text-[#6e7681]">{problem.id}</span>

                  <div className="flex items-center gap-2.5 min-w-0">
                    {problem.solved ? (
                      <CheckCircle2 size={15} className="text-[#22c55e] shrink-0" />
                    ) : problem.attempted ? (
                      <Circle size={15} className="text-[#f59e0b] shrink-0" />
                    ) : (
                      <Circle size={15} className="text-[#484f58] shrink-0" />
                    )}
                    <span className="text-sm font-semibold text-[#8b949e] group-hover:text-[#e6edf3] truncate transition-colors">
                      {problem.title}
                    </span>
                    {problem.isDaily && (
                      <span className="flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-[#f59e0b] bg-[#f59e0b]/12 border border-[#f59e0b]/25 px-1.5 py-0.5 rounded shrink-0">
                        <Flame size={9} className="text-[#f59e0b] fill-[#f59e0b]" />
                        Daily
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 min-w-0">
                    {problem.topics.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-bold text-[#6e7681] bg-[#21262d] px-1.5 py-0.5 rounded truncate max-w-[70px]">
                        {t}
                      </span>
                    ))}
                    {problem.topics.length > 2 && (
                      <span className="text-[10px] font-bold text-[#6e7681]">+{problem.topics.length - 2}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${difficultyDot(problem.difficulty)}`} />
                    <span className={`text-[11px] font-mono font-bold ${difficultyBadge(problem.difficulty).split(" ")[0]}`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-semibold text-[#6e7681]">{problem.acceptance}%</span>

                  <div className="text-right">
                    {problem.solved ? (
                      <span className="text-[10px] font-bold text-[#22c55e] bg-[#22c55e]/12 border border-[#22c55e]/25 px-2 py-0.5 rounded-md">
                        Solved
                      </span>
                    ) : problem.attempted ? (
                      <span className="text-[10px] font-bold text-[#f59e0b] bg-[#f59e0b]/12 border border-[#f59e0b]/25 px-2 py-0.5 rounded-md">
                        Attempted
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#484f58]">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-[#6e7681] font-medium px-1">
          <span>Showing <strong className="text-[#8b949e] font-mono">{filtered.length}</strong> of {allProblems.length} problems</span>
          <span className="flex items-center gap-1.5">
            <Trophy size={12} className="text-[#f59e0b]" />
            <span className="text-[#6e7681]">
              <strong className="text-[#22c55e] font-mono">{allProblems.filter((p) => p.solved).length}</strong> solved
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProblemsPage
