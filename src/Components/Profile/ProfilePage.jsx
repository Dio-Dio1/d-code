import React from "react"
import {
  Trophy,
  Target,
  Flame,
  Code2,
  Swords,
  Edit3,
  Award,
  ChevronRight,
  TrendingUp,
  Users,
  Terminal,
  BarChart2,
} from "lucide-react"

import {
  profile,
  achievements,
  recentActivity,
  languageStats,
  difficultyStats,
} from "../../data/profileData"
import { ratingTiers } from "../../data/leaderboardData"

const MOCK_FRIENDS = [
  { id: 1, avatar: "S", online: true },
  { id: 2, avatar: "🐱", online: true },
  { id: 3, avatar: "⚡", online: false },
  { id: 4, avatar: "👑", online: true },
  { id: 5, avatar: "01", online: false },
  { id: 6, avatar: "P", online: true },
]

const MOCK_ACTIVITY_BARS = [
  { day: "M", rating: 12, height: "h-3", color: "bg-[#22c55e]" },
  { day: "T", rating: 28, height: "h-8", color: "bg-[#22c55e]" },
  { day: "W", rating: 0, height: "h-1", color: "bg-[#30363d]" },
  { day: "T", rating: -14, height: "h-4", color: "bg-[#ef4444]" },
  { day: "F", rating: 45, height: "h-12", color: "bg-[#22c55e]" },
  { day: "S", rating: 18, height: "h-6", color: "bg-[#22c55e]" },
  { day: "S", rating: 32, height: "h-9", color: "bg-[#22c55e]" },
  { day: "M", rating: 0, height: "h-1", color: "bg-[#30363d]" },
  { day: "T", rating: 15, height: "h-5", color: "bg-[#22c55e]" },
  { day: "W", rating: -8, height: "h-3", color: "bg-[#ef4444]" },
  { day: "T", rating: 50, height: "h-14", color: "bg-[#8b5cf6]" },
  { day: "F", rating: 22, height: "h-7", color: "bg-[#22c55e]" },
  { day: "S", rating: 0, height: "h-1", color: "bg-[#30363d]" },
  { day: "S", rating: 10, height: "h-4", color: "bg-[#22c55e]" },
]

const ProfilePage = ({ onNavigate }) => {
  const tier = ratingTiers?.[profile?.tier] || {
    label: "BRONZE",
    bg: "bg-[#f59e0b]/12",
    color: "text-[#f59e0b]",
    border: "border-[#f59e0b]/25",
  }
  
  const totalGames = (profile?.wins || 0) + (profile?.losses || 0)
  const winRate = totalGames > 0 ? Math.round((profile.wins / totalGames) * 100) : 0
  const avatarInitials = profile?.username ? profile.username.slice(0, 2).toUpperCase() : "D"

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* LEFT COLUMN: COMPETITOR CARD */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="rounded-xl bg-[#1c2128] border border-[#30363d] p-6 space-y-5">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <div className="h-28 w-28 rounded-xl bg-[#8b5cf6]/12 border-2 border-[#8b5cf6]/25 flex items-center justify-center text-4xl font-black text-[#8b5cf6] font-mono">
                    {avatarInitials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-[#22c55e] border-4 border-[#1c2128]" />
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold text-[#e6edf3]">{profile?.name || "Player"}</h1>
                  <p className="text-xs font-mono text-[#6e7681]">@{profile?.username || "coder"}</p>
                </div>

                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${tier.bg} ${tier.color} ${tier.border}`}>
                  {tier.label} DIVISION
                </span>
              </div>

              <p className="text-xs text-[#6e7681] text-center leading-relaxed">
                {profile?.bio || "Code speaks for itself."}
              </p>

              <div className="pt-3 border-t border-[#30363d] space-y-2 text-xs font-mono text-[#6e7681]">
                <div className="flex justify-between items-center">
                  <span className="text-[#6e7681]">Global Rank</span>
                  <span className="text-[#e6edf3] font-bold">#{profile?.rank || "---"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6e7681]">Joined</span>
                  <span className="text-[#e6edf3]">{profile?.joined || "2026"}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate && onNavigate("settings")}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] py-2.5 rounded-lg transition-all border border-[#30363d] cursor-pointer"
              >
                <Edit3 size={14} />
                Edit Profile
              </button>
            </div>

            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-4 flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25">
                <Flame size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[#e6edf3]">{profile?.streak || 5} Day Duel Streak</p>
                <p className="text-[10px] text-[#6e7681] font-mono">Active competitive coder</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal size={14} className="text-[#8b5cf6]" /> IDE Theme
                </span>
                <span
                  onClick={() => onNavigate && onNavigate("settings")}
                  className="text-[10px] font-bold text-[#8b5cf6] cursor-pointer hover:underline"
                >
                  Change
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] font-mono text-[11px] text-[#6e7681] flex items-center justify-between">
                <span className="text-[#8b5cf6]">tokyo-night.theme</span>
                <Code2 size={14} className="text-[#6e7681]" />
              </div>
            </div>

            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={14} className="text-[#3b82f6]" /> Friends ({MOCK_FRIENDS.length})
                </span>
                <ChevronRight size={14} className="text-[#6e7681] cursor-pointer hover:text-[#e6edf3]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MOCK_FRIENDS.map((f) => (
                  <div key={f.id} className="relative h-10 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-xs font-bold text-[#e6edf3]">
                    {f.avatar}
                    {f.online && <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-[#22c55e]" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-4 space-y-3">
              <span className="text-xs font-bold text-[#e6edf3] uppercase tracking-wider flex items-center gap-1.5">
                <Award size={14} className="text-[#f59e0b]" /> Recent Badges
              </span>
              <div className="space-y-2">
                {(achievements || []).slice(0, 2).map((ach) => (
                  <div key={ach.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#21262d] border border-[#30363d]">
                    <div className="p-1.5 rounded-md bg-[#f59e0b]/12 text-[#f59e0b]">
                      <Trophy size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#e6edf3] truncate">{ach.name}</p>
                      <p className="text-[10px] text-[#6e7681] truncate">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: COMPETITIVE TELEMETRY */}
          <div className="lg:col-span-8 space-y-5">

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-[#1c2128] border border-[#30363d] p-5 space-y-1">
                <div className="flex items-center justify-between text-[#6e7681]">
                  <span className="text-xs font-bold uppercase tracking-wider">Rating</span>
                  <Trophy size={16} className="text-[#f59e0b]" />
                </div>
                <p className="text-3xl font-extrabold font-mono text-[#e6edf3]">{profile?.rating || 1500}</p>
                <p className="text-[10px] font-mono text-[#22c55e]">+37 this week</p>
              </div>

              <div className="rounded-xl bg-[#1c2128] border border-[#30363d] p-5 space-y-1">
                <div className="flex items-center justify-between text-[#6e7681]">
                  <span className="text-xs font-bold uppercase tracking-wider">Problems</span>
                  <Target size={16} className="text-[#3b82f6]" />
                </div>
                <p className="text-3xl font-extrabold font-mono text-[#e6edf3]">{profile?.solved || 0}</p>
                <p className="text-[10px] font-mono text-[#6e7681]">Solved total</p>
              </div>

              <div className="rounded-xl bg-[#1c2128] border border-[#30363d] p-5 space-y-1">
                <div className="flex items-center justify-between text-[#6e7681]">
                  <span className="text-xs font-bold uppercase tracking-wider">Win Rate</span>
                  <TrendingUp size={16} className="text-[#22c55e]" />
                </div>
                <p className="text-3xl font-extrabold font-mono text-[#e6edf3]">{winRate}%</p>
                <p className="text-[10px] font-mono text-[#6e7681]">{profile?.wins || 0}W - {profile?.losses || 0}L</p>
              </div>
            </div>

            <section className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#30363d] flex items-center justify-between text-xs font-bold text-[#6e7681]">
                <span className="flex items-center gap-2">
                  <Swords size={14} className="text-[#8b5cf6]" /> Match History
                </span>
                <span>Rating Δ</span>
              </div>

              <div className="divide-y divide-[#30363d]/60">
                {(recentActivity || []).map((item, i) => {
                  const isWin = item.rating?.startsWith("+")
                  return (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-[#21262d] transition-colors">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                          isWin ? "bg-[#22c55e]/12 text-[#22c55e] border border-[#22c55e]/25" : "bg-[#ef4444]/12 text-[#ef4444] border border-[#ef4444]/25"
                        }`}>
                          {isWin ? "WIN" : "LOSS"}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#e6edf3]">{item.action}</p>
                          <p className="text-[10px] font-mono text-[#6e7681]">{item.time}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold ${isWin ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                          {item.rating || "+0"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-[#8b949e]">
                <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold text-[#e6edf3]">
                  <BarChart2 size={15} className="text-[#8b5cf6]" /> Duel Performance Telemetry
                </span>
                <span className="text-[10px] font-mono text-[#22c55e] font-bold bg-[#22c55e]/12 px-2 py-0.5 rounded border border-[#22c55e]/25">
                  +142 ELO This Month
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
                <div className="h-20 flex items-end justify-between gap-2 px-2 border-b border-[#30363d] pb-2">
                  {MOCK_ACTIVITY_BARS.map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#21262d] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded text-[#e6edf3] border border-[#30363d] whitespace-nowrap pointer-events-none">
                        {bar.rating > 0 ? `+${bar.rating}` : bar.rating} ELO
                      </div>
                      <div className={`w-full max-w-[12px] rounded-t-sm transition-all ${bar.height} ${bar.color} group-hover:brightness-125`} />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[9px] font-mono text-[#6e7681] px-2">
                  <span>14 DAYS AGO</span>
                  <span>7 DAYS AGO</span>
                  <span>TODAY</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-5 space-y-4">
              <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold text-[#e6edf3]">
                <Code2 size={15} className="text-[#8b5cf6]" /> Language Breakdown
              </span>
              <div className="space-y-3">
                {(languageStats || []).map((lang) => (
                  <div key={lang.language} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#8b949e]">{lang.language}</span>
                      <span className="text-[10px] font-mono text-[#6e7681]">{lang.solved} problems ({lang.percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#30363d] overflow-hidden">
                      <div className="h-full rounded-full bg-[#8b5cf6]" style={{ width: `${lang.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="rounded-xl border border-[#30363d] bg-[#1c2128] p-5 space-y-4">
              <span className="flex items-center gap-2 uppercase tracking-wider text-[11px] font-bold text-[#e6edf3]">
                <Target size={15} className="text-[#8b5cf6]" /> Difficulty Breakdown
              </span>
              <div className="space-y-3">
                {(difficultyStats || []).map((diff) => {
                  const color = diff.difficulty === "Easy" ? "#22c55e" : diff.difficulty === "Medium" ? "#f59e0b" : "#ef4444"
                  return (
                    <div key={diff.difficulty} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold" style={{ color }}>{diff.difficulty}</span>
                        <span className="text-[10px] font-mono text-[#6e7681]">{diff.solved}/{diff.total} ({diff.percentage}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#30363d] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${diff.percentage}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
