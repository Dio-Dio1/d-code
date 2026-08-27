import React from 'react'
import {
  LayoutDashboard,
  Swords,
  PlaySquare,
  Users,
  User,
  Settings,
  Trophy,
} from 'lucide-react'
const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950 px-5 py-6 text-white">
      <div className="flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-500 text-sm font-black font-mono text-black shadow-lg shadow-yellow-500/10">
          {"</>"}
        </span>

        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            D:Code
          </h1>

          <p className="text-[9px] font-medium tracking-[0.18em] text-neutral-500">
            COMPETITIVE RUNTIME
          </p>
        </div>
      </div>

 
      <div className="my-7 h-px bg-neutral-800" />

 
      <nav className="flex flex-1 flex-col">


        <div>
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            Workspace
          </p>

          <div className="space-y-1">

            <button className="flex w-full items-center gap-3 rounded-lg bg-yellow-500/10 px-3 py-2.5 text-sm font-medium text-yellow-400">
              <span className="flex h-5 w-5 items-center justify-center">
                <LayoutDashboard size={18} />
              </span>

              <span>Overview</span>
            </button>


            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center">
                <Swords size={18} />
              </span>

              <span>Duel</span>
            </button>


            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center">
                <PlaySquare size={18} />
              </span>

              <span>Watch</span>
            </button>

          </div>
        </div>


        <div className="mt-7">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
            Community
          </p>

          <div className="space-y-1">


            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center">
                <Users size={18} />
              </span>

              <span>Players</span>
            </button>


            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center">
                <Trophy size={18} />
              </span>

              <span>Leaderboard</span>
            </button>

          </div>
        </div>


        <div className="mt-auto border-t border-neutral-800 pt-5">

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
            <span className="flex h-5 w-5 items-center justify-center">
              <User size={18} />
            </span>

            <span>Profile</span>
          </button>


          <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white">
            <span className="flex h-5 w-5 items-center justify-center">
              <Settings size={18} />
            </span>

            <span>Settings</span>
          </button>

        </div>

      </nav>

    </aside>
  )
}

export default Sidebar
