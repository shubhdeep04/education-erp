
// import { useState } from "react"
// import Footer from "../components/Footer"

// /* ─── Data ─────────────────────────────────────────────── */
// const COURSES = [
//   { thumb:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=70", badge:"Science",    name:"Physics & Mathematics Advanced",  desc:"Deep dive into mechanics, calculus, and modern physics for competitive exam excellence.", duration:"12 months", students:"320", price:"₹18,000", rating:"4.9", level:"Advanced",     mode:"Offline" },
//   { thumb:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",    badge:"Commerce",   name:"Business & Accountancy Pro",       desc:"Comprehensive coverage of accounts, economics, and business studies with industry insights.", duration:"12 months", students:"280", price:"₹15,000", rating:"4.8", level:"Intermediate", mode:"Hybrid"  },
//   { thumb:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70", badge:"Technology", name:"Computer Science & AI",            desc:"Modern curriculum covering programming fundamentals, data structures, and AI concepts.", duration:"10 months", students:"410", price:"₹22,000", rating:"4.9", level:"Advanced",     mode:"Online"  },
//   { thumb:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70", badge:"Arts",       name:"Liberal Arts & Humanities",        desc:"Explore history, literature, psychology, and social sciences with expert faculty.", duration:"12 months", students:"190", price:"₹12,000", rating:"4.7", level:"Beginner",     mode:"Offline" },
//   { thumb:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=70", badge:"Language",   name:"English Communication Mastery",    desc:"Build confidence in spoken and written English essential for academics and careers.", duration:"6 months",  students:"520", price:"₹8,000",  rating:"4.8", level:"Beginner",     mode:"Hybrid"  },
//   { thumb:"https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=70",    badge:"Entrance",   name:"JEE / NEET Foundation",            desc:"Structured preparation with mock tests, doubt clearing, and performance analytics.", duration:"18 months", students:"680", price:"₹35,000", rating:"5.0", level:"Advanced",     mode:"Offline" },
//   { thumb:"https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=600&q=70", badge:"Commerce",   name:"CA Foundation Prep",               desc:"Complete preparation for CA Foundation exams with mock tests and personal mentoring.", duration:"8 months",  students:"210", price:"₹16,000", rating:"4.7", level:"Intermediate", mode:"Hybrid"  },
//   { thumb:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70", badge:"Science",    name:"Biology & Chemistry (NEET Focus)", desc:"Targeted NEET preparation with NCERT deep-dive, previous papers and biology practicals.", duration:"14 months", students:"390", price:"₹28,000", rating:"4.9", level:"Advanced",     mode:"Offline" },
//   { thumb:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=70", badge:"Arts",       name:"Fine Arts & Design",               desc:"Creative education in drawing, painting, and digital design with hands-on studio sessions.", duration:"6 months",  students:"120", price:"₹10,000", rating:"4.6", level:"Beginner",     mode:"Offline" },
// ]

// const CATEGORIES = ["All", "Science", "Commerce", "Technology", "Arts", "Language", "Entrance"]
// const LEVELS     = ["All Levels", "Beginner", "Intermediate", "Advanced"]
// const MODES      = ["All Modes", "Offline", "Online", "Hybrid"]

// const HIGHLIGHTS = [
//   { icon:"👨‍🏫", val:"200+", label:"Expert Faculty"     },
//   { icon:"📚", val:"120+", label:"Total Courses"       },
//   { icon:"🎓", val:"5K+",  label:"Students Enrolled"   },
//   { icon:"🏆", val:"98%",  label:"Success Rate"        },
// ]

// const PROCESS = [
//   { step:"01", icon:"📋", title:"Browse & Select",   desc:"Explore our course catalogue and find the program that matches your goals." },
//   { step:"02", icon:"📝", title:"Register Online",   desc:"Fill the admission form and upload your documents in minutes." },
//   { step:"03", icon:"💰", title:"Pay & Confirm",     desc:"Secure your seat with a simple fee payment. Scholarships available." },
//   { step:"04", icon:"🎓", title:"Start Learning",    desc:"Attend orientation and begin your transformative educational journey." },
// ]

