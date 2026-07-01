import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children, allowedRoles }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include"
        })
        const data = await res.json()
        if (data.success) setUser(data.user)
        else setUser(null)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  // Check chal raha hai — kuch mat dikhao
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--gold)",
        fontSize: 18
      }}>
        ⏳ Loading...
      </div>
    )
  }

  // Login nahi hai — login page pe bhejo
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Role match nahi — apne dashboard pe bhejo
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin")        return <Navigate to="/admin-dashboard" replace />
    if (user.role === "teacher")      return <Navigate to="/teacher-dashboard" replace />
    if (user.role === "student")      return <Navigate to="/student-dashboard" replace />
  }

  // Sab theek — page dikhao
  return children
}