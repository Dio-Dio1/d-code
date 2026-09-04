import React from "react"
import {
  Home,
  Swords,
  Code2,
  User,
  Users,
  Trophy,
  Clock,
  Brain,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
} from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

const navItems = [
  { icon: Home, text: "Home", navigateTo: "dashboard" },
  { icon: Code2, text: "Problems", navigateTo: "problems" },
  { icon: Swords, text: "Duel", navigateTo: "duel" },
  { icon: Trophy, text: "Leaderboard", navigateTo: "leaderboard" },
  { icon: Users, text: "Friends", navigateTo: "friends" },
  { icon: Brain, text: "Puzzles", navigateTo: "puzzles" },
  { icon: Clock, text: "History", navigateTo: "history" },
  { icon: User, text: "Profile", navigateTo: "profile" },
  { icon: Settings, text: "Settings", navigateTo: "settings" },
]

const Sidebar = ({ collapsed, onToggle, onNavigate, currentPage, onLogout, loggedIn }) => {
  const { user } = useAuth()
  const w = collapsed ? "w-[64px]" : "w-[220px]"

  return (
    <aside
      className={`${w} flex h-screen sticky top-0 flex-col border-r border-border bg-surface transition-all duration-200 select-none shrink-0`}
    >
      <div className={`flex items-center border-b border-border ${collapsed ? "justify-center px-2 py-4" : "gap-3 px-4 py-4"}`}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent shrink-0">
          <span className="text-xs font-black font-mono text-white leading-none">&gt;_</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-text-primary font-sans">D:CODE</span>
            <span className="text-[10px] font-sans text-text-tertiary uppercase tracking-widest font-semibold">Arena Platform</span>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col justify-between py-3 px-2 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.navigateTo
            return (
              <button
                key={item.text}
                title={collapsed ? item.text : undefined}
                onClick={() => onNavigate && onNavigate(item.navigateTo)}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-accent/12 text-accent border border-accent/25"
                    : "text-text-tertiary hover:bg-elevated hover:text-text-primary border border-transparent"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={17} className={isActive ? "text-accent" : "text-text-tertiary"} strokeWidth={isActive ? 2.5 : 2} />
                {!collapsed && <span className="flex-1 text-left truncate">{item.text}</span>}
              </button>
            )
          })}
        </div>

        <div className="space-y-1 pt-2">
          <div className="my-2 mx-2 border-t border-border" />

          <div className={`flex items-center rounded-lg bg-base border border-border p-2 ${collapsed ? "justify-center" : "gap-2.5"}`}>
            <div className="relative shrink-0">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold font-mono ${loggedIn ? "bg-accent/12 text-accent border border-accent/25" : "bg-elevated text-text-tertiary border border-border"}`}>
                {loggedIn ? (user?.avatar || user?.username?.slice(0, 2).toUpperCase() || "U") : "?"}
              </div>
              {loggedIn && <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-success border-2 border-surface" />}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-text-primary truncate leading-tight">{loggedIn ? (user?.username || "user") : "Guest"}</p>
                <p className="text-[10px] text-text-tertiary font-sans leading-tight mt-0.5">
                  {loggedIn ? <><span className="text-success font-semibold">{user?.rating || 1000}</span> · #{user?.rank || "---"}</> : "Not signed in"}
                </p>
              </div>
            )}
          </div>

          {loggedIn && (
            <button
              onClick={onLogout}
              title={collapsed ? "Sign Out" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold text-text-tertiary hover:bg-danger/12 hover:text-danger border border-transparent hover:border-danger/25 transition-all ${collapsed ? "justify-center" : ""}`}
            >
              <LogOut size={17} strokeWidth={2} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          )}

          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-text-tertiary hover:bg-elevated hover:text-text-primary transition-colors mt-2 border border-border/50"
          >
            {collapsed ? <ChevronsRight size={16} strokeWidth={2} /> : <ChevronsLeft size={16} strokeWidth={2} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
