import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useSiteSettings, slugify } from "./Home"

const EVENT_COLORS = ["#60a5fa","#f87171","#a78bfa","#f59e0b","#4ade80","#94a3b8"]

function buildEventsRaw(s) {
  return [1,2,3,4,5,6].map((n,i) => ({
    id:    n,
    date:  s[`ev${n}Date`]  || "",
    month: s[`ev${n}Month`] || "",
    title: s[`ev${n}Title`] || "",
    time:  s[`ev${n}Time`]  || "",
    venue: s[`ev${n}Venue`] || "",
    category: s[`ev${n}Cat`] || "",
    color: EVENT_COLORS[i],
    slug:  slugify(s[`ev${n}Title`]) || `event-${n}`,
  })).filter(ev => ev.title)
}

export default function EventDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const s = useSiteSettings()

  const EVENTS = buildEventsRaw(s)
  const event  = EVENTS.find(ev => ev.slug === slug)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", guests: "1" })
  const [registered, setRegistered] = useState(false)

  const handle = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setRegistered(true)
  }

  // Unknown / bad slug — same shell, friendly fallback
  if (!event) {
    return (
      <div>
        <div style={{ padding: "200px 5% 100px", textAlign: "center" }}>
          <span className="section-label fade-up">Oops</span>
          <h2 className="section-title fade-up delay-1">
            Event <span className="gold-text">Not Found</span>
          </h2>
          <div className="divider" style={{ margin: "16px auto" }} />
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button className="btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>

          <span className="section-label fade-up">{event.category}</span>
          <h1 className="section-title fade-up delay-1">
            {event.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gold-text">{event.title.split(" ").slice(-1)}</span>
          </h1>
          <div className="divider" />

          {/* ── Event Info Card ── */}
          <div className="card fade-up delay-2" style={{ padding: 0, overflow: "hidden", display: "flex", marginBottom: 24 }}>
            <div style={{
              background: `${event.color}18`, borderRight: `3px solid ${event.color}`,
              padding: "28px 24px", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", minWidth: 100, flexShrink: 0,
            }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, fontWeight: 900, color: event.color, lineHeight: 1 }}>{event.date}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: event.color, letterSpacing: 1, textTransform: "uppercase" }}>{event.month}</div>
            </div>
            <div style={{ padding: "24px 28px", flex: 1 }}>
              <div style={{
                display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 1,
                textTransform: "uppercase", color: event.color, background: `${event.color}18`,
                padding: "3px 10px", borderRadius: 100, marginBottom: 12,
              }}>{event.category}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--cream)", marginBottom: 10, fontFamily: "'Playfair Display',serif" }}>{event.title}</div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.9 }}>
                🕐 {event.time} &nbsp;·&nbsp; 📍 {event.venue}
              </div>
            </div>
          </div>

          {/* ── Register Now / Form ── */}
          {!showForm && !registered && (
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setShowForm(true)}
            >
              Register Now →
            </button>
          )}

          {registered && (
            <div style={{
              background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)",
              borderRadius: 12, padding: "24px 28px", color: "#4ade80", fontSize: 15, textAlign: "center",
            }}>
              ✅ You're registered for <strong>{event.title}</strong>! A confirmation will be sent to your email shortly.
            </div>
          )}

          {showForm && !registered && (
            <div className="card fade-up" style={{ padding: 40, marginTop: 8 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 24 }}>
                Register for {event.title}
              </h3>
              <form onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <input className="form-input" type="number" min="1" name="guests" value={form.guests} onChange={handle} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                  Confirm Registration →
                </button>
              </form>
            </div>
          )}

          <button className="btn-outline" style={{ marginTop: 32 }} onClick={() => navigate("/")}>
            ← Back to Home
          </button>

        </div>
      </div>
      <Footer />
    </div>
  )
}