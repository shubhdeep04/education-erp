

// // export default Login
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"

// export default function Login() {
//   const [role, setRole]     = useState("student")
//   const [form, setForm]     = useState({ email: "", password: "" })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     try {
//       setLoading(true)
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       })
//       const data = await response.json()
//       if (data.success) {
//         localStorage.setItem("token", data.token)
//         localStorage.setItem("user", JSON.stringify(data.user))
//         if (data.user.role === "admin")        navigate("/admin-dashboard")
//         else if (data.user.role === "teacher") navigate("/teacher-dashboard")
//         else if (data.user.role === "student") navigate("/student-dashboard")
//       } else {
//         alert(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       alert("Server Error")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="login-page" style={{ paddingTop: "var(--nav-h)" }}>

//       {/* ── Left Visual ── */}
//       <div className="login-visual">
//         <div className="login-visual-content">
//           <div className="login-quote">
//             "Education is the most powerful weapon which you can use to change the world."
//           </div>
//           <div className="login-quote-author">— Nelson Mandela</div>
//         </div>
//       </div>

//       {/* ── Right Form ── */}
//       <div className="login-form-side">
//         <div className="login-box fade-up">
//           <div className="login-logo">Edu<span>●</span>Sphere</div>
//           <div className="login-subtitle">Sign in to your portal</div>

//           {/* Role Tabs — sirf UI ke liye, API khud role detect kar leti hai */}
//           <div className="role-tabs">
//             {[
//               { key: "student", label: "🎓 Student" },
//               { key: "teacher", label: "📖 Teacher" },
//               { key: "admin",   label: "⚙️ Admin"   },
//             ].map(r => (
//               <button
//                 key={r.key}
//                 className={`role-tab ${role === r.key ? "active" : ""}`}
//                 onClick={() => setRole(r.key)}
//                 type="button"
//               >
//                 {r.label}
//               </button>
//             ))}
//           </div>

//           <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
//             <div className="form-group">
//               <label className="form-label">Email Address</label>
//               <input
//                 className="form-input"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handle}
//                 placeholder={`${role}@edusphere.in`}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <input
//                 className="form-input"
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handle}
//                 placeholder="••••••••"
//                 required
//               />
//             </div>

//             <div style={{ textAlign: "right", marginBottom: 24, marginTop: -8 }}>
//               <a href="#" style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}>
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               className="btn-primary"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 justifyContent: "center",
//                 opacity: loading ? 0.7 : 1,
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading ? "⏳ Please Wait..." : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
//             </button>
//           </form>

//           {/* Demo credentials */}
//           <div style={{
//             marginTop: 28,
//             padding: "16px 20px",
//             background: "rgba(201,168,76,0.06)",
//             border: "1px solid rgba(201,168,76,0.15)",
//             borderRadius: 10,
//           }}>
//             <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
//               Demo Credentials
//             </div>
//             {[
//               { role: "Admin",   email: "admin1@gmail.com"    },
//               { role: "Teacher", email: "teacher43@gmail.com" },
//               { role: "Student", email: "student12@gmail.com" },
//             ].map(c => (
//               <div key={c.role} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
//                 <span style={{ color: "var(--cream)", fontWeight: 500 }}>{c.role}</span>
//                 <span>{c.email}</span>
//               </div>
//             ))}
//             <div style={{ marginTop: 10, fontSize: 13, color: "#fbbf24", textAlign: "center" }}>
//               🔑 Password for all: <strong>123456</strong>
//             </div>
//           </div>

//           <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--text-muted)" }}>
//             New here?{" "}
//             <a href="#" style={{ color: "var(--gold)", textDecoration: "none" }}>
//               Contact admissions →
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [role, setRole]       = useState("student")
  const [form, setForm]       = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // ✅ cookie receive ke liye
      })
      const data = await response.json()
      if (data.success) {
        // ✅ localStorage hataya — cookie automatically set ho gayi
        if (data.user.role === "admin")        navigate("/admin-dashboard")
        else if (data.user.role === "teacher") navigate("/teacher-dashboard")
        else if (data.user.role === "student") navigate("/student-dashboard")
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

      <div className="login-visual">
        <div className="login-visual-content">
          <div className="login-quote">
            "Education is the most powerful weapon which you can use to change the world."
          </div>
          <div className="login-quote-author">— Nelson Mandela</div>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-box fade-up">
          <div className="login-logo">Edu<span>●</span>Sphere</div>
          <div className="login-subtitle">Sign in to your portal</div>

          <div className="role-tabs">
            {[
              { key: "student", label: "🎓 Student" },
              { key: "teacher", label: "📖 Teacher" },
              { key: "admin",   label: "⚙️ Admin"   },
            ].map(r => (
              <button
                key={r.key}
                className={`role-tab ${role === r.key ? "active" : ""}`}
                onClick={() => setRole(r.key)}
                type="button"
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handle}
                placeholder={`${role}@edusphere.in`}
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

            <div style={{ textAlign: "right", marginBottom: 24, marginTop: -8 }}>
              <a href="#" style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}>
                Forgot password?
              </a>
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
              {loading ? "⏳ Please Wait..." : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)} →`}
            </button>
          </form>

          <div style={{
            marginTop: 28,
            padding: "16px 20px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>
              Demo Credentials
            </div>
            {[
              { role: "Admin",   email: "admin1@gmail.com"    },
              { role: "Teacher", email: "teacher43@gmail.com" },
              { role: "Student", email: "student12@gmail.com" },
            ].map(c => (
              <div key={c.role} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
                <span style={{ color: "var(--cream)", fontWeight: 500 }}>{c.role}</span>
                <span>{c.email}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 13, color: "#fbbf24", textAlign: "center" }}>
              🔑 Password for all: <strong>123456</strong>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--text-muted)" }}>
            New here?{" "}
           <Link to="/register" style={{ color: "var(--gold)", textDecoration: "none" }}>
  Create a new account →
</Link>
          </p>
        </div>
      </div>
    </div>
  )
}