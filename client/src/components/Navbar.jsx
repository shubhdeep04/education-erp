import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ]

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <Link to="/" className="nav-logo">
          <span>EDUCATION<em className="dot">●</em>ERP</span>
        </Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link to="/login" className="nav-cta btn-primary" style={{ fontSize: 13, padding: "10px 22px" }}>
          Sign In →
        </Link>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
              </li>
            ))}
            <li style={{ marginTop: 20 }}>
              <Link to="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sign In →</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar

