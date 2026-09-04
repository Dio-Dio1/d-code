import React, { useState, useCallback } from "react"
import { useAuth } from "./contexts/AuthContext"
import Sidebar from "./Components/Dashboard/Sidebar"
import Dashboard from "./Components/Dashboard/Dashboard"
import DuelPage from "./Components/Duel/DuelPage"
import CasualDuelPage from "./Components/Duel/CasualDuelPage"
import CustomRoomPage from "./Components/Duel/CustomRoomPage"
import ProblemsPage from "./Components/Problems/ProblemsPage"
import SolveWorkspace from "./Components/Problems/SolveWorkspace"
import ProfilePage from "./Components/Profile/ProfilePage"
import SettingsPage from "./Components/Settings/SettingsPage"
import LeaderboardPage from "./Components/Leaderboard/LeaderboardPage"
import HistoryPage from "./Components/History/HistoryPage"
import FriendsPage from "./Components/Friends/FriendsPage"
import PuzzlesPage from "./Components/Puzzles/PuzzlesPage"
import LoginSignupPage from "./Components/Auth/LoginSignupPage"
import ErrorBoundary from "./Components/ui/ErrorBoundary"

const App = () => {
  const { user, loading, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [selectedProblem, setSelectedProblem] = useState(null)

  const loggedIn = !!user

  const navigateTo = useCallback((page) => {
    setCurrentPage(page)
    setSelectedProblem(null)
  }, [])

  const navigateHome = useCallback(() => {
    setCurrentPage("dashboard")
    setSelectedProblem(null)
  }, [])

  const navigateToProblem = useCallback((problem) => {
    setSelectedProblem(problem)
    setCurrentPage("solve")
  }, [])

  const navigateBackToProblems = useCallback(() => {
    setSelectedProblem(null)
    setCurrentPage("problems")
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    setCurrentPage("dashboard")
    setSelectedProblem(null)
  }, [logout])

  return (
    <ErrorBoundary>
      <AppContent
        loading={loading}
        loggedIn={loggedIn}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        currentPage={currentPage}
        selectedProblem={selectedProblem}
        navigateTo={navigateTo}
        navigateHome={navigateHome}
        navigateToProblem={navigateToProblem}
        navigateBackToProblems={navigateBackToProblems}
        handleLogout={handleLogout}
      />
    </ErrorBoundary>
  )
}

const AppContent = ({
  loading, loggedIn, collapsed, setCollapsed,
  currentPage, selectedProblem, navigateTo, navigateHome,
  navigateToProblem, navigateBackToProblems, handleLogout,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-void flex items-center justify-center">
        <div className="text-accent font-mono text-sm animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!loggedIn) {
    return <LoginSignupPage />
  }

  if (currentPage === "duel") {
    return <DuelPage onBack={navigateHome} />
  }

  if (currentPage === "casual") {
    return <CasualDuelPage onBack={navigateHome} />
  }

  if (currentPage === "custom") {
    return <CustomRoomPage onBack={navigateHome} />
  }

  if (currentPage === "solve" && selectedProblem) {
    return <SolveWorkspace problem={selectedProblem} onBack={navigateBackToProblems} />
  }

  const withSidebar = (children) => (
    <div className="flex min-h-screen bg-void">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        onNavigate={navigateTo}
        currentPage={currentPage}
        onLogout={loggedIn ? handleLogout : undefined}
        loggedIn={loggedIn}
      />
      <main className="min-w-0 flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )

  switch (currentPage) {
    case "problems":
      return withSidebar(<ProblemsPage onNavigateToProblem={navigateToProblem} />)
    case "profile":
      return withSidebar(<ProfilePage onNavigate={navigateTo} />)
    case "friends":
      return withSidebar(<FriendsPage onNavigate={navigateTo} />)
    case "settings":
      return withSidebar(<SettingsPage onNavigate={navigateTo} />)
    case "leaderboard":
      return withSidebar(<LeaderboardPage onNavigate={navigateTo} />)
    case "history":
      return withSidebar(<HistoryPage onNavigate={navigateTo} />)
    case "puzzles":
      return withSidebar(<PuzzlesPage onNavigate={navigateTo} />)
    default:
      return withSidebar(<Dashboard collapsed={collapsed} onNavigate={navigateTo} />)
  }
}

export default App
