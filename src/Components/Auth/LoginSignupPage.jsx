import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Code2,
} from "lucide-react"

const LoginSignupPage = () => {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      if (mode === "login") {
        await login(email, password)
      } else {
        await signup(username, email, password, name)
      }
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-void flex items-center justify-center font-sans text-text-secondary antialiased p-6">

      <div className="w-full max-w-[400px] space-y-6">

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-surface border border-border text-accent">
            <Code2 size={20} />
          </div>
          <span className="text-lg font-bold text-text-primary tracking-wider">D:CODE</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            {mode === "login" ? "Sign in" : "Create account"}
          </h2>
          <p className="text-xs text-text-tertiary mt-1">
            {mode === "login"
              ? "Welcome back. Sign in to continue."
              : "Register a new account to get started."}
          </p>
        </div>

        {error && (
          <div className="px-3 py-2 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border text-xs font-bold text-text-primary hover:bg-elevated hover:border-text-tertiary transition-all cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface border border-border text-xs font-bold text-text-primary hover:bg-elevated hover:border-text-tertiary transition-all cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-void border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary text-xs">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="alexdev"
                    required
                    className="w-full pl-8 pr-3 py-2 text-xs bg-void border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@dcode.dev"
                required
                className="w-full pl-10 pr-4 py-2 text-xs bg-void border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-2 text-xs bg-void border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-border bg-void text-accent focus:ring-0" />
                <span className="text-text-secondary text-[11px]">Remember me</span>
              </label>
              <button type="button" className="text-accent hover:underline text-[11px] transition-colors cursor-pointer">
                Reset password
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent hover:bg-accent-muted text-xs font-bold text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{submitting ? "Processing..." : mode === "login" ? "Sign in" : "Create account"}</span>
            {!submitting && <ArrowRight size={14} strokeWidth={2.5} />}
          </button>
        </form>

        <div className="pt-3 border-t border-border text-center">
          <p className="text-xs text-text-tertiary">
            {mode === "login" ? "Need an account?" : "Already registered?"}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }}
              className="text-accent font-bold hover:underline transition-colors cursor-pointer ml-1"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}

export default LoginSignupPage