// export default function Courses() {
//   const [category, setCategory] = useState("All")
//   const [level,    setLevel]    = useState("All Levels")
//   const [mode,     setMode]     = useState("All Modes")
//   const [search,   setSearch]   = useState("")
//   const [view,     setView]     = useState("grid") // grid | list

//   const filtered = COURSES.filter(c => {
//     const matchCat    = category === "All"       || c.badge    === category
//     const matchLevel  = level    === "All Levels" || c.level   === level
//     const matchMode   = mode     === "All Modes"  || c.mode    === mode
//     const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase())
//     return matchCat && matchLevel && matchMode && matchSearch
//   })

//   const badgeColors = { Science:"#60a5fa", Commerce:"var(--gold)", Technology:"#a78bfa", Arts:"#f87171", Language:"#4ade80", Entrance:"#fb923c" }

//   return (
//     <div>
//       <style>{`
//         .courses-list-item { display: grid; grid-template-columns: 240px 1fr; gap: 0; }
//         .courses-list-thumb { height: 100% !important; min-height: 180px; }
//         @media (max-width: 600px) {
//           .courses-list-item { grid-template-columns: 1fr !important; }
//           .courses-list-thumb { height: 180px !important; }
//           .filter-row { flex-direction: column !important; }
//         }
//       `}</style>

//       {/* ══ HERO ══ */}
//       <div style={{ padding:"160px 5% 0", background:"linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <span className="section-label fade-up">All Programs</span>
//           <h1 className="section-title fade-up delay-1">Find Your <span className="gold-text">Course</span></h1>
//           <div className="divider" />
//           <p className="section-desc fade-up delay-2">From foundation to advanced — we have a program designed for every goal.</p>

//           {/* Highlights */}
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:16, margin:"40px 0 60px" }}>
//             {HIGHLIGHTS.map((h,i) => (
//               <div key={i} className="card" style={{ padding:"20px", textAlign:"center" }}>
//                 <div style={{ fontSize:24, marginBottom:8 }}>{h.icon}</div>
//                 <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:900, color:"var(--gold)" }}>{h.val}</div>
//                 <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{h.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ FILTERS ══ */}
//       <div style={{ background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"24px 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           {/* Search + View Toggle */}
//           <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
//             <div style={{ position:"relative", flex:1, minWidth:200 }}>
//               <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:15, color:"var(--text-muted)" }}>🔍</span>
//               <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses..." style={{ width:"100%", padding:"10px 14px 10px 40px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", boxSizing:"border-box" }} />
//             </div>
//             <div style={{ display:"flex", gap:6 }}>
//               {[["grid","⊞"],["list","☰"]].map(([v,icon]) => (
//                 <button key={v} onClick={()=>setView(v)} style={{ width:38, height:38, borderRadius:8, border:`1px solid ${view===v?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:view===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.04)", color:view===v?"var(--gold)":"var(--text-muted)", cursor:"pointer", fontSize:16 }}>{icon}</button>
//               ))}
//             </div>
//             <span style={{ fontSize:13, color:"var(--text-muted)", flexShrink:0 }}>{filtered.length} course{filtered.length!==1?"s":""}</span>
//           </div>

