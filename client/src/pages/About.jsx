// 
import { useState, useEffect, useRef } from "react"
import Footer from "../components/Footer"

/* ─── Data ─────────────────────────────────────────────── */
const VALUES = [
  { icon:"🎯", title:"Mission-Driven",  text:"Every decision we make is guided by our commitment to student success and educational excellence." },
  { icon:"💡", title:"Innovation First",text:"We continuously evolve our teaching methods to match the demands of a fast-changing world." },
  { icon:"❤️", title:"Student-Centric", text:"Students are at the heart of everything — their growth, wellbeing, and future always come first." },
]

const MILESTONES = [
  { year:"2000", title:"Founded",             desc:"Started with 1 classroom, 3 teachers, and a vision to transform education in central India." },
  { year:"2005", title:"First Batch of 100+", desc:"Crossed 100 students milestone and expanded to a full campus with science and commerce streams." },
  { year:"2010", title:"CBSE Affiliation",    desc:"Received CBSE affiliation and launched our flagship JEE & NEET preparation programs." },
  { year:"2015", title:"Digital Campus",      desc:"Launched digital classrooms, e-library, and online student portal — first in the region." },
  { year:"2020", title:"5000+ Students",      desc:"Reached 5,000+ enrolled students across 12 programs with 200+ faculty members." },
  { year:"2024", title:"NAAC A++ Rating",     desc:"Awarded NAAC A++ — the highest accreditation — recognizing our academic excellence." },
]

const STATS = [
  { icon:"🎓", val:"5,000+", label:"Students Enrolled"  },
  { icon:"👨‍🏫", val:"200+",  label:"Expert Faculty"     },
  { icon:"📚", val:"120+",  label:"Courses Offered"    },
  { icon:"🏆", val:"25+",   label:"Awards Won"         },
  { icon:"🌍", val:"15,000+",label:"Global Alumni"     },
  { icon:"⭐", val:"98%",   label:"Satisfaction Rate"  },
]

const DEPARTMENTS = [
  { icon:"🔬", name:"Science",    head:"Dr. R. Kumar",    courses:4, students:1800 },
  { icon:"💼", name:"Commerce",   head:"Mrs. S. Patel",   courses:3, students:1200 },
  { icon:"🎨", name:"Arts",       head:"Mr. A. Sharma",   courses:4, students:800  },
  { icon:"💻", name:"Technology", head:"Mr. R. Joshi",    courses:3, students:900  },
  { icon:"📖", name:"Languages",  head:"Mrs. K. Singh",   courses:2, students:600  },
  { icon:"🏃", name:"Sports",     head:"Mr. V. Tiwari",   courses:5, students:700  },
]

const ACCREDITATIONS = [
  { icon:"🏅", label:"CBSE Affiliated"       },
  { icon:"⭐", label:"NAAC A++ Accredited"   },
  { icon:"🥇", label:"ISO 9001:2015"         },
  { icon:"🎖️", label:"Best School MP 2024"  },
]

/* ─── Animated Counter ──────────────────────────────────── */
function Counter({ val }) {
  const num = parseInt(val.replace(/\D/g, ""))
  const suffix = val.replace(/[\d,]/g, "")
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let c = 0; const steps = 50; const inc = num / steps
        const t = setInterval(() => {
          c += inc; if (c >= num) { setCount(num); clearInterval(t) } else setCount(Math.floor(c))
        }, 40)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [num])
  return <span ref={ref}>{num >= 1000 ? count.toLocaleString() : count}{suffix}</span>
}

export default function About() {


const [siteSettings, setSiteSettings] = useState({});

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("siteSettings"));
  if (data) {
    setSiteSettings(data);
  }
}, []);





  const [activeTab, setActiveTab] = useState("story")
  const tabs = [
    { key:"story",   label:"Our Story"   },
    { key:"mission", label:"Mission"     },
    { key:"team",    label:"Departments" },
  ]

  return (
    <div>
      <style>{`
        .about-responsive-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-top: 60px; }
        .milestone-line { display: flex; flex-direction: column; gap: 0; }
        .dept-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 40px; }
        .stats-grid-about { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; margin-top: 40px; }
        @media (max-width: 768px) {
          .about-responsive-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-img-main { height: 300px !important; }
          .about-img-card { right: 0 !important; bottom: -16px !important; }
        }
        @media (max-width: 480px) {
          .stats-grid-about { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ padding:"160px 5% 80px", background:"linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          {/* Accreditations */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
            {ACCREDITATIONS.map((a,i) => (
              <div key={i} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:100, padding:"5px 14px", fontSize:12, fontWeight:600, color:"var(--gold)" }}>
                {a.icon} {a.label}
              </div>
            ))}
          </div>

          <span className="section-label fade-up">Our Story</span>
          <h1 className="section-title fade-up delay-1">
             {siteSettings.aboutTitle || (
        <>
         25 Years of <span className="gold-text">Shaping Minds</span>
          </>
           )}
         </h1>
          <div className="divider" />

          {/* Tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:48, flexWrap:"wrap" }}>
            {tabs.map(t => (
              <button key={t.key} onClick={()=>setActiveTab(t.key)} style={{ padding:"10px 24px", borderRadius:100, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${activeTab===t.key?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:activeTab===t.key?"linear-gradient(135deg,var(--gold),var(--gold-light))":"rgba(255,255,255,0.04)", color:activeTab===t.key?"var(--dark)":"var(--text-muted)", transition:"all 0.3s" }}>{t.label}</button>
            ))}
          </div>

          {/* ── Story Tab ── */}
          {activeTab === "story" && (
            <div className="about-responsive-grid">
              <div style={{ position:"relative" }}>
                <div className="about-img-main" />
                <div className="card about-img-card">
                  <span className="num">25+</span>
                  <span className="lbl">Years of Legacy</span>
                </div>
              </div>
              <div>
                <p className="section-desc">
            {siteSettings.aboutDesc1 ||
             "Founded in 2000, EduSphere began as a single classroom with a bold vision."}
            </p>
                <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.8, marginBottom:36 }}>
                  {siteSettings.aboutDesc2 ||
    "Today, we're a full-scale institution with over 5,000 students."}
                </p>
                <div className="about-values">
                  {VALUES.map((v,i) => (
                    <div key={i} className="value-item">
                      <span className="value-icon">{v.icon}</span>
                      <div><div className="value-title">{v.title}</div><div className="value-text">{v.text}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Mission Tab ── */}
          {activeTab === "mission" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24, marginBottom:48 }}>
                {[
                  { icon:"🎯", title:"Our Mission",  color:"var(--gold)",  text:"To deliver accessible, high-quality education that empowers every student to achieve their highest potential — regardless of background or circumstance." },
                  { icon:"🔭", title:"Our Vision",   color:"#60a5fa",      text:"To be India's most trusted educational institution — known for academic excellence, innovation, and producing leaders who make a meaningful difference in the world." },
                  { icon:"💎", title:"Our Values",   color:"#a78bfa",      text:"Integrity, Excellence, Innovation, Compassion, and Inclusivity. These aren't just words — they guide every decision, every interaction, every day." },
                ].map((c,i) => (
                  <div key={i} className="card" style={{ padding:32, borderTop:`3px solid ${c.color}` }}>
                    <div style={{ fontSize:36, marginBottom:16 }}>{c.icon}</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:12 }}>{c.title}</div>
                    <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>{c.text}</div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ textAlign:"center", marginBottom:32 }}>
                <span className="section-label">Impact In Numbers</span>
                <h2 className="section-title" style={{ fontSize:"clamp(24px,4vw,38px)" }}>EduSphere by the <span className="gold-text">Numbers</span></h2>
              </div>
              <div className="stats-grid-about">
                {STATS.map((s,i) => (
                  <div key={i} className="card" style={{ padding:"24px 20px", textAlign:"center" }}>
                    <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:"var(--gold)", marginBottom:4 }}>
                      <Counter val={s.val} />
                    </div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Departments Tab ── */}
          {activeTab === "team" && (
            <div>
              <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.8, marginBottom:40, maxWidth:700 }}>
                EduSphere is organized into 6 specialized departments, each headed by an expert with decades of experience. Every department maintains small class sizes for maximum student attention.
              </p>
              <div className="dept-grid">
                {DEPARTMENTS.map((d,i) => (
                  <div key={i} className="card" style={{ padding:28, display:"flex", gap:18, alignItems:"flex-start" }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{d.icon}</div>
                    <div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:"var(--cream)", marginBottom:4 }}>{d.name}</div>
                      <div style={{ fontSize:12, color:"var(--gold)", marginBottom:8 }}>Head: {d.head}</div>
                      <div style={{ display:"flex", gap:16 }}>
                        <span style={{ fontSize:12, color:"var(--text-muted)" }}>📚 {d.courses} courses</span>
                        <span style={{ fontSize:12, color:"var(--text-muted)" }}>👥 {d.students}+ students</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ TIMELINE / MILESTONES ══ */}
      <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">How Far We've Come</span>
            <h2 className="section-title">Our <span className="gold-text">Journey</span> Through Time</h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div className="milestone-line">
            {MILESTONES.map((m,i) => (
              <div key={i} style={{ display:"flex", gap:0, alignItems:"stretch" }}>
                {/* Left Year */}
                <div style={{ width:90, flexShrink:0, textAlign:"right", paddingRight:24, paddingTop:4 }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:900, color: i%2===0?"var(--gold)":"#60a5fa" }}>{m.year}</span>
                </div>
                {/* Line + Dot */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                  <div style={{ width:14, height:14, borderRadius:"50%", background: i%2===0?"var(--gold)":"#60a5fa", border:"3px solid var(--dark2)", boxShadow:`0 0 0 3px ${i%2===0?"rgba(201,168,76,0.3)":"rgba(96,165,250,0.3)"}`, marginTop:4, flexShrink:0 }} />
                  {i < MILESTONES.length-1 && <div style={{ width:2, flex:1, background:"rgba(255,255,255,0.07)", minHeight:40 }} />}
                </div>
                {/* Content */}
                <div style={{ paddingLeft:24, paddingBottom:36, flex:1 }}>
                  <div className="card" style={{ padding:24, borderLeft:`3px solid ${i%2===0?"var(--gold)":"#60a5fa"}` }}>
                    <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16, marginBottom:6 }}>{m.title}</div>
                    <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>{m.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CAMPUS PHOTOS ══ */}
      <div style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">Our Infrastructure</span>
            <h2 className="section-title">World-Class <span className="gold-text">Campus</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            {[
              { img:"https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=70", label:"Modern Classrooms"    },
              { img:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=70", label:"Science Labs"      },
              { img:"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=70", label:"Library"          },
              { img:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=70", label:"Sports Facilities" },
            ].map((p,i) => (
              <div key={i} style={{ position:"relative", borderRadius:12, overflow:"hidden", aspectRatio:"4/3", cursor:"pointer" }}
                onMouseEnter={e=>{e.currentTarget.querySelector(".overlay").style.opacity="1"; e.currentTarget.querySelector("img").style.transform="scale(1.08)"}}
                onMouseLeave={e=>{e.currentTarget.querySelector(".overlay").style.opacity="0"; e.currentTarget.querySelector("img").style.transform="scale(1)"}}>
                <img src={p.img} alt={p.label} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} />
                <div className="overlay" style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(13,13,13,0.85),transparent)", opacity:0, transition:"opacity 0.3s", display:"flex", alignItems:"flex-end", padding:16 }}>
                  <span style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>{p.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA ══ */}
      <div style={{ padding:"60px 5%", background:"linear-gradient(135deg,rgba(201,168,76,0.08),transparent)", borderTop:"1px solid rgba(201,168,76,0.1)", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <h2 className="section-title" style={{ fontSize:"clamp(24px,4vw,40px)" }}>Become Part of Our <span className="gold-text">Legacy</span></h2>
          <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:28, lineHeight:1.7 }}>Join thousands of students who have transformed their lives through education at EduSphere.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/courses" className="btn-primary">Explore Courses →</a>
            <a href="/contact" className="btn-outline">Contact Admissions</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
