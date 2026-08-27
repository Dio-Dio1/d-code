// Sidebar.jsx
import React from 'react'
import {
  LayoutDashboard,
  Swords,
  PlaySquare,
  Users,
  User,
  Settings,
  Trophy,
  Terminal,
  Activity,
  ShieldAlert
} from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800/60 bg-zinc-950 text-zinc-300 font-sans select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-zinc-900 px-6 py-5 bg-zinc-950/80 backdrop-blur-md">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-md shadow-violet-500/10">
          <Terminal size={18} className="text-white" strokeWidth={2.5} />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm font-extrabold tracking-tight text-white">
              D:CODE
            </h1>
            <span className="bg-violet-500/10 border border-violet-500/30 text-[9px] px-1.5 py-0.5 rounded font-mono text-violet-400 font-medium">
              v2.4
            </span>
          </div>
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">
            runtime arena
          </p>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex flex-1 flex-col justify-between p-4 space-y-6">
        <div className="space-y-6">
          {/* Section: Operate */}
          <div>
            <div className="mb-2 px-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>OPERATE</span>
              <Activity size={12} className="text-zinc-600" />
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-sm shadow-black/25">
                <LayoutDashboard size={16} className="text-violet-400" />
                <span>Overview</span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
                <Swords size={16} className="text-zinc-400 group-hover:text-zinc-300" />
                <span>Duel</span>
                <span className="ml-auto text-[9px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded-full font-bold tracking-wider">LIVE</span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
                <PlaySquare size={16} className="text-zinc-400" />
                <span>Spectate</span>
              </button>
            </div>
          </div>

          {/* Section: Network */}
          <div>
            <div className="mb-2 px-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <span>NETWORK</span>
              <ShieldAlert size={12} className="text-zinc-600" />
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
                <Users size={16} className="text-zinc-400" />
                <span>Players</span>
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
                <Trophy size={16} className="text-zinc-400" />
                <span>Leaderboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-zinc-900 pt-4 space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
            <User size={16} className="text-zinc-400" />
            <span>Profile</span>
          </button>

          <button className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3.5 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-900/40 hover:text-zinc-200">
            <Settings size={16} className="text-zinc-400" />
            <span>Settings</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar