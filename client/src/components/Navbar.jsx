// import { useState, useEffect } from "react"
// import { Link, useLocation } from "react-router-dom"

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => { setMenuOpen(false) }, [location])

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/courses", label: "Courses" },
//     { to: "/services", label: "Services" },
//     { to: "/gallery", label: "Gallery" },
//     { to: "/contact", label: "Contact" },
//   ]

//   return (
//     <>
//       <nav className={scrolled ? "scrolled" : ""}>
//         <Link to="/" className="nav-logo">
//           <span>EDUCATION<em className="dot">●</em>ERP</span>
//         </Link>
//         <ul className="nav-links">
//           {links.map(l => (
//             <li key={l.to}>
//               <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
//             </li>
//           ))}
//         </ul>
//         <Link to="/login" className="nav-cta btn-primary" style={{ fontSize: 13, padding: "10px 22px" }}>
//           Sign In →
//         </Link>
//         <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span /><span /><span />
//         </button>
//       </nav>

//       {menuOpen && (
//         <div className="mobile-menu">
//           <ul>
//             {links.map(l => (
//               <li key={l.to}>
//                 <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
//               </li>
//             ))}
//             <li style={{ marginTop: 20 }}>
//               <Link to="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sign In →</Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   )
// }

// export default Navbar



import { useState, useEffect, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser]         = useState(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  // ✅ Route change hone par /me se user fetch karo
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include" // cookie automatically jaayegi
      })
      const data = await res.json()
      setUser(data.success ? data.user : null)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => { fetchUser() }, [location, fetchUser])

  // ✅ Logout — backend cookie clear karega
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })
    setUser(null)
    navigate("/")
  }

  const links = [
    { to: "/",         label: "Home"     },
    { to: "/about",    label: "About"    },
    { to: "/courses",  label: "Courses"  },
    { to: "/services", label: "Services" },
    { to: "/gallery",  label: "Gallery"  },
    { to: "/contact",  label: "Contact"  },
  ]

  // ── Username + Logout button ──
  const UserSection = () => (
    <div className="nav-user">
      <span className="nav-username">👤 {user.name}</span>
      <button className="nav-logout-btn" onClick={handleLogout} title="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </button>
    </div>
  )

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <Link to="/" className="nav-logo">
          <span>EDUCATION<em className="dot">●</em>ERP</span>
        </Link>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop — logged in: username+logout | logged out: Sign In */}
        {user ? <UserSection /> : (
          <Link to="/login" className="nav-cta btn-primary"
            style={{ fontSize: 13, padding: "10px 22px" }}>
            Sign In →
          </Link>
        )}

        <button className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li style={{ marginTop: 20 }}>
              {user ? <UserSection /> : (
                <Link to="/login" className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}>
                  Sign In →
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar