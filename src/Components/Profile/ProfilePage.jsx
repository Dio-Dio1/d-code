import React from "react"
import { Trophy, Target, TrendingUp } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const ProfilePage = () => {
  const { user } = useAuth()
  const totalGames = (user?.wins || 0) + (user?.losses || 0)
  const winRate = totalGames > 0 ? Math.round((user.wins / totalGames) * 100) : 0
  const avatarInitials = user?.username ? user.username.slice(0, 2).toUpperCase() : "U"

  return (
    <div className="min-h-screen bg-void font-sans text-text-secondary antialiased p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        <div className="rounded-xl bg-surface border border-border p-6 flex items-center gap-6">
          <div className="h-24 w-24 rounded-xl bg-elevated border border-border flex items-center justify-center text-3xl font-black text-text-tertiary font-mono shrink-0">
            {avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-text-primary">{user?.name || "Coder"}</h1>
            <p className="text-sm font-mono text-text-tertiary">@{user?.username || "user"}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-text-tertiary">
              <span>Joined {user?.joined || "2026"}</span>
              <span>Rank #{user?.rank || "---"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-surface border border-border p-5 space-y-1">
            <div className="flex items-center justify-between text-text-tertiary">
              <span className="text-xs font-bold uppercase tracking-wider">Rating</span>
              <Trophy size={16} className="text-warning" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-text-primary">{user?.rating || 1000}</p>
          </div>
          <div className="rounded-xl bg-surface border border-border p-5 space-y-1">
            <div className="flex items-center justify-between text-text-tertiary">
              <span className="text-xs font-bold uppercase tracking-wider">Solved</span>
              <Target size={16} className="text-info" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-text-primary">{user?.solved || 0}</p>
          </div>
          <div className="rounded-xl bg-surface border border-border p-5 space-y-1">
            <div className="flex items-center justify-between text-text-tertiary">
              <span className="text-xs font-bold uppercase tracking-wider">Win Rate</span>
              <TrendingUp size={16} className="text-success" />
            </div>
            <p className="text-3xl font-extrabold font-mono text-text-primary">{winRate}%</p>
            <p className="text-[10px] font-mono text-text-tertiary">{user?.wins || 0}W - {user?.losses || 0}L</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
          <span className="uppercase tracking-wider text-[11px] font-bold text-text-primary">
            Languages
          </span>
          <div className="flex flex-wrap gap-2">
            {(user?.languages || ["JavaScript"]).map((lang) => (
              <span key={lang} className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-elevated text-text-primary border border-border">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 space-y-3">
          <span className="uppercase tracking-wider text-[11px] font-bold text-text-primary">
            Stats
          </span>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-void border border-border">
              <span className="text-text-tertiary">Total Duels</span>
              <span className="text-text-primary font-mono font-bold">{totalGames}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-void border border-border">
              <span className="text-text-tertiary">Global Rank</span>
              <span className="text-text-primary font-mono font-bold">#{user?.rank || "---"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
