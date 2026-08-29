export const profile = {
  username: "alexdev",
  name: "Alex",
  email: "alex@example.com",
  bio: "Full-stack developer who loves competitive programming and open source.",
  location: "San Francisco, CA",
  joined: "Jan 2025",
  website: "https://alexdev.io",
  github: "alexdev",
  twitter: "alexdevcode",
  rating: 1648,
  rank: 127,
  tier: "platinum",
  wins: 42,
  losses: 18,
  streak: 5,
  solved: 186,
  totalProblems: 450,
  languages: ["JavaScript", "Python", "Go"],
  avatar: "AM",
}

export const achievements = [
  { id: 1, name: "First Blood", description: "Win your first duel", icon: "Swords", earned: true, date: "Jan 15, 2025" },
  { id: 2, name: "Speed Demon", description: "Solve a problem in under 2 minutes", icon: "Zap", earned: true, date: "Feb 3, 2025" },
  { id: 3, name: "Streak Master", description: "Win 5 duels in a row", icon: "Flame", earned: true, date: "Mar 12, 2025" },
  { id: 4, name: "Century Club", description: "Solve 100 problems", icon: "Target", earned: true, date: "Apr 8, 2025" },
  { id: 5, name: "Polyglot", description: "Solve problems in 3+ languages", icon: "Code2", earned: true, date: "May 1, 2025" },
  { id: 6, name: "Grandmaster", description: "Reach Grandmaster tier", icon: "Crown", earned: false, date: null },
  { id: 7, name: "Flawless", description: "Win 10 duels without a loss", icon: "Shield", earned: false, date: null },
  { id: 8, name: "Marathon", description: "Solve 500 problems", icon: "Trophy", earned: false, date: null },
]

export const recentActivity = [
  { type: "duel", action: "Won duel against ByteKnight", time: "12 min ago", rating: "+24" },
  { type: "solved", action: "Solved Two Sum Variants", time: "1 hour ago", xp: "+50 XP" },
  { type: "duel", action: "Won duel against codeNinja", time: "Yesterday", rating: "+18" },
  { type: "duel", action: "Lost duel against MiraCode", time: "Yesterday", rating: "-12" },
  { type: "solved", action: "Solved String Compression", time: "2 days ago", xp: "+50 XP" },
  { type: "achievement", action: "Earned Streak Master badge", time: "3 days ago" },
  { type: "duel", action: "Won duel against rootUser", time: "3 days ago", rating: "+21" },
]

export const languageStats = [
  { language: "JavaScript", solved: 98, percentage: 53 },
  { language: "Python", solved: 62, percentage: 33 },
  { language: "Go", solved: 26, percentage: 14 },
]

export const difficultyStats = [
  { difficulty: "Easy", solved: 78, total: 150, percentage: 52 },
  { difficulty: "Medium", solved: 82, total: 220, percentage: 37 },
  { difficulty: "Hard", solved: 26, total: 80, percentage: 33 },
]
