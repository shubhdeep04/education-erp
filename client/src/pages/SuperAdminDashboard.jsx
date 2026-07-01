
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

/* ══════════════════════════════════════════════════════════════
   SUPER ADMIN — Credentials
   Change these to your own secure values!
══════════════════════════════════════════════════════════════ */
const SA_ID = "superadmin@gmail.com"
const SA_PASSWORD = "123456"

/* ─── localStorage helpers ──────────────────────────────────── */
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val))

/* ─── Activity Logger ───────────────────────────────────────── */
const logActivity = (action, detail = "") => {
  const logs = load("sa_activity", [])
  logs.unshift({ id: Date.now(), action, detail, time: new Date().toLocaleString("en-IN") })
  save("sa_activity", logs.slice(0, 100)) // keep last 100
}

/* ─── CSS Variables + Global Styles ────────────────────────── */
const GLOBAL_CSS = `
:root {
  --sa-bg: #060810;
  --sa-card: #0d1117;
  --sa-border: rgba(99,179,237,0.12);
  --sa-accent: #63b3ed;
  --sa-accent2: #9f7aea;
  --sa-accent3: #68d391;
  --sa-red: #fc8181;
  --sa-gold: #f6e05e;
  --sa-text: #e2e8f0;
  --sa-muted: #718096;
  --sa-glow: 0 0 32px rgba(99,179,237,0.15);
}
.sa-input {
  width:100%; padding:11px 14px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(99,179,237,0.2);
  border-radius:8px; color:var(--sa-text);
  font-family:'DM Sans',sans-serif; font-size:14px;
  outline:none; box-sizing:border-box; transition:border-color 0.2s;
}
.sa-input:focus { border-color:var(--sa-accent); }
.sa-btn {
  padding:10px 20px; border-radius:8px; border:none;
  font-family:'DM Sans',sans-serif; font-size:13px;
  font-weight:600; cursor:pointer; transition:all 0.2s;
}
.sa-btn-primary {
  background:linear-gradient(135deg,var(--sa-accent),var(--sa-accent2));
  color:#fff;
}
.sa-btn-primary:hover { opacity:0.88; transform:translateY(-1px); }
.sa-btn-danger { background:rgba(252,129,129,0.12); color:var(--sa-red); border:1px solid rgba(252,129,129,0.3); }
.sa-btn-ghost { background:rgba(255,255,255,0.05); color:var(--sa-muted); border:1px solid rgba(255,255,255,0.08); }
.sa-btn-success { background:rgba(104,211,145,0.12); color:var(--sa-accent3); border:1px solid rgba(104,211,145,0.3); }
.sa-card {
  background:var(--sa-card); border:1px solid var(--sa-border);
  border-radius:14px; padding:24px;
}
.sa-tab-btn {
  padding:9px 16px; border-radius:8px; border:none;
  font-size:12px; font-weight:600; cursor:pointer;
  font-family:'DM Sans',sans-serif; transition:all 0.2s;
  white-space:nowrap;
}
.sa-label {
  display:block; font-size:10px; font-weight:700;
  letter-spacing:1.2px; text-transform:uppercase;
  color:var(--sa-accent); margin-bottom:6px;
}
.sa-tag {
  display:inline-block; padding:2px 10px; border-radius:100px;
  font-size:11px; font-weight:700; letter-spacing:0.5px;
}
@keyframes sa-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
@keyframes sa-spin { to{transform:rotate(360deg)} }
@keyframes sa-fade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.sa-fade { animation:sa-fade 0.3s ease forwards; }
@media(max-width:900px){
  .sa-sidebar-desktop{display:none!important;}
  .sa-mob-btn{display:flex!important;}
  .sa-main-grid{grid-template-columns:1fr!important;}
}
`

