// import React from "react"

// function AdmissionForm() {
//   return (
//     <div style={styles.container}>
//       <h2>Student Admission Form</h2>

//       <form style={styles.form}>
//         <input
//           type="text"
//           placeholder="Student Name"
//           style={styles.input}
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           style={styles.input}
//         />

//         <input
//           type="tel"
//           placeholder="Mobile Number"
//           style={styles.input}
//         />

//         <button type="submit" style={styles.button}>
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// const styles = {
//   container: {
//     width: "500px",
//     margin: "40px auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "10px"
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px"
//   },

//   input: {
//     padding: "12px",
//     fontSize: "16px"
//   },

//   button: {
//     padding: "12px",
//     backgroundColor: "black",
//     color: "white",
//     border: "none",
//     cursor: "pointer"
//   }
// }

// export default AdmissionForm






import { useState } from "react"
import Footer from "../components/Footer"

/* ─── Data ─────────────────────────────────────────────── */
const CONTACT_INFO = [
  { icon:"📍", title:"Address",       value:"EduSphere Campus, Civil Lines,\nKhandwa, Madhya Pradesh 450001",  link:"https://maps.google.com", linkLabel:"Get Directions →" },
  { icon:"📞", title:"Phone",         value:"+91 98765 43210\n+91 73213 00000",                                link:"tel:+919876543210",        linkLabel:"Call Now"          },
  { icon:"✉️", title:"Email",         value:"info@edusphere.in\nadmissions@edusphere.in",                     link:"mailto:info@edusphere.in", linkLabel:"Send Email"        },
  { icon:"⏰", title:"Office Hours",  value:"Mon–Sat: 8:00 AM – 6:00 PM\nSunday: Closed",                    link:null,                      linkLabel:null                },
]

const DEPARTMENTS = [
  { icon:"🎓", name:"Admissions",     phone:"+91 98765 43210", email:"admissions@edusphere.in" },
  { icon:"💰", name:"Finance / Fees", phone:"+91 73213 00000", email:"fees@edusphere.in"       },
  { icon:"📚", name:"Academics",      phone:"+91 98765 11111", email:"academics@edusphere.in"  },
  { icon:"🏠", name:"Hostel",         phone:"+91 73213 22222", email:"hostel@edusphere.in"     },
]

const SUBJECTS = ["Admission Inquiry","Fee Structure","Course Information","Scholarship","Hostel","Transport","Complaint","Other"]

const SOCIAL = [
  { icon:"𝕏",  label:"Twitter",   href:"#", color:"#1da1f2" },
  { icon:"in", label:"LinkedIn",  href:"#", color:"#0a66c2" },
  { icon:"f",  label:"Facebook",  href:"#", color:"#1877f2" },
  { icon:"▶",  label:"YouTube",   href:"#", color:"#ff0000" },
  { icon:"📷", label:"Instagram", href:"#", color:"#e1306c" },
]