//           {/* Filter Pills */}
//           <div className="filter-row" style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
//             <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
//               {CATEGORIES.map(c => (
//                 <button key={c} onClick={()=>setCategory(c)} style={{ padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${category===c?"var(--gold)":"rgba(255,255,255,0.08)"}`, background:category===c?"linear-gradient(135deg,var(--gold),var(--gold-light))":"rgba(255,255,255,0.04)", color:category===c?"var(--dark)":"var(--text-muted)", transition:"all 0.2s" }}>{c}</button>
//               ))}
//             </div>
//             <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginLeft:"auto" }}>
//               <select value={level} onChange={e=>setLevel(e.target.value)} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none", cursor:"pointer" }}>
//                 {LEVELS.map(l => <option key={l} value={l} style={{ background:"#181818" }}>{l}</option>)}
//               </select>
//               <select value={mode} onChange={e=>setMode(e.target.value)} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none", cursor:"pointer" }}>
//                 {MODES.map(m => <option key={m} value={m} style={{ background:"#181818" }}>{m}</option>)}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ══ COURSES ══ */}
//       <div style={{ padding:"48px 5% 80px" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           {filtered.length === 0 ? (
//             <div style={{ textAlign:"center", padding:"80px 0" }}>
//               <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
//               <div style={{ fontSize:18, color:"var(--cream)", marginBottom:8 }}>No courses found</div>
//               <div style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24 }}>Try adjusting your filters or search term.</div>
//               <button className="btn-outline" onClick={()=>{setCategory("All");setLevel("All Levels");setMode("All Modes");setSearch("")}}>Clear All Filters</button>
//             </div>
//           ) : view === "grid" ? (
//             <div className="courses-grid">
//               {filtered.map((c,i) => (
//                 <div key={i} className={`card course-card fade-up delay-${(i%3)+1}`}>
//                   <div className="course-thumb" style={{ backgroundImage:`url('${c.thumb}')`, position:"relative" }}>
//                     <span className="course-badge" style={{ background:badgeColors[c.badge]||"var(--gold)", color:"var(--dark)" }}>{c.badge}</span>
//                     <div style={{ position:"absolute", top:14, right:14, background:"rgba(13,13,13,0.85)", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:600, color:"#fbbf24" }}>⭐ {c.rating}</div>
//                   </div>
//                   <div className="course-body">
//                     <div className="course-meta">
//                       <span>⏱ {c.duration}</span>
//                       <span>👥 {c.students}</span>
//                     </div>
//                     <div style={{ display:"flex", gap:6, marginBottom:10 }}>
//                       <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#a78bfa", background:"rgba(167,139,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.level}</span>
//                       <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#60a5fa", background:"rgba(96,165,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.mode}</span>
//                     </div>
//                     <div className="course-name">{c.name}</div>
//                     <div className="course-desc-text">{c.desc}</div>
//                     <div className="course-footer">
//                       <span className="course-price">{c.price}</span>
//                       <a href="/contact" className="course-link">Enroll Now →</a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//               {filtered.map((c,i) => (
//                 <div key={i} className="card courses-list-item" style={{ overflow:"hidden" }}>
//                   <div className="courses-list-thumb" style={{ backgroundImage:`url('${c.thumb}')`, backgroundSize:"cover", backgroundPosition:"center", position:"relative" }}>
//                     <span className="course-badge" style={{ background:badgeColors[c.badge]||"var(--gold)", color:"var(--dark)" }}>{c.badge}</span>
//                   </div>
//                   <div style={{ padding:28 }}>
//                     <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:10 }}>
//                       <div style={{ display:"flex", gap:6 }}>
//                         <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#a78bfa", background:"rgba(167,139,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.level}</span>
//                         <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#60a5fa", background:"rgba(96,165,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.mode}</span>
//                       </div>
//                       <span style={{ fontSize:13, fontWeight:700, color:"#fbbf24" }}>⭐ {c.rating}</span>
//                     </div>
//                     <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>{c.name}</div>
//                     <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.6, marginBottom:16 }}>{c.desc}</div>
//                     <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
//                       <div style={{ display:"flex", gap:20 }}>
//                         <span style={{ fontSize:13, color:"var(--text-muted)" }}>⏱ {c.duration}</span>
//                         <span style={{ fontSize:13, color:"var(--text-muted)" }}>👥 {c.students} students</span>
//                       </div>
//                       <div style={{ display:"flex", alignItems:"center", gap:16 }}>
//                         <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--gold)" }}>{c.price}</span>
//                         <a href="/contact" className="btn-primary" style={{ fontSize:13, padding:"10px 22px" }}>Enroll Now →</a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ HOW TO ENROLL ══ */}
//       <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:56 }}>
//             <span className="section-label">Simple & Fast</span>
//             <h2 className="section-title">How to <span className="gold-text">Enroll</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
//             {PROCESS.map((p,i) => (
//               <div key={i} style={{ textAlign:"center", position:"relative" }}>
//                 <div style={{ fontFamily:"'Playfair Display',serif", fontSize:56, fontWeight:900, color:"rgba(201,168,76,0.08)", lineHeight:1, marginBottom:-16 }}>{p.step}</div>
//                 <div className="card" style={{ padding:28 }}>
//                   <div style={{ fontSize:32, marginBottom:14 }}>{p.icon}</div>
//                   <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16, marginBottom:8 }}>{p.title}</div>
//                   <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>{p.desc}</div>
//                 </div>
//                 {i < PROCESS.length-1 && (
//                   <div style={{ display:"none", position:"absolute", top:"50%", right:-16, fontSize:20, color:"var(--gold)", transform:"translateY(-50%)" }} className="process-arrow">→</div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div style={{ textAlign:"center", marginTop:40 }}>
//             <a href="/contact" className="btn-primary" style={{ fontSize:15 }}>Start Your Application →</a>
//           </div>
//         </div>
//       </div>

