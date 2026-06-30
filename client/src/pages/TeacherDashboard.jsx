// 
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const API = "http://localhost:5000/api"
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
})

/* ── Spinner ── */
function Spinner() {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"60px 0", gap:16 }}>
      <div style={{ width:40, height:40, border:"3px solid rgba(167,139,250,0.2)", borderTop:"3px solid #a78bfa", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <span style={{ color:"var(--text-muted)", fontSize:14 }}>Loading...</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

/* ── Error ── */
function Err({ msg, retry }) {
  return (
    <div style={{ background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.25)", borderRadius:12, padding:"28px", textAlign:"center" }}>
      <div style={{ fontSize:28, marginBottom:10 }}>⚠️</div>
      <div style={{ color:"#f87171", fontSize:15, marginBottom:16 }}>{msg}</div>
      {retry && <button onClick={retry} style={{ padding:"9px 22px", borderRadius:8, border:"1px solid rgba(248,113,113,0.4)", background:"transparent", color:"#f87171", cursor:"pointer", fontSize:13, fontFamily:"'DM Sans',sans-serif" }}>Try Again</button>}
    </div>
  )
}

/* ── Badge ── */
function Badge({ label, color }) {
  const map = {
    green:  { bg:"rgba(74,222,128,0.15)",  c:"#4ade80"   },
    gold:   { bg:"rgba(201,168,76,0.15)",  c:"var(--gold)" },
    red:    { bg:"rgba(248,113,113,0.15)", c:"#f87171"   },
    blue:   { bg:"rgba(96,165,250,0.15)",  c:"#60a5fa"   },
    purple: { bg:"rgba(167,139,250,0.15)", c:"#a78bfa"   },
    gray:   { bg:"rgba(148,163,184,0.15)", c:"#94a3b8"   },
  }
  const s = map[color] || map.purple
  return <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600, background:s.bg, color:s.c }}>{label}</span>
}

/* ── Modal ── */
function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.75)", backdropFilter:"blur(6px)", padding:20 }}>
      <div style={{ background:"var(--dark2)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:16, padding:32, width:"100%", maxWidth:500, maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--cream)" }}>{title}</span>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none", borderRadius:8, width:32, height:32, color:"var(--text-muted)", cursor:"pointer", fontSize:16 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

