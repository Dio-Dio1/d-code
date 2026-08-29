import React, { useState } from "react"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Code2,
  Save,
  Check,
  ChevronRight,
  Globe,
  Mail,
  Link,
  AtSign,
  Trophy,
} from "lucide-react"

import { settings } from "../../data/settingsData"
import Toggle from "../ui/Toggle"

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("account")
  const [saved, setSaved] = useState(false)
  const [prefs, setPrefs] = useState(settings.preferences)
  const [notifs, setNotifs] = useState(settings.notifications)
  const [privacy, setPrivacy] = useState(settings.privacy)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const sections = [
    { id: "account", label: "Account", icon: User },
    { id: "preferences", label: "Editor", icon: Code2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ]

  return (
    <div className="min-h-screen bg-[#0d1117] font-sans text-[#8b949e] antialiased">
      <div className="mx-auto max-w-[1120px] px-8 py-6 space-y-5">

        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#30363d]">
          <div>
            <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight flex items-center gap-2">
              <Settings size={22} className="text-[#6e7681]" /> Settings
            </h1>
            <p className="text-sm font-medium text-[#6e7681] mt-1">Manage your account and preferences</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all ${
              saved
                ? "bg-[#22c55e]/12 text-[#22c55e] border border-[#22c55e]/25"
                : "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white"
            }`}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          <nav className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${
                    activeSection === sec.id
                      ? "bg-[#8b5cf6]/12 text-[#8b5cf6] border border-[#8b5cf6]/25"
                      : "text-[#6e7681] hover:bg-[#21262d] hover:text-[#e6edf3] border border-transparent"
                  }`}
                >
                  <Icon size={17} className={activeSection === sec.id ? "text-[#8b5cf6]" : "text-[#6e7681]"} strokeWidth={2} />
                  <span>{sec.label}</span>
                  <ChevronRight size={14} className="ml-auto text-[#484f58]" />
                </button>
              )
            })}
          </nav>

          <div className="rounded-xl border border-[#30363d] bg-[#1c2128] overflow-hidden">

            {activeSection === "account" && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Username</label>
                      <input type="text" defaultValue={settings.account.username} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Email</label>
                      <input type="email" defaultValue={settings.account.email} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Display Name</label>
                      <input type="text" defaultValue={settings.account.name} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Location</label>
                      <input type="text" defaultValue={settings.account.location} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Bio</label>
                      <textarea defaultValue={settings.account.bio} rows={3} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all resize-none" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#30363d] pt-6">
                  <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider flex items-center gap-1.5"><Link size={12} /> GitHub</label>
                      <input type="text" defaultValue={settings.account.github} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider flex items-center gap-1.5"><Globe size={12} /> Website</label>
                      <input type="text" defaultValue={settings.account.website} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider flex items-center gap-1.5"><AtSign size={12} /> Twitter</label>
                      <input type="text" defaultValue={settings.account.twitter} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] placeholder:text-[#6e7681] focus:outline-none focus:border-[#8b5cf6] transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "preferences" && (
              <div className="p-6 space-y-6">
                <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Editor Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Default Language</label>
                    <select value={prefs.language} onChange={(e) => setPrefs({ ...prefs, language: e.target.value })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      {settings.languages.map((l) => (<option key={l} value={l}>{l}</option>))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Font Size</label>
                    <select value={prefs.fontSize} onChange={(e) => setPrefs({ ...prefs, fontSize: e.target.value })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      {settings.fontSizes.map((s) => (<option key={s} value={s}>{s}</option>))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Tab Size</label>
                    <select value={prefs.tabSize} onChange={(e) => setPrefs({ ...prefs, tabSize: Number(e.target.value) })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={8}>8 spaces</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Keybindings</label>
                    <select value={prefs.keybindings} onChange={(e) => setPrefs({ ...prefs, keybindings: e.target.value })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      {settings.keybindings.map((k) => (<option key={k.id} value={k.id}>{k.label} — {k.description}</option>))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#30363d] pt-5 space-y-4">
                  {[
                    { key: "lineNumbers", label: "Line Numbers", desc: "Show line numbers in the editor" },
                    { key: "wordWrap", label: "Word Wrap", desc: "Wrap long lines in the editor" },
                    { key: "autoSave", label: "Auto Save", desc: "Automatically save your code" },
                    { key: "minimap", label: "Minimap", desc: "Show minimap in the editor" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-[#e6edf3]">{item.label}</p>
                        <p className="text-xs text-[#6e7681]">{item.desc}</p>
                      </div>
                      <Toggle checked={prefs[item.key]} onChange={(v) => setPrefs({ ...prefs, [item.key]: v })} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="p-6 space-y-6">
                <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive notifications via email", icon: Mail },
                    { key: "push", label: "Push Notifications", desc: "Receive browser push notifications", icon: Bell },
                    { key: "duelRequests", label: "Duel Requests", desc: "When someone challenges you to a duel", icon: Shield },
                    { key: "friendRequests", label: "Friend Requests", desc: "When someone sends you a friend request", icon: User },
                    { key: "achievements", label: "Achievements", desc: "When you earn a new achievement", icon: Trophy },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Get a weekly summary of your activity", icon: Globe },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.key} className="flex items-center justify-between p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#21262d] text-[#6e7681]">
                            <Icon size={16} strokeWidth={2} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#e6edf3]">{item.label}</p>
                            <p className="text-xs text-[#6e7681]">{item.desc}</p>
                          </div>
                        </div>
                        <Toggle checked={notifs[item.key]} onChange={(v) => setNotifs({ ...notifs, [item.key]: v })} />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="p-6 space-y-6">
                <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Profile Visibility</label>
                    <select value={privacy.profileVisibility} onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#6e7681] uppercase tracking-wider">Allow Challenges From</label>
                    <select value={privacy.allowChallenges} onChange={(e) => setPrivacy({ ...privacy, allowChallenges: e.target.value })} className="w-full px-4 py-2.5 text-sm font-medium bg-[#0d1117] border border-[#30363d] rounded-lg text-[#e6edf3] focus:outline-none focus:border-[#8b5cf6] transition-all">
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends Only</option>
                      <option value="nobody">Nobody</option>
                    </select>
                  </div>

                  <div className="border-t border-[#30363d] pt-4 space-y-4">
                    {[
                      { key: "showOnlineStatus", label: "Show Online Status", desc: "Let others see when you're online" },
                      { key: "showRating", label: "Show Rating", desc: "Display your rating on your profile" },
                      { key: "showActivity", label: "Show Activity", desc: "Let others see your recent activity" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-[#e6edf3]">{item.label}</p>
                          <p className="text-xs text-[#6e7681]">{item.desc}</p>
                        </div>
                        <Toggle checked={privacy[item.key]} onChange={(v) => setPrivacy({ ...privacy, [item.key]: v })} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="p-6 space-y-6">
                <h3 className="text-sm font-bold text-[#e6edf3] uppercase tracking-wider mb-4">Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {settings.themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setPrefs({ ...prefs, theme: theme.id })}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        prefs.theme === theme.id
                          ? "border-[#8b5cf6]/50 bg-[#8b5cf6]/12"
                          : "border-[#30363d] bg-[#0d1117] hover:border-[#484f58]"
                      }`}
                    >
                      <div className={`w-full h-8 rounded-md mb-3 ${
                        theme.id === "dark" ? "bg-[#1c2128]"
                        : theme.id === "midnight" ? "bg-[#0a1628]"
                        : theme.id === "light" ? "bg-gray-100"
                        : "bg-[#272822]"
                      }`} />
                      <p className="text-sm font-bold text-[#e6edf3]">{theme.label}</p>
                      <p className="text-[10px] text-[#6e7681] mt-0.5">{theme.description}</p>
                      {prefs.theme === theme.id && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#8b5cf6] mt-2">
                          <Check size={10} /> Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