//       {/* ══ SCHOLARSHIP BANNER ══ */}
//       <div style={{ padding:"60px 5%" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", borderRadius:20, padding:"48px", background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))", border:"1px solid rgba(201,168,76,0.2)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
//           <div>
//             <div style={{ fontSize:36, marginBottom:12 }}>🎓</div>
//             <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,32px)", color:"var(--cream)", marginBottom:8 }}>
//               Scholarships Available for <span className="gold-text">Deserving Students</span>
//             </h3>
//             <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:500, lineHeight:1.7 }}>
//               Merit-based scholarships up to 100% fee waiver. Financial assistance for economically weaker sections. Apply today — limited seats.
//             </p>
//           </div>
//           <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
//             <a href="/contact" className="btn-primary">Apply for Scholarship →</a>
//             <a href="/services" className="btn-outline">Learn More</a>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }






import { useState, useEffect } from "react"
import Footer from "../components/Footer"

/* ─── Fallback Data (agar localStorage empty ho) ───────── */
const DEFAULT_COURSES = [
  { id:1, thumb:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=70", badge:"Science",    name:"Physics & Mathematics Advanced",  desc:"Deep dive into mechanics, calculus, and modern physics for competitive exam excellence.", duration:"12 months", enrolled:"320", fee:"18000", rating:"4.9", level:"Advanced",     mode:"Offline", status:"active" },
  { id:2, thumb:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",    badge:"Commerce",   name:"Business & Accountancy Pro",       desc:"Comprehensive coverage of accounts, economics, and business studies with industry insights.", duration:"12 months", enrolled:"280", fee:"15000", rating:"4.8", level:"Intermediate", mode:"Hybrid",  status:"active" },
  { id:3, thumb:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70", badge:"Technology", name:"Computer Science & AI",            desc:"Modern curriculum covering programming fundamentals, data structures, and AI concepts.", duration:"10 months", enrolled:"410", fee:"22000", rating:"4.9", level:"Advanced",     mode:"Online",  status:"active" },
  { id:4, thumb:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70", badge:"Arts",       name:"Liberal Arts & Humanities",        desc:"Explore history, literature, psychology, and social sciences with expert faculty.", duration:"12 months", enrolled:"190", fee:"12000", rating:"4.7", level:"Beginner",     mode:"Offline", status:"active" },
  { id:5, thumb:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=70", badge:"Language",   name:"English Communication Mastery",    desc:"Build confidence in spoken and written English essential for academics and careers.", duration:"6 months",  enrolled:"520", fee:"8000",  rating:"4.8", level:"Beginner",     mode:"Hybrid",  status:"active" },
  { id:6, thumb:"https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=70",    badge:"Entrance",   name:"JEE / NEET Foundation",            desc:"Structured preparation with mock tests, doubt clearing, and performance analytics.", duration:"18 months", enrolled:"680", fee:"35000", rating:"5.0", level:"Advanced",     mode:"Offline", status:"active" },
  { id:7, thumb:"https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=600&q=70", badge:"Commerce",   name:"CA Foundation Prep",               desc:"Complete preparation for CA Foundation exams with mock tests and personal mentoring.", duration:"8 months",  enrolled:"210", fee:"16000", rating:"4.7", level:"Intermediate", mode:"Hybrid",  status:"active" },
  { id:8, thumb:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70", badge:"Science",    name:"Biology & Chemistry (NEET Focus)", desc:"Targeted NEET preparation with NCERT deep-dive, previous papers and biology practicals.", duration:"14 months", enrolled:"390", fee:"28000", rating:"4.9", level:"Advanced",     mode:"Offline", status:"active" },
  { id:9, thumb:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=70", badge:"Arts",       name:"Fine Arts & Design",               desc:"Creative education in drawing, painting, and digital design with hands-on studio sessions.", duration:"6 months",  enrolled:"120", fee:"10000", rating:"4.6", level:"Beginner",     mode:"Offline", status:"active" },
]

const CATEGORIES = ["All", "Science", "Commerce", "Technology", "Arts", "Language", "Entrance"]
const LEVELS     = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const MODES      = ["All Modes", "Offline", "Online", "Hybrid"]

const HIGHLIGHTS = [
  { icon:"👨‍🏫", val:"200+", label:"Expert Faculty"   },
  { icon:"📚", val:"120+", label:"Total Courses"     },
  { icon:"🎓", val:"5K+",  label:"Students Enrolled" },
  { icon:"🏆", val:"98%",  label:"Success Rate"      },
]

const PROCESS = [
  { step:"01", icon:"📋", title:"Browse & Select", desc:"Explore our course catalogue and find the program that matches your goals." },
  { step:"02", icon:"📝", title:"Register Online", desc:"Fill the admission form and upload your documents in minutes." },
  { step:"03", icon:"💰", title:"Pay & Confirm",   desc:"Secure your seat with a simple fee payment. Scholarships available." },
  { step:"04", icon:"🎓", title:"Start Learning",  desc:"Attend orientation and begin your transformative educational journey." },
]

export default function Courses() {
  const [courses,  setCourses] = useState([])
  const [category, setCategory] = useState("All")
  const [level,    setLevel]    = useState("All Levels")
  const [mode,     setMode]     = useState("All Modes")
  const [search,   setSearch]   = useState("")
  const [view,     setView]     = useState("grid")

  /* ── localStorage se data load karo, warna default use karo ── */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("courses")
      if (stored) {
        const parsed = JSON.parse(stored)
        // Sirf active courses dikhao
        setCourses(parsed.filter(c => c.status === "active"))
      } else {
        setCourses(DEFAULT_COURSES)
      }
    } catch {
      setCourses(DEFAULT_COURSES)
    }

    /* Admin changes ho toh page automatically update ho */
    const onStorage = (e) => {
      if (e.key === "courses") {
        try {
          const parsed = JSON.parse(e.newValue || "[]")
          setCourses(parsed.filter(c => c.status === "active"))
        } catch {
          setCourses(DEFAULT_COURSES)
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const filtered = courses.filter(c => {
    const matchCat    = category === "All"        || c.badge  === category
    const matchLevel  = level    === "All Levels" || c.level  === level
    const matchMode   = mode     === "All Modes"  || c.mode   === mode
    const matchSearch = (c.name || "").toLowerCase().includes(search.toLowerCase())
                     || (c.desc || c.description || "").toLowerCase().includes(search.toLowerCase())
    return matchCat && matchLevel && matchMode && matchSearch
  })

  /* Admin se aaya data desc ya description dono naam se ho sakta hai */
  const getDesc  = c => c.desc || c.description || ""
  const getThumb = c => c.thumb || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=70"
  const getStudents = c => c.students || c.enrolled || "0"
  const getPrice = c => c.price || (c.fee ? "₹" + Number(c.fee).toLocaleString() : "—")

  const badgeColors = {
    Science:"#60a5fa", Commerce:"var(--gold)", Technology:"#a78bfa",
    Arts:"#f87171", Language:"#4ade80", Entrance:"#fb923c"
  }

  return (
    <div>
      <style>{`
        .courses-list-item { display: grid; grid-template-columns: 240px 1fr; gap: 0; }
        .courses-list-thumb { height: 100% !important; min-height: 180px; }
        @media (max-width: 600px) {
          .courses-list-item { grid-template-columns: 1fr !important; }
          .courses-list-thumb { height: 180px !important; }
          .filter-row { flex-direction: column !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ padding:"160px 5% 0", background:"linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <span className="section-label fade-up">All Programs</span>
          <h1 className="section-title fade-up delay-1">Find Your <span className="gold-text">Course</span></h1>
          <div className="divider" />
          <p className="section-desc fade-up delay-2">From foundation to advanced — we have a program designed for every goal.</p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:16, margin:"40px 0 60px" }}>
            {HIGHLIGHTS.map((h,i) => (
              <div key={i} className="card" style={{ padding:"20px", textAlign:"center" }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{h.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:900, color:"var(--gold)" }}>{h.val}</div>
                <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FILTERS ══ */}
      <div style={{ background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"24px 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:15, color:"var(--text-muted)" }}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses..."
                style={{ width:"100%", padding:"10px 14px 10px 40px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text)", fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:"none", boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {[["grid","⊞"],["list","☰"]].map(([v,icon]) => (
                <button key={v} onClick={()=>setView(v)}
                  style={{ width:38, height:38, borderRadius:8, border:`1px solid ${view===v?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:view===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.04)", color:view===v?"var(--gold)":"var(--text-muted)", cursor:"pointer", fontSize:16 }}>{icon}</button>
              ))}
            </div>
            <span style={{ fontSize:13, color:"var(--text-muted)", flexShrink:0 }}>{filtered.length} course{filtered.length!==1?"s":""}</span>
          </div>

          <div className="filter-row" style={{ display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={()=>setCategory(c)}
                  style={{ padding:"6px 14px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${category===c?"var(--gold)":"rgba(255,255,255,0.08)"}`, background:category===c?"linear-gradient(135deg,var(--gold),var(--gold-light))":"rgba(255,255,255,0.04)", color:category===c?"var(--dark)":"var(--text-muted)", transition:"all 0.2s" }}>{c}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginLeft:"auto" }}>
              <select value={level} onChange={e=>setLevel(e.target.value)}
                style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none", cursor:"pointer" }}>
                {LEVELS.map(l => <option key={l} value={l} style={{ background:"#181818" }}>{l}</option>)}
              </select>
              <select value={mode} onChange={e=>setMode(e.target.value)}
                style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none", cursor:"pointer" }}>
                {MODES.map(m => <option key={m} value={m} style={{ background:"#181818" }}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ══ COURSES ══ */}
      <div style={{ padding:"48px 5% 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <div style={{ fontSize:18, color:"var(--cream)", marginBottom:8 }}>No courses found</div>
              <div style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24 }}>Try adjusting your filters or search term.</div>
              <button className="btn-outline" onClick={()=>{setCategory("All");setLevel("All Levels");setMode("All Modes");setSearch("")}}>Clear All Filters</button>
            </div>
          ) : view === "grid" ? (
            <div className="courses-grid">
              {filtered.map((c,i) => (
                <div key={c.id||i} className={`card course-card fade-up delay-${(i%3)+1}`}>
                  <div className="course-thumb" style={{ backgroundImage:`url('${getThumb(c)}')`, position:"relative" }}>
                    <span className="course-badge" style={{ background:badgeColors[c.badge]||"var(--gold)", color:"var(--dark)" }}>{c.badge || "—"}</span>
                    <div style={{ position:"absolute", top:14, right:14, background:"rgba(13,13,13,0.85)", borderRadius:100, padding:"3px 10px", fontSize:11, fontWeight:600, color:"#fbbf24" }}>⭐ {c.rating || "—"}</div>
                  </div>
                  <div className="course-body">
                    <div className="course-meta">
                      <span>⏱ {c.duration}</span>
                      <span>👥 {getStudents(c)}</span>
                    </div>
                    <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                      {c.level && <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#a78bfa", background:"rgba(167,139,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.level}</span>}
                      {c.mode  && <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#60a5fa", background:"rgba(96,165,250,0.1)",  padding:"2px 8px", borderRadius:100 }}>{c.mode}</span>}
                    </div>
                    <div className="course-name">{c.name}</div>
                    <div className="course-desc-text">{getDesc(c)}</div>
                    <div className="course-footer">
                      <span className="course-price">{getPrice(c)}</span>
                      <a href="/contact" className="course-link">Enroll Now →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {filtered.map((c,i) => (
                <div key={c.id||i} className="card courses-list-item" style={{ overflow:"hidden" }}>
                  <div className="courses-list-thumb" style={{ backgroundImage:`url('${getThumb(c)}')`, backgroundSize:"cover", backgroundPosition:"center", position:"relative" }}>
                    <span className="course-badge" style={{ background:badgeColors[c.badge]||"var(--gold)", color:"var(--dark)" }}>{c.badge || "—"}</span>
                  </div>
                  <div style={{ padding:28 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:10 }}>
                      <div style={{ display:"flex", gap:6 }}>
                        {c.level && <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#a78bfa", background:"rgba(167,139,250,0.1)", padding:"2px 8px", borderRadius:100 }}>{c.level}</span>}
                        {c.mode  && <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#60a5fa", background:"rgba(96,165,250,0.1)",  padding:"2px 8px", borderRadius:100 }}>{c.mode}</span>}
                      </div>
                      <span style={{ fontSize:13, fontWeight:700, color:"#fbbf24" }}>⭐ {c.rating || "—"}</span>
                    </div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>{c.name}</div>
                    <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.6, marginBottom:16 }}>{getDesc(c)}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                      <div style={{ display:"flex", gap:20 }}>
                        <span style={{ fontSize:13, color:"var(--text-muted)" }}>⏱ {c.duration}</span>
                        <span style={{ fontSize:13, color:"var(--text-muted)" }}>👥 {getStudents(c)} students</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                        <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"var(--gold)" }}>{getPrice(c)}</span>
                        <a href="/contact" className="btn-primary" style={{ fontSize:13, padding:"10px 22px" }}>Enroll Now →</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ HOW TO ENROLL ══ */}
      <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">Simple & Fast</span>
            <h2 className="section-title">How to <span className="gold-text">Enroll</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {PROCESS.map((p,i) => (
              <div key={i} style={{ textAlign:"center", position:"relative" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:56, fontWeight:900, color:"rgba(201,168,76,0.08)", lineHeight:1, marginBottom:-16 }}>{p.step}</div>
                <div className="card" style={{ padding:28 }}>
                  <div style={{ fontSize:32, marginBottom:14 }}>{p.icon}</div>
                  <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16, marginBottom:8 }}>{p.title}</div>
                  <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40 }}>
            <a href="/contact" className="btn-primary" style={{ fontSize:15 }}>Start Your Application →</a>
          </div>
        </div>
      </div>

      {/* ══ SCHOLARSHIP BANNER ══ */}
      <div style={{ padding:"60px 5%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", borderRadius:20, padding:"48px", background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))", border:"1px solid rgba(201,168,76,0.2)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ fontSize:36, marginBottom:12 }}>🎓</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,32px)", color:"var(--cream)", marginBottom:8 }}>
              Scholarships Available for <span className="gold-text">Deserving Students</span>
            </h3>
            <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:500, lineHeight:1.7 }}>
              Merit-based scholarships up to 100% fee waiver. Financial assistance for economically weaker sections. Apply today — limited seats.
            </p>
          </div>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <a href="/contact" className="btn-primary">Apply for Scholarship →</a>
            <a href="/services" className="btn-outline">Learn More</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}