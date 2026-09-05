import React, { useState } from "react"
import {
  UserPlus,
  Search,
  Swords,
  MessageCircle,
  Check,
  X,
  Clock,
  Star,
} from "lucide-react"
import { friends, friendRequests, suggestedFriends } from "../../data/friendsData"
import { statusBadge } from "../../utils/badges"

const FriendsPage = ({ onNavigate }) => {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("friends")
  const [friendsList, setFriendsList] = useState(friends)
  const [requestsList, setRequestsList] = useState(friendRequests)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAcceptRequest = (id) => {
    const request = requestsList.find((r) => r.id === id)
    setRequestsList((prev) => prev.filter((r) => r.id !== id))
    if (request) {
      setFriendsList((prev) => [
        ...prev,
        {
          ...request,
          status: "Online",
          lastSeen: "Now",
        },
      ])
      showToast(`Added ${request.username} as a friend`)
    }
  }

  const handleDeclineRequest = (id) => {
    setRequestsList((prev) => prev.filter((r) => r.id !== id))
    showToast("Request declined", "error")
  }

  const handleAddFriend = (suggested) => {
    setFriendsList((prev) => [
      ...prev,
      {
        ...suggested,
        status: "Online",
        lastSeen: "Now",
      },
    ])
    showToast(`Friend request sent to ${suggested.username}`)
  }

  const handleMessage = (username) => {
    showToast(`Opening chat with ${username}`)
  }

  const filteredFriends = friendsList.filter(
    (f) =>
      f.username.toLowerCase().includes(search.toLowerCase()) ||
      f.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-void text-text-secondary antialiased">
      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-6">
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border shadow-lg ${
              toast.type === "success"
                ? "bg-success/12 border-success/25 text-success"
                : "bg-danger/12 border-danger/25 text-danger"
            }`}
          >
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        )}

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Friends</h1>
            <p className="text-sm font-medium text-text-tertiary mt-1">Connect with fellow coders</p>
          </div>
          <button
            onClick={() => showToast("Add Friend modal coming soon")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent-muted transition-colors"
          >
            <UserPlus size={16} strokeWidth={2.5} />
            Add Friend
          </button>
        </header>

        <div className="flex gap-1 p-1 bg-surface rounded-lg border border-border">
          {[
            { id: "friends", label: "Friends", count: friendsList.length },
            { id: "requests", label: "Requests", count: requestsList.length },
            { id: "suggested", label: "Suggested" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-accent/12 text-accent border border-accent/25"
                  : "text-text-tertiary hover:text-text-primary hover:bg-elevated"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    activeTab === tab.id
                      ? "bg-accent/20 text-accent"
                      : "bg-border text-text-tertiary"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "friends" && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search friends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent/50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="rounded-xl bg-surface border border-border p-4 hover:border-text-tertiary/40 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-sm font-black text-text-primary shrink-0">
                        {friend.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface ${
                          friend.status === "Online"
                            ? "bg-success"
                            : friend.status === "In battle"
                            ? "bg-warning"
                            : "bg-text-tertiary"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-primary truncate">
                          {friend.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${statusBadge(
                            friend.status
                          )}`}
                        >
                          {friend.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-tertiary truncate">
                        @{friend.username}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-text-tertiary">
                        <span className="flex items-center gap-1">
                          <Star size={10} className="text-warning" />
                          <span className="font-mono">{friend.rating}</span>
                        </span>
                        <span>Rank <span className="font-mono">#{friend.rank}</span></span>
                        <span>{friend.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3.5">
                    <button
                      onClick={() => onNavigate && onNavigate("duel")}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent/12 text-accent text-xs font-bold border border-accent/25 hover:bg-accent/20 transition-colors"
                    >
                      <Swords size={13} strokeWidth={2.2} />
                      Challenge
                    </button>
                    <button
                      onClick={() => handleMessage(friend.username)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-elevated text-text-secondary text-xs font-bold border border-border hover:bg-border hover:text-text-primary transition-colors"
                    >
                      <MessageCircle size={13} strokeWidth={2.2} />
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFriends.length === 0 && (
              <div className="text-center py-12 text-text-tertiary text-sm">
                No friends found matching "{search}"
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-3">
            {requestsList.map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-text-tertiary/40 transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-sm font-black text-text-primary shrink-0">
                  {request.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{request.name}</span>
                    <span className="text-xs text-text-tertiary">@{request.username}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-text-tertiary">
                    <span className="flex items-center gap-1">
                      <Star size={10} className="text-warning" />
                      <span className="font-mono">{request.rating}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {request.sentTime}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-success/12 text-success text-xs font-bold border border-success/25 hover:bg-success/20 transition-colors"
                  >
                    <Check size={14} strokeWidth={2.5} />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineRequest(request.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-danger/12 text-danger text-xs font-bold border border-danger/25 hover:bg-danger/20 transition-colors"
                  >
                    <X size={14} strokeWidth={2.5} />
                    Decline
                  </button>
                </div>
              </div>
            ))}

            {requestsList.length === 0 && (
              <div className="text-center py-12 text-text-tertiary text-sm">
                No pending friend requests
              </div>
            )}
          </div>
        )}

        {activeTab === "suggested" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {suggestedFriends.map((suggested) => (
              <div
                key={suggested.id}
                className="rounded-xl bg-surface border border-border p-4 hover:border-text-tertiary/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-sm font-black text-text-primary shrink-0">
                    {suggested.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-text-primary block truncate">
                      {suggested.name}
                    </span>
                    <p className="text-xs text-text-tertiary truncate">
                      @{suggested.username}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-text-tertiary">
                      <span className="flex items-center gap-1">
                        <Star size={10} className="text-warning" />
                        <span className="font-mono">{suggested.rating}</span>
                      </span>
                      <span>{suggested.mutualFriends} mutual</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(suggested)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 mt-3.5 rounded-lg bg-accent/12 text-accent text-xs font-bold border border-accent/25 hover:bg-accent/20 transition-colors"
                >
                  <UserPlus size={13} strokeWidth={2.2} />
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FriendsPage
