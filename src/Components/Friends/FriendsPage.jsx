import React, { useState, useMemo, useCallback } from "react"
import {
  Users,
  Search,
  UserPlus,
  Swords,
  MessageCircle,
  Trophy,
  Flame,
  Zap,
  Clock,
  Check,
  X,
} from "lucide-react"

import { friends as initialFriends, friendRequests as initialRequests, suggestedFriends as initialSuggested } from "../../data/friendsData"

const TABS = [
  { key: "friends", label: "Friends" },
  { key: "requests", label: "Requests" },
  { key: "suggested", label: "Suggested" },
]

const statusColor = (status) => {
  if (status === "Online") return "bg-[#22c55e]"
  if (status === "In battle") return "bg-[#f59e0b]"
  if (status === "Away") return "bg-[#6e7681]"
  return "bg-[#484f58]"
}

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border text-xs font-bold text-[#e6edf3] shadow-lg transition-all animate-in slide-in-from-top-2 ${
    type === "success" ? "bg-[#22c55e]/12 border-[#22c55e]/25 text-[#22c55e]" : "bg-[#3b82f6]/12 border-[#3b82f6]/25 text-[#3b82f6]"
  }`}>
    {message}
    <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={12} /></button>
  </div>
)

const FriendsPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("friends")
  const [search, setSearch] = useState("")
  const [requests, setRequests] = useState(initialRequests)
  const [suggested, setSuggested] = useState(initialSuggested)
  const [friendsList, setFriendsList] = useState(initialFriends)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const filteredFriends = useMemo(() => {
    if (!search.trim()) return friendsList
    const q = search.toLowerCase()
    return friendsList.filter(
      (f) => f.username.toLowerCase().includes(q) || f.name.toLowerCase().includes(q)
    )
  }, [search, friendsList])

  const handleAcceptRequest = (req) => {
    setRequests((prev) => prev.filter((r) => r.username !== req.username))
    setFriendsList((prev) => [...prev, { ...req, status: "Online", lastSeen: "Just now", wins: 0, losses: 0, solved: 0, streak: 0 }])
    showToast(`Accepted ${req.name}'s friend request`)
  }

  const handleDeclineRequest = (req) => {
    setRequests((prev) => prev.filter((r) => r.username !== req.username))
    showToast(`Declined ${req.name}'s request`, "info")
  }

  const handleAddFriend = (sug) => {
    setSuggested((prev) => prev.filter((s) => s.username !== sug.username))
    showToast(`Friend request sent to ${sug.name}`)
  }

  const handleChallenge = (friend) => {
    if (onNavigate) {
      onNavigate("duel")
    } else {
      showToast(`Challenging ${friend.name} to a duel...`)
    }
  }

  const handleMessage = (friend) => {
    showToast(`Opening chat with ${friend.name}...`, "info")
  }

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-5">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <Users size={22} className="text-[#8b5cf6]" /> Friends
            </h1>
            <p className="text-sm font-medium text-[#6e7681] mt-1">Connect and challenge your coding companions</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-[#e6edf3] bg-[#8b5cf6] hover:bg-[#7c3aed] px-4 py-2 rounded-lg transition-colors">
            <UserPlus size={14} />
            Add Friend
          </button>
        </header>

        <section className="grid grid-cols-3 gap-3.5">
          <div className="rounded-xl bg-[#1c2128] border border-[#22c55e]/25 p-4 flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22c55e]/12">
              <Users size={20} className="text-[#22c55e]" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold font-mono text-[#e6edf3] leading-tight">{friendsList.length}</p>
              <p className="text-[11px] font-bold text-[#6e7681] uppercase tracking-wider mt-0.5">Total Friends</p>
            </div>
          </div>
          <div className="rounded-xl bg-[#1c2128] border border-[#3b82f6]/25 p-4 flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]/12">
              <Zap size={20} className="text-[#3b82f6]" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold font-mono text-[#e6edf3] leading-tight">
                {friendsList.filter((f) => f.status === "Online").length}
              </p>
              <p className="text-[11px] font-bold text-[#6e7681] uppercase tracking-wider mt-0.5">Online Now</p>
            </div>
          </div>
          <div className="rounded-xl bg-[#1c2128] border border-[#f59e0b]/25 p-4 flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f59e0b]/12">
              <Trophy size={20} className="text-[#f59e0b]" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold font-mono text-[#e6edf3] leading-tight">
                {requests.length}
              </p>
              <p className="text-[11px] font-bold text-[#6e7681] uppercase tracking-wider mt-0.5">Pending Requests</p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 border-b border-[#30363d] sm:border-b-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2.5 text-xs font-bold transition-colors ${
                  activeTab === tab.key ? "text-[#8b5cf6]" : "text-[#6e7681] hover:text-[#8b949e]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  <span className={`text-[10px] font-mono ${activeTab === tab.key ? "text-[#8b5cf6]/70" : "text-[#484f58]"}`}>
                    {tab.key === "friends" ? friendsList.length : tab.key === "requests" ? requests.length : suggested.length}
                  </span>
                </span>
                {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b5cf6] rounded-t-full hidden sm:block" />}
              </button>
            ))}
          </div>
          <div className="flex-1 relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6e7681]" />
            <input
              type="text"
              placeholder="Search friends..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-[#1c2128] border border-[#30363d] rounded-lg text-[#8b949e] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all"
            />
          </div>
        </div>

        {activeTab === "friends" && (
          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
            {filteredFriends.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#21262d] border border-[#30363d]">
                    <Search size={20} className="text-[#484f58]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#6e7681]">No friends found</p>
                <p className="text-xs text-[#484f58] mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]/60">
                {filteredFriends.map((friend) => (
                  <div key={friend.username} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#21262d] transition-colors group">
                    <div className="relative shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25 text-xs font-bold font-mono">
                        {friend.username.slice(0, 2).toUpperCase()}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#1c2128] ${statusColor(friend.status)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#e6edf3] group-hover:text-[#8b5cf6] transition-colors truncate">{friend.name}</span>
                        <span className="text-[10px] font-mono text-[#6e7681] truncate">@{friend.username}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-[#6e7681] font-medium">
                        <span className="flex items-center gap-1"><Trophy size={10} className="text-[#f59e0b]" /><span className="font-mono text-[#8b949e]">{friend.rating}</span></span>
                        <span className="text-[#484f58]">·</span>
                        <span className="font-mono"><span className="text-[#22c55e]">{friend.wins}</span><span className="text-[#6e7681] mx-0.5">-</span><span className="text-[#ef4444]">{friend.losses}</span></span>
                        <span className="text-[#484f58]">·</span>
                        <span className="flex items-center gap-1"><Zap size={10} className="text-[#3b82f6]" /><span className="font-mono text-[#8b949e]">{friend.solved}</span> solved</span>
                        {friend.streak > 0 && (<><span className="text-[#484f58]">·</span><span className="flex items-center gap-0.5"><Flame size={10} className="text-[#ef4444]" /><span className="font-mono text-[#ef4444]">{friend.streak}</span></span></>)}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold ${friend.status === "Online" ? "text-[#22c55e]" : friend.status === "In battle" ? "text-[#f59e0b]" : "text-[#6e7681]"}`}>{friend.status}</span>
                      <p className="text-[9px] text-[#484f58] mt-0.5">{friend.lastSeen}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleChallenge(friend)} title="Challenge to duel" className="p-2 rounded-lg bg-[#22c55e]/12 text-[#22c55e] hover:bg-[#22c55e]/20 border border-[#22c55e]/25 transition-colors">
                        <Swords size={14} />
                      </button>
                      <button onClick={() => handleMessage(friend)} title="Message" className="p-2 rounded-lg bg-[#21262d] text-[#6e7681] hover:bg-[#30363d] hover:text-[#8b949e] border border-[#30363d] transition-colors">
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
            {requests.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#21262d] border border-[#30363d]">
                    <UserPlus size={20} className="text-[#484f58]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#6e7681]">No pending requests</p>
                <p className="text-xs text-[#484f58] mt-1">When someone adds you, they'll appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]/60">
                {requests.map((req) => (
                  <div key={req.username} className="flex items-center gap-4 px-5 py-4 hover:bg-[#21262d] transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25 text-xs font-bold font-mono">
                      {req.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#e6edf3] truncate">{req.name}</span>
                        <span className="text-[10px] font-mono text-[#6e7681]">@{req.username}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#6e7681]">
                        <span className="font-mono">{req.rating} rating</span>
                        <span className="text-[#484f58]">·</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{req.sentAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleAcceptRequest(req)} className="p-2 rounded-lg bg-[#22c55e]/12 text-[#22c55e] hover:bg-[#22c55e]/20 border border-[#22c55e]/25 transition-colors">
                        <Check size={16} />
                      </button>
                      <button onClick={() => handleDeclineRequest(req)} className="p-2 rounded-lg bg-[#ef4444]/12 text-[#ef4444] hover:bg-[#ef4444]/20 border border-[#ef4444]/25 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "suggested" && (
          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">
            {suggested.length === 0 ? (
              <div className="px-5 py-16 text-center">
                <div className="flex justify-center mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#21262d] border border-[#30363d]">
                    <Users size={20} className="text-[#484f58]" />
                  </div>
                </div>
                <p className="text-sm font-bold text-[#6e7681]">No suggestions available</p>
                <p className="text-xs text-[#484f58] mt-1">Check back later for new suggestions</p>
              </div>
            ) : (
              <div className="divide-y divide-[#30363d]/60">
                {suggested.map((sug) => (
                  <div key={sug.username} className="flex items-center gap-4 px-5 py-4 hover:bg-[#21262d] transition-colors group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25 text-xs font-bold font-mono">
                      {sug.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#e6edf3] truncate">{sug.name}</span>
                        <span className="text-[10px] font-mono text-[#6e7681]">@{sug.username}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-[#6e7681]">
                        <span className="flex items-center gap-1"><Trophy size={10} className="text-[#f59e0b]" /><span className="font-mono text-[#8b949e]">{sug.rating}</span></span>
                        <span className="text-[#484f58]">·</span>
                        <span className="flex items-center gap-1"><Zap size={10} className="text-[#3b82f6]" /><span className="font-mono text-[#8b949e]">{sug.solved}</span> solved</span>
                        <span className="text-[#484f58]">·</span>
                        <span>{sug.mutualFriends} mutual friends</span>
                      </div>
                    </div>
                    <button onClick={() => handleAddFriend(sug)} className="flex items-center gap-1.5 text-xs font-bold text-[#8b5cf6] bg-[#8b5cf6]/12 hover:bg-[#8b5cf6]/20 border border-[#8b5cf6]/25 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                      <UserPlus size={13} />
                      Add
                    </button>
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

export default FriendsPage