export default function Contact() {
  const [form, setForm]       = useState({ name:"", email:"", phone:"", subject:"Admission Inquiry", message:"", type:"student" })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)
  const [activeTab, setActiveTab] = useState("form")
  const [errors, setErrors]   = useState({})

  const handle = e => { setForm({ ...form, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: "" }) }

  const validate = () => {
    const e = {}
    if (!form.name.trim())                     e.name    = "Name is required"
    if (!form.email.match(/\S+@\S+\.\S+/))    e.email   = "Valid email required"
    if (!form.phone.match(/^[6-9]\d{9}$/))    e.phone   = "Valid 10-digit phone required"
    if (!form.message.trim())                  e.message = "Message is required"
    return e
  }

  const submit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true); setForm({ name:"", email:"", phone:"", subject:"Admission Inquiry", message:"", type:"student" }); setTimeout(()=>setSent(false), 5000) }, 1500)
  }

  const inp = (name, placeholder, type="text", opts={}) => (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:6 }}>{opts.label || name}</label>
      <input
        name={name} type={type} value={form[name]} onChange={handle}
        placeholder={placeholder}
        style={{ width:"100%", padding:"12px 16px", background:"rgba(255,255,255,0.04)", border:`1px solid ${errors[name]?"rgba(248,113,113,0.5)":"rgba(255,255,255,0.1)"}`, borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
        onFocus={e=>e.target.style.borderColor="rgba(201,168,76,0.5)"}
        onBlur={e=>e.target.style.borderColor=errors[name]?"rgba(248,113,113,0.5)":"rgba(255,255,255,0.1)"}
      />
      {errors[name] && <div style={{ fontSize:11, color:"#f87171", marginTop:4 }}>⚠ {errors[name]}</div>}
    </div>
  )

  return (
    <div>
      <style>{`
        .contact-main-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 32px; }
        .dept-grid-contact { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
        @media (max-width: 900px) { .contact-main-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .dept-grid-contact { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ padding:"160px 5% 60px", background:"linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <span className="section-label fade-up">Get in Touch</span>
          <h1 className="section-title fade-up delay-1">We'd Love to <span className="gold-text">Hear from You</span></h1>
          <div className="divider" />
          <p className="section-desc fade-up delay-2">Whether it's admissions, fee queries, or just a hello — we're here for you.</p>

          {/* Quick Contact Strips */}
          <div style={{ display:"flex", gap:12, marginTop:36, flexWrap:"wrap" }}>
            {[
              { icon:"📞", label:"Call Us Now",    val:"+91 98765 43210",      href:"tel:+919876543210",        color:"#4ade80"  },
              { icon:"✉️", label:"Email Us",       val:"info@edusphere.in",    href:"mailto:info@edusphere.in", color:"#60a5fa"  },
              { icon:"📍", label:"Visit Campus",   val:"Khandwa, MP",          href:"https://maps.google.com",  color:"var(--gold)" },
            ].map((c,i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 20px", background:"rgba(255,255,255,0.04)", border:`1px solid ${c.color}25`, borderRadius:12, textDecoration:"none", transition:"all 0.2s", flex:"1 1 200px" }}
                onMouseEnter={e=>{e.currentTarget.style.background=`${c.color}10`;e.currentTarget.style.borderColor=`${c.color}50`}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor=`${c.color}25`}}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${c.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:2 }}>{c.label}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{ background:"var(--dark2)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"0 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:0, overflowX:"auto" }}>
          {[{key:"form",label:"✉️ Send Message"},{key:"departments",label:"🏢 Departments"},{key:"visit",label:"📍 Visit Us"},{key:"social",label:"📱 Follow Us"}].map(t=>(
            <button key={t.key} onClick={()=>setActiveTab(t.key)} style={{ padding:"16px 24px", background:"transparent", border:"none", borderBottom:`3px solid ${activeTab===t.key?"var(--gold)":"transparent"}`, color:activeTab===t.key?"var(--cream)":"var(--text-muted)", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ SEND MESSAGE TAB ══ */}
      {activeTab === "form" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div className="contact-main-grid">

              {/* Left — Info */}
              <div>
                <div className="card contact-info-card">
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--cream)", marginBottom:28 }}>Contact Information</h3>
                  {CONTACT_INFO.map((item,i) => (
                    <div key={i} className="contact-item">
                      <div className="contact-icon">{item.icon}</div>
                      <div>
                        <div className="contact-item-title">{item.title}</div>
                        <div className="contact-item-value" style={{ whiteSpace:"pre-line" }}>{item.value}</div>
                        {item.link && <a href={item.link} target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:6, fontSize:12, color:"var(--gold)", textDecoration:"none", fontWeight:600 }}>{item.linkLabel}</a>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Availability */}
                <div className="card" style={{ padding:24, marginTop:20 }}>
                  <div style={{ fontWeight:700, color:"var(--cream)", fontSize:15, marginBottom:14 }}>🟢 We're Available</div>
                  {[["Mon","✓"],["Tue","✓"],["Wed","✓"],["Thu","✓"],["Fri","✓"],["Sat","✓"],["Sun","✗"]].map(([day,avail],i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:i<6?"1px solid rgba(255,255,255,0.04)":"none" }}>
                      <span style={{ fontSize:13, color:"var(--text-muted)" }}>{day}</span>
                      <span style={{ fontSize:13, color:avail==="✓"?"#4ade80":"#f87171", fontWeight:600 }}>{avail==="✓"?"8AM – 6PM":"Closed"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Form */}
              <div className="card" style={{ padding:40 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--cream)", marginBottom:8 }}>Send a Message</h3>
                <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:28 }}>We typically respond within 24 hours on business days.</p>

                {sent && (
                  <div style={{ background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:10, padding:"16px 20px", marginBottom:24, display:"flex", gap:12, alignItems:"flex-start" }}>
                    <span style={{ fontSize:20 }}>✅</span>
                    <div>
                      <div style={{ color:"#4ade80", fontWeight:600, marginBottom:4 }}>Message sent successfully!</div>
                      <div style={{ fontSize:13, color:"var(--text-muted)" }}>Thank you for reaching out. Our team will get back to you within 24 hours.</div>
                    </div>
                  </div>
                )}

                {/* Who are you */}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:8 }}>I am a</label>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {["student","parent","teacher","other"].map(t => (
                      <button key={t} onClick={()=>setForm({...form,type:t})} style={{ padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${form.type===t?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:form.type===t?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.04)", color:form.type===t?"var(--gold)":"var(--text-muted)", textTransform:"capitalize" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={submit}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>{inp("name","Your full name","text",{label:"Full Name"})}</div>
                    <div>{inp("phone","10-digit mobile number","tel",{label:"Phone"})}</div>
                  </div>
                  {inp("email","your@email.com","email",{label:"Email Address"})}

                  {/* Subject Dropdown */}
                  <div style={{ marginBottom:18 }}>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:6 }}>Subject</label>
                    <select name="subject" value={form.subject} onChange={handle} style={{ width:"100%", padding:"12px 16px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none" }}>
                      {SUBJECTS.map(s => <option key={s} value={s} style={{ background:"#181818" }}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom:20 }}>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:6 }}>Message</label>
                    <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us how we can help you..." rows={5}
                      style={{ width:"100%", padding:"12px 16px", background:"rgba(255,255,255,0.04)", border:`1px solid ${errors.message?"rgba(248,113,113,0.5)":"rgba(255,255,255,0.1)"}`, borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", resize:"vertical", boxSizing:"border-box" }}
                      onFocus={e=>e.target.style.borderColor="rgba(201,168,76,0.5)"}
                      onBlur={e=>e.target.style.borderColor=errors.message?"rgba(248,113,113,0.5)":"rgba(255,255,255,0.1)"}
                    />
                    {errors.message && <div style={{ fontSize:11, color:"#f87171", marginTop:4 }}>⚠ {errors.message}</div>}
                  </div>

                  <button type="submit" className="btn-primary" disabled={sending} style={{ width:"100%", justifyContent:"center", opacity:sending?0.8:1 }}>
                    {sending ? <><span style={{ display:"inline-block", width:14, height:14, border:"2px solid rgba(13,13,13,0.3)", borderTop:"2px solid var(--dark)", borderRadius:"50%", animation:"spin 0.7s linear infinite", marginRight:8 }} />Sending...</> : "Send Message →"}
                  </button>
                </form>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ DEPARTMENTS TAB ══ */}
      {activeTab === "departments" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Direct Contacts</span>
              <h2 className="section-title">Reach the Right <span className="gold-text">Department</span></h2>
              <div className="divider" style={{ margin:"16px auto" }} />
              <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>Skip the queue — contact the department directly for faster response.</p>
            </div>
            <div className="dept-grid-contact">
              {DEPARTMENTS.map((d,i) => (
                <div key={i} className="card" style={{ padding:28 }}>
                  <div style={{ fontSize:32, marginBottom:16 }}>{d.icon}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--cream)", marginBottom:16 }}>{d.name}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    <a href={`tel:${d.phone.replace(/\s/g,"")}`} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e=>e.currentTarget.style.color="var(--cream)"}
                      onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted)"}>
                      <span style={{ fontSize:16 }}>📞</span>{d.phone}
                    </a>
                    <a href={`mailto:${d.email}`} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e=>e.currentTarget.style.color="var(--gold)"}
                      onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted)"}>
                      <span style={{ fontSize:16 }}>✉️</span>{d.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ VISIT US TAB ══ */}
      {activeTab === "visit" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"start", marginBottom:40 }}>
              <div>
                <span className="section-label">Find Us</span>
                <h2 className="section-title" style={{ fontSize:"clamp(24px,4vw,40px)" }}>Visit Our <span className="gold-text">Campus</span></h2>
                <div className="divider" />
                <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.8, marginBottom:24 }}>
                  Our campus is located in the heart of Khandwa city, easily accessible by road and public transport. Visitor parking is available on campus.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    { icon:"📍", title:"Address",        val:"Civil Lines, Khandwa, Madhya Pradesh 450001" },
                    { icon:"🚌", title:"By Bus",          val:"Take bus route 12 or 15 to Civil Lines stop" },
                    { icon:"🚂", title:"Nearest Railway", val:"Khandwa Junction — 3 km from campus"        },
                    { icon:"🅿️", title:"Parking",        val:"Free parking available inside campus gate"  },
                  ].map((item,i) => (
                    <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                      <div style={{ width:38, height:38, borderRadius:10, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"var(--gold)", marginBottom:2 }}>{item.title}</div>
                        <div style={{ fontSize:14, color:"var(--text-muted)" }}>{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:28, display:"flex", gap:12 }}>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:13 }}>Open in Google Maps →</a>
                </div>
              </div>

              {/* Map Embed Placeholder */}
              <div className="card" style={{ padding:0, overflow:"hidden" }}>
                <div style={{ height:420, background:"var(--dark3)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, position:"relative" }}>
                  <div style={{ fontSize:56 }}>🗺️</div>
                  <div style={{ fontSize:15, color:"var(--cream)", fontWeight:600 }}>EduSphere Campus</div>
                  <div style={{ fontSize:13, color:"var(--text-muted)" }}>Civil Lines, Khandwa, MP</div>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize:13, marginTop:8 }}>View on Google Maps →</a>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"12px 16px", background:"rgba(201,168,76,0.06)", borderTop:"1px solid rgba(201,168,76,0.1)", fontSize:12, color:"var(--text-muted)", textAlign:"center" }}>
                    📍 Lat: 21.8259° N, Long: 76.3519° E
                  </div>
                </div>
              </div>
            </div>

            {/* Virtual Tour CTA */}
            <div className="card" style={{ padding:"32px", background:"rgba(201,168,76,0.04)", textAlign:"center" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>🎥</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--cream)", marginBottom:8 }}>Can't Visit in Person?</h3>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:20 }}>Take a virtual campus tour from the comfort of your home. Experience EduSphere online.</p>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:13 }}>▶ Start Virtual Tour</a>
            </div>
          </div>
        </div>
      )}

      {/* ══ SOCIAL TAB ══ */}
      {activeTab === "social" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
            <span className="section-label">Stay Connected</span>
            <h2 className="section-title">Follow Us on <span className="gold-text">Social Media</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
            <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:48, lineHeight:1.7 }}>
              Get daily updates, student stories, event highlights, and important announcements on our social channels.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:20, flexWrap:"wrap", marginBottom:60 }}>
              {SOCIAL.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:"28px 32px", background:"rgba(255,255,255,0.03)", border:`1px solid ${s.color}25`, borderRadius:16, textDecoration:"none", transition:"all 0.3s", minWidth:100 }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${s.color}12`;e.currentTarget.style.borderColor=`${s.color}60`;e.currentTarget.style.transform="translateY(-4px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor=`${s.color}25`;e.currentTarget.style.transform="translateY(0)"}}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:`${s.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, color:s.color, fontWeight:700 }}>{s.icon}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{s.label}</div>
                </a>
              ))}
            </div>

            {/* Newsletter inline */}
            <div className="card" style={{ padding:"36px" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>📬</div>
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--cream)", marginBottom:8 }}>Subscribe to Newsletter</h3>
              <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:20 }}>Get admission updates, scholarships & events in your inbox.</p>
              <form onSubmit={e=>{e.preventDefault();alert("Subscribed! ✅")}} style={{ display:"flex", gap:10, maxWidth:400, margin:"0 auto", flexWrap:"wrap" }}>
                <input type="email" required placeholder="your@email.com"
                  style={{ flex:1, padding:"11px 16px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", minWidth:180 }} />
                <button type="submit" className="btn-primary" style={{ fontSize:13, padding:"11px 22px" }}>Subscribe →</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
