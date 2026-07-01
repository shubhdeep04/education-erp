

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* ─── API helper ─────────────────────────────────────────── */
const API = "http://localhost:5000/api"
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
})

/* ─── Reusable Components ────────────────────────────────── */
function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--cream)", marginBottom: 4 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{subtitle}</div>}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 0", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: "3px solid rgba(201,168,76,0.2)", borderTop: "3px solid var(--gold)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Loading...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function ErrorCard({ msg, onRetry }) {
  return (
    <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 12, padding: "24px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>⚠️</div>
      <div style={{ color: "#f87171", fontSize: 15, marginBottom: 16 }}>{msg}</div>
      {onRetry && <button className="btn-outline" style={{ fontSize: 13 }} onClick={onRetry}>Try Again</button>}
    </div>
  )
}

function StatCard({ icon, val, label, change, delay = 1 }) {
  return (
    <div className={`card stat-card fade-up delay-${delay}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-val" style={{ fontSize: 28 }}>{val}</div>
      <div className="stat-card-label">{label}</div>
      {change && <div className="stat-card-change">{change}</div>}
    </div>
  )
}

function Badge({ label, type = "active" }) {
  const colors = {
    active:  { bg: "rgba(74,222,128,0.15)",  color: "#4ade80" },
    pending: { bg: "rgba(201,168,76,0.15)",  color: "var(--gold)" },
    done:    { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" },
    danger:  { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
    info:    { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  }
  const c = colors[type] || colors.active
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: c.bg, color: c.color }}>
      {label}
    </span>
  )
}

/* ══════════════════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════════════════ */

/* ── Overview ── */
function Overview({ user }) {
  const [stats, setStats]     = useState(null)
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const [sRes, nRes] = await Promise.all([
        fetch(`${API}/student/stats`,   { headers: authHeaders() }),
        fetch(`${API}/student/notices`, { headers: authHeaders() }),
      ])
      const sData = await sRes.json()
      const nData = await nRes.json()
      if (sData.success) setStats(sData.data)
      if (nData.success) setNotices(nData.data?.slice(0, 3) || [])
    } catch {
      setError("Could not load dashboard data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <>
      <div className="dashboard-greeting fade-up">
        <div className="greeting-sub">{greeting}, Scholar 🎓</div>
        <div className="greeting-name">
          Welcome back, <em style={{ color: "#60a5fa" }}>{user?.name || "Student"}</em>
        </div>
      </div>

      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <>
          <div className="stat-cards">
            <StatCard icon="📚" val={stats?.enrolledCourses ?? "—"} label="Enrolled Courses"  change="Active this semester" delay={1} />
            <StatCard icon="✅" val={stats?.attendance       ?? "—"} label="Attendance %"      change="This month"           delay={2} />
            <StatCard icon="🏆" val={stats?.lastGrade        ?? "—"} label="Last Grade"        change={stats?.lastSubject}   delay={3} />
            <StatCard icon="📝" val={stats?.pendingAssignments ?? "—"} label="Pending Assignments" change="Due soon"         delay={4} />
          </div>

          {/* Recent Notices */}
          {notices.length > 0 && (
            <div className="card fade-up delay-3" style={{ padding: 28, marginTop: 8 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 16 }}>
                📢 Recent Notices
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {notices.map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < notices.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📌</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)", marginBottom: 3 }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{n.date} · {n.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

/* ── My Courses / Schedule ── */
function MyCourses() {
  const [courses, setCourses] = useState([])
  const [schedule, setSchedule] = useState([])
  const [tab, setTab]   = useState("courses")
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const [cRes, sRes] = await Promise.all([
        fetch(`${API}/student/courses`,  { headers: authHeaders() }),
        fetch(`${API}/student/schedule`, { headers: authHeaders() }),
      ])
      const cData = await cRes.json()
      const sData = await sRes.json()
      if (cData.success) setCourses(cData.data || [])
      if (sData.success) setSchedule(sData.data || [])
    } catch {
      setError("Could not load courses.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  return (
    <>
      <SectionHeader title="My Courses & Schedule" subtitle="All enrolled courses and today's timetable" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[{ key: "courses", label: "📚 Courses" }, { key: "schedule", label: "📅 Schedule" }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: "8px 20px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: tab === t.key ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: tab === t.key ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (tab === t.key ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <>
          {tab === "courses" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
              {courses.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: 15, padding: 20 }}>No courses enrolled.</div>
              ) : courses.map((c, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📖</div>
                    <Badge label={c.status || "Active"} type="active" />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 6 }}>{c.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14 }}>👨‍🏫 {c.teacher} · {c.duration}</div>
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, height: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${c.progress || 0}%`, background: "linear-gradient(90deg, var(--gold), var(--gold-light))", borderRadius: 8 }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>{c.progress || 0}% completed</div>
                </div>
              ))}
            </div>
          )}

          {tab === "schedule" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {days.map(day => {
                const dayClasses = schedule.filter(s => s.day === day)
                if (dayClasses.length === 0) return null
                return (
                  <div key={day}>
                    <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>{day}</div>
                    <div className="card" style={{ overflowX: "auto" }}>
                      <table className="activity-table">
                        <thead><tr><th>Time</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead>
                        <tbody>
                          {dayClasses.map((cls, i) => (
                            <tr key={i}>
                              <td><Badge label={cls.time} type="info" /></td>
                              <td style={{ color: "var(--cream)", fontWeight: 500 }}>{cls.subject}</td>
                              <td>{cls.teacher}</td>
                              <td>{cls.room}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
              {schedule.length === 0 && <div style={{ color: "var(--text-muted)", fontSize: 15 }}>No schedule found.</div>}
            </div>
          )}
        </>
      )}
    </>
  )
}

/* ── Attendance ── */
function Attendance() {
  const [data, setData]       = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/attendance`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) {
        setData(json.data?.records || [])
        setSummary(json.data?.summary || null)
      } else setError(json.message || "Failed to load.")
    } catch {
      setError("Could not load attendance.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const pct = summary ? Math.round((summary.present / summary.total) * 100) : 0
  const circumference = 2 * Math.PI * 54

  return (
    <>
      <SectionHeader title="Attendance" subtitle="Subject-wise attendance record" />
      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <>
          {/* Summary Circle */}
          {summary && (
            <div style={{ display: "flex", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
              <div className="card" style={{ padding: 28, display: "flex", alignItems: "center", gap: 28, flex: "1 1 300px" }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="54" fill="none"
                    stroke={pct >= 75 ? "#4ade80" : pct >= 60 ? "var(--gold)" : "#f87171"}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (pct / 100) * circumference}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                  <text x="60" y="65" textAnchor="middle" fill="var(--cream)" fontSize="20" fontWeight="700" fontFamily="Playfair Display">{pct}%</text>
                </svg>
                <div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>Overall Attendance</div>
                  {[
                    { label: "Present", val: summary.present, color: "#4ade80" },
                    { label: "Absent",  val: summary.absent,  color: "#f87171" },
                    { label: "Total",   val: summary.total,   color: "var(--text-muted)" },
                  ].map(s => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", gap: 40, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 24, flex: "1 1 200px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>{pct >= 75 ? "✅" : pct >= 60 ? "⚠️" : "❌"}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: pct >= 75 ? "#4ade80" : pct >= 60 ? "var(--gold)" : "#f87171" }}>
                  {pct >= 75 ? "Good Standing" : pct >= 60 ? "Needs Improvement" : "Critical — Below 60%"}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Minimum required: 75%</div>
              </div>
            </div>
          )}

          {/* Subject-wise Table */}
          <div className="card" style={{ overflowX: "auto" }}>
            <table className="activity-table">
              <thead>
                <tr><th>Subject</th><th>Total Classes</th><th>Present</th><th>Absent</th><th>Percentage</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>No attendance records found.</td></tr>
                ) : data.map((row, i) => {
                  const p = Math.round((row.present / row.total) * 100)
                  return (
                    <tr key={i}>
                      <td style={{ color: "var(--cream)", fontWeight: 500 }}>{row.subject}</td>
                      <td>{row.total}</td>
                      <td style={{ color: "#4ade80" }}>{row.present}</td>
                      <td style={{ color: "#f87171" }}>{row.absent}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, minWidth: 60 }}>
                            <div style={{ height: "100%", width: `${p}%`, background: p >= 75 ? "#4ade80" : p >= 60 ? "var(--gold)" : "#f87171", borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: 13, color: "var(--cream)", minWidth: 34 }}>{p}%</span>
                        </div>
                      </td>
                      <td><Badge label={p >= 75 ? "Good" : p >= 60 ? "Low" : "Critical"} type={p >= 75 ? "active" : p >= 60 ? "pending" : "danger"} /></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

/* ── Grades / Results ── */
function Grades() {
  const [data, setData]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/grades`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) setData(json.data || [])
      else setError(json.message || "Failed to load.")
    } catch {
      setError("Could not load grades.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const gradeColor = g => {
    if (!g) return "var(--text-muted)"
    if (["A+","A"].includes(g))   return "#4ade80"
    if (["B+","B"].includes(g))   return "#60a5fa"
    if (["C+","C"].includes(g))   return "var(--gold)"
    return "#f87171"
  }

  const avg = data.length ? Math.round(data.reduce((a, d) => a + (Number(d.marks) || 0), 0) / data.length) : 0

  return (
    <>
      <SectionHeader title="Grades & Results" subtitle="Subject-wise marks and performance" />
      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <>
          {/* Summary */}
          {data.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 28 }}>
              {[
                { icon: "📊", label: "Average Marks", val: avg + "%"  },
                { icon: "🏆", label: "Highest",        val: Math.max(...data.map(d => Number(d.marks) || 0)) + "%" },
                { icon: "📉", label: "Lowest",         val: Math.min(...data.map(d => Number(d.marks) || 0)) + "%" },
                { icon: "📚", label: "Subjects",       val: data.length },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: "20px 24px" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--gold)", fontFamily: "'Playfair Display',serif" }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="card" style={{ overflowX: "auto" }}>
            <table className="activity-table">
              <thead>
                <tr><th>Subject</th><th>Teacher</th><th>Max Marks</th><th>Marks Obtained</th><th>Grade</th><th>Result</th></tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>No results available yet.</td></tr>
                ) : data.map((row, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--cream)", fontWeight: 500 }}>{row.subject}</td>
                    <td>{row.teacher}</td>
                    <td>{row.maxMarks || 100}</td>
                    <td>
                      <span style={{ color: gradeColor(row.grade), fontWeight: 700, fontSize: 15 }}>
                        {row.marks}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700, color: gradeColor(row.grade) }}>
                        {row.grade}
                      </span>
                    </td>
                    <td><Badge label={row.result || "Pass"} type={row.result === "Fail" ? "danger" : "active"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

/* ── Assignments ── */
function Assignments() {
  const [data, setData]       = useState([])
  const [filter, setFilter]   = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/assignments`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) setData(json.data || [])
      else setError(json.message || "Failed to load.")
    } catch {
      setError("Could not load assignments.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const filtered = filter === "All" ? data : data.filter(a => a.status === filter)

  const statusType = s => s === "Submitted" ? "active" : s === "Pending" ? "pending" : s === "Overdue" ? "danger" : "done"

  return (
    <>
      <SectionHeader title="Assignments" subtitle="All your pending and submitted assignments" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["All", "Pending", "Submitted", "Overdue", "Graded"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filter === f ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filter === f ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filter === f ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{f}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.length === 0 ? (
            <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>
              No assignments found.
            </div>
          ) : filtered.map((a, i) => (
            <div key={i} className="card" style={{ padding: 24, borderLeft: `3px solid ${a.status === "Pending" ? "var(--gold)" : a.status === "Overdue" ? "#f87171" : "#4ade80"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--cream)", marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                    📚 {a.subject} &nbsp;·&nbsp; 👨‍🏫 {a.teacher}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    📅 Due: <span style={{ color: a.status === "Overdue" ? "#f87171" : "var(--cream)" }}>{a.dueDate}</span>
                    {a.submittedDate && <span> &nbsp;·&nbsp; ✅ Submitted: {a.submittedDate}</span>}
                    {a.marks && <span> &nbsp;·&nbsp; 🏆 Marks: <span style={{ color: "var(--gold)", fontWeight: 700 }}>{a.marks}</span></span>}
                  </div>
                </div>
                <Badge label={a.status} type={statusType(a.status)} />
              </div>
              {a.description && (
                <div style={{ marginTop: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  {a.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Fee Status ── */
function FeeStatus() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/fees`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) setData(json.data)
      else setError(json.message || "Failed to load.")
    } catch {
      setError("Could not load fee details.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return (
    <>
      <SectionHeader title="Fee Status" subtitle="Your fee payment details and history" />
      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : !data ? (
        <div style={{ color: "var(--text-muted)" }}>No fee data found.</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { icon: "💰", label: "Total Fee",    val: "₹" + Number(data.totalFee  || 0).toLocaleString(), color: "var(--cream)" },
              { icon: "✅", label: "Amount Paid",  val: "₹" + Number(data.paidAmount || 0).toLocaleString(), color: "#4ade80"      },
              { icon: "⏳", label: "Balance Due",  val: "₹" + Number(data.dueAmount  || 0).toLocaleString(), color: data.dueAmount > 0 ? "#f87171" : "#4ade80" },
              { icon: "📅", label: "Next Due Date",val: data.nextDueDate || "—",                              color: "var(--gold)"  },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: "22px 24px" }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'Playfair Display',serif", marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          {data.totalFee > 0 && (
            <div className="card" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: "var(--text-muted)" }}>Payment Progress</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)" }}>
                  {Math.round((data.paidAmount / data.totalFee) * 100)}%
                </span>
              </div>
              <div style={{ height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${Math.min(Math.round((data.paidAmount / data.totalFee) * 100), 100)}%`,
                  background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                  borderRadius: 6, transition: "width 1s ease",
                }} />
              </div>
            </div>
          )}

          {/* Payment History */}
          {data.history?.length > 0 && (
            <div className="card" style={{ overflowX: "auto" }}>
              <div style={{ padding: "20px 24px 0", fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--cream)" }}>
                Payment History
              </div>
              <table className="activity-table">
                <thead>
                  <tr><th>Date</th><th>Amount</th><th>Mode</th><th>Receipt No.</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {data.history.map((h, i) => (
                    <tr key={i}>
                      <td>{h.date}</td>
                      <td style={{ color: "#4ade80", fontWeight: 600 }}>₹{Number(h.amount).toLocaleString()}</td>
                      <td>{h.mode || "—"}</td>
                      <td style={{ color: "var(--cream)" }}>{h.receipt || "—"}</td>
                      <td><Badge label={h.status || "Paid"} type="active" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  )
}

/* ── Notices ── */
function Notices() {
  const [data, setData]       = useState([])
  const [filter, setFilter]   = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/notices`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) setData(json.data || [])
      else setError(json.message || "Failed.")
    } catch {
      setError("Could not load notices.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const categories = ["All", ...new Set(data.map(n => n.category).filter(Boolean))]
  const filtered   = filter === "All" ? data : data.filter(n => n.category === filter)
  const catColor   = { Event: "#60a5fa", Finance: "var(--gold)", General: "#a78bfa", Exam: "#4ade80", Holiday: "#f87171" }

  return (
    <>
      <SectionHeader title="Notices & Announcements" subtitle="Stay updated with latest school notices" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: filter === c ? "var(--gold)" : "rgba(255,255,255,0.05)",
            color: filter === c ? "var(--dark)" : "var(--text-muted)",
            border: "1px solid " + (filter === c ? "var(--gold)" : "rgba(255,255,255,0.1)"),
            fontFamily: "'DM Sans',sans-serif",
          }}>{c}</button>
        ))}
      </div>

      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.length === 0 ? (
            <div className="card" style={{ padding: 32, textAlign: "center", color: "var(--text-muted)" }}>No notices found.</div>
          ) : filtered.sort((a, b) => b.pinned - a.pinned).map((n, i) => (
            <div key={i} className="card" style={{ padding: 24, borderLeft: `3px solid ${n.pinned ? "var(--gold)" : "transparent"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: catColor[n.category] || "var(--gold)", marginRight: 10 }}>
                    {n.category}
                  </span>
                  {n.pinned && <span style={{ fontSize: 11, background: "rgba(201,168,76,0.15)", color: "var(--gold)", padding: "2px 8px", borderRadius: 100 }}>📌 Pinned</span>}
                  <div style={{ fontWeight: 600, color: "var(--cream)", fontSize: 16, marginTop: 6 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{n.date}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>{n.content}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ── Profile ── */
function Profile({ user }) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({})
  const [saved, setSaved]     = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true); setError("")
      const res  = await fetch(`${API}/student/profile`, { headers: authHeaders() })
      const json = await res.json()
      if (json.success) { setData(json.data); setForm(json.data) }
      else setError(json.message || "Failed.")
    } catch {
      setError("Could not load profile.")
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    try {
      const res  = await fetch(`${API}/student/profile`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) { setData(form); setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 3000) }
      else alert(json.message || "Failed to save.")
    } catch {
      alert("Server error.")
    }
  }

  useEffect(() => { fetchData() }, [])

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const inStyle = { width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none" }
  const lblStyle = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }

  return (
    <>
      <SectionHeader title="My Profile" subtitle="Your personal and academic information" />
      {loading ? <LoadingSpinner /> : error ? <ErrorCard msg={error} onRetry={fetchData} /> : (
        <>
          {saved && (
            <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "12px 18px", marginBottom: 20, color: "#4ade80", fontSize: 14 }}>
              ✅ Profile updated successfully!
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, alignItems: "start" }}>
            {/* Avatar Card */}
            <div className="card" style={{ padding: 28, textAlign: "center" }}>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px", border: "3px solid rgba(201,168,76,0.3)" }}>
                {(data?.name || user?.name || "S")[0].toUpperCase()}
              </div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 4 }}>{data?.name || user?.name}</div>
              <div style={{ fontSize: 13, color: "var(--gold)", marginBottom: 8 }}>{data?.rollNo || "Student"}</div>
              <Badge label={data?.status || "Active"} type="active" />
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "📚", val: data?.course     },
                  { icon: "🏫", val: data?.batch       },
                  { icon: "📅", val: data?.joinDate    },
                ].filter(i => i.val).map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                    <span>{item.icon}</span><span>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Card */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--cream)" }}>
                  {editing ? "Edit Profile" : "Personal Details"}
                </span>
                <button
                  onClick={() => editing ? saveProfile() : setEditing(true)}
                  className={editing ? "btn-primary" : "btn-outline"}
                  style={{ fontSize: 13, padding: "8px 20px" }}
                >
                  {editing ? "💾 Save" : "✏️ Edit"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { label: "Full Name",    name: "name"    },
                  { label: "Email",        name: "email"   },
                  { label: "Phone",        name: "phone"   },
                  { label: "Date of Birth",name: "dob"     },
                  { label: "Address",      name: "address" },
                  { label: "Guardian Name",name: "guardian"},
                  { label: "Guardian Phone",name:"guardianPhone"},
                  { label: "Blood Group",  name: "blood"   },
                ].map(f => (
                  <div key={f.name} style={{ gridColumn: ["address"].includes(f.name) ? "span 2" : "auto" }}>
                    <label style={lblStyle}>{f.label}</label>
                    {editing ? (
                      <input name={f.name} value={form[f.name] || ""} onChange={handle} style={inStyle} />
                    ) : (
                      <div style={{ fontSize: 14, color: data?.[f.name] ? "var(--cream)" : "var(--text-muted)", padding: "11px 0" }}>
                        {data?.[f.name] || "—"}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {editing && (
                <button onClick={() => setEditing(false)} className="btn-outline" style={{ marginTop: 16, fontSize: 13 }}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN StudentDashboard
══════════════════════════════════════════════════════════ */
const MENU = [
  { key: "overview",    icon: "🏠", label: "Overview"          },
  { key: "courses",     icon: "📚", label: "My Courses"        },
  { key: "attendance",  icon: "✅", label: "Attendance"        },
  { key: "grades",      icon: "🏆", label: "Grades & Results"  },
  { key: "assignments", icon: "📝", label: "Assignments"       },
  { key: "fees",        icon: "💰", label: "Fee Status"        },
  { key: "notices",     icon: "📢", label: "Notices"           },
  { key: "profile",     icon: "👤", label: "My Profile"        },
]

export default function StudentDashboard() {
  const navigate  = useNavigate()
  const [active, setActive]   = useState("overview")
  const [sideOpen, setSideOpen] = useState(false)


  // ....
  const [user, setUser] = useState(null)

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", { credentials: "include" })
      const data = await res.json()
      if (data.success) setUser(data.user)
      else navigate("/login")
    } catch {
      navigate("/login")
    }
  }
  fetchUser()
}, [])

// ...

  const sidebarContent = (
    <div style={{ padding: "0 16px" }}>
      <div style={{ padding: "0 4px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>
       <div
  onClick={() => setActive("overview")}
  style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
  title="Go to Dashboard"
>
  <div style={{
    width: 38, height: 38, borderRadius: "50%",
    background: "rgba(96,165,250,0.15)",
    border: "1.5px solid rgba(96,165,250,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, color: "#60a5fa", flexShrink: 0
  }}>👤</div>
  <div>
    <div style={{ fontWeight: 700, color: "#60a5fa", fontSize: 14 }}>{user?.name || "Student"}</div>
    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)" }}>Student Portal</div>
  </div>
</div>      </div>

      {MENU.map(item => (
        <div key={item.key}
          onClick={() => { setActive(item.key); setSideOpen(false) }}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 12px", borderRadius: 8, marginBottom: 2,
            cursor: "pointer", fontSize: 14, fontWeight: 500,
            background: active === item.key ? "rgba(96,165,250,0.12)" : "transparent",
            color:      active === item.key ? "#60a5fa"               : "var(--text-muted)",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: 17, width: 24, textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div onClick={async () => { await fetch("http://localhost:5000/api/auth/logout", { method: "POST", credentials: "include" }); navigate("/login") }}
          style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "#f87171" }}>
          <span style={{ fontSize: 17, width: 24, textAlign: "center" }}>🚪</span>Sign Out
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh", paddingTop: "var(--nav-h)" }}>

      {/* Desktop Sidebar */}
      <div style={{ background: "var(--dark2)", borderRight: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, position: "sticky", top: 0, height: "calc(100vh - var(--nav-h))", overflowY: "auto" }}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {sideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 5000, display: "flex" }}>
          <div style={{ width: 260, background: "var(--dark2)", paddingTop: 80, borderRight: "1px solid rgba(255,255,255,0.06)", overflowY: "auto" }}>
            {sidebarContent}
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.6)" }} onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: "40px 36px 60px", background: "var(--dark)", minWidth: 0 }}>
        <button onClick={() => setSideOpen(true)}
          style={{ display: "none", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 8, padding: "8px 14px", color: "#60a5fa", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 24, fontFamily: "'DM Sans',sans-serif" }}
          className="student-mobile-btn">
          ☰ Menu
        </button>

        {active === "overview"    && <Overview    user={user} />}
        {active === "courses"     && <MyCourses   />}
        {active === "attendance"  && <Attendance  />}
        {active === "grades"      && <Grades      />}
        {active === "assignments" && <Assignments />}
        {active === "fees"        && <FeeStatus   />}
        {active === "notices"     && <Notices     />}
        {active === "profile"     && <Profile     user={user} />}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .student-mobile-btn { display: block !important; }
        }
        @media (max-width: 600px) {
          div[style*="padding: 40px 36px"] { padding: 24px 16px 40px !important; }
          div[style*="grid-template-columns: 260px"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
