import React from "react"
import { Link } from "react-router-dom"


function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "var(--cream)" }}>
            Edu<span style={{ color: "var(--gold)" }}>●</span>Sphere
          </div>
          <p>Empowering learners through world-class education. Building tomorrow's leaders, today.</p>
        </div>
        <div>
          <div className="footer-heading">Quick Links</div>
          <ul className="footer-links">
            {["Home", "About", "Courses", "Services"].map(i => (
              <li key={i}><Link to={`/${i === "Home" ? "" : i.toLowerCase()}`}>{i}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-heading">Programs</div>
          <ul className="footer-links">
            {["Science", "Commerce", "Arts", "Technology", "Sports"].map(i => (
              <li key={i}><a href="#">{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="#">📍 BHOPAL , M.P.</a></li>
            <li><a href="#">📞 +91 98765 43210</a></li>
            <li><a href="#">✉️ info@edusphere.in</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 EDUCATIONERP. All rights reserved.</p>
        <div className="social-links">
          {["𝕏", "in", "f", "▶"].map((s, i) => (
            <a key={i} href="#" className="social-link">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
export default Footer