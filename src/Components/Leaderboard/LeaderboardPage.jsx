import React, { useState, useMemo } from "react"
import {
  Trophy,
  Search,
  Minus,
  Flame,
  Crown,
  Medal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Zap,
  Target,
  Shield,
} from "lucide-react"

import {
  players,
  weeklyLeaderboard,
  friendsLeaderboard,
  ratingTiers,
} from "../../data/leaderboardData"

const TABS = [
  { key: "global", label: "Global" },
  { key: "friends", label: "Friends" },
  { key: "weekly", label: "Weekly" },
]

const getRankMovement = (i) => {
  if (i < 3) return { dir: "up", amount: Math.floor(Math.random() * 5) + 3 }
  if (i < 8) return { dir: Math.random() > 0.4 ? "up" : "down", amount: Math.floor(Math.random() * 8) + 1 }
  const r = Math.random()
  if (r > 0.6) return { dir: "up", amount: Math.floor(Math.random() * 12) + 1 }
  if (r > 0.3) return { dir: "down", amount: Math.floor(Math.random() * 8) + 1 }
  return { dir: "same", amount: 0 }
}

const movementCache = Array.from({ length: 50 }, (_, i) => getRankMovement(i))

const RankMovement = ({ movement }) => {
  if (movement.dir === "up") {
    return (
      <span className="flex items-center gap-0.5 text-[#22c55e] font-mono font-bold">
        <ArrowUp size={10} strokeWidth={3} />
        <span className="text-[10px]">{movement.amount}</span>
      </span>
    )
  }
  if (movement.dir === "down") {
    return (
      <span className="flex items-center gap-0.5 text-[#ef4444] font-mono font-bold">
        <ArrowDown size={10} strokeWidth={3} />
        <span className="text-[10px]">{movement.amount}</span>
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-[#6e7681] font-mono">
      <Minus size={10} strokeWidth={2.5} />
      <span className="text-[10px]">0</span>
    </span>
  )
}

const TopBadge = ({ rank }) => {
  if (rank === 1) return <Crown size={13} className="text-[#f59e0b] fill-[#f59e0b]/30" />
  if (rank === 2) return <Medal size={13} className="text-[#8b949e] fill-[#8b949e]/20" />
  if (rank === 3) return <Medal size={13} className="text-[#f59e0b]/60 fill-[#f59e0b]/20" />
  return null
}

const SortIcon = ({ col, sortKey, sortDir }) => {
  if (sortKey !== col) return <ArrowUpDown size={11} className="text-[#484f58]" />
  return sortDir === "asc"
    ? <ArrowUp size={11} className="text-[#8b5cf6]" />
    : <ArrowDown size={11} className="text-[#8b5cf6]" />
}

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("global")
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState("rank")
  const [sortDir, setSortDir] = useState("asc")

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const rawList = useMemo(() => {
    let list = activeTab === "friends"
      ? [...friendsLeaderboard]
      : activeTab === "weekly"
      ? [...weeklyLeaderboard]
      : [...players]

    if (activeTab === "global") {
      list.sort((a, b) => b.rating - a.rating)
      list = list.map((p, i) => ({ ...p, rank: i + 1 }))
    } else if (activeTab === "weekly") {
      list.sort((a, b) => b.wins - a.wins || a.losses - b.losses)
      list = list.map((p, i) => ({ ...p, rank: i + 1 }))
    } else {
      list.sort((a, b) => b.rating - a.rating)
      list = list.map((p, i) => ({ ...p, rank: i + 1 }))
    }

    return list
  }, [activeTab])

  const displayList = useMemo(() => {
    let list = [...rawList]

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.username.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          String(p.rating).includes(q)
      )
    }

    list.sort((a, b) => {
      let cmp = 0
      if (sortKey === "rank") cmp = a.rank - b.rank
      else if (sortKey === "rating") cmp = a.rating - b.rating
      else if (sortKey === "wins") cmp = a.wins - b.wins
      else if (sortKey === "winrate") {
        const wrA = a.wins + a.losses > 0 ? a.wins / (a.wins + a.losses) : 0
        const wrB = b.wins + b.losses > 0 ? b.wins / (b.wins + b.losses) : 0
        cmp = wrA - wrB
      }
      else if (sortKey === "streak") cmp = a.streak - b.streak
      return sortDir === "asc" ? cmp : -cmp
    })

    return list
  }, [rawList, search, sortKey, sortDir])

  const userRank = (() => {
    const found = players.find((p) => p.isUser)
    if (!found) return null
    const idx = players.indexOf(found)
    return { ...found, rank: idx + 1 }
  })()

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased">
      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-5">

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <Trophy size={22} className="text-[#f59e0b]" /> Leaderboard
            </h1>
            <p className="text-sm font-medium text-[#6e7681] mt-1">
              Where top developers compete for rank and glory
            </p>
          </div>

          {userRank && (
            <div className="flex items-center gap-3 text-xs bg-[#1c2128] border border-[#30363d] px-3.5 py-2 rounded-lg">
              <span className="flex items-center gap-1.5 font-semibold text-[#8b949e]">
                <Target size={13} className="text-[#22c55e]" />
                <strong className="text-[#22c55e] font-mono">#{userRank.rank}</strong>
              </span>
              <span className="text-[#30363d]">|</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#8b949e]">
                <Trophy size={13} className="text-[#f59e0b]" />
                <strong className="text-[#f59e0b] font-mono">{userRank.rating}</strong>
                <span className="text-[#6e7681]">rating</span>
              </span>
              <span className="text-[#30363d]">|</span>
              <span className="flex items-center gap-1.5 font-semibold text-[#8b949e]">
                <Flame size={13} className="text-[#ef4444]" />
                <strong className="text-[#f59e0b] font-mono">{userRank.streak}</strong>
                <span className="text-[#6e7681]">streak</span>
              </span>
            </div>
          )}
        </header>

        {userRank && (
          <div className="rounded-xl bg-[#1c2128] border border-[#30363d] p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25 font-bold font-mono text-lg">
                  {userRank.username[0].toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#22c55e] border-2 border-[#1c2128]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#e6edf3]">{userRank.name}</span>
                  <span className="text-xs font-mono text-[#6e7681] bg-[#21262d] px-2 py-0.5 rounded-md">@{userRank.username}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#6e7681] font-medium">
                  <span className="flex items-center gap-1">
                    <Zap size={11} className="text-[#22c55e]" />
                    <strong className="text-[#22c55e] font-mono">{userRank.solved}</strong> solved
                  </span>
                  <span className="text-[#484f58]">·</span>
                  <span className="font-mono">
                    <span className="text-[#22c55e]">{userRank.wins}</span>
                    <span className="text-[#6e7681] mx-0.5">-</span>
                    <span className="text-[#ef4444]">{userRank.losses}</span>
                  </span>
                  <span className="text-[#484f58]">·</span>
                  <span className="font-mono">
                    <strong className="text-[#f59e0b]">{Math.round((userRank.wins / (userRank.wins + userRank.losses)) * 100)}%</strong> win rate
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-black font-mono text-[#f59e0b] leading-none">#{userRank.rank}</p>
                <p className="text-[10px] font-bold text-[#6e7681] uppercase tracking-wider mt-1">Rank</p>
              </div>
              <div className="h-10 w-px bg-[#30363d]" />
              <div className="text-center">
                <p className="text-2xl font-black font-mono text-[#22c55e] leading-none">{userRank.rating}</p>
                <p className="text-[10px] font-bold text-[#6e7681] uppercase tracking-wider mt-1">Rating</p>
              </div>
            </div>
          </div>
        )}

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
                  <span className={`text-[10px] font-mono ${activeTab === tab.key ? "text-[#8b5cf6]/70" : "text-[#484f58]"}`}>
                    {tab.key === "global" ? players.length : tab.key === "friends" ? friendsLeaderboard.length : weeklyLeaderboard.length}
                  </span>
                </span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6] rounded-t-full hidden sm:block" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7681]" />
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-[#1c2128] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7681] hover:text-[#e6edf3] transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
          <div className="grid grid-cols-[56px_1fr_80px_100px_90px_80px_70px] gap-3 px-5 py-2.5 border-b border-[#30363d] text-[10px] font-bold uppercase tracking-wider text-[#6e7681] select-none">
            <button onClick={() => handleSort("rank")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left"># <SortIcon col="rank" sortKey={sortKey} sortDir={sortDir} /></button>
            <button onClick={() => handleSort("rating")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">Player <SortIcon col="rating" sortKey={sortKey} sortDir={sortDir} /></button>
            <button onClick={() => handleSort("rating")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">Rating <SortIcon col="rating" sortKey={sortKey} sortDir={sortDir} /></button>
            <button onClick={() => handleSort("wins")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">Wins / Losses <SortIcon col="wins" sortKey={sortKey} sortDir={sortDir} /></button>
            <button onClick={() => handleSort("winrate")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">Win Rate <SortIcon col="winrate" sortKey={sortKey} sortDir={sortDir} /></button>
            <button onClick={() => handleSort("streak")} className="flex items-center gap-1 hover:text-[#e6edf3] transition-colors text-left">Streak <SortIcon col="streak" sortKey={sortKey} sortDir={sortDir} /></button>
            <span className="text-right">Trend</span>
          </div>

          {displayList.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#21262d] border border-[#30363d]">
                  <Search size={20} className="text-[#484f58]" />
                </div>
              </div>
              <p className="text-sm font-bold text-[#6e7681]">No players found</p>
              <p className="text-xs text-[#6e7681] mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="divide-y divide-[#30363d]/60">
              {displayList.map((p) => {
                const winRate = p.wins + p.losses > 0 ? Math.round((p.wins / (p.wins + p.losses)) * 100) : 0
                const isUser = p.isUser
                const isTop3 = activeTab === "global" && p.rank <= 3
                const tier = ratingTiers[p.tier] || ratingTiers.bronze
                const movement = movementCache[p.rank - 1] || movementCache[0]

                return (
                  <div
                    key={p.username}
                    className={`grid grid-cols-[56px_1fr_80px_100px_90px_80px_70px] gap-3 px-5 py-3 items-center transition-colors cursor-pointer group ${
                      isUser
                        ? "bg-[#8b5cf6]/8 hover:bg-[#8b5cf6]/12 border-l-2 border-l-[#8b5cf6]"
                        : isTop3
                        ? "hover:bg-[#21262d]"
                        : "hover:bg-[#21262d]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {isTop3 ? <TopBadge rank={p.rank} /> : null}
                      <span className={`text-xs font-mono font-bold ${isUser ? "text-[#8b5cf6]" : isTop3 ? "text-[#e6edf3]" : "text-[#6e7681]"}`}>
                        {p.rank}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`relative shrink-0 h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono border ${
                        isUser
                          ? "bg-[#8b5cf6]/12 text-[#8b5cf6] border-[#8b5cf6]/25"
                          : isTop3
                          ? "bg-[#f59e0b]/12 text-[#f59e0b] border-[#f59e0b]/25"
                          : "bg-[#21262d] text-[#6e7681] border-[#30363d]"
                      }`}>
                        {p.username[0].toUpperCase()}
                        {isTop3 && (
                          <span className={`absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#1c2128] ${tier.dot}`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold truncate transition-colors ${isUser ? "text-[#8b5cf6]" : isTop3 ? "text-[#e6edf3]" : "text-[#8b949e] group-hover:text-[#e6edf3]"}`}>
                            {p.name}
                          </span>
                          {isUser && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#8b5cf6] bg-[#8b5cf6]/12 border border-[#8b5cf6]/25 px-1.5 py-0.5 rounded shrink-0">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-[#6e7681]">@{p.username}</span>
                          {p.tier && (
                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${tier.bg} ${tier.color} ${tier.border} border`}>
                              {tier.label}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className={`text-sm font-mono font-extrabold ${isUser ? "text-[#8b5cf6]" : isTop3 ? "text-[#f59e0b]" : "text-[#8b949e]"}`}>
                      {p.rating}
                    </span>

                    <div className="font-mono text-[11px] font-bold">
                      <span className="text-[#22c55e]">{p.wins}</span>
                      <span className="text-[#484f58] mx-1">/</span>
                      <span className="text-[#ef4444]">{p.losses}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 rounded-full bg-[#30363d] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${winRate >= 70 ? "bg-[#22c55e]" : winRate >= 55 ? "bg-[#f59e0b]" : "bg-[#ef4444]"}`}
                          style={{ width: `${winRate}%` }}
                        />
                      </div>
                      <span className={`text-[11px] font-mono font-bold ${winRate >= 70 ? "text-[#22c55e]" : winRate >= 55 ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                        {winRate}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {p.streak > 0 ? (
                        <>
                          <Flame size={11} className={p.streak >= 7 ? "text-[#f59e0b] fill-[#f59e0b]/30" : "text-[#ef4444]"} />
                          <span className={`text-[11px] font-mono font-bold ${p.streak >= 7 ? "text-[#f59e0b]" : "text-[#ef4444]"}`}>
                            {p.streak}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-mono text-[#484f58]">—</span>
                      )}
                    </div>

                    <div className="text-right">
                      <RankMovement movement={movement} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-[#6e7681] font-medium px-1">
          <span>Showing <strong className="text-[#8b949e] font-mono">{displayList.length}</strong> of {activeTab === "global" ? players.length : activeTab === "friends" ? friendsLeaderboard.length : weeklyLeaderboard.length} players</span>
          <span className="flex items-center gap-1.5">
            <Shield size={12} className="text-[#22c55e]" />
            <span className="text-[#6e7681]">Ratings updated <strong className="text-[#8b949e] font-mono">live</strong></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