/* ─── Mini helpers ──────────────────────────────────────────── */
function SALabel({ children }) {
  return <label style={{ display:"block", fontSize:10, fontWeight:700, letterSpacing:1.2, textTransform:"uppercase", color:"var(--sa-accent)", marginBottom:6 }}>{children}</label>
}
function SAField({ label, name, value, onChange, placeholder, type="text", readOnly }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <SALabel>{label}</SALabel>}
      <input className="sa-input" type={type} name={name} value={value||""} onChange={onChange}
        placeholder={placeholder||""} readOnly={readOnly}
        style={readOnly?{opacity:0.5,cursor:"not-allowed"}:{}} />
    </div>
  )
}
function SATA({ label, name, value, onChange, rows=3 }) {
  return (
    <div style={{ marginBottom:16 }}>
      {label && <SALabel>{label}</SALabel>}
      <textarea className="sa-input" name={name} value={value||""} onChange={onChange} rows={rows}
        style={{ resize:"vertical" }} />
    </div>
  )
}
function SAGrid2({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 16px" }}>{children}</div>
}
function SAGrid3({ children }) {
  return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0 12px" }}>{children}</div>
}
function SASub({ children }) {
  return <div style={{ fontSize:13, fontWeight:700, color:"var(--sa-text)", margin:"24px 0 14px", paddingBottom:8, borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:8 }}>{children}</div>
}
function SABox({ children, style={} }) {
  return <div style={{ padding:"16px 20px", background:"rgba(255,255,255,0.02)", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)", marginBottom:16, ...style }}>{children}</div>
}
function SABadge({ color="#63b3ed", children }) {
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:100, fontSize:11, fontWeight:700, background:`${color}18`, color, border:`1px solid ${color}44` }}>{children}</span>
}
function SAStat({ icon, label, value, color="#63b3ed", sub }) {
  return (
    <div className="sa-card" style={{ display:"flex", gap:16, alignItems:"center" }}>
      <div style={{ width:48, height:48, borderRadius:12, background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:22, fontWeight:900, color, fontFamily:"'DM Mono',monospace", letterSpacing:-1 }}>{value}</div>
        <div style={{ fontSize:12, color:"var(--sa-muted)", marginTop:2 }}>{label}</div>
        {sub && <div style={{ fontSize:11, color, marginTop:2 }}>{sub}</div>}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   LOGIN SCREEN
══════════════════════════════════════════════════════════════ */
function SuperAdminLogin({ onLogin }) {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [err, setErr] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const attempt = () => {
    if (!id || !pw) { setErr("Both fields are required."); return }
    setLoading(true)
    setTimeout(() => {
      if (id === SA_ID && pw === SA_PASSWORD) {
        logActivity("LOGIN", "Super Admin signed in")
        onLogin()
      } else {
        setErr("Invalid credentials. Access denied.")
        logActivity("FAILED_LOGIN", `Attempt with ID: ${id}`)
      }
      setLoading(false)
    }, 900)
  }

  return (
    <div style={{ minHeight:"100vh", background:"var(--sa-bg)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", padding:20, position:"relative", overflow:"hidden" }}>
      {/* Ambient glow orbs */}
      <div style={{ position:"absolute", top:"10%", left:"15%", width:400, height:400, borderRadius:"50%", background:"rgba(99,179,237,0.04)", filter:"blur(80px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"10%", width:300, height:300, borderRadius:"50%", background:"rgba(159,122,234,0.05)", filter:"blur(60px)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:420, animation:"sa-fade 0.5s ease" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ width:72, height:72, borderRadius:20, background:"linear-gradient(135deg,rgba(99,179,237,0.15),rgba(159,122,234,0.15))", border:"1px solid rgba(99,179,237,0.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:32 }}>🛡️</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"var(--sa-text)", marginBottom:6 }}>Super Admin Portal</div>
          <div style={{ fontSize:13, color:"var(--sa-muted)" }}>EduSphere — Restricted Access Only</div>
        </div>

        {/* Warning strip */}
        <div style={{ background:"rgba(252,129,129,0.06)", border:"1px solid rgba(252,129,129,0.2)", borderRadius:10, padding:"12px 16px", marginBottom:28, display:"flex", gap:10, alignItems:"flex-start" }}>
          <span style={{ fontSize:16 }}>⚠️</span>
          <div style={{ fontSize:12, color:"#fc8181", lineHeight:1.6 }}>
            This portal is for <strong>Super Administrators only</strong>. Unauthorized access attempts are logged and reported.
          </div>
        </div>

        {/* Form card */}
        <div className="sa-card" style={{ padding:32 }}>
          <div style={{ marginBottom:20 }}>
            <SALabel>Super Admin ID</SALabel>
            <input className="sa-input" value={id} onChange={e=>{setId(e.target.value);setErr("")}}
              placeholder="Enter your admin ID"
              onKeyDown={e=>e.key==="Enter"&&attempt()} />
          </div>
          <div style={{ marginBottom:8 }}>
            <SALabel>Password</SALabel>
            <div style={{ position:"relative" }}>
              <input className="sa-input" type={show?"text":"password"} value={pw} onChange={e=>{setPw(e.target.value);setErr("")}}
                placeholder="••••••••••••"
                onKeyDown={e=>e.key==="Enter"&&attempt()}
                style={{ paddingRight:44 }} />
              <button onClick={()=>setShow(s=>!s)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--sa-muted)", fontSize:16 }}>
                {show ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {err && <div style={{ fontSize:13, color:"var(--sa-red)", marginBottom:16, padding:"10px 14px", background:"rgba(252,129,129,0.08)", borderRadius:8, border:"1px solid rgba(252,129,129,0.2)" }}>🚫 {err}</div>}

          <button className="sa-btn sa-btn-primary" onClick={attempt} disabled={loading}
            style={{ width:"100%", padding:"14px", fontSize:15, marginTop:8, opacity:loading?0.7:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {loading ? <><span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"sa-spin 0.8s linear infinite", display:"inline-block" }} />Verifying...</> : "🔐 Access Dashboard"}
          </button>
        </div>

        <div style={{ textAlign:"center", marginTop:20, fontSize:12, color:"var(--sa-muted)" }}>
          🔒 Session data is stored locally · Not for public access
        </div>
      </div>

      <style>{GLOBAL_CSS}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: OVERVIEW / ANALYTICS
══════════════════════════════════════════════════════════════ */
function SAOverview() {
  const students = load("students", [])
  const teachers = load("teachers", [])
  const courses = load("courses", [])
  const fees = load("fees", [])
  const notices = load("notices", [])
  const activity = load("sa_activity", [])
  const site = load("siteSettings", {})

  const totalFees = fees.reduce((a,f)=>a+Number(f.paid||0),0)
  const pendingFees = fees.filter(f=>f.status==="Pending").length
  const activeStudents= students.filter(s=>s.status==="active").length

  return (
    <div className="sa-fade">
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:28 }}>
        <SAStat icon="👥" label="Total Students" value={students.length} color="#63b3ed" sub={`${activeStudents} active`} />
        <SAStat icon="🧑‍🏫" label="Teachers" value={teachers.length} color="#9f7aea" />
        <SAStat icon="📚" label="Courses" value={courses.length} color="#68d391" />
        <SAStat icon="💰" label="Fees Collected" value={`₹${(totalFees/1000).toFixed(0)}K`} color="#f6e05e" sub={`${pendingFees} pending`} />
        <SAStat icon="📢" label="Active Notices" value={notices.length} color="#fc8181" />
        <SAStat icon="🌐" label="Site Status" value={site.admissionOpen==="true"?"LIVE":"PAUSED"} color={site.admissionOpen==="true"?"#68d391":"#fc8181"} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Activity Log */}
        <div className="sa-card">
          <div style={{ fontSize:14, fontWeight:700, color:"var(--sa-text)", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span>🕐</span> Recent Activity Log
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8, maxHeight:340, overflowY:"auto" }}>
            {activity.length === 0 && <div style={{ fontSize:13, color:"var(--sa-muted)" }}>No activity yet.</div>}
            {activity.map((a,i) => (
              <div key={i} style={{ padding:"10px 14px", background:"rgba(255,255,255,0.02)", borderRadius:8, borderLeft:`3px solid ${a.action==="LOGIN"?"#68d391":a.action==="FAILED_LOGIN"?"#fc8181":"#63b3ed"}` }}>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--sa-text)" }}>{a.action}</div>
                {a.detail && <div style={{ fontSize:11, color:"var(--sa-muted)", marginTop:2 }}>{a.detail}</div>}
                <div style={{ fontSize:10, color:"var(--sa-muted)", marginTop:4 }}>🕐 {a.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Site Info */}
        <div className="sa-card">
          <div style={{ fontSize:14, fontWeight:700, color:"var(--sa-text)", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span>🌐</span> Live Site Snapshot
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { k:"School Name", v: site.schoolName || "—" },
              { k:"Admission", v: site.admissionOpen==="true" ? "🟢 Open" : "🔴 Closed" },
              { k:"Hero Tagline", v: site.tagline || "—" },
              { k:"Phone", v: site.phone || "—" },
              { k:"Email", v: site.email || "—" },
              { k:"Meta Title", v: site.metaTitle || "—" },
              { k:"Hero Image", v: site.heroImage ? "✅ Set" : "❌ Not set" },
              { k:"Partners", v: (site.partners||"").split(",").filter(Boolean).length + " listed" },
            ].map((r,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:13 }}>
                <span style={{ color:"var(--sa-muted)" }}>{r.k}</span>
                <span style={{ color:"var(--sa-text)", fontWeight:600, textAlign:"right", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: SITE SETTINGS (full home page control)
══════════════════════════════════════════════════════════════ */
const SS_TABS = [
  {key:"hero",label:"🏠 Hero"},{key:"counters",label:"🔢 Counters"},
  {key:"features",label:"✨ Features"},{key:"achievements",label:"🏆 Awards"},
  {key:"testimonials",label:"💬 Testimonials"},{key:"team",label:"👨‍🏫 Team"},
  {key:"events",label:"📅 Events"},{key:"faq",label:"❓ FAQ"},
  {key:"partners",label:"🤝 Partners"},{key:"video",label:"🎬 Video"},
  {key:"newsletter",label:"📬 Newsletter"},{key:"cta",label:"📣 CTA"},
  {key:"about",label:"i️ About"},{key:"contact",label:"📞 Contact"},
  {key:"general",label:"⚙️ Branding"},{key:"social",label:"🔗 Social"},
  {key:"images",label:"🖼️ Images"},{key:"seo",label:"🔍 SEO"},
]

function SASiteSettings() {
  const defaultSite = load("siteSettings", {})
  const [form, setForm] = useState({ ...defaultSite })
  const [tab, setTab] = useState("hero")
  const [saved,setSaved]= useState(false)
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const IN = ({label,name,placeholder}) => (
    <div style={{marginBottom:16}}>
      {label && <SALabel>{label}</SALabel>}
      <input className="sa-input" name={name} value={form[name]||""} onChange={h} placeholder={placeholder||""} />
    </div>
  )
  const TA = ({label,name,rows=3}) => (
    <div style={{marginBottom:16}}>
      {label && <SALabel>{label}</SALabel>}
      <textarea className="sa-input" name={name} value={form[name]||""} onChange={h} rows={rows} style={{resize:"vertical"}} />
    </div>
  )
  const Two = ({children}) => <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>{children}</div>

  const submit = () => {
    save("siteSettings", form)
    logActivity("SITE_SETTINGS_SAVED", `Tab: ${tab}`)
    setSaved(true); setTimeout(()=>setSaved(false),3000)
  }

  return (
    <div className="sa-fade">
      {saved && (
        <div style={{ background:"rgba(104,211,145,0.1)", border:"1px solid rgba(104,211,145,0.3)", borderRadius:10, padding:"12px 18px", marginBottom:20, color:"#68d391", fontSize:14 }}>
          ✅ Site settings saved! Reload the public website to see changes.
        </div>
      )}
      {/* Tab bar */}
      <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
        {SS_TABS.map(t => (
          <button key={t.key} className="sa-tab-btn" onClick={()=>setTab(t.key)}
            style={{ background:tab===t.key?"var(--sa-accent)":"rgba(255,255,255,0.04)", color:tab===t.key?"#000":"var(--sa-muted)", border:"1px solid "+(tab===t.key?"var(--sa-accent)":"rgba(255,255,255,0.08)") }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="sa-card">
        {tab==="hero" && (<>
          <SASub>🏠 Hero Section</SASub>
          <IN label="Badge Text" name="heroBadge" placeholder="Now Enrolling for 2025–26" />
          <IN label="Hero Heading (before 'Future')" name="tagline" placeholder="Shape Your" />
          <TA label="Hero Description" name="heroDesc" rows={3} />
          <Two><IN label="Admission Open (true/false)" name="admissionOpen" /><IN label="Admission Banner Message" name="admissionMsg" /></Two>
          <SASub>📊 Stats Bar (4 tiles)</SASub>
          <Two>
            <IN label="Stat 1 Value" name="stat1Val" /><IN label="Stat 1 Label" name="stat1Label" />
            <IN label="Stat 2 Value" name="stat2Val" /><IN label="Stat 2 Label" name="stat2Label" />
            <IN label="Stat 3 Value" name="stat3Val" /><IN label="Stat 3 Label" name="stat3Label" />
            <IN label="Stat 4 Value" name="stat4Val" /><IN label="Stat 4 Label" name="stat4Label" />
          </Two>
        </>)}
        {tab==="counters" && (<>
          <SASub>🔢 Animated Counter Stats (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Counter {n}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"0 12px"}}>
                <IN label="End Number" name={`counter${n}End`} placeholder="5000" />
                <IN label="Suffix" name={`counter${n}Suffix`} placeholder="+" />
                <IN label="Icon" name={`counter${n}Icon`} placeholder="🎓" />
                <IN label="Label" name={`counter${n}Label`} placeholder="Students Enrolled" />
              </div>
            </SABox>
          ))}
        </>)}
        {tab==="features" && (<>
          <SASub>✨ Feature Cards (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Feature {n}</div>
              <div style={{display:"grid",gridTemplateColumns:"64px 1fr 2fr",gap:"0 12px"}}>
                <IN label="Icon" name={`feat${n}Icon`} placeholder="🎓" />
                <IN label="Title" name={`feat${n}Title`} placeholder="Expert Faculty" />
                <IN label="Description" name={`feat${n}Desc`} placeholder="Short description..." />
              </div>
            </SABox>
          ))}
        </>)}
        {tab==="achievements" && (<>
          <SASub>🏆 Awards & Achievements (4)</SASub>
          {[1,2,3,4].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Achievement {n}</div>
              <div style={{display:"grid",gridTemplateColumns:"64px 80px 1fr",gap:"0 12px"}}>
                <IN label="Icon" name={`ach${n}Icon`} placeholder="🥇" />
                <IN label="Year" name={`ach${n}Year`} placeholder="2024" />
                <IN label="Title" name={`ach${n}Title`} placeholder="Best Institution" />
              </div>
              <TA label="Description" name={`ach${n}Body`} rows={2} />
            </SABox>
          ))}
        </>)}
        {tab==="testimonials" && (<>
          <SASub>💬 Student Testimonials (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Testimonial {n}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 60px",gap:"0 12px"}}>
                <IN label="Name" name={`test${n}Name`} placeholder="Priya Sharma" />
                <IN label="Role" name={`test${n}Role`} placeholder="JEE Qualifier, IIT Delhi" />
                <IN label="Avatar (letter)" name={`test${n}Avatar`} placeholder="P" />
              </div>
              <TA label="Testimonial Text" name={`test${n}Text`} rows={3} />
            </SABox>
          ))}
        </>)}
        {tab==="team" && (<>
          <SASub>👨‍🏫 Team Members (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Member {n}</div>
              <Two>
                <IN label="Full Name" name={`team${n}Name`} placeholder="Dr. Rajesh Kumar" />
                <IN label="Role" name={`team${n}Role`} placeholder="Principal & Founder" />
                <IN label="Subject" name={`team${n}Subject`} placeholder="Physics" />
                <IN label="Experience" name={`team${n}Exp`} placeholder="30+ yrs" />
              </Two>
              <IN label="Avatar Initial (letter)" name={`team${n}Avatar`} placeholder="R" />
            </SABox>
          ))}
        </>)}
        {tab==="events" && (<>
          <SASub>📅 Home Page Events (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>Event {n}</div>
              <div style={{display:"grid",gridTemplateColumns:"60px 60px 1fr",gap:"0 12px"}}>
                <IN label="Date" name={`ev${n}Date`} placeholder="15" />
                <IN label="Month" name={`ev${n}Month`} placeholder="Jan" />
                <IN label="Title" name={`ev${n}Title`} placeholder="Science Exhibition" />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"0 12px"}}>
                <IN label="Time" name={`ev${n}Time`} placeholder="10:00 AM" />
                <IN label="Venue" name={`ev${n}Venue`} placeholder="Main Hall" />
                <IN label="Category" name={`ev${n}Cat`} placeholder="Academic" />
              </div>
            </SABox>
          ))}
        </>)}
        {tab==="faq" && (<>
          <SASub>❓ FAQ Section (6)</SASub>
          {[1,2,3,4,5,6].map(n=>(
            <SABox key={n}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)",marginBottom:12}}>FAQ {n}</div>
              <IN label="Question" name={`faq${n}Q`} placeholder="What courses do you offer?" />
              <TA label="Answer" name={`faq${n}A`} rows={3} />
            </SABox>
          ))}
        </>)}
        {tab==="partners" && (<>
          <SASub>🤝 Partners & Affiliates</SASub>
          <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:14,lineHeight:1.6}}>Comma-separated names — displayed in marquee strip on home page.</p>
          <TA label="Partner Names" name="partners" rows={4} />
          <div style={{fontSize:12,color:"var(--sa-muted)"}}>Example: <em style={{color:"var(--sa-accent)"}}>IIT Delhi, AIIMS, CBSE Board, Coursera</em></div>
        </>)}
        {tab==="video" && (<>
          <SASub>🎬 Video / Campus Tour</SASub>
          <IN label="Section Heading" name="videoHeading" placeholder="Experience Campus Life" />
          <TA label="Description" name="videoDesc" rows={3} />
          <IN label="YouTube Embed URL" name="videoUrl" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
          <div style={{padding:"12px 16px",background:"rgba(99,179,237,0.06)",borderRadius:8,border:"1px solid rgba(99,179,237,0.15)",fontSize:12,color:"var(--sa-muted)",lineHeight:1.7,marginTop:8}}>
            i️ Use embed URL format: <code style={{color:"var(--sa-accent)"}}>https://www.youtube.com/embed/VIDEO_ID</code> — not the regular youtube.com/watch URL.
          </div>
        </>)}
        {tab==="newsletter" && (<>
          <SASub>📬 Newsletter Section</SASub>
          <IN label="Heading (before 'Newsletter')" name="newsletterTitle" placeholder="Subscribe to Our" />
          <TA label="Description Text" name="newsletterDesc" rows={3} />
        </>)}
        {tab==="cta" && (<>
          <SASub>📣 CTA Banner</SASub>
          <IN label="Badge Text" name="ctaBadge" placeholder="Limited Seats Available" />
          <IN label="Main Heading" name="ctaTitle" placeholder="Ready to Begin Your Journey?" />
          <Two>
            <IN label="Button 1 Text" name="ctaBtn1" placeholder="Apply Now →" />
            <IN label="Button 2 Text" name="ctaBtn2" placeholder="Talk to Us" />
          </Two>
        </>)}
        {tab==="about" && (<>
          <SASub>i️ About Page</SASub>
          <IN label="Section Heading" name="aboutTitle" />
          <TA label="First Paragraph" name="aboutDesc1" rows={3} />
          <TA label="Second Paragraph" name="aboutDesc2" rows={3} />
          <TA label="Mission Statement" name="aboutMission" rows={2} />
          <TA label="Vision Statement" name="aboutVision" rows={2} />
          <IN label="About Page Image URL" name="aboutImage" />
          {form.aboutImage && <div style={{height:100,borderRadius:8,backgroundImage:`url('${form.aboutImage}')`,backgroundSize:"cover",backgroundPosition:"center",marginTop:8,border:"1px solid var(--sa-border)"}} />}
        </>)}
        {tab==="contact" && (<>
          <SASub>📞 Contact Details</SASub>
          <TA label="Full Address" name="address" rows={2} />
          <Two>
            <IN label="Primary Phone" name="phone" /><IN label="Secondary Phone" name="phone2" />
            <IN label="Primary Email" name="email" /><IN label="Secondary Email" name="email2" />
          </Two>
          <IN label="Office Hours" name="hours" />
          <IN label="WhatsApp (digits only)" name="whatsapp" placeholder="9876543210" />
          <TA label="Google Maps Embed URL" name="mapEmbed" rows={2} />
        </>)}
        {tab==="general" && (<>
          <SASub>⚙️ Branding</SASub>
          <Two>
            <IN label="School Name" name="schoolName" /><IN label="Logo Text" name="logoText" />
          </Two>
          <IN label="Logo Tagline" name="logoTagline" />
          <TA label="Footer Description" name="footerDesc" rows={2} />
          <IN label="Footer Copyright Text" name="footerCopyright" />
          <SASub>🔐 Login Page</SASub>
          <IN label="Login Title" name="loginTitle" />
          <IN label="Login Subtitle" name="loginSubtitle" />
          <TA label="Inspirational Quote" name="loginQuote" rows={2} />
          <IN label="Quote Author" name="loginAuthor" />
        </>)}
        {tab==="social" && (<>
          <SASub>🔗 Social Media Links</SASub>
          <IN label="Facebook URL" name="socialFacebook" placeholder="https://facebook.com/yourpage" />
          <IN label="Instagram URL" name="socialInstagram" placeholder="https://instagram.com/yourpage" />
          <IN label="YouTube URL" name="socialYoutube" placeholder="https://youtube.com/yourchannel" />
          <IN label="Twitter / X URL" name="socialTwitter" placeholder="https://twitter.com/yourhandle" />
        </>)}
        {tab==="images" && (<>
          <SASub>🖼️ Images & Backgrounds</SASub>
          <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:16}}>Paste any public image URL (Unsplash, Cloudinary, etc.)</p>
          {[{label:"Hero Background",name:"heroImage"},{label:"Login Page Background",name:"loginBg"}].map(({label,name})=>(
            <SABox key={name}>
              <IN label={label} name={name} />
              {form[name] && <div style={{height:100,borderRadius:8,backgroundImage:`url('${form[name]}')`,backgroundSize:"cover",backgroundPosition:"center",border:"1px solid var(--sa-border)"}} />}
            </SABox>
          ))}
        </>)}
        {tab==="seo" && (<>
          <SASub>🔍 SEO & Meta</SASub>
          <IN label="Page Title (browser tab)" name="metaTitle" placeholder="EduSphere – Shape Your Future" />
          <TA label="Meta Description (Google snippet)" name="metaDesc" rows={3} />
        </>)}

        <div style={{display:"flex",gap:12,marginTop:28,flexWrap:"wrap"}}>
          <button className="sa-btn sa-btn-primary" style={{flex:1,padding:"13px"}} onClick={submit}>💾 Save All Changes</button>
        </div>
      </div>
    </div>
  )
}


