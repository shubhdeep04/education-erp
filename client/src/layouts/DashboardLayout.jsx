import { useNavigate } from "react-router-dom"
function DashboardLayout({ role, sideLinks, children }) {
  const navigate = useNavigate()
  const roleColors = { Admin: "var(--gold)", Student: "#60a5fa", Teacher: "#a78bfa" }
  const color = roleColors[role] || "var(--gold)"

  return (
    <div className="dashboard-layout" style={{ paddingTop: "var(--nav-h)" }}>
      <div className="sidebar">
        <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
            Logged in as
          </div>
          <div style={{ fontWeight: 700, color, fontSize: 16 }}>{role} Portal</div>
        </div>
        {sideLinks.map((group, gi) => (
          <div key={gi} className="sidebar-section">
            <div className="sidebar-label">{group.label}</div>
            {group.links.map((l, li) => (
              <a key={li} className={`sidebar-link ${li === 0 && gi === 0 ? "active" : ""}`}>
                <span className="icon">{l.icon}</span>{l.name}
              </a>
            ))}
          </div>
        ))}
        <div style={{ padding: "0 20px", marginTop: "auto" }}>
          <a className="sidebar-link" onClick={() => navigate("/login")} style={{ color: "#f87171" }}>
            <span className="icon">🚪</span>Sign Out
          </a>
        </div>
      </div>
      <div className="dashboard-main">{children}</div>
    </div>
  )
}
export default DashboardLayout