import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
  const [form, setForm]       = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async (e) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          password: form.password,
          role:     "student"   // default role
        }),
        credentials: "include"
      })
      const data = await response.json()
      if (data.success) {
        alert("Account created! Please sign in.")
        navigate("/login")
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert("Server Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page" style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Left Visual ── */}
      <div className="login-visual">
        <div className="login-visual-content">
          <div className="login-quote">
            "The beautiful thing about learning is that nobody can take it away from you."
          </div>
          <div className="login-quote-author">— B.B. King</div>
        </div>
      </div>

      {/* ── Right Form ── */}
      <div className="login-form-side">
        <div className="login-box fade-up">
          <div className="login-logo">Edu<span>●</span>Sphere</div>
          <div className="login-subtitle">Create your account</div>

          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column" }}>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handle}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handle}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handle}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                justifyContent: "center",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "⏳ Please Wait..." : "Create Account →"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--gold)", textDecoration: "none" }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}