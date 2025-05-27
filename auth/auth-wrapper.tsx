"use client"

import { useState } from "react"
import LoginPage from "./login"
import SignupPage from "./signup"
import PsychiatristDashboard from "../dashboard"

export default function AuthWrapper() {
  const [currentView, setCurrentView] = useState<"login" | "signup" | "dashboard">("login")

  const handleLogin = () => {
    setCurrentView("dashboard")
  }

  const handleSignup = () => {
    setCurrentView("dashboard")
  }

  const handleSwitchToSignup = () => {
    setCurrentView("signup")
  }

  const handleSwitchToLogin = () => {
    setCurrentView("login")
  }

  if (currentView === "dashboard") {
    return <PsychiatristDashboard />
  }

  if (currentView === "signup") {
    return <SignupPage onSignup={handleSignup} onSwitchToLogin={handleSwitchToLogin} />
  }

  return <LoginPage onLogin={handleLogin} onSwitchToSignup={handleSwitchToSignup} />
}