const inp  = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", boxSizing:"border-box" }
const lbl  = { display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#a78bfa", marginBottom:6 }
const fgrp = { marginBottom:18 }

/* ══════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════ */
function Overview({ user }) {
  const [stats,   setStats]   = useState(null)
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")

  const load = async () => {
    setLoading(true); setError("")
    try {
      const [s, p] = await Promise.all([
        fetch(`${API}/teacher/stats`,              { headers: getHeaders() }),
        fetch(`${API}/teacher/assignments/pending`,{ headers: getHeaders() }),
      ])
      const sd = await s.json(); const pd = await p.json()
      if (sd.success) setStats(sd.data)
      if (pd.success) setPending(pd.data?.slice(0,5) || [])
    } catch { setError("Could not reach server. Is backend running?") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const hr = new Date().getHours()
  const greet = hr < 12 ? "Good Morning" : hr < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <div>
      <div style={{ marginBottom:36 }}>
        <div style={{ fontSize:13, color:"var(--text-muted)", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>{greet}, Educator 📖</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:34, fontWeight:700, color:"var(--cream)" }}>
          Welcome back, <em style={{ color:"#a78bfa", fontStyle:"normal" }}>{user?.name || "Teacher"}</em>
        </div>
      </div>

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20, marginBottom:32 }}>
            {[
              { icon:"👨‍🎓", val:stats?.totalStudents  ?? "—", label:"My Students",     sub:"Across all batches"    },
              { icon:"📚",   val:stats?.totalSubjects  ?? "—", label:"Subjects Taught", sub:"This semester"          },
              { icon:"📝",   val:stats?.pendingReviews ?? "—", label:"Pending Reviews", sub:"Assignments to grade"   },
              { icon:"⭐",   val:stats?.rating         ?? "—", label:"Student Rating",  sub:`${stats?.ratingCount ?? 0} reviews` },
            ].map((c,i) => (
              <div key={i} className="card" style={{ padding:"24px" }}>
                <div style={{ fontSize:28, marginBottom:14 }}>{c.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>{c.val}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:4 }}>{c.label}</div>
                <div style={{ fontSize:12, color:"#a78bfa" }}>{c.sub}</div>
              </div>
            ))}
          </div>

          {pending.length > 0 && (
            <div className="card" style={{ padding:28, overflowX:"auto" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--cream)", marginBottom:4 }}>Pending Reviews</div>
              <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:18 }}>Submissions awaiting your feedback</div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr>{["Student","Subject","Task","Due","Status"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {pending.map((r,i) => (
                    <tr key={i}>
                      <td style={{ padding:"13px 14px", color:"var(--cream)", fontWeight:500, borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.student}</td>
                      <td style={{ padding:"13px 14px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.subject}</td>
                      <td style={{ padding:"13px 14px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.task}</td>
                      <td style={{ padding:"13px 14px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.due}</td>
                      <td style={{ padding:"13px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}><Badge label="Pending" color="gold" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MY STUDENTS
══════════════════════════════════════════════════ */
function MyStudents() {
  const [students, setStudents] = useState([])
  const [search,   setSearch]   = useState("")
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState("")

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res  = await fetch(`${API}/teacher/students`, { headers: getHeaders() })
      const json = await res.json()
      if (json.success) setStudents(json.data || [])
      else setError(json.message || "Failed.")
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const filtered = students.filter(s =>
    [s.name, s.rollNo, s.batch].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>My Students</div>
      <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>All students in your assigned batches</div>
      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search name, roll no, batch..." style={{ ...inp, maxWidth:320 }} />
        <span style={{ fontSize:13, color:"var(--text-muted)", marginLeft:"auto" }}>{filtered.length} student{filtered.length!==1?"s":""}</span>
      </div>
      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        <div className="card" style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>{["Student","Roll No","Batch","Subject","Attendance","Grade","Status"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"12px 16px", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign:"center", padding:40, color:"var(--text-muted)" }}>No students found.</td></tr>
              ) : filtered.map((s,i) => (
                <tr key={i} style={{ transition:"background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(167,139,250,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#a78bfa", flexShrink:0 }}>
                        {(s.name||"S")[0].toUpperCase()}
                      </div>
                      <span style={{ color:"var(--cream)", fontWeight:500 }}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{s.rollNo}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{s.batch}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{s.subject}</td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, height:5, background:"rgba(255,255,255,0.06)", borderRadius:3, minWidth:50 }}>
                        <div style={{ height:"100%", width:`${s.attendance||0}%`, background: s.attendance>=75?"#4ade80":s.attendance>=60?"var(--gold)":"#f87171", borderRadius:3 }} />
                      </div>
                      <span style={{ fontSize:12, color:"var(--cream)" }}>{s.attendance||0}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)", fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"#4ade80" }}>{s.grade||"—"}</td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}><Badge label={s.status||"Active"} color={s.status==="Inactive"?"gray":"green"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   SCHEDULE
══════════════════════════════════════════════════ */
function Schedule() {
  const [schedule, setSchedule] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState("")
  const [modal,    setModal]    = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [form,     setForm]     = useState({ day:"Monday", time:"", subject:"", batch:"", room:"" })
  const [saving,   setSaving]   = useState(false)
  const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/teacher/schedule`, { headers: getHeaders() })
      const j   = await res.json()
      if (j.success) setSchedule(j.data || [])
      else setError(j.message || "Failed.")
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd  = ()   => { setEditing(null); setForm({ day:"Monday", time:"", subject:"", batch:"", room:"" }); setModal(true) }
  const openEdit = item => { setEditing(item); setForm({ ...item }); setModal(true) }

  const save = async () => {
    setSaving(true)
    try {
      const url = editing ? `${API}/teacher/schedule/${editing._id}` : `${API}/teacher/schedule`
      const res = await fetch(url, { method: editing?"PUT":"POST", headers: getHeaders(), body: JSON.stringify(form) })
      const j   = await res.json()
      if (j.success) { setModal(false); load() }
      else alert(j.message || "Failed.")
    } catch { alert("Server error.") }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!window.confirm("Delete this class?")) return
    try {
      const res = await fetch(`${API}/teacher/schedule/${id}`, { method:"DELETE", headers: getHeaders() })
      const j   = await res.json()
      if (j.success) load(); else alert(j.message)
    } catch { alert("Server error.") }
  }

  const btnSm = (label, onClick, color) => (
    <button onClick={onClick} style={{ padding:"4px 12px", borderRadius:6, border:`1px solid ${color}33`, background:`${color}15`, color, cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>{label}</button>
  )

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>My Schedule</div>
          <div style={{ fontSize:13, color:"var(--text-muted)" }}>Weekly class timetable</div>
        </div>
        <button className="btn-primary" style={{ fontSize:13 }} onClick={openAdd}>+ Add Class</button>
      </div>

      {modal && (
        <Modal title={editing ? "Edit Class" : "Add Class"} onClose={() => setModal(false)}>
          <div style={fgrp}><label style={lbl}>Day</label>
            <select name="day" value={form.day} onChange={e=>setForm({...form,day:e.target.value})} style={inp}>
              {DAYS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          {[["time","Time (e.g. 9:00 AM)"],["subject","Subject"],["batch","Batch"],["room","Room"]].map(([n,l]) => (
            <div key={n} style={fgrp}><label style={lbl}>{l}</label>
              <input name={n} value={form[n]||""} onChange={e=>setForm({...form,[n]:e.target.value})} style={inp} />
            </div>
          ))}
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={save} disabled={saving}>{saving?"Saving...":editing?"Update":"Add"}</button>
            <button className="btn-outline" onClick={()=>setModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        schedule.length === 0 ? (
          <div className="card" style={{ padding:40, textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>📅</div>
            <div style={{ color:"var(--text-muted)", marginBottom:16 }}>No schedule added yet.</div>
            <button className="btn-primary" style={{ fontSize:13 }} onClick={openAdd}>+ Add First Class</button>
          </div>
        ) : DAYS.map(day => {
          const cls = schedule.filter(s => s.day === day)
          if (!cls.length) return null
          return (
            <div key={day} style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#a78bfa", marginBottom:10 }}>{day}</div>
              <div className="card" style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead><tr>{["Time","Subject","Batch","Room","Actions"].map(h=>(
                    <th key={h} style={{ textAlign:"left", padding:"10px 14px", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
                  ))}</tr></thead>
                  <tbody>
                    {cls.map((c,i) => (
                      <tr key={i}>
                        <td style={{ padding:"13px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                 <Badge
                 label={`${c.startTime} - ${c.endTime}`}
                  color="purple"
              />
           </td>
                        <td style={{ padding:"13px 14px", color:"var(--cream)", fontWeight:500, borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{c.subject}</td>
                        <td style={{ padding:"13px 14px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{c.batch}</td>
                        <td style={{ padding:"13px 14px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{c.room}</td>
                        <td style={{ padding:"13px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                          <div style={{ display:"flex", gap:8 }}>
                            {btnSm("✏️ Edit", ()=>openEdit(c), "#a78bfa")}
                            {btnSm("🗑️",     ()=>del(c._id),  "#f87171")}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   ASSIGNMENTS
══════════════════════════════════════════════════ */
function Assignments() {
  const [data,    setData]    = useState([])
  const [filter,  setFilter]  = useState("All")
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState({ title:"", subject:"", batch:"", dueDate:"", description:"" })
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/teacher/assignments`, { headers: getHeaders() })
      const j   = await res.json()
      if (j.success) setData(j.data || [])
      else setError(j.message || "Failed.")
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd  = ()   => { setEditing(null); setForm({ title:"", subject:"", batch:"", dueDate:"", description:"" }); setModal(true) }
  const openEdit = item => { setEditing(item); setForm({ ...item }); setModal(true) }

  const save = async () => {
    setSaving(true)
    try {
      const url = editing ? `${API}/teacher/assignments/${editing._id}` : `${API}/teacher/assignments`
      const res = await fetch(url, { method:editing?"PUT":"POST", headers: getHeaders(), body: JSON.stringify(form) })
      const j   = await res.json()
      if (j.success) { setModal(false); load() }
      else alert(j.message || "Failed.")
    } catch { alert("Server error.") }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!window.confirm("Delete this assignment?")) return
    try {
      const res = await fetch(`${API}/teacher/assignments/${id}`, { method:"DELETE", headers: getHeaders() })
      const j   = await res.json()
      if (j.success) load(); else alert(j.message)
    } catch { alert("Server error.") }
  }

  const filtered = filter === "All" ? data : data.filter(a => a.status === filter)
  const borderColor = s => s==="Active"?"#a78bfa":s==="Graded"?"#4ade80":"rgba(255,255,255,0.08)"

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>Assignments</div>
          <div style={{ fontSize:13, color:"var(--text-muted)" }}>Create and manage student assignments</div>
        </div>
        <button className="btn-primary" style={{ fontSize:13 }} onClick={openAdd}>+ New Assignment</button>
      </div>

      {modal && (
        <Modal title={editing?"Edit Assignment":"New Assignment"} onClose={()=>setModal(false)}>
          {[["title","Title"],["subject","Subject"],["batch","Batch"]].map(([n,l])=>(
            <div key={n} style={fgrp}><label style={lbl}>{l}</label>
              <input name={n} value={form[n]||""} onChange={e=>setForm({...form,[n]:e.target.value})} style={inp} />
            </div>
          ))}
          <div style={fgrp}><label style={lbl}>Due Date</label>
            <input type="date" value={form.dueDate||""} onChange={e=>setForm({...form,dueDate:e.target.value})} style={inp} />
          </div>
          <div style={fgrp}><label style={lbl}>Description</label>
            <textarea value={form.description||""} onChange={e=>setForm({...form,description:e.target.value})} style={{ ...inp, minHeight:80, resize:"vertical" }} />
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={save} disabled={saving}>{saving?"Saving...":editing?"Update":"Create"}</button>
            <button className="btn-outline" onClick={()=>setModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {["All","Active","Closed","Graded"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ padding:"7px 18px", borderRadius:100, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", background:filter===f?"#a78bfa":"rgba(255,255,255,0.05)", color:filter===f?"var(--dark)":"var(--text-muted)", border:`1px solid ${filter===f?"#a78bfa":"rgba(255,255,255,0.1)"}` }}>{f}</button>
        ))}
      </div>

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        filtered.length === 0 ? (
          <div className="card" style={{ padding:40, textAlign:"center" }}>
            <div style={{ fontSize:36, marginBottom:12 }}>📝</div>
            <div style={{ color:"var(--text-muted)", marginBottom:16 }}>No assignments found.</div>
            <button className="btn-primary" style={{ fontSize:13 }} onClick={openAdd}>+ Create First</button>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {filtered.map((a,i) => (
              <div key={i} className="card" style={{ padding:24, borderLeft:`3px solid ${borderColor(a.status)}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                  <div>
                    <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:6 }}>{a.title}</div>
                    <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:4 }}>📚 {a.subject} &nbsp;·&nbsp; 👥 {a.batch}</div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>📅 Due: <span style={{ color:"var(--cream)" }}>{a.dueDate}</span>
                      {a.submissionsCount !== undefined && <span> &nbsp;·&nbsp; 📬 <span style={{ color:"#a78bfa", fontWeight:600 }}>{a.submissionsCount}</span> submissions</span>}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                    <Badge label={a.status||"Active"} color={a.status==="Graded"?"green":a.status==="Closed"?"gray":"purple"} />
                    <button onClick={()=>openEdit(a)} style={{ padding:"5px 12px", borderRadius:6, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.1)", color:"#a78bfa", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>✏️ Edit</button>
                    <button onClick={()=>del(a._id)}  style={{ padding:"5px 12px", borderRadius:6, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#f87171", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>🗑️</button>
                  </div>
                </div>
                {a.description && <div style={{ marginTop:12, fontSize:14, color:"var(--text-muted)", lineHeight:1.7, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.05)" }}>{a.description}</div>}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   GRADE BOOK
══════════════════════════════════════════════════ */
function GradeBook() {
  const [data,    setData]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState({ student:"", subject:"", exam:"", marks:"", maxMarks:"100", grade:"" })
  const [saving,  setSaving]  = useState(false)

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/teacher/grade`, { headers: getHeaders() })
      const j   = await res.json()
      if (j.success) setData(j.data || [])
      else setError(j.message || "Failed.")
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd  = ()   => { setEditing(null); setForm({ student:"", subject:"", exam:"", marks:"", maxMarks:"100", grade:"" }); setModal(true) }
  const openEdit = item => { setEditing(item); setForm({ ...item }); setModal(true) }

  const save = async () => {
    setSaving(true)
    try {
      const url = editing ? `${API}/teacher/grade/${editing._id}` : `${API}/teacher/grade`
      const res = await fetch(url, { method:editing?"PUT":"POST", headers: getHeaders(), body: JSON.stringify(form) })
      const j   = await res.json()
      if (j.success) { setModal(false); load() }
      else alert(j.message || "Failed.")
    } catch { alert("Server error.") }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!window.confirm("Delete this grade?")) return
    try {
      const res = await fetch(`${API}/teacher/grade/${id}`, { method:"DELETE", headers: getHeaders() })
      const j   = await res.json()
      if (j.success) load(); else alert(j.message)
    } catch { alert("Server error.") }
  }

  const gc = g => !g?"var(--text-muted)":["A+","A"].includes(g)?"#4ade80":["B+","B"].includes(g)?"#60a5fa":["C+","C"].includes(g)?"var(--gold)":"#f87171"

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>Grade Book</div>
          <div style={{ fontSize:13, color:"var(--text-muted)" }}>Manage student marks and grades</div>
        </div>
        <button className="btn-primary" style={{ fontSize:13 }} onClick={openAdd}>+ Add Grade</button>
      </div>

      {modal && (
        <Modal title={editing?"Edit Grade":"Add Grade"} onClose={()=>setModal(false)}>
          {[["student","Student Name"],["subject","Subject"],["exam","Exam / Test"]].map(([n,l])=>(
            <div key={n} style={fgrp}><label style={lbl}>{l}</label>
              <input name={n} value={form[n]||""} onChange={e=>setForm({...form,[n]:e.target.value})} style={inp} />
            </div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={fgrp}><label style={lbl}>Marks</label>
              <input type="number" value={form.marks||""} onChange={e=>setForm({...form,marks:e.target.value})} style={inp} />
            </div>
            <div style={fgrp}><label style={lbl}>Max Marks</label>
              <input type="number" value={form.maxMarks||""} onChange={e=>setForm({...form,maxMarks:e.target.value})} style={inp} />
            </div>
          </div>
          <div style={fgrp}><label style={lbl}>Grade (A+, A, B+...)</label>
            <input value={form.grade||""} onChange={e=>setForm({...form,grade:e.target.value})} style={inp} />
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={save} disabled={saving}>{saving?"Saving...":editing?"Update":"Add Grade"}</button>
            <button className="btn-outline" onClick={()=>setModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        <div className="card" style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>{["Student","Subject","Exam","Marks","Grade","Actions"].map(h=>(
              <th key={h} style={{ textAlign:"left", padding:"12px 16px", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign:"center", padding:40, color:"var(--text-muted)" }}>No grade added yet.</td></tr>
              ) : data.map((r,i) => (
                <tr key={i} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"13px 16px", color:"var(--cream)", fontWeight:500, borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.student}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.subject}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.exam}</td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color:"var(--cream)", fontWeight:600 }}>{r.marks}</span>
                    <span style={{ color:"var(--text-muted)", fontSize:12 }}>/{r.maxMarks||100}</span>
                  </td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)", fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:gc(r.grade) }}>{r.grade}</td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={()=>openEdit(r)} style={{ padding:"4px 12px", borderRadius:6, border:"1px solid rgba(167,139,250,0.3)", background:"rgba(167,139,250,0.1)", color:"#a78bfa", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>✏️</button>
                      <button onClick={()=>del(r._id)}  style={{ padding:"4px 12px", borderRadius:6, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.1)", color:"#f87171", cursor:"pointer", fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   ATTENDANCE
══════════════════════════════════════════════════ */
function Attendance() {
  const [records,  setRecords]  = useState([])
  const [students, setStudents] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState("")
  const [modal,    setModal]    = useState(false)
  const [form,     setForm]     = useState({ date:new Date().toISOString().slice(0,10), subject:"", batch:"", students:[] })
  const [saving,   setSaving]   = useState(false)

  const load = async () => {
    setLoading(true); setError("")
    try {
      const [r, s] = await Promise.all([
        fetch(`${API}/teacher/attendance`, { headers: getHeaders() }),
        fetch(`${API}/teacher/students`,   { headers: getHeaders() }),
      ])
      const rd = await r.json(); const sd = await s.json()
      if (rd.success) setRecords(rd.data || [])
      if (sd.success) setStudents(sd.data || [])
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const toggle = (id, status) => {
    setForm(prev => {
      const exists = prev.students.find(s => s.id === id)
      const updated = exists
        ? prev.students.map(s => s.id===id ? {...s,status} : s)
        : [...prev.students, { id, status }]
      return { ...prev, students: updated }
    })
  }

  const getStatus = id => form.students.find(s => s.id === id)?.status || "Present"

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${API}/teacher/attendance`, { method:"POST", headers: getHeaders(), body: JSON.stringify(form) })
      const j   = await res.json()
      if (j.success) { setModal(false); load() }
      else alert(j.message || "Failed.")
    } catch { alert("Server error.") }
    finally { setSaving(false) }
  }

  const statusColor = s => s==="Present"?"#4ade80":s==="Absent"?"#f87171":"var(--gold)"

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>Attendance</div>
          <div style={{ fontSize:13, color:"var(--text-muted)" }}>Mark and view student attendance</div>
        </div>
        <button className="btn-primary" style={{ fontSize:13 }} onClick={()=>{ setForm({ date:new Date().toISOString().slice(0,10), subject:"", batch:"", students:[] }); setModal(true) }}>+ Mark Attendance</button>
      </div>

      {modal && (
        <Modal title="Mark Attendance" onClose={()=>setModal(false)}>
          <div style={fgrp}><label style={lbl}>Date</label>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={inp} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={fgrp}><label style={lbl}>Subject</label>
              <input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} style={inp} />
            </div>
            <div style={fgrp}><label style={lbl}>Batch</label>
              <input value={form.batch} onChange={e=>setForm({...form,batch:e.target.value})} style={inp} />
            </div>
          </div>
          {students.length > 0 && (
            <>
              <label style={lbl}>Mark Students</label>
              <div style={{ maxHeight:220, overflowY:"auto", background:"rgba(255,255,255,0.03)", borderRadius:8, padding:8, marginBottom:16 }}>
                {students.map(s => (
                  <div key={s._id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 4px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize:14, color:"var(--cream)" }}>{s.name}</span>
                    <div style={{ display:"flex", gap:6 }}>
                      {["Present","Absent","Late"].map(opt => {
                        const active = getStatus(s._id) === opt
                        return (
                          <button key={opt} onClick={()=>toggle(s._id, opt)} style={{ padding:"3px 10px", borderRadius:100, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:"none", background: active ? statusColor(opt) : "rgba(255,255,255,0.07)", color: active ? "var(--dark)" : "var(--text-muted)" }}>{opt}</button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{ display:"flex", gap:12 }}>
            <button className="btn-primary" style={{ flex:1, justifyContent:"center" }} onClick={save} disabled={saving}>{saving?"Saving...":"Submit Attendance"}</button>
            <button className="btn-outline" onClick={()=>setModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        <div className="card" style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>{["Date","Subject","Batch","Present","Absent","Late"].map(h=>(
              <th key={h} style={{ textAlign:"left", padding:"12px 16px", fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:"uppercase", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign:"center", padding:40, color:"var(--text-muted)" }}>No attendance records yet.</td></tr>
              ) : records.map((r,i) => (
                <tr key={i} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.02)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"13px 16px", color:"var(--cream)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.date}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.subject}</td>
                  <td style={{ padding:"13px 16px", color:"var(--text-muted)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>{r.batch}</td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}><span style={{ color:"#4ade80", fontWeight:700 }}>{r.present}</span></td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}><span style={{ color:"#f87171", fontWeight:700 }}>{r.absent}</span></td>
                  <td style={{ padding:"13px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)" }}><span style={{ color:"var(--gold)", fontWeight:700 }}>{r.late||0}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   PROFILE
══════════════════════════════════════════════════ */
function Profile({ user }) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState("")
  const [editing, setEditing] = useState(false)
  const [form,    setForm]    = useState({})
  const [saved,   setSaved]   = useState(false)

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch(`${API}/teacher/profile`, { headers: getHeaders() })
      const j   = await res.json()
      if (j.success) { setData(j.data); setForm(j.data) }
      else setError(j.message || "Failed.")
    } catch { setError("Could not reach server.") }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const saveProfile = async () => {
    try {
      const res = await fetch(`${API}/teacher/profile`, { method:"PUT", headers: getHeaders(), body: JSON.stringify(form) })
      const j   = await res.json()
      if (j.success) { setData(form); setEditing(false); setSaved(true); setTimeout(()=>setSaved(false),3000) }
      else alert(j.message || "Failed.")
    } catch { alert("Server error.") }
  }

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const FIELDS = [
    { label:"Full Name",     name:"name"          },
    { label:"Email",         name:"email"         },
    { label:"Phone",         name:"phone"         },
    { label:"Department",    name:"department"    },
    { label:"Qualification", name:"qualification" },
    { label:"Experience",    name:"experience"    },
    { label:"Subjects",      name:"subjects",  wide:true },
    { label:"Address",       name:"address",   wide:true },
  ]

  return (
    <div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"var(--cream)", marginBottom:4 }}>My Profile</div>
      <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>Your personal and professional details</div>

      {loading ? <Spinner /> : error ? <Err msg={error} retry={load} /> : (
        <>
          {saved && (
            <div style={{ background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:8, padding:"12px 18px", marginBottom:20, color:"#4ade80", fontSize:14 }}>
              ✅ Profile updated successfully!
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:24, alignItems:"start" }}>
            {/* Avatar */}
            <div className="card" style={{ padding:28, textAlign:"center", minWidth:200 }}>
              <div style={{ width:90, height:90, borderRadius:"50%", background:"linear-gradient(135deg,#a78bfa,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, margin:"0 auto 16px", border:"3px solid rgba(167,139,250,0.3)" }}>
                {(data?.name||user?.name||"T")[0].toUpperCase()}
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--cream)", marginBottom:4 }}>{data?.name||user?.name}</div>
              <div style={{ fontSize:13, color:"#a78bfa", marginBottom:12 }}>{data?.employeeId||"Teacher"}</div>
              <Badge label={data?.status||"Active"} color="green" />
              {[["📚",data?.department],["🎓",data?.qualification],["💼",data?.experience]].filter(([,v])=>v).map(([icon,val],i)=>(
                <div key={i} style={{ fontSize:13, color:"var(--text-muted)", display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginTop:10 }}>
                  <span>{icon}</span><span>{val}</span>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="card" style={{ padding:28 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--cream)" }}>{editing?"Edit Profile":"Personal Details"}</span>
                <button onClick={()=>editing?saveProfile():setEditing(true)} className={editing?"btn-primary":"btn-outline"} style={{ fontSize:13, padding:"8px 20px" }}>
                  {editing?"💾 Save":"✏️ Edit"}
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {FIELDS.map(f => (
                  <div key={f.name} style={{ gridColumn: f.wide ? "span 2" : "auto" }}>
                    <label style={lbl}>{f.label}</label>
                    {editing
                      ? <input name={f.name} value={form[f.name]||""} onChange={handle} style={inp} />
                      : <div style={{ fontSize:14, color:data?.[f.name]?"var(--cream)":"var(--text-muted)", padding:"11px 0" }}>{data?.[f.name]||"—"}</div>
                    }
                  </div>
                ))}
              </div>
              {editing && <button onClick={()=>setEditing(false)} className="btn-outline" style={{ marginTop:16, fontSize:13 }}>Cancel</button>}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MAIN — TeacherDashboard
══════════════════════════════════════════════════ */
const MENU = [
  { key:"overview",    icon:"🏠", label:"Overview"      },
  { key:"students",    icon:"👨‍🎓",label:"My Students"   },
  { key:"schedule",    icon:"📅", label:"Schedule"      },
  { key:"assignments", icon:"📝", label:"Assignments"   },
  { key:"grades",      icon:"📊", label:"Grade Book"    },
  { key:"attendance",  icon:"📋", label:"Attendance"    },
  { key:"profile",     icon:"👤", label:"My Profile"    },
]

export default function TeacherDashboard() {
  const navigate   = useNavigate()
  const [active,   setActive]   = useState("overview")
  const [mobileMenu, setMobileMenu] = useState(false)

  // .....
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

  const Sidebar = () => (
    <div style={{ padding:"0 16px" }}>
      <div style={{ padding:"0 4px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:20 }}>
        <div
  onClick={() => setActive("overview")}
  style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }}
  title="Go to Dashboard"
>
  <div style={{
    width:38, height:38, borderRadius:"50%",
    background:"rgba(167,139,250,0.15)",
    border:"1.5px solid rgba(167,139,250,0.4)",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:18, color:"#a78bfa", flexShrink:0
  }}>👤</div>
  <div>
    <div style={{ fontWeight:700, color:"#a78bfa", fontSize:14 }}>{user?.name || "Teacher"}</div>
    <div style={{ fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"var(--text-muted)" }}>Teacher Portal</div>
  </div>
</div>      </div>
      {MENU.map(item => (
        <div key={item.key} onClick={()=>{ setActive(item.key); setMobileMenu(false) }} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:8, marginBottom:2, cursor:"pointer", fontSize:14, fontWeight:500, background:active===item.key?"rgba(167,139,250,0.12)":"transparent", color:active===item.key?"#a78bfa":"var(--text-muted)", transition:"all 0.2s" }}>
          <span style={{ fontSize:17, width:24, textAlign:"center" }}>{item.icon}</span>{item.label}
        </div>
      ))}
      <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div onClick={async ()=>{ await fetch("http://localhost:5000/api/auth/logout", { method:"POST", credentials:"include" }); navigate("/login") }} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 12px", borderRadius:8, cursor:"pointer", fontSize:14, color:"#f87171" }}>
          <span style={{ fontSize:17, width:24, textAlign:"center" }}>🚪</span>Sign Out
        </div>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .td-layout { display: grid; grid-template-columns: 260px 1fr; min-height: 100vh; padding-top: var(--nav-h); }
        .td-sidebar { background: var(--dark2); border-right: 1px solid rgba(255,255,255,0.06); padding-top: 32px; position: sticky; top: 0; height: calc(100vh - var(--nav-h)); overflow-y: auto; }
        .td-main { padding: 40px 36px 60px; background: var(--dark); min-width: 0; overflow-x: hidden; }
        .td-mobile-btn { display: none !important; }
        @media (max-width: 900px) {
          .td-layout { grid-template-columns: 1fr !important; }
          .td-sidebar { display: none; }
          .td-mobile-btn { display: flex !important; }
          .td-main { padding: 24px 16px 40px !important; }
        }
        @media (max-width: 600px) {
          .td-profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="td-layout">
        {/* Desktop Sidebar */}
        <div className="td-sidebar"><Sidebar /></div>

        {/* Mobile Overlay */}
        {mobileMenu && (
          <div style={{ position:"fixed", inset:0, zIndex:5000, display:"flex" }}>
            <div style={{ width:260, background:"var(--dark2)", paddingTop:80, overflowY:"auto", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
              <Sidebar />
            </div>
            <div style={{ flex:1, background:"rgba(0,0,0,0.65)" }} onClick={()=>setMobileMenu(false)} />
          </div>
        )}

        {/* Main */}
        <div className="td-main">
          <button className="td-mobile-btn btn-outline" style={{ marginBottom:24, fontSize:13, padding:"8px 18px", color:"#a78bfa", borderColor:"rgba(167,139,250,0.4)" }} onClick={()=>setMobileMenu(true)}>
            ☰ Menu
          </button>

          {active === "overview"    && <Overview    user={user} />}
          {active === "students"    && <MyStudents  />}
          {active === "schedule"    && <Schedule    />}
          {active === "assignments" && <Assignments />}
          {active === "grades"      && <GradeBook   />}
          {active === "attendance"  && <Attendance  />}
          {active === "profile"     && <Profile     user={user} />}
        </div>
      </div>
    </>
  )
}