/* ══════════════════════════════════════════════════════════════
   SECTION: INSTITUTE MANAGEMENT (Multi-tenant)
   Replaces the old single-institute Info/Branches/Sessions tabs.
   This now manages the platform's client institutes — each one
   gets its own fully isolated database when onboarded.
══════════════════════════════════════════════════════════════ */

const INST_API = "http://localhost:5000/api/superadmin"
const instHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
})

const PLAN_COLORS = { trial:"#718096", basic:"#63b3ed", pro:"#9f7aea", enterprise:"#f6e05e" }
const STATUS_COLORS = { active:"#68d391", suspended:"#fc8181", inactive:"#718096" }

function SAInstituteManagement() {
  const [institutes, setInstitutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [modal, setModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [successInfo, setSuccessInfo] = useState(null)
  const [search, setSearch] = useState("")

  const [form, setForm] = useState({
    name: "", contactEmail: "", contactPhone: "", address: "", plan: "trial",
    adminName: "", adminEmail: "", adminPassword: "",
  })
  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const load = async () => {
    setLoading(true); setError("")
    try {
      const res = await fetch(`${INST_API}/institutes`, { headers: instHeaders() })
      const j = await res.json()
      if (j.success) setInstitutes(j.data || [])
      else setError(j.message || "Failed to load institutes.")
    } catch {
      setError("Could not reach server. Is backend running?")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setForm({ name:"", contactEmail:"", contactPhone:"", address:"", plan:"trial", adminName:"", adminEmail:"", adminPassword:"" })
    setSuccessInfo(null)
    setModal(true)
  }

  const submit = async () => {
    if (!form.name || !form.adminEmail || !form.adminPassword) {
      alert("Institute name, admin email and admin password are required.")
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`${INST_API}/institutes`, { method:"POST", headers: instHeaders(), body: JSON.stringify(form) })
      const j = await res.json()
      if (j.success) {
        setSuccessInfo(j.loginInfo)
        logActivity("INSTITUTE_ONBOARDED", form.name)
        load()
      } else {
        alert(j.message || "Failed to onboard institute.")
      }
    } catch {
      alert("Server error. Could not reach backend.")
    } finally {
      setSaving(false)
    }
  }

  const toggleStatus = async (id, name) => {
    try {
      const res = await fetch(`${INST_API}/institutes/${id}/toggle-status`, { method:"PATCH", headers: instHeaders() })
      const j = await res.json()
      if (j.success) {
        logActivity("INSTITUTE_STATUS_TOGGLED", name)
        load()
      } else alert(j.message)
    } catch {
      alert("Server error.")
    }
  }

  const deleteInst = async (id, name) => {
    if (!confirm(`Remove "${name}" from the registry? (Its database will NOT be deleted, only the registry entry.)`)) return
    try {
      const res = await fetch(`${INST_API}/institutes/${id}`, { method:"DELETE", headers: instHeaders() })
      const j = await res.json()
      if (j.success) {
        logActivity("INSTITUTE_REMOVED", name)
        alert(j.message)
        load()
      } else alert(j.message)
    } catch {
      alert("Server error.")
    }
  }

  const filtered = institutes.filter(i =>
    [i.name, i.code, i.contactEmail].some(v => v?.toLowerCase().includes(search.toLowerCase()))
  )

  const totalActive = institutes.filter(i=>i.status==="active").length
  const totalSuspended = institutes.filter(i=>i.status==="suspended").length

  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Institute Management</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>Onboard and manage client institutes — each gets its own fully isolated database.</div>
        </div>
        <button className="sa-btn sa-btn-primary" onClick={openAdd}>+ Onboard New Institute</button>
      </div>

      {/* Quick stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:24 }}>
        <SAStat icon="🏢" label="Total Institutes" value={institutes.length} color="#63b3ed" />
        <SAStat icon="🟢" label="Active" value={totalActive} color="#68d391" />
        <SAStat icon="🔴" label="Suspended" value={totalSuspended} color="#fc8181" />
      </div>

      <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <input className="sa-input" style={{ maxWidth:320 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search institute name, code, email..." />
        <span style={{ fontSize:13, color:"var(--sa-muted)", marginLeft:"auto" }}>{filtered.length} institute{filtered.length!==1?"s":""}</span>
      </div>

      {loading && (
        <div style={{ textAlign:"center", padding:"40px 0", color:"var(--sa-muted)", fontSize:14 }}>Loading institutes...</div>
      )}

      {!loading && error && (
        <div className="sa-card" style={{ borderColor:"rgba(252,129,129,0.3)", textAlign:"center" }}>
          <div style={{ fontSize:14, color:"var(--sa-red)", marginBottom:14 }}>⚠️ {error}</div>
          <button className="sa-btn sa-btn-ghost" onClick={load}>Try Again</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="sa-card" style={{ textAlign:"center", color:"var(--sa-muted)", fontSize:13, padding:40 }}>
          {institutes.length === 0
            ? `No institutes onboarded yet. Click "+ Onboard New Institute" to add your first client.`
            : "No institutes match your search."}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {filtered.map(inst => (
            <div key={inst._id} className="sa-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
                <div>
                  <div style={{fontSize:16,fontWeight:700,color:"var(--sa-text)"}}>{inst.name}</div>
                  <div style={{fontSize:12,color:"var(--sa-muted)",marginTop:4}}>Code: <code style={{color:"var(--sa-accent)"}}>{inst.code}</code> · DB: <code style={{color:"var(--sa-accent)"}}>{inst.dbName}</code></div>
                  {inst.contactEmail && <div style={{fontSize:12,color:"var(--sa-muted)",marginTop:4}}>📧 {inst.contactEmail} {inst.contactPhone?`· 📞 ${inst.contactPhone}`:""}</div>}
                  {inst.address && <div style={{fontSize:12,color:"var(--sa-muted)",marginTop:2}}>📍 {inst.address}</div>}
                  <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
                    <SABadge color={PLAN_COLORS[inst.plan]||"#718096"}>{inst.plan}</SABadge>
                    <SABadge color={STATUS_COLORS[inst.status]||"#718096"}>{inst.status}</SABadge>
                    <span style={{fontSize:11,color:"var(--sa-muted)"}}>Onboarded: {new Date(inst.onboardedAt||inst.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button className="sa-btn sa-btn-ghost" style={{fontSize:12}} onClick={()=>toggleStatus(inst._id, inst.name)}>
                    {inst.status==="active"?"Suspend":"Activate"}
                  </button>
                  <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={()=>deleteInst(inst._id, inst.name)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Onboarding Modal */}
      {modal && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>{ if(!saving){ setModal(false); setSuccessInfo(null) } }}>
          <div className="sa-card" style={{width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>

            {successInfo ? (
              <>
                <div style={{ fontSize:18, fontWeight:700, color:"var(--sa-text)", marginBottom:20 }}>✅ Institute Onboarded!</div>
                <div style={{ background:"rgba(104,211,145,0.1)", border:"1px solid rgba(104,211,145,0.3)", borderRadius:10, padding:18, marginBottom:20 }}>
                  <div style={{ fontSize:13, color:"#68d391", marginBottom:10 }}>Share these login details with the institute's admin:</div>
                  <div style={{ fontSize:13, color:"var(--sa-text)", marginBottom:6 }}>Institute Code: <strong style={{color:"var(--sa-accent)"}}>{successInfo.instituteCode}</strong></div>
                  <div style={{ fontSize:13, color:"var(--sa-text)" }}>Admin Email: <strong style={{color:"var(--sa-accent)"}}>{successInfo.adminEmail}</strong></div>
                </div>
                <button className="sa-btn sa-btn-primary" style={{width:"100%",padding:13}} onClick={()=>{ setModal(false); setSuccessInfo(null) }}>Done</button>
              </>
            ) : (
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                  <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Onboard New Institute</div>
                  <button onClick={()=>setModal(false)} style={{background:"none",border:"none",color:"var(--sa-muted)",fontSize:22,cursor:"pointer"}}>✕</button>
                </div>

                <SASub>🏫 Institute Details</SASub>
                <div style={{marginBottom:16}}>
                  <SALabel>Institute Name</SALabel>
                  <input className="sa-input" name="name" value={form.name} onChange={h} placeholder="Bright Futures Academy" />
                </div>

                <SAGrid2>
                  <div style={{marginBottom:16}}>
                    <SALabel>Contact Email</SALabel>
                    <input className="sa-input" name="contactEmail" value={form.contactEmail} onChange={h} />
                  </div>
                  <div style={{marginBottom:16}}>
                    <SALabel>Contact Phone</SALabel>
                    <input className="sa-input" name="contactPhone" value={form.contactPhone} onChange={h} />
                  </div>
                </SAGrid2>

                <div style={{marginBottom:16}}>
                  <SALabel>Address</SALabel>
                  <input className="sa-input" name="address" value={form.address} onChange={h} />
                </div>

                <div style={{marginBottom:16}}>
                  <SALabel>Plan</SALabel>
                  <select className="sa-input" name="plan" value={form.plan} onChange={h}>
                    <option value="trial">Trial</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                <SASub>🔑 First Admin Account (for this institute)</SASub>

                <SAGrid2>
                  <div style={{marginBottom:16}}>
                    <SALabel>Admin Name</SALabel>
                    <input className="sa-input" name="adminName" value={form.adminName} onChange={h} placeholder="Institute Admin" />
                  </div>
                  <div style={{marginBottom:16}}>
                    <SALabel>Admin Email</SALabel>
                    <input className="sa-input" name="adminEmail" value={form.adminEmail} onChange={h} placeholder="admin@institute.in" />
                  </div>
                </SAGrid2>

                <div style={{marginBottom:16}}>
                  <SALabel>Admin Password</SALabel>
                  <input className="sa-input" type="password" name="adminPassword" value={form.adminPassword} onChange={h} placeholder="Set a temporary password" />
                </div>

                <div style={{display:"flex",gap:12,marginTop:8}}>
                  <button className="sa-btn sa-btn-primary" style={{flex:1,padding:13}} onClick={submit} disabled={saving}>
                    {saving ? "Onboarding..." : "Onboard Institute"}
                  </button>
                  <button className="sa-btn sa-btn-ghost" onClick={()=>setModal(false)} disabled={saving}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}











/* ══════════════════════════════════════════════════════════════
   SECTION: USER & ROLE MANAGER
══════════════════════════════════════════════════════════════ */
const DEFAULT_ADMINS = [
  { id:1, name:"Admin User", email:"admin@edusphere.in", role:"Admin", status:"active", created:"2025-01-01", lastLogin:"Today", permissions:["students","teachers","courses","fees","notices","gallery"] },
  { id:2, name:"Ops Manager", email:"ops@edusphere.in", role:"Manager", status:"active", created:"2025-01-15", lastLogin:"Yesterday", permissions:["students","courses","notices"] },
  { id:3, name:"Content Team",email:"content@edusphere.in",role:"Editor", status:"inactive",created:"2025-02-01", lastLogin:"2 weeks ago", permissions:["notices","gallery"] },
]
const ALL_PERMS = ["students","teachers","courses","fees","notices","gallery","timetable","exams","events"]
const ROLE_COLORS = { Admin:"#63b3ed", Manager:"#9f7aea", Editor:"#68d391", Viewer:"#f6e05e" }

function SAUserManager() {
  const [admins, setAdmins] = useState(() => load("sa_admins", DEFAULT_ADMINS))
  const [modal, setModal] = useState(null) // null | "add" | {id}
  const [form, setForm] = useState({ name:"", email:"", role:"Admin", status:"active", permissions:[] })

  const saveAdmins = (a) => { setAdmins(a); save("sa_admins", a); }
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const togglePerm = p => setForm(f=>({ ...f, permissions: f.permissions.includes(p) ? f.permissions.filter(x=>x!==p) : [...f.permissions, p] }))
  const openAdd = () => { setForm({name:"",email:"",role:"Admin",status:"active",permissions:[],password:""}); setModal("add") }
  const openEdit = (a) => { setForm({...a,password:""}); setModal(a.id) }

  const submitForm = () => {
    if (!form.name || !form.email) return alert("Name and email required.")
    if (modal === "add") {
      const newA = {...form, id:Date.now(), created:new Date().toLocaleDateString("en-IN"), lastLogin:"Never"}
      saveAdmins([...admins, newA])
      logActivity("USER_CREATED", `${form.name} (${form.role})`)
    } else {
      saveAdmins(admins.map(a=>a.id===modal?{...a,...form}:a))
      logActivity("USER_UPDATED", `${form.name}`)
    }
    setModal(null)
  }
  const deleteAdmin = (id) => {
    if (!confirm("Delete this user?")) return
    const a = admins.find(x=>x.id===id)
    saveAdmins(admins.filter(x=>x.id!==id))
    logActivity("USER_DELETED", a?.name)
  }
  const toggleStatus = (id) => {
    saveAdmins(admins.map(a=>a.id===id?{...a,status:a.status==="active"?"inactive":"active"}:a))
  }

  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>User & Role Management</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>Control who can access the Admin Dashboard and what they can do.</div>
        </div>
        <button className="sa-btn sa-btn-primary" onClick={openAdd}>+ Add Admin User</button>
      </div>

      {/* Super Admin locked row */}
      <div className="sa-card" style={{marginBottom:16,borderColor:"rgba(246,224,94,0.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:44,height:44,borderRadius:12,background:"rgba(246,224,94,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🛡️</div>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:"var(--sa-text)"}}>Super Admin</div>
              <div style={{fontSize:12,color:"var(--sa-muted)"}}>ID: {SA_ID} · Full system access</div>
            </div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <SABadge color="#f6e05e">SUPER ADMIN</SABadge>
            <SABadge color="#68d391">ACTIVE</SABadge>
            <span style={{fontSize:12,color:"var(--sa-muted)"}}>🔒 Cannot be modified</span>
          </div>
        </div>
      </div>

      {/* Admin users */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {admins.map(a => (
          <div key={a.id} className="sa-card" style={{opacity:a.status==="inactive"?0.65:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:44,height:44,borderRadius:12,background:`${ROLE_COLORS[a.role]||"#63b3ed"}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {a.role==="Admin"?"🔑":a.role==="Manager"?"📋":a.role==="Editor"?"✏️":"👁️"}
                </div>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:"var(--sa-text)"}}>{a.name}</div>
                  <div style={{fontSize:12,color:"var(--sa-muted)",marginTop:2}}>{a.email}</div>
                  <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                    <SABadge color={ROLE_COLORS[a.role]||"#63b3ed"}>{a.role}</SABadge>
                    <SABadge color={a.status==="active"?"#68d391":"#fc8181"}>{a.status}</SABadge>
                    {a.permissions?.map(p=>(
                      <SABadge key={p} color="#718096">{p}</SABadge>
                    ))}
                  </div>
                  <div style={{fontSize:11,color:"var(--sa-muted)",marginTop:8}}>Created: {a.created} · Last login: {a.lastLogin}</div>
                </div>
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button className="sa-btn sa-btn-ghost" style={{fontSize:12}} onClick={()=>toggleStatus(a.id)}>{a.status==="active"?"Deactivate":"Activate"}</button>
                <button className="sa-btn sa-btn-ghost" style={{fontSize:12}} onClick={()=>openEdit(a)}>Edit</button>
                <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={()=>deleteAdmin(a.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal !== null && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setModal(null)}>
          <div className="sa-card" style={{width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>{modal==="add"?"Add Admin User":"Edit User"}</div>
              <button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:"var(--sa-muted)",fontSize:22,cursor:"pointer"}}>✕</button>
            </div>
            <SAGrid2>
              <SAField label="Full Name" name="name" value={form.name} onChange={h} />
              <SAField label="Email" name="email" value={form.email} onChange={h} type="email" />
            </SAGrid2>
            <SAGrid2>
              <div style={{marginBottom:16}}>
                <SALabel>Role</SALabel>
                <select className="sa-input" name="role" value={form.role} onChange={h}>
                  {["Admin","Manager","Editor","Viewer"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={{marginBottom:16}}>
                <SALabel>Status</SALabel>
                <select className="sa-input" name="status" value={form.status} onChange={h}>
                  <option>active</option><option>inactive</option>
                </select>
              </div>
            </SAGrid2>
            {modal==="add" && <SAField label="Temporary Password" name="password" value={form.password} onChange={h} type="password" />}
            <div style={{marginBottom:16}}>
              <SALabel>Permissions</SALabel>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
                {ALL_PERMS.map(p=>(
                  <button key={p} onClick={()=>togglePerm(p)}
                    style={{padding:"6px 12px",borderRadius:100,fontSize:12,fontWeight:600,cursor:"pointer",
                      background:form.permissions?.includes(p)?"rgba(99,179,237,0.15)":"rgba(255,255,255,0.04)",
                      color:form.permissions?.includes(p)?"var(--sa-accent)":"var(--sa-muted)",
                      border:`1px solid ${form.permissions?.includes(p)?"var(--sa-accent)":"rgba(255,255,255,0.08)"}`}}>
                    {form.permissions?.includes(p)?"✓ ":""}{p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{display:"flex",gap:12,marginTop:24}}>
              <button className="sa-btn sa-btn-primary" style={{flex:1,padding:"13px"}} onClick={submitForm}>{modal==="add"?"Create User":"Save Changes"}</button>
              <button className="sa-btn sa-btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: DATA MANAGER (students, teachers, courses, etc.)
══════════════════════════════════════════════════════════════ */
function SADataManager() {
  const [section, setSection] = useState("students")
  const DATA_SECTIONS = [
    {key:"students", label:"👥 Students"},
    {key:"teachers", label:"🧑‍🏫 Teachers"},
    {key:"courses", label:"📚 Courses"},
    {key:"fees", label:"💰 Fees"},
    {key:"notices", label:"📢 Notices"},
    {key:"gallery", label:"🖼️ Gallery"},
  ]

  const [data, setData] = useState(() => load(section, []))
  useEffect(() => { setData(load(section, [])) }, [section])
  const saveData = (d) => { setData(d); save(section, d); logActivity("DATA_EDIT", `Modified ${section}`) }

  const clearSection = () => {
    if (!confirm(`Clear ALL ${section} data? This cannot be undone.`)) return
    saveData([])
    logActivity("DATA_CLEARED", section)
  }
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = `${section}_export.json`; a.click()
    logActivity("DATA_EXPORTED", section)
  }
  const importJSON = (e) => {
    const file = e.target.files[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try { const parsed = JSON.parse(ev.target.result); saveData(parsed); alert(`Imported ${parsed.length} records.`); logActivity("DATA_IMPORTED", section) }
      catch { alert("Invalid JSON file.") }
    }
    reader.readAsText(file)
  }

  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Data Manager</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>Export, import, or reset any data section.</div>
        </div>
      </div>

      {/* Section tabs */}
      <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap"}}>
        {DATA_SECTIONS.map(s=>(
          <button key={s.key} className="sa-tab-btn" onClick={()=>setSection(s.key)}
            style={{background:section===s.key?"var(--sa-accent)":"rgba(255,255,255,0.04)", color:section===s.key?"#000":"var(--sa-muted)", border:"1px solid "+(section===s.key?"var(--sa-accent)":"rgba(255,255,255,0.08)")}}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="sa-card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"var(--sa-text)",textTransform:"capitalize"}}>{section}</div>
            <div style={{fontSize:13,color:"var(--sa-muted)"}}>{data.length} records in localStorage</div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <button className="sa-btn sa-btn-success" style={{fontSize:12}} onClick={exportJSON}>⬇️ Export JSON</button>
            <label className="sa-btn sa-btn-ghost" style={{fontSize:12,cursor:"pointer"}}>
              ⬆️ Import JSON <input type="file" accept=".json" style={{display:"none"}} onChange={importJSON} />
            </label>
            <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={clearSection}>🗑️ Clear All</button>
          </div>
        </div>

        {/* Raw JSON viewer */}
        <div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:16,maxHeight:400,overflowY:"auto",border:"1px solid rgba(255,255,255,0.06)"}}>
          <pre style={{fontSize:11,color:"var(--sa-muted)",margin:0,whiteSpace:"pre-wrap",wordBreak:"break-all",lineHeight:1.7}}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: SYSTEM SETTINGS (credentials, maintenance, etc.)
══════════════════════════════════════════════════════════════ */
const BACKUP_KEYS = [
  "students","teachers","courses","fees","notices","gallery",
  "siteSettings","sa_admins","sa_activity","sa_maintenance",
  "sa_custom_css","sa_announcement",
  "institute_info","institute_branches","institute_departments",
  "institute_sessions","institute_holidays",
  "timetable_entries","exams","exam_results"
]

function SASystemSettings() {
  const [maintenance, setMaintenance] = useState(() => load("sa_maintenance", false))
  const [customCSS, setCustomCSS] = useState(() => load("sa_custom_css", ""))
  const [announcement,setAnnouncement]= useState(() => load("sa_announcement", ""))
  const [saved, setSaved] = useState("")

  const saveField = (key, val, label) => {
    save(key, val); setSaved(label)
    logActivity("SYSTEM_SETTING", label)
    setTimeout(()=>setSaved(""),2500)
  }

  const nukeAll = () => {
    if (!confirm("⚠️ DANGER: This will wipe ALL localStorage data for this site. Are you absolutely sure?")) return
    if (!confirm("This action is IRREVERSIBLE. Confirm again to proceed.")) return
    localStorage.clear()
    logActivity("NUCLEAR_RESET", "All localStorage cleared")
    alert("All data cleared. Page will reload.")
    window.location.reload()
  }

  const exportBackup = () => {
    const backup = {}
    BACKUP_KEYS.forEach(k => { backup[k] = load(k, null) })
    backup._exportedAt = new Date().toISOString()
    const blob = new Blob([JSON.stringify(backup, null, 2)], {type:"application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = `edusphere_full_backup_${Date.now()}.json`; a.click()
    logActivity("FULL_BACKUP_EXPORTED", `${BACKUP_KEYS.length} keys`)
  }

  const importBackup = (e) => {
    const file = e.target.files[0]; if (!file) return
    if (!confirm("Restoring a backup will overwrite current data for matching keys. Continue?")) { e.target.value=""; return }
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result)
        let count = 0
        BACKUP_KEYS.forEach(k => {
          if (parsed[k] !== undefined && parsed[k] !== null) { save(k, parsed[k]); count++ }
        })
        logActivity("FULL_BACKUP_RESTORED", `${count} keys restored`)
        alert(`Restored ${count} data sections. Page will reload.`)
        window.location.reload()
      } catch { alert("Invalid backup file.") }
    }
    reader.readAsText(file)
  }

  return (
    <div className="sa-fade">
      <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)",marginBottom:6}}>System Settings</div>
      <div style={{fontSize:13,color:"var(--sa-muted)",marginBottom:24}}>Global controls, maintenance mode, custom code injection.</div>

      {saved && <div style={{background:"rgba(104,211,145,0.1)",border:"1px solid rgba(104,211,145,0.3)",borderRadius:10,padding:"10px 16px",marginBottom:20,color:"#68d391",fontSize:13}}>✅ Saved: {saved}</div>}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
        {/* Maintenance mode */}
        <div className="sa-card">
          <SASub>🚧 Maintenance Mode</SASub>
          <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:16,lineHeight:1.6}}>When enabled, show a maintenance banner on the public site. Check this flag from your Home page component.</p>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <button onClick={()=>{ const next=!maintenance; setMaintenance(next); saveField("sa_maintenance",next,"Maintenance Mode") }}
              style={{width:52,height:28,borderRadius:100,border:"none",cursor:"pointer",background:maintenance?"#fc8181":"rgba(255,255,255,0.1)",transition:"all 0.3s",position:"relative"}}>
              <span style={{position:"absolute",top:3,left:maintenance?26:4,width:22,height:22,borderRadius:"50%",background:"#fff",transition:"all 0.3s",display:"block"}} />
            </button>
            <span style={{fontSize:14,color:maintenance?"var(--sa-red)":"var(--sa-muted)",fontWeight:600}}>{maintenance?"🔴 Maintenance ON":"🟢 Site is Live"}</span>
          </div>
        </div>

        {/* Admission toggle */}
        <div className="sa-card">
          <SASub>📋 Admission Status</SASub>
          <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:16,lineHeight:1.6}}>Quick toggle for admission open/close. Updates the site settings instantly.</p>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {(() => {
              const site = load("siteSettings",{})
              const isOpen = site.admissionOpen === "true"
              const toggle = () => {
                const updated = {...site, admissionOpen: isOpen?"false":"true"}
                save("siteSettings", updated)
                logActivity("ADMISSION_TOGGLE", isOpen?"Closed":"Opened")
                saveField("siteSettings", updated, `Admissions ${isOpen?"Closed":"Opened"}`)
              }
              return (
                <>
                  <button onClick={toggle} style={{width:52,height:28,borderRadius:100,border:"none",cursor:"pointer",background:isOpen?"#68d391":"rgba(255,255,255,0.1)",transition:"all 0.3s",position:"relative"}}>
                    <span style={{position:"absolute",top:3,left:isOpen?26:4,width:22,height:22,borderRadius:"50%",background:"#fff",transition:"all 0.3s",display:"block"}} />
                  </button>
                  <span style={{fontSize:14,color:isOpen?"var(--sa-accent3)":"var(--sa-muted)",fontWeight:600}}>{isOpen?"🟢 Admissions OPEN":"🔴 Admissions CLOSED"}</span>
                </>
              )
            })()}
          </div>
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="sa-card" style={{marginBottom:20}}>
        <SASub>📣 Site-wide Announcement Banner</SASub>
        <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:14,lineHeight:1.6}}>This message is stored in localStorage as <code style={{color:"var(--sa-accent)"}}>sa_announcement</code>. Read it from your Navbar or Home component to display a banner.</p>
        <SATA label="Announcement Message (leave blank to hide)" name="announcement" value={announcement} onChange={e=>setAnnouncement(e.target.value)} rows={2} />
        <button className="sa-btn sa-btn-primary" onClick={()=>saveField("sa_announcement",announcement,"Announcement")} style={{fontSize:13}}>Save Announcement</button>
      </div>

      {/* Custom CSS */}
      <div className="sa-card" style={{marginBottom:20}}>
        <SASub>🎨 Custom CSS Injection</SASub>
        <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:14,lineHeight:1.6}}>Stored as <code style={{color:"var(--sa-accent)"}}>sa_custom_css</code>. In your app's root, read and inject via a <code style={{color:"var(--sa-accent)"}}>&lt;style&gt;</code> tag.</p>
        <textarea className="sa-input" value={customCSS} onChange={e=>setCustomCSS(e.target.value)} rows={6}
          style={{resize:"vertical",fontFamily:"'DM Mono',monospace",fontSize:12}} placeholder={`.hero { background: #000; }\n.btn-primary { border-radius: 4px; }`} />
        <button className="sa-btn sa-btn-primary" style={{marginTop:12,fontSize:13}} onClick={()=>saveField("sa_custom_css",customCSS,"Custom CSS")}>Save CSS</button>
      </div>

      {/* Backup & Restore */}
      <div className="sa-card" style={{marginBottom:20}}>
        <SASub>💾 Backup & Restore</SASub>
        <p style={{fontSize:13,color:"var(--sa-muted)",marginBottom:16,lineHeight:1.6}}>
          Export a single JSON file containing all data sections (students, teachers, site settings, institute info, etc.) for safekeeping. Restore from a previously exported backup file at any time.
        </p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <button className="sa-btn sa-btn-success" onClick={exportBackup}>⬇️ Export Full Backup</button>
          <label className="sa-btn sa-btn-ghost" style={{cursor:"pointer"}}>
            ⬆️ Restore from Backup <input type="file" accept=".json" style={{display:"none"}} onChange={importBackup} />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="sa-card" style={{borderColor:"rgba(252,129,129,0.25)"}}>
        <SASub>💣 Danger Zone</SASub>
        <div style={{padding:"16px 20px",background:"rgba(252,129,129,0.04)",borderRadius:10,border:"1px solid rgba(252,129,129,0.15)"}}>
          <div style={{fontSize:14,fontWeight:700,color:"var(--sa-red)",marginBottom:6}}>⚠️ Nuke All Data</div>
          <div style={{fontSize:13,color:"var(--sa-muted)",marginBottom:14,lineHeight:1.6}}>Permanently clears ALL localStorage data — students, teachers, site settings, everything. This cannot be undone.</div>
          <button className="sa-btn sa-btn-danger" onClick={nukeAll} style={{fontWeight:700}}>🗑️ Clear All Data & Reset Site</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: TIMETABLE MANAGER (NEW)
══════════════════════════════════════════════════════════════ */
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function SATimetable() {
  const [entries, setEntries] = useState(() => load("timetable_entries", []))
  const [day, setDay] = useState("Monday")
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ day:"Monday", time:"", subject:"", teacher:"", classroom:"" })
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const saveEntries = (e_) => { setEntries(e_); save("timetable_entries", e_) }
  const openAdd = () => { setForm({day, time:"", subject:"", teacher:"", classroom:""}); setModal("add") }
  const openEdit = (e_) => { setForm(e_); setModal(e_.id) }
  const submit = () => {
    if (!form.subject || !form.time) return alert("Subject and time are required.")
    if (modal==="add") {
      saveEntries([...entries, {...form, id:Date.now()}])
      logActivity("TIMETABLE_ADDED", `${form.subject} (${form.day})`)
    } else {
      saveEntries(entries.map(x=>x.id===modal?{...x,...form}:x))
      logActivity("TIMETABLE_UPDATED", form.subject)
    }
    setModal(null)
  }
  const deleteEntry = (id) => {
    if (!confirm("Delete this timetable entry?")) return
    saveEntries(entries.filter(x=>x.id!==id))
    logActivity("TIMETABLE_DELETED", "")
  }

  const dayEntries = entries.filter(e_=>e_.day===day).sort((a,b)=>a.time.localeCompare(b.time))

  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Timetable Manager</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>Build and manage the weekly class schedule.</div>
        </div>
        <button className="sa-btn sa-btn-primary" onClick={openAdd}>+ Add Period</button>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
        {DAYS.map(d => (
          <button key={d} className="sa-tab-btn" onClick={()=>setDay(d)}
            style={{ background:day===d?"var(--sa-accent)":"rgba(255,255,255,0.04)", color:day===d?"#000":"var(--sa-muted)", border:"1px solid "+(day===d?"var(--sa-accent)":"rgba(255,255,255,0.08)") }}>
            {d}
          </button>
        ))}
      </div>

      <div className="sa-card">
        {dayEntries.length===0 && <div style={{textAlign:"center",color:"var(--sa-muted)",fontSize:13,padding:"20px 0"}}>No periods scheduled for {day}.</div>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {dayEntries.map(e_ => (
            <div key={e_.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:"rgba(255,255,255,0.02)",borderRadius:8,borderLeft:"3px solid var(--sa-accent)",flexWrap:"wrap",gap:10}}>
              <div>
                <span style={{fontSize:12,fontWeight:700,color:"var(--sa-accent)"}}>{e_.time}</span>
                <span style={{fontSize:13,fontWeight:600,color:"var(--sa-text)",marginLeft:14}}>{e_.subject}</span>
                {e_.teacher && <span style={{fontSize:12,color:"var(--sa-muted)",marginLeft:10}}>👤 {e_.teacher}</span>}
                {e_.classroom && <span style={{fontSize:12,color:"var(--sa-muted)",marginLeft:10}}>🏫 {e_.classroom}</span>}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="sa-btn sa-btn-ghost" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>openEdit(e_)}>Edit</button>
                <button className="sa-btn sa-btn-danger" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>deleteEntry(e_.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal !== null && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setModal(null)}>
          <div className="sa-card" style={{width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>{modal==="add"?"Add Period":"Edit Period"}</div>
              <button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:"var(--sa-muted)",fontSize:22,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{marginBottom:16}}>
              <SALabel>Day</SALabel>
              <select className="sa-input" name="day" value={form.day} onChange={h}>
                {DAYS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <SAGrid2>
              <SAField label="Time" name="time" value={form.time} onChange={h} placeholder="09:00 - 09:45" />
              <SAField label="Subject" name="subject" value={form.subject} onChange={h} placeholder="Mathematics" />
            </SAGrid2>
            <SAGrid2>
              <SAField label="Teacher" name="teacher" value={form.teacher} onChange={h} />
              <SAField label="Classroom" name="classroom" value={form.classroom} onChange={h} placeholder="Room 101" />
            </SAGrid2>
            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button className="sa-btn sa-btn-primary" style={{flex:1,padding:"13px"}} onClick={submit}>{modal==="add"?"Add Period":"Save Changes"}</button>
              <button className="sa-btn sa-btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: EXAM & RESULTS MANAGER (NEW)
══════════════════════════════════════════════════════════════ */
function SAExams() {
  const [exams, setExams] = useState(() => load("exams", []))
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name:"", subject:"", date:"", maxMarks:"100", classGroup:"" })
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const saveExams = (e_) => { setExams(e_); save("exams", e_) }
  const openAdd = () => { setForm({name:"",subject:"",date:"",maxMarks:"100",classGroup:""}); setModal("add") }
  const openEdit = (e_) => { setForm(e_); setModal(e_.id) }
  const submit = () => {
    if (!form.name || !form.subject) return alert("Exam name and subject are required.")
    if (modal==="add") {
      saveExams([...exams, {...form, id:Date.now()}])
      logActivity("EXAM_ADDED", `${form.name} - ${form.subject}`)
    } else {
      saveExams(exams.map(x=>x.id===modal?{...x,...form}:x))
      logActivity("EXAM_UPDATED", form.name)
    }
    setModal(null)
  }
  const deleteExam = (id) => {
    if (!confirm("Delete this exam? Linked results will remain but lose context.")) return
    saveExams(exams.filter(x=>x.id!==id))
    logActivity("EXAM_DELETED", "")
  }

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:13,color:"var(--sa-muted)"}}>{exams.length} exam(s) scheduled</div>
        <button className="sa-btn sa-btn-primary" onClick={openAdd}>+ Add Exam</button>
      </div>

      {exams.length===0 && <div className="sa-card" style={{textAlign:"center",color:"var(--sa-muted)",fontSize:13}}>No exams added yet.</div>}

      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {exams.map(e_ => (
          <div key={e_.id} className="sa-card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"var(--sa-text)"}}>{e_.name}</div>
                <div style={{fontSize:12,color:"var(--sa-muted)",marginTop:4}}>{e_.subject} {e_.classGroup?`· ${e_.classGroup}`:""}</div>
                <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                  {e_.date && <SABadge color="#63b3ed">📅 {e_.date}</SABadge>}
                  <SABadge color="#f6e05e">Max: {e_.maxMarks}</SABadge>
                </div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="sa-btn sa-btn-ghost" style={{fontSize:12}} onClick={()=>openEdit(e_)}>Edit</button>
                <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={()=>deleteExam(e_.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setModal(null)}>
          <div className="sa-card" style={{width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>{modal==="add"?"Add Exam":"Edit Exam"}</div>
              <button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:"var(--sa-muted)",fontSize:22,cursor:"pointer"}}>✕</button>
            </div>
            <SAField label="Exam Name" name="name" value={form.name} onChange={h} placeholder="Mid-Term Exam" />
            <SAGrid2>
              <SAField label="Subject" name="subject" value={form.subject} onChange={h} />
              <SAField label="Class/Group" name="classGroup" value={form.classGroup} onChange={h} placeholder="10-A" />
            </SAGrid2>
            <SAGrid2>
              <SAField label="Date" name="date" value={form.date} onChange={h} type="date" />
              <SAField label="Max Marks" name="maxMarks" value={form.maxMarks} onChange={h} />
            </SAGrid2>
            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button className="sa-btn sa-btn-primary" style={{flex:1,padding:"13px"}} onClick={submit}>{modal==="add"?"Add Exam":"Save Changes"}</button>
              <button className="sa-btn sa-btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SAResults() {
  const exams = load("exams", [])
  const [results, setResults] = useState(() => load("exam_results", []))
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ examId:"", studentName:"", marksObtained:"" })
  const h = e => setForm(f=>({...f,[e.target.name]:e.target.value}))

  const saveResults = (r) => { setResults(r); save("exam_results", r) }
  const openAdd = () => { setForm({examId:exams[0]?.id||"", studentName:"", marksObtained:""}); setModal("add") }
  const openEdit = (r) => { setForm(r); setModal(r.id) }
  const submit = () => {
    if (!form.examId || !form.studentName) return alert("Exam and student name are required.")
    if (modal==="add") {
      saveResults([...results, {...form, id:Date.now()}])
      logActivity("RESULT_ADDED", form.studentName)
    } else {
      saveResults(results.map(x=>x.id===modal?{...x,...form}:x))
      logActivity("RESULT_UPDATED", form.studentName)
    }
    setModal(null)
  }
  const deleteResult = (id) => {
    if (!confirm("Delete this result entry?")) return
    saveResults(results.filter(x=>x.id!==id))
    logActivity("RESULT_DELETED", "")
  }
  const examName = (id) => exams.find(e_=>String(e_.id)===String(id))?.name || "Unknown Exam"
  const examMax = (id) => exams.find(e_=>String(e_.id)===String(id))?.maxMarks || "—"

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:13,color:"var(--sa-muted)"}}>{results.length} result(s) recorded</div>
        <button className="sa-btn sa-btn-primary" onClick={openAdd} disabled={exams.length===0}>+ Add Result</button>
      </div>

      {exams.length===0 && <div className="sa-card" style={{textAlign:"center",color:"var(--sa-muted)",fontSize:13}}>Add an exam first in the "Exams" tab before recording results.</div>}
      {exams.length>0 && results.length===0 && <div className="sa-card" style={{textAlign:"center",color:"var(--sa-muted)",fontSize:13}}>No results recorded yet.</div>}

      <div className="sa-card" style={{padding: results.length?24:0, border: results.length?undefined:"none", background: results.length?undefined:"transparent"}}>
        {results.length>0 && (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {results.map(r => {
              const max = Number(examMax(r.examId)) || 0
              const obtained = Number(r.marksObtained) || 0
              const pct = max ? Math.round((obtained/max)*100) : 0
              const color = pct>=75?"#68d391":pct>=40?"#f6e05e":"#fc8181"
              return (
                <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:"rgba(255,255,255,0.02)",borderRadius:8,borderLeft:`3px solid ${color}`,flexWrap:"wrap",gap:10}}>
                  <div>
                    <span style={{fontSize:13,fontWeight:600,color:"var(--sa-text)"}}>{r.studentName}</span>
                    <span style={{fontSize:12,color:"var(--sa-muted)",marginLeft:10}}>{examName(r.examId)}</span>
                    <span style={{marginLeft:10}}><SABadge color={color}>{r.marksObtained}/{examMax(r.examId)} ({pct}%)</SABadge></span>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="sa-btn sa-btn-ghost" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>openEdit(r)}>Edit</button>
                    <button className="sa-btn sa-btn-danger" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>deleteResult(r.id)}>Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {modal !== null && (
        <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setModal(null)}>
          <div className="sa-card" style={{width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
              <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>{modal==="add"?"Add Result":"Edit Result"}</div>
              <button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:"var(--sa-muted)",fontSize:22,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{marginBottom:16}}>
              <SALabel>Exam</SALabel>
              <select className="sa-input" name="examId" value={form.examId} onChange={h}>
                {exams.map(e_=><option key={e_.id} value={e_.id}>{e_.name} ({e_.subject})</option>)}
              </select>
            </div>
            <SAField label="Student Name" name="studentName" value={form.studentName} onChange={h} />
            <SAField label="Marks Obtained" name="marksObtained" value={form.marksObtained} onChange={h} />
            <div style={{display:"flex",gap:12,marginTop:8}}>
              <button className="sa-btn sa-btn-primary" style={{flex:1,padding:"13px"}} onClick={submit}>{modal==="add"?"Add Result":"Save Changes"}</button>
              <button className="sa-btn sa-btn-ghost" onClick={()=>setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SAExamManager() {
  const [tab, setTab] = useState("exams")
  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Exam & Results Manager</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>Schedule exams and record student results.</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
        <button className="sa-tab-btn" onClick={()=>setTab("exams")}
          style={{ background:tab==="exams"?"var(--sa-accent)":"rgba(255,255,255,0.04)", color:tab==="exams"?"#000":"var(--sa-muted)", border:"1px solid "+(tab==="exams"?"var(--sa-accent)":"rgba(255,255,255,0.08)") }}>
          📝 Exams
        </button>
        <button className="sa-tab-btn" onClick={()=>setTab("results")}
          style={{ background:tab==="results"?"var(--sa-accent)":"rgba(255,255,255,0.04)", color:tab==="results"?"#000":"var(--sa-muted)", border:"1px solid "+(tab==="results"?"var(--sa-accent)":"rgba(255,255,255,0.08)") }}>
          📊 Results
        </button>
      </div>

      {tab==="exams" && <SAExams />}
      {tab==="results" && <SAResults />}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   SECTION: ACTIVITY LOGS
══════════════════════════════════════════════════════════════ */
function SAActivityLogs() {
  const [logs, setLogs] = useState(() => load("sa_activity", []))
  const clear = () => { if(!confirm("Clear all logs?"))return; setLogs([]); save("sa_activity",[]) }

  const COLOR = { LOGIN:"#68d391", FAILED_LOGIN:"#fc8181", SITE_SETTINGS_SAVED:"#63b3ed", USER_CREATED:"#9f7aea", USER_DELETED:"#fc8181", DATA_CLEARED:"#f6e05e", NUCLEAR_RESET:"#fc8181" }

  return (
    <div className="sa-fade">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:18,fontWeight:700,color:"var(--sa-text)"}}>Activity Logs</div>
          <div style={{fontSize:13,color:"var(--sa-muted)"}}>{logs.length} events recorded · Auto-capped at 100</div>
        </div>
        <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={clear}>Clear Logs</button>
      </div>
      <div className="sa-card">
        {logs.length===0 && <div style={{fontSize:13,color:"var(--sa-muted)",textAlign:"center",padding:"40px 0"}}>No activity logged yet.</div>}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {logs.map((l,i)=>(
            <div key={i} style={{padding:"12px 16px",background:"rgba(255,255,255,0.02)",borderRadius:8,borderLeft:`3px solid ${COLOR[l.action]||"#718096"}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
              <div>
                <SABadge color={COLOR[l.action]||"#718096"}>{l.action}</SABadge>
                {l.detail && <span style={{fontSize:13,color:"var(--sa-muted)",marginLeft:10}}>{l.detail}</span>}
              </div>
              <div style={{fontSize:11,color:"var(--sa-muted)",flexShrink:0}}>🕐 {l.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN SUPER ADMIN DASHBOARD
══════════════════════════════════════════════════════════════ */
const SA_MENU = [
  { key:"overview", icon:"📊", label:"Overview" },
  { key:"site", icon:"🌐", label:"Site Settings" },
  { key:"institute", icon:"🏫", label:"Institute Management" },
  { key:"users", icon:"👤", label:"User & Roles" },
  { key:"timetable", icon:"🗓️", label:"Timetable" },
  { key:"exams", icon:"📝", label:"Exams & Results" },
  { key:"data", icon:"🗄️", label:"Data Manager" },
  { key:"system", icon:"⚙️", label:"System Settings" },
  { key:"logs", icon:"🕐", label:"Activity Logs" },
]

export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(() => load("sa_session", false))
  const [active, setActive] = useState("overview")
  const [sideOpen, setSideOpen] = useState(false)

  const logout = () => {
    logActivity("LOGOUT", "Super Admin signed out")
    save("sa_session", false)
    setAuthed(false)
  }
  const onLogin = () => {
    save("sa_session", true)
    setAuthed(true)
  }

  if (!authed) return <SuperAdminLogin onLogin={onLogin} />

  const sidebar = (
    <div style={{padding:"0 16px"}}>
      {/* Brand */}
      <div style={{padding:"0 4px 20px",borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:20,display:"flex",gap:12,alignItems:"center"}}>
        <div style={{width:40,height:40,borderRadius:10,background:"linear-gradient(135deg,rgba(99,179,237,0.2),rgba(159,122,234,0.2))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,border:"1px solid rgba(99,179,237,0.2)",flexShrink:0}}>🛡️</div>
        <div>
          <div style={{fontSize:13,fontWeight:700,color:"var(--sa-text)"}}>Super Admin</div>
          <div style={{fontSize:11,color:"var(--sa-muted)"}}>EduSphere Control</div>
        </div>
      </div>

      {/* Menu */}
      {SA_MENU.map(item => (
        <div key={item.key} onClick={()=>{setActive(item.key);setSideOpen(false)}}
          style={{display:"flex",alignItems:"center",gap:12,padding:"11px 12px",borderRadius:8,marginBottom:2,cursor:"pointer",fontSize:13,fontWeight:500,
            background:active===item.key?"rgba(99,179,237,0.1)":"transparent",
            color:active===item.key?"var(--sa-accent)":"var(--sa-muted)",
            transition:"all 0.2s",borderLeft:active===item.key?"2px solid var(--sa-accent)":"2px solid transparent"}}>
          <span style={{fontSize:16,width:22,textAlign:"center"}}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      {/* Bottom actions */}
      <div style={{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div onClick={()=>navigate("/")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,cursor:"pointer",fontSize:13,color:"var(--sa-muted)"}}>
          <span>🏠</span> View Public Site
        </div>
        <div onClick={()=>navigate("/admin")} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,cursor:"pointer",fontSize:13,color:"var(--sa-muted)"}}>
          <span>🔧</span> Admin Dashboard
        </div>
        <div onClick={logout} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:8,cursor:"pointer",fontSize:13,color:"#fc8181"}}>
          <span>🚪</span> Sign Out
        </div>
      </div>
    </div>
  )

  return (
    <div style={{display:"grid",gridTemplateColumns:"240px 1fr",minHeight:"100vh",background:"var(--sa-bg)",fontFamily:"'DM Sans',sans-serif"}} className="sa-main-grid">

      {/* Desktop Sidebar */}
      <div className="sa-sidebar-desktop" style={{background:"var(--sa-card)",borderRight:"1px solid var(--sa-border)",paddingTop:32,position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>
        {sidebar}
      </div>

      {/* Mobile sidebar overlay */}
      {sideOpen && (
        <div style={{position:"fixed",inset:0,zIndex:8000,display:"flex"}}>
          <div style={{width:240,background:"var(--sa-card)",paddingTop:32,borderRight:"1px solid var(--sa-border)",overflowY:"auto"}}>{sidebar}</div>
          <div style={{flex:1,background:"rgba(0,0,0,0.6)"}} onClick={()=>setSideOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div style={{padding:"36px 32px 60px",minWidth:0,overflowX:"hidden"}}>
        {/* Topbar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32,flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <button className="sa-mob-btn" onClick={()=>setSideOpen(true)} style={{display:"none",background:"rgba(99,179,237,0.08)",border:"1px solid rgba(99,179,237,0.2)",borderRadius:8,padding:"8px 14px",color:"var(--sa-accent)",fontSize:13,fontWeight:600,cursor:"pointer",alignItems:"center",gap:8}}>☰ Menu</button>
            <div>
              <div style={{fontSize:22,fontWeight:800,color:"var(--sa-text)"}}>
                {SA_MENU.find(m=>m.key===active)?.icon} {SA_MENU.find(m=>m.key===active)?.label}
              </div>
              <div style={{fontSize:12,color:"var(--sa-muted)"}}>EduSphere Super Admin · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <div style={{fontSize:12,color:"var(--sa-muted)",padding:"6px 12px",background:"rgba(104,211,145,0.08)",borderRadius:100,border:"1px solid rgba(104,211,145,0.2)",color:"#68d391"}}>🛡️ Super Admin</div>
            <button className="sa-btn sa-btn-danger" style={{fontSize:12}} onClick={logout}>Sign Out</button>
          </div>
        </div>

        {/* Sections */}
        {active==="overview" && <SAOverview />}
        {active==="site" && <SASiteSettings />}
        {active==="institute" && <SAInstituteManagement />}
        {active==="users" && <SAUserManager />}
        {active==="timetable" && <SATimetable />}
        {active==="exams" && <SAExamManager />}
        {active==="data" && <SADataManager />}
        {active==="system" && <SASystemSettings />}
        {active==="logs" && <SAActivityLogs />}
      </div>

      <style>{GLOBAL_CSS}</style>
    </div>
  )
}