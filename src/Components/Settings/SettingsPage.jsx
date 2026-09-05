import React, { useState } from "react"
import {
  Settings,
  Trash2,
  Save,
  Check,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { settings } from "../../data/settingsData"

const SectionHeader = ({ label, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between py-4 px-1 text-left"
  >
    <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
      {label}
    </span>
    {isOpen ? <ChevronDown size={14} className="text-text-tertiary" /> : <ChevronRight size={14} className="text-text-tertiary" />}
  </button>
)

const SettingsPage = ({ onNavigate: _onNavigate }) => {
  const [form, setForm] = useState({
    ...settings.account,
    ...settings.editor,
  })
  const [notifications, setNotifications] = useState(settings.notifications)
  const [privacy, setPrivacy] = useState(settings.privacy)
  const [collapsedSections, setCollapsedSections] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const themes = [
    { id: "dark", label: "Dark", colors: ["#0d1117", "#1c2128", "#30363d", "#8b5cf6"] },
    { id: "midnight", label: "Midnight", colors: ["#0f0f1a", "#1a1a2e", "#2d2d44", "#6366f1"] },
    { id: "terminal", label: "Terminal", colors: ["#0a0a0a", "#111111", "#1f1f1f", "#22c55e"] },
    { id: "ocean", label: "Ocean", colors: ["#0c1929", "#162d4a", "#1e3a5f", "#3b82f6"] },
    { id: "sunset", label: "Sunset", colors: ["#1a0f0f", "#2d1a1a", "#442d2d", "#f97316"] },
  ]

  const inputClass = "w-full px-3 py-2 text-xs bg-void border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent"

  return (
    <div className="min-h-screen bg-void font-sans text-text-secondary antialiased p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        <div className="rounded-xl bg-surface border border-border p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-elevated border border-border flex items-center justify-center">
            <Settings size={20} className="text-text-tertiary" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary">Settings</h1>
            <p className="text-xs text-text-tertiary">Manage your account preferences</p>
          </div>
        </div>

        <div className="rounded-xl bg-surface border border-border p-6 space-y-2">
          <SectionHeader label="Account" isOpen={!collapsedSections.account} onClick={() => toggleSection("account")} />
          {!collapsedSections.account && (
            <div className="grid gap-4 pt-4 pb-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Username</label>
                <input
                  type="text"
                  value={form.username}
                  disabled
                  className={`${inputClass} opacity-50 cursor-not-allowed`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className={`${inputClass} min-h-[80px] resize-y`}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">GitHub</label>
                  <input
                    type="text"
                    value={form.github}
                    onChange={(e) => setForm({ ...form, github: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Twitter</label>
                  <input
                    type="text"
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Website</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-border p-6 space-y-2">
          <SectionHeader label="Editor Preferences" isOpen={!collapsedSections.editor} onClick={() => toggleSection("editor")} />
          {!collapsedSections.editor && (
            <div className="grid gap-4 pt-4 pb-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Language</label>
                <select
                  value={form.language}
                  onChange={(e) => setForm({ ...form, language: e.target.value })}
                  className={inputClass}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Font Size ({form.fontSize}px)</label>
                <input
                  type="range"
                  min="12"
                  max="18"
                  value={form.fontSize}
                  onChange={(e) => setForm({ ...form, fontSize: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-[10px] font-mono text-text-tertiary mt-1">
                  <span>12</span><span>18</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Tab Size</label>
                <div className="flex gap-2">
                  {[2, 4].map((size) => (
                    <button
                      key={size}
                      onClick={() => setForm({ ...form, tabSize: size })}
                      className={`flex-1 px-3 py-2 text-xs font-mono rounded-lg border transition-colors ${
                        form.tabSize === size
                          ? "bg-accent/10 border-accent/25 text-accent"
                          : "bg-void border-border text-text-tertiary hover:border-border"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-1.5">Line Height</label>
                <input
                  type="number"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={form.lineHeight}
                  onChange={(e) => setForm({ ...form, lineHeight: Number(e.target.value) })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-text-tertiary mb-2">Theme</label>
                <div className="grid grid-cols-5 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setForm({ ...form, theme: t.id })}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors ${
                        form.theme === t.id
                          ? "bg-accent/10 border-accent/25"
                          : "bg-void border-border hover:border-border"
                      }`}
                    >
                      <div className="flex gap-1">
                        {t.colors.map((c, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full border border-border"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-text-tertiary">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-border p-6 space-y-2">
          <SectionHeader label="Notifications" isOpen={!collapsedSections.notifications} onClick={() => toggleSection("notifications")} />
          {!collapsedSections.notifications && (
            <div className="grid gap-3 pt-4 pb-2">
              {Object.entries(notifications).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-void border border-border">
                  <span className="text-xs text-text-primary">{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      val ? "bg-accent" : "bg-border"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-text-primary transition-transform ${
                      val ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-border p-6 space-y-2">
          <SectionHeader label="Privacy" isOpen={!collapsedSections.privacy} onClick={() => toggleSection("privacy")} />
          {!collapsedSections.privacy && (
            <div className="grid gap-3 pt-4 pb-2">
              {Object.entries(privacy).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-void border border-border">
                  <span className="text-xs text-text-primary">{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
                  <button
                    onClick={() => setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      val ? "bg-accent" : "bg-border"
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-text-primary transition-transform ${
                      val ? "translate-x-5" : "translate-x-0.5"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-danger/20 p-6 space-y-2">
          <SectionHeader label="Danger Zone" isOpen={!collapsedSections.danger} onClick={() => toggleSection("danger")} />
          {!collapsedSections.danger && (
            <div className="pt-4 pb-2">
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-danger/40 text-danger hover:bg-danger/10 transition-colors"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
            saved
              ? "bg-success/10 border border-success/25 text-success"
              : "bg-accent text-white hover:bg-accent-muted"
          }`}
        >
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl bg-surface border border-border p-6 w-full max-w-sm space-y-4">
            <h3 className="text-sm font-bold text-danger">Delete Account</h3>
            <p className="text-xs text-text-tertiary">This action cannot be undone. All your data will be permanently deleted.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg border border-border text-text-tertiary hover:text-text-secondary transition-colors"
              >
                <X size={12} /> Cancel
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg bg-danger/10 border border-danger/25 text-danger hover:bg-danger/20 transition-colors"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
