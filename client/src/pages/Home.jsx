
// import { useNavigate } from "react-router-dom"
// import { useState, useEffect, useRef } from "react"
// import Footer from "../components/Footer"

// /* ─── Data ───────────────────────────────────────────────── */
// const FEATURES = [
//   { icon:"🎓", title:"Expert Faculty",    desc:"Learn from industry veterans and experienced educators with decades of real-world expertise." },
//   { icon:"💻", title:"Digital Learning",  desc:"Access cutting-edge digital tools, recorded lectures, and interactive online resources anytime." },
//   { icon:"🏆", title:"Proven Results",    desc:"95% pass rate with hundreds of students placed in top universities and companies." },
//   { icon:"🤝", title:"Mentorship",        desc:"Personal guidance from dedicated mentors who are invested in your individual success." },
//   { icon:"📊", title:"Progress Tracking", desc:"Real-time dashboards to track your academic journey, attendance, and performance." },
//   { icon:"🌍", title:"Global Network",    desc:"Connect with alumni across the globe and build lifelong professional relationships." },
// ]

// const STATS = [
//   ["5,000+","Students Enrolled"],
//   ["120+","Courses Offered"],
//   ["98%","Satisfaction Rate"],
//   ["25+","Years of Excellence"],
// ]

// const COUNTER_STATS = [
//   { end:5000, suffix:"+", label:"Students Enrolled",  icon:"🎓" },
//   { end:120,  suffix:"+", label:"Courses Offered",    icon:"📚" },
//   { end:98,   suffix:"%", label:"Satisfaction Rate",  icon:"⭐" },
//   { end:200,  suffix:"+", label:"Faculty Members",    icon:"👨‍🏫" },
//   { end:25,   suffix:"+", label:"Years of Excellence",icon:"🏆" },
//   { end:15000,suffix:"+", label:"Alumni Worldwide",   icon:"🌍" },
// ]

// const ACHIEVEMENTS = [
//   { icon:"🥇", year:"2024", title:"Best Educational Institution", body:"Awarded by MP Government for outstanding academic excellence and student development." },
//   { icon:"🏅", year:"2023", title:"NAAC A++ Accreditation",       body:"Received highest accreditation grade from National Assessment & Accreditation Council." },
//   { icon:"🎖️", year:"2022", title:"National Innovation Award",    body:"Recognized for pioneering digital learning initiatives across central India." },
//   { icon:"🌟", year:"2021", title:"Top 10 Schools of India",      body:"Ranked among India's top institutions by Education World magazine." },
// ]

// const TESTIMONIALS = [
//   { name:"Priya Sharma",   role:"JEE Advanced Qualifier, IIT Delhi",   avatar:"P", rating:5, text:"EduSphere completely transformed my approach to learning. The faculty is world-class and the personal mentorship helped me crack JEE Advanced on my first attempt." },
//   { name:"Rohan Verma",    role:"NEET Qualifier, AIIMS Delhi",          avatar:"R", rating:5, text:"The structured preparation, mock tests, and doubt-clearing sessions at EduSphere gave me the confidence to achieve my dream of getting into AIIMS." },
//   { name:"Sneha Patel",    role:"CA Final, Big 4 Firm",                 avatar:"S", rating:5, text:"From commerce foundations to CA Finals — EduSphere was with me every step. The faculty's industry experience made all the difference." },
//   { name:"Aditya Rao",     role:"Software Engineer, Google",            avatar:"A", rating:5, text:"The Computer Science program at EduSphere gave me a rock-solid foundation. I credit my placement at Google entirely to the quality of education here." },
//   { name:"Meera Joshi",    role:"Civil Services (IAS), Batch 2023",     avatar:"M", rating:5, text:"EduSphere's disciplined environment and expert guidance helped me crack UPSC in my very first attempt. Forever grateful." },
//   { name:"Arjun Malhotra", role:"MBA, IIM Ahmedabad",                   avatar:"A", rating:5, text:"The holistic education at EduSphere — academics, personality development, and real-world exposure — prepared me perfectly for IIM." },
// ]

// const TEAM = [
//   { name:"Dr. Rajesh Kumar",   role:"Principal & Founder",        subject:"Physics",       exp:"30+ yrs", avatar:"R" },
//   { name:"Mrs. Sunita Patel",  role:"Head of Science Dept.",      subject:"Chemistry",     exp:"22+ yrs", avatar:"S" },
//   { name:"Mr. Anil Sharma",    role:"Head of Mathematics",        subject:"Mathematics",   exp:"18+ yrs", avatar:"A" },
//   { name:"Dr. Priya Gupta",    role:"Head of Commerce",           subject:"Accountancy",   exp:"15+ yrs", avatar:"P" },
//   { name:"Mr. Rohit Joshi",    role:"CS & Technology Lead",       subject:"Computer Sci.", exp:"12+ yrs", avatar:"R" },
//   { name:"Mrs. Kavita Singh",  role:"Head of Languages",          subject:"English",       exp:"20+ yrs", avatar:"K" },
// ]

// const EVENTS = [
//   { date:"15", month:"Jan", title:"Annual Science Exhibition",      time:"10:00 AM",  venue:"Main Hall",     category:"Academic",  color:"#60a5fa" },
//   { date:"22", month:"Jan", title:"JEE/NEET Mock Test Series",      time:"8:00 AM",   venue:"Exam Centre",   category:"Exam",      color:"#f87171" },
//   { date:"05", month:"Feb", title:"Inter-School Debate Competition",time:"2:00 PM",   venue:"Auditorium",    category:"Cultural",  color:"#a78bfa" },
//   { date:"14", month:"Feb", title:"Career Counselling Seminar",     time:"11:00 AM",  venue:"Seminar Hall",  category:"Career",    color:"var(--gold)" },
//   { date:"28", month:"Feb", title:"Annual Sports Day",              time:"9:00 AM",   venue:"Sports Ground", category:"Sports",    color:"#4ade80" },
//   { date:"10", month:"Mar", title:"Parent-Teacher Meeting",         time:"3:00 PM",   venue:"All Classes",   category:"Meeting",   color:"#94a3b8" },
// ]

// const PARTNERS = [
//   "IIT Delhi","AIIMS","CBSE Board","ICSE Council","Coursera","Khan Academy",
//   "NIT Bhopal","IIM Indore","BYJU'S","Unacademy","TopRankers","Allen Institute",
// ]

// const FAQS = [
//   { q:"What courses does EduSphere offer?",                    a:"We offer programs for Science (PCM/PCB), Commerce, Arts, Computer Science, and entrance exam preparation including JEE, NEET, CA Foundation, and CLAT." },
//   { q:"What is the admission process?",                        a:"You can apply online or visit our campus. The process includes a registration form, entrance test, counselling session, and document verification. Seats are limited." },
//   { q:"Does EduSphere provide hostel facilities?",             a:"Yes, we have separate hostel facilities for boys and girls with 24/7 security, nutritious meals, and a conducive study environment." },
//   { q:"Are scholarships available?",                           a:"Yes! We offer merit-based scholarships (up to 100% fee waiver) and need-based financial assistance. Contact our admissions office for details." },
//   { q:"What is the student-to-teacher ratio?",                 a:"We maintain a low 15:1 student-teacher ratio to ensure personalized attention and quality education for every student." },
//   { q:"How can I track my child's academic progress?",         a:"Parents can access the student portal using login credentials provided at admission. It shows attendance, grades, assignments, and notices in real-time." },
// ]

// /* ─── Animated Counter ───────────────────────────────────── */
// function AnimatedCounter({ end, suffix, duration = 2000 }) {
//   const [count, setCount] = useState(0)
//   const ref               = useRef(null)
//   const started           = useRef(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true
//         const steps     = 60
//         const increment = end / steps
//         let current     = 0
//         const timer = setInterval(() => {
//           current += increment
//           if (current >= end) { setCount(end); clearInterval(timer) }
//           else setCount(Math.floor(current))
//         }, duration / steps)
//       }
//     }, { threshold: 0.3 })
//     if (ref.current) observer.observe(ref.current)
//     return () => observer.disconnect()
//   }, [end, duration])

//   return (
//     <span ref={ref}>
//       {count >= 1000 ? (count >= 10000 ? (count/1000).toFixed(0)+"K" : count.toLocaleString()) : count}{suffix}
//     </span>
//   )
// }

// /* ─── Live Chat Button ───────────────────────────────────── */
// function LiveChat() {
//   const [open, setOpen]     = useState(false)
//   const [msgs, setMsgs]     = useState([{ from:"bot", text:"👋 Hi! Welcome to EduSphere. How can I help you today?" }])
//   const [input, setInput]   = useState("")
//   const [typing, setTyping] = useState(false)
//   const endRef              = useRef(null)

//   const AUTO_REPLIES = {
//     admission: "For admissions, please visit our Contact page or call +91 98765 43210. Seats are limited!",
//     fee:       "Fee details vary by course. Visit the Courses page or contact us directly for a detailed fee structure.",
//     hostel:    "Yes, we have hostel facilities for both boys and girls with 24/7 security and meals included.",
//     scholarship:"We offer merit and need-based scholarships. Apply during admission with your marksheets.",
//     default:   "Thank you for your message! Our team will get back to you shortly. You can also call us at +91 98765 43210.",
//   }

//   useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }) }, [msgs])

//   const send = () => {
//     if (!input.trim()) return
//     const userMsg = input.trim()
//     setMsgs(m => [...m, { from:"user", text: userMsg }])
//     setInput("")
//     setTyping(true)
//     setTimeout(() => {
//       const lower = userMsg.toLowerCase()
//       const reply = lower.includes("admission") ? AUTO_REPLIES.admission
//                   : lower.includes("fee")       ? AUTO_REPLIES.fee
//                   : lower.includes("hostel")    ? AUTO_REPLIES.hostel
//                   : lower.includes("scholar")   ? AUTO_REPLIES.scholarship
//                   : AUTO_REPLIES.default
//       setMsgs(m => [...m, { from:"bot", text: reply }])
//       setTyping(false)
//     }, 1200)
//   }

//   return (
//     <>
//       {/* Chat Window */}
//       {open && (
//         <div style={{ position:"fixed", bottom:90, right:24, width:320, background:"var(--dark2)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,0.6)", zIndex:9000, overflow:"hidden", display:"flex", flexDirection:"column" }}>
//           {/* Header */}
//           <div style={{ background:"linear-gradient(135deg,var(--gold),var(--gold-light))", padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
//             <div>
//               <div style={{ fontWeight:700, color:"var(--dark)", fontSize:14 }}>💬 EduSphere Support</div>
//               <div style={{ fontSize:11, color:"rgba(13,13,13,0.7)" }}>● Online — Typically replies instantly</div>
//             </div>
//             <button onClick={()=>setOpen(false)} style={{ background:"rgba(13,13,13,0.15)", border:"none", borderRadius:6, width:28, height:28, cursor:"pointer", color:"var(--dark)", fontSize:14 }}>✕</button>
//           </div>
//           {/* Messages */}
//           <div style={{ flex:1, maxHeight:280, overflowY:"auto", padding:14, display:"flex", flexDirection:"column", gap:10 }}>
//             {msgs.map((m,i) => (
//               <div key={i} style={{ display:"flex", justifyContent: m.from==="user" ? "flex-end" : "flex-start" }}>
//                 <div style={{ maxWidth:"80%", padding:"9px 13px", borderRadius: m.from==="user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: m.from==="user" ? "linear-gradient(135deg,var(--gold),var(--gold-light))" : "rgba(255,255,255,0.07)", color: m.from==="user" ? "var(--dark)" : "var(--text)", fontSize:13, lineHeight:1.5 }}>
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//             {typing && (
//               <div style={{ display:"flex", gap:5, padding:"10px 14px", background:"rgba(255,255,255,0.07)", borderRadius:"12px 12px 12px 2px", width:"fit-content" }}>
//                 {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, background:"var(--gold)", borderRadius:"50%", animation:`bounce 1s ${i*0.2}s infinite` }} />)}
//               </div>
//             )}
//             <div ref={endRef} />
//           </div>
//           {/* Input */}
//           <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:8 }}>
//             <input
//               value={input}
//               onChange={e=>setInput(e.target.value)}
//               onKeyDown={e=>e.key==="Enter"&&send()}
//               placeholder="Type a message..."
//               style={{ flex:1, padding:"9px 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text)", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }}
//             />
//             <button onClick={send} style={{ padding:"9px 14px", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", border:"none", borderRadius:8, color:"var(--dark)", cursor:"pointer", fontSize:15 }}>➤</button>
//           </div>
//         </div>
//       )}

//       {/* FAB Button */}
//       <button onClick={()=>setOpen(o=>!o)} style={{ position:"fixed", bottom:24, right:24, width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(201,168,76,0.5)", zIndex:9000, fontSize:22, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
//         {open ? "✕" : "💬"}
//       </button>

//       <style>{`
//         @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
//       `}</style>
//     </>
//   )
// }

// /* ══════════════════════════════════════════════════════════
//    HOME PAGE
// ══════════════════════════════════════════════════════════ */
// export default function Home() {


// const [siteSettings, setSiteSettings] = useState({});

// useEffect(() => {
//   const data = JSON.parse(localStorage.getItem("siteSettings"));

//   if (data) {
//     setSiteSettings(data);
//   }
// }, []);






//   const navigate              = useNavigate()
//   const [email, setEmail]     = useState("")
//   const [subDone, setSubDone] = useState(false)
//   const [activeFaq, setActiveFaq] = useState(null)
//   const [activeTestimonial, setActiveTestimonial] = useState(0)

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000)
//     return () => clearInterval(t)
//   }, [])

//   const handleNewsletter = (e) => {
//     e.preventDefault()
//     if (!email) return
//     setSubDone(true)
//     setEmail("")
//     setTimeout(() => setSubDone(false), 4000)
//   }

//   return (
//     <div>
//       {/* ══ HERO ══ */}
//       <div className="hero" style={{ flexDirection:"column" }}>
//         <div
//   className="hero-bg"
//   style={{
//     backgroundImage: siteSettings.heroImage
//       ? `url(${siteSettings.heroImage})`
//       : undefined,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   }}
// />
//         <div className="hero-overlay" />
//         <div className="hero-content" style={{ paddingTop:"var(--nav-h)" }}>
//           <div className="fade-up hero-badge"><span className="pulse" />{siteSettings.heroBadge || "Now Enrolling for 2025–26"}</div>
//           <h1 className="fade-up delay-1 hero-title">{siteSettings.tagline || "Shape Your Future"} <em className="gold-text">Future</em><br />with Excellence</h1>
//           <p className="fade-up delay-2 hero-desc">{siteSettings.heroDesc || "EduSphere is where ambition meets opportunity."} Join thousands of students on the path to academic mastery and lifelong success.</p>
//           <div className="fade-up delay-3 hero-actions">
//             <button className="btn-primary" onClick={()=>navigate("/courses")}>Explore Courses →</button>
//             <button className="btn-outline" onClick={()=>navigate("/about")}>Our Story</button>
//           </div>
//         </div>
//         <div className="hero-stats fade-in delay-4" style={{ width:"100%" }}>
//           {[
//   [siteSettings.stat1Val || "5000+", siteSettings.stat1Label || "Students"],
//   [siteSettings.stat2Val || "120+", siteSettings.stat2Label || "Courses"],
//   [siteSettings.stat3Val || "98%", siteSettings.stat3Label || "Success Rate"],
//   [siteSettings.stat4Val || "25+", siteSettings.stat4Label || "Years"],
// ].map(([num,label]) => (
//             <div className="stat-item" key={label}><span className="stat-num">{num}</span><span className="stat-label">{label}</span></div>
//           ))}
//         </div>
//       </div>

//       {/* ══ ANIMATED COUNTERS ══ */}
//       <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02))", borderTop:"1px solid rgba(201,168,76,0.1)", borderBottom:"1px solid rgba(201,168,76,0.1)", padding:"60px 5%" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:48 }}>
//             <span className="section-label">By The Numbers</span>
//             <h2 className="section-title">Our <span className="gold-text">Impact</span> in Numbers</h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:24 }}>
//             {COUNTER_STATS.map((s,i) => (
//               <div key={i} className="card" style={{ padding:"28px 20px", textAlign:"center" }}>
//                 <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
//                 <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"var(--gold)", marginBottom:6 }}>
//                   <AnimatedCounter end={s.end} suffix={s.suffix} />
//                 </div>
//                 <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.4 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ FEATURES ══ */}
//       <div className="section">
//         <span className="section-label fade-up">Why Choose Us</span>
//         <h2 className="section-title fade-up delay-1">Built for <span className="gold-text">Brilliance</span></h2>
//         <div className="divider" />
//         <p className="section-desc fade-up delay-2">Everything you need to thrive academically — under one roof.</p>
//         <div className="features-grid">
//           {FEATURES.map((f,i) => (
//             <div key={i} className={`card feature-card fade-up delay-${(i%3)+1}`}>
//               <div className="feature-icon">{f.icon}</div>
//               <div className="feature-title">{f.title}</div>
//               <div className="feature-desc">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ══ VIDEO SECTION ══ */}
//       <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
//           <div>
//             <span className="section-label">See Us in Action</span>
//             <h2 className="section-title">Experience <span className="gold-text">Campus Life</span></h2>
//             <div className="divider" />
//             <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.8, marginBottom:28 }}>
//               Take a virtual tour of our world-class campus, meet our faculty, and see why thousands of students choose EduSphere every year. Watch our story unfold.
//             </p>
//             <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//               {["State-of-the-art laboratories and classrooms","Expert faculty with global experience","Vibrant student life and extracurriculars"].map((item,i) => (
//                 <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
//                   <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"var(--dark)", fontWeight:700, flexShrink:0 }}>✓</div>
//                   <span style={{ fontSize:14, color:"var(--text-muted)" }}>{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div style={{ position:"relative", borderRadius:16, overflow:"hidden", aspectRatio:"16/9", boxShadow:"0 24px 64px rgba(0,0,0,0.6)", border:"1px solid rgba(201,168,76,0.2)" }}>
//             <iframe
//               width="100%" height="100%"
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
//               title="EduSphere Campus Tour"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               style={{ display:"block" }}
//             />
//           </div>
//         </div>
//         <style>{`@media(max-width:768px){.video-grid{grid-template-columns:1fr!important}}`}</style>
//       </div>

//       {/* ══ ACHIEVEMENTS ══ */}
//       <div style={{ padding:"80px 5%" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:56 }}>
//             <span className="section-label">Recognition</span>
//             <h2 className="section-title">Awards & <span className="gold-text">Achievements</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//             <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>Excellence recognized at every level — national and beyond.</p>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
//             {ACHIEVEMENTS.map((a,i) => (
//               <div key={i} className="card" style={{ padding:32, borderTop:`3px solid var(--gold)` }}>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
//                   <div style={{ fontSize:40 }}>{a.icon}</div>
//                   <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"rgba(201,168,76,0.2)" }}>{a.year}</div>
//                 </div>
//                 <div style={{ fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:10 }}>{a.title}</div>
//                 <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>{a.body}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ TESTIMONIALS ══ */}
//       <div style={{ padding:"80px 5%", background:"linear-gradient(135deg,rgba(201,168,76,0.04),transparent)", borderTop:"1px solid rgba(201,168,76,0.08)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:56 }}>
//             <span className="section-label">Student Stories</span>
//             <h2 className="section-title">What Our <span className="gold-text">Alumni Say</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//           </div>

//           {/* Featured Testimonial */}
//           <div className="card" style={{ padding:"48px", marginBottom:32, position:"relative", overflow:"hidden" }}>
//             <div style={{ position:"absolute", top:20, left:32, fontSize:80, color:"rgba(201,168,76,0.08)", fontFamily:"Georgia,serif", lineHeight:1 }}>"</div>
//             <div style={{ position:"relative", zIndex:1 }}>
//               <div style={{ display:"flex", gap:6, marginBottom:20 }}>
//                 {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_,i)=>(
//                   <span key={i} style={{ color:"var(--gold)", fontSize:18 }}>★</span>
//                 ))}
//               </div>
//               <p style={{ fontSize:"clamp(16px,2vw,20px)", color:"var(--cream)", lineHeight:1.8, fontStyle:"italic", marginBottom:28, maxWidth:800 }}>
//                 "{TESTIMONIALS[activeTestimonial].text}"
//               </p>
//               <div style={{ display:"flex", alignItems:"center", gap:16 }}>
//                 <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"var(--dark)" }}>
//                   {TESTIMONIALS[activeTestimonial].avatar}
//                 </div>
//                 <div>
//                   <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16 }}>{TESTIMONIALS[activeTestimonial].name}</div>
//                   <div style={{ fontSize:13, color:"var(--gold)" }}>{TESTIMONIALS[activeTestimonial].role}</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Dots + Mini Cards */}
//           <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:32 }}>
//             {TESTIMONIALS.map((_,i) => (
//               <button key={i} onClick={()=>setActiveTestimonial(i)} style={{ width: i===activeTestimonial?28:8, height:8, borderRadius:100, border:"none", cursor:"pointer", background: i===activeTestimonial?"var(--gold)":"rgba(201,168,76,0.25)", transition:"all 0.3s" }} />
//             ))}
//           </div>

//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
//             {TESTIMONIALS.map((t,i) => (
//               <div key={i} onClick={()=>setActiveTestimonial(i)} className="card" style={{ padding:20, cursor:"pointer", borderColor: i===activeTestimonial?"rgba(201,168,76,0.5)":"rgba(201,168,76,0.1)", transform: i===activeTestimonial?"translateY(-4px)":"none" }}>
//                 <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
//                   <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"var(--dark)", flexShrink:0 }}>{t.avatar}</div>
//                   <div>
//                     <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{t.name}</div>
//                     <div style={{ fontSize:11, color:"var(--gold)" }}>{t.role.split(",")[0]}</div>
//                   </div>
//                 </div>
//                 <div style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{t.text}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ OUR TEAM ══ */}
//       <div style={{ padding:"80px 5%" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:56 }}>
//             <span className="section-label">The People Behind EduSphere</span>
//             <h2 className="section-title">Meet Our <span className="gold-text">Expert Team</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//             <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>World-class educators dedicated to nurturing the next generation of leaders.</p>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
//             {TEAM.map((m,i) => (
//               <div key={i} className="card" style={{ padding:0, overflow:"hidden", textAlign:"center" }}>
//                 <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.03))", padding:"32px 20px 24px" }}>
//                   <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:700, color:"var(--dark)", margin:"0 auto 16px", border:"3px solid rgba(201,168,76,0.3)" }}>{m.avatar}</div>
//                   <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>{m.name}</div>
//                   <div style={{ fontSize:12, color:"var(--gold)", marginBottom:2 }}>{m.role}</div>
//                 </div>
//                 <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between" }}>
//                   <span style={{ fontSize:12, color:"var(--text-muted)" }}>📚 {m.subject}</span>
//                   <span style={{ fontSize:12, color:"var(--text-muted)" }}>⏳ {m.exp}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ UPCOMING EVENTS ══ */}
//       <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
//             <div>
//               <span className="section-label">What's Coming Up</span>
//               <h2 className="section-title" style={{ marginBottom:0 }}>Upcoming <span className="gold-text">Events</span></h2>
//             </div>
//             <button className="btn-outline" style={{ fontSize:13 }} onClick={()=>navigate("/contact")}>View All Events →</button>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
//             {EVENTS.map((ev,i) => (
//               <div key={i} className="card" style={{ padding:0, overflow:"hidden", display:"flex" }}>
//                 {/* Date Block */}
//                 <div style={{ background:`${ev.color}18`, borderRight:`3px solid ${ev.color}`, padding:"20px 18px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minWidth:72, flexShrink:0 }}>
//                   <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:ev.color, lineHeight:1 }}>{ev.date}</div>
//                   <div style={{ fontSize:11, fontWeight:700, color:ev.color, letterSpacing:1, textTransform:"uppercase" }}>{ev.month}</div>
//                 </div>
//                 {/* Details */}
//                 <div style={{ padding:"18px 20px", flex:1 }}>
//                   <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:ev.color, background:`${ev.color}18`, padding:"2px 8px", borderRadius:100, marginBottom:8 }}>{ev.category}</div>
//                   <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:6, lineHeight:1.4 }}>{ev.title}</div>
//                   <div style={{ fontSize:12, color:"var(--text-muted)" }}>🕐 {ev.time} &nbsp;·&nbsp; 📍 {ev.venue}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ CTA BANNER ══ */}
//       <div style={{ margin:"0 5% 0", borderRadius:20, padding:"60px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24, backgroundImage:"url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=70')", backgroundSize:"cover", backgroundPosition:"center", position:"relative", overflow:"hidden" }}>
//         <div style={{ position:"absolute", inset:0, background:"rgba(13,13,13,0.82)" }} />
//         <div style={{ position:"relative", zIndex:1 }}>
//           <div className="section-label">Limited Seats Available</div>
//           <h2 className="section-title" style={{ fontSize:"clamp(26px,4vw,42px)", marginBottom:0 }}>Ready to Begin Your <span className="gold-text">Journey?</span></h2>
//         </div>
//         <div style={{ position:"relative", zIndex:1, display:"flex", gap:16, flexWrap:"wrap" }}>
//           <button className="btn-primary" onClick={()=>navigate("/login")}>Apply Now →</button>
//           <button className="btn-outline" onClick={()=>navigate("/contact")}>Talk to Us</button>
//         </div>
//       </div>

//       {/* ══ PARTNERS ══ */}
//       <div style={{ padding:"60px 5%", overflow:"hidden" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:40 }}>
//             <span className="section-label">Trusted By</span>
//             <h2 className="section-title">Our <span className="gold-text">Partners & Affiliates</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//           </div>
//           {/* Marquee */}
//           <div style={{ overflow:"hidden", position:"relative" }}>
//             <div style={{ display:"flex", gap:20, animation:"marquee 18s linear infinite", width:"max-content" }}>
//               {[...PARTNERS,...PARTNERS].map((p,i) => (
//                 <div key={i} className="card" style={{ padding:"16px 28px", whiteSpace:"nowrap", fontSize:14, fontWeight:600, color:"var(--text-muted)", flexShrink:0, minWidth:150, textAlign:"center", transition:"border-color 0.3s" }}
//                   onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.5)"}
//                   onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.15)"}
//                 >{p}</div>
//               ))}
//             </div>
//           </div>
//           <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
//         </div>
//       </div>

//       {/* ══ FAQ ══ */}
//       <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
//         <div style={{ maxWidth:900, margin:"0 auto" }}>
//           <div style={{ textAlign:"center", marginBottom:56 }}>
//             <span className="section-label">Got Questions?</span>
//             <h2 className="section-title">Frequently Asked <span className="gold-text">Questions</span></h2>
//             <div className="divider" style={{ margin:"16px auto" }} />
//           </div>
//           <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//             {FAQS.map((faq,i) => (
//               <div key={i} className="card" style={{ overflow:"hidden", borderColor: activeFaq===i?"rgba(201,168,76,0.4)":"rgba(201,168,76,0.12)" }}>
//                 <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{ width:"100%", padding:"20px 24px", background:"transparent", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:16, textAlign:"left" }}>
//                   <span style={{ fontSize:15, fontWeight:600, color:"var(--cream)", fontFamily:"'DM Sans',sans-serif", lineHeight:1.4 }}>{faq.q}</span>
//                   <span style={{ fontSize:18, color:"var(--gold)", flexShrink:0, transform: activeFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform 0.3s" }}>+</span>
//                 </button>
//                 {activeFaq === i && (
//                   <div style={{ padding:"0 24px 20px", fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>{faq.a}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ NEWSLETTER ══ */}
//       <div style={{ padding:"80px 5%" }}>
//         <div style={{ maxWidth:650, margin:"0 auto", textAlign:"center" }}>
//           <div style={{ fontSize:48, marginBottom:16 }}>📬</div>
//           <span className="section-label">Stay Updated</span>
//           <h2 className="section-title">Subscribe to Our <span className="gold-text">Newsletter</span></h2>
//           <div className="divider" style={{ margin:"16px auto" }} />
//           <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.7, marginBottom:36 }}>
//             Get the latest updates on admissions, events, scholarships, and academic news delivered straight to your inbox.
//           </p>
//           {subDone ? (
//             <div style={{ background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:12, padding:"20px 28px", color:"#4ade80", fontSize:16, fontWeight:600 }}>
//               ✅ Thank you for subscribing! Welcome to EduSphere family.
//             </div>
//           ) : (
//             <form onSubmit={handleNewsletter} style={{ display:"flex", gap:12, maxWidth:480, margin:"0 auto", flexWrap:"wrap" }}>
//               <input
//                 type="email" required
//                 value={email}
//                 onChange={e=>setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 style={{ flex:1, padding:"14px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:10, color:"var(--text)", fontSize:15, outline:"none", fontFamily:"'DM Sans',sans-serif", minWidth:220 }}
//               />
//               <button type="submit" className="btn-primary" style={{ fontSize:14, padding:"14px 28px" }}>Subscribe →</button>
//             </form>
//           )}
//           <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:16 }}>🔒 No spam. Unsubscribe anytime. We respect your privacy.</p>
//         </div>
//       </div>

//       <Footer />

//       {/* ══ LIVE CHAT ══ */}
//       <LiveChat />
//     </div>
//   )
// }








import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Footer from "../components/Footer"

/* ─── Default Data (fallback when localStorage empty) ───── */
export const DEFAULT_SITE = {
  // ── Hero
  heroBadge:    "Now Enrolling for 2025–26",
  tagline:      "Shape Your",
  heroDesc:     "EduSphere is where ambition meets opportunity.",
  heroImage:    "",
  admissionOpen:"true",
  admissionMsg: "Admissions open for 2025–26 batch",

  // ── Stats Bar
  stat1Val:"5000+", stat1Label:"Students",
  stat2Val:"120+",  stat2Label:"Courses",
  stat3Val:"98%",   stat3Label:"Success Rate",
  stat4Val:"25+",   stat4Label:"Years",

  // ── Counter Stats (6)
  counter1End:"5000",  counter1Suffix:"+", counter1Label:"Students Enrolled",  counter1Icon:"🎓",
  counter2End:"120",   counter2Suffix:"+", counter2Label:"Courses Offered",    counter2Icon:"📚",
  counter3End:"98",    counter3Suffix:"%", counter3Label:"Satisfaction Rate",  counter3Icon:"⭐",
  counter4End:"200",   counter4Suffix:"+", counter4Label:"Faculty Members",    counter4Icon:"👨‍🏫",
  counter5End:"25",    counter5Suffix:"+", counter5Label:"Years of Excellence",counter5Icon:"🏆",
  counter6End:"15000", counter6Suffix:"+", counter6Label:"Alumni Worldwide",   counter6Icon:"🌍",

  // ── Features (6)
  feat1Icon:"🎓", feat1Title:"Expert Faculty",    feat1Desc:"Learn from industry veterans and experienced educators with decades of real-world expertise.",
  feat2Icon:"💻", feat2Title:"Digital Learning",  feat2Desc:"Access cutting-edge digital tools, recorded lectures, and interactive online resources anytime.",
  feat3Icon:"🏆", feat3Title:"Proven Results",    feat3Desc:"95% pass rate with hundreds of students placed in top universities and companies.",
  feat4Icon:"🤝", feat4Title:"Mentorship",        feat4Desc:"Personal guidance from dedicated mentors who are invested in your individual success.",
  feat5Icon:"📊", feat5Title:"Progress Tracking", feat5Desc:"Real-time dashboards to track your academic journey, attendance, and performance.",
  feat6Icon:"🌍", feat6Title:"Global Network",    feat6Desc:"Connect with alumni across the globe and build lifelong professional relationships.",

  // ── Achievements (4)
  ach1Icon:"🥇", ach1Year:"2024", ach1Title:"Best Educational Institution", ach1Body:"Awarded by MP Government for outstanding academic excellence and student development.",
  ach2Icon:"🏅", ach2Year:"2023", ach2Title:"NAAC A++ Accreditation",       ach2Body:"Received highest accreditation grade from National Assessment & Accreditation Council.",
  ach3Icon:"🎖️", ach3Year:"2022", ach3Title:"National Innovation Award",    ach3Body:"Recognized for pioneering digital learning initiatives across central India.",
  ach4Icon:"🌟", ach4Year:"2021", ach4Title:"Top 10 Schools of India",      ach4Body:"Ranked among India's top institutions by Education World magazine.",

  // ── Testimonials (6)
  test1Name:"Priya Sharma",   test1Role:"JEE Advanced Qualifier, IIT Delhi",  test1Avatar:"P", test1Text:"EduSphere completely transformed my approach to learning. The faculty is world-class and the personal mentorship helped me crack JEE Advanced on my first attempt.",
  test2Name:"Rohan Verma",    test2Role:"NEET Qualifier, AIIMS Delhi",         test2Avatar:"R", test2Text:"The structured preparation, mock tests, and doubt-clearing sessions at EduSphere gave me the confidence to achieve my dream of getting into AIIMS.",
  test3Name:"Sneha Patel",    test3Role:"CA Final, Big 4 Firm",                test3Avatar:"S", test3Text:"From commerce foundations to CA Finals — EduSphere was with me every step. The faculty's industry experience made all the difference.",
  test4Name:"Aditya Rao",     test4Role:"Software Engineer, Google",           test4Avatar:"A", test4Text:"The Computer Science program at EduSphere gave me a rock-solid foundation. I credit my placement at Google entirely to the quality of education here.",
  test5Name:"Meera Joshi",    test5Role:"Civil Services (IAS), Batch 2023",    test5Avatar:"M", test5Text:"EduSphere's disciplined environment and expert guidance helped me crack UPSC in my very first attempt. Forever grateful.",
  test6Name:"Arjun Malhotra", test6Role:"MBA, IIM Ahmedabad",                  test6Avatar:"A", test6Text:"The holistic education at EduSphere — academics, personality development, and real-world exposure — prepared me perfectly for IIM.",

  // ── Team (6)
  team1Name:"Dr. Rajesh Kumar",  team1Role:"Principal & Founder",     team1Subject:"Physics",     team1Exp:"30+ yrs", team1Avatar:"R",
  team2Name:"Mrs. Sunita Patel", team2Role:"Head of Science Dept.",   team2Subject:"Chemistry",   team2Exp:"22+ yrs", team2Avatar:"S",
  team3Name:"Mr. Anil Sharma",   team3Role:"Head of Mathematics",     team3Subject:"Mathematics", team3Exp:"18+ yrs", team3Avatar:"A",
  team4Name:"Dr. Priya Gupta",   team4Role:"Head of Commerce",        team4Subject:"Accountancy", team4Exp:"15+ yrs", team4Avatar:"P",
  team5Name:"Mr. Rohit Joshi",   team5Role:"CS & Technology Lead",    team5Subject:"Computer Sci.",team5Exp:"12+ yrs", team5Avatar:"R",
  team6Name:"Mrs. Kavita Singh", team6Role:"Head of Languages",       team6Subject:"English",     team6Exp:"20+ yrs", team6Avatar:"K",

  // ── Events (6)
  ev1Date:"15", ev1Month:"Jan", ev1Title:"Annual Science Exhibition",       ev1Time:"10:00 AM", ev1Venue:"Main Hall",    ev1Cat:"Academic",
  ev2Date:"22", ev2Month:"Jan", ev2Title:"JEE/NEET Mock Test Series",       ev2Time:"8:00 AM",  ev2Venue:"Exam Centre",  ev2Cat:"Exam",
  ev3Date:"05", ev3Month:"Feb", ev3Title:"Inter-School Debate Competition",  ev3Time:"2:00 PM",  ev3Venue:"Auditorium",   ev3Cat:"Cultural",
  ev4Date:"14", ev4Month:"Feb", ev4Title:"Career Counselling Seminar",      ev4Time:"11:00 AM", ev4Venue:"Seminar Hall", ev4Cat:"Career",
  ev5Date:"28", ev5Month:"Feb", ev5Title:"Annual Sports Day",               ev5Time:"9:00 AM",  ev5Venue:"Sports Ground",ev5Cat:"Sports",
  ev6Date:"10", ev6Month:"Mar", ev6Title:"Parent-Teacher Meeting",          ev6Time:"3:00 PM",  ev6Venue:"All Classes",  ev6Cat:"Meeting",

  // ── Partners (comma-separated)
  partners:"IIT Delhi,AIIMS,CBSE Board,ICSE Council,Coursera,Khan Academy,NIT Bhopal,IIM Indore,BYJU'S,Unacademy,TopRankers,Allen Institute",

  // ── FAQ (6)
  faq1Q:"What courses does EduSphere offer?",         faq1A:"We offer programs for Science (PCM/PCB), Commerce, Arts, Computer Science, and entrance exam preparation including JEE, NEET, CA Foundation, and CLAT.",
  faq2Q:"What is the admission process?",             faq2A:"You can apply online or visit our campus. The process includes a registration form, entrance test, counselling session, and document verification. Seats are limited.",
  faq3Q:"Does EduSphere provide hostel facilities?",  faq3A:"Yes, we have separate hostel facilities for boys and girls with 24/7 security, nutritious meals, and a conducive study environment.",
  faq4Q:"Are scholarships available?",                faq4A:"Yes! We offer merit-based scholarships (up to 100% fee waiver) and need-based financial assistance. Contact our admissions office for details.",
  faq5Q:"What is the student-to-teacher ratio?",      faq5A:"We maintain a low 15:1 student-teacher ratio to ensure personalized attention and quality education for every student.",
  faq6Q:"How can I track my child's academic progress?", faq6A:"Parents can access the student portal using login credentials provided at admission. It shows attendance, grades, assignments, and notices in real-time.",

  // ── Newsletter
  newsletterTitle:"Subscribe to Our",
  newsletterDesc: "Get the latest updates on admissions, events, scholarships, and academic news delivered straight to your inbox.",

  // ── Video Section
  videoUrl:     "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
  videoHeading: "Experience Campus Life",
  videoDesc:    "Take a virtual tour of our world-class campus, meet our faculty, and see why thousands of students choose EduSphere every year.",

  // ── CTA Banner
  ctaBadge:    "Limited Seats Available",
  ctaTitle:    "Ready to Begin Your Journey?",
  ctaSubtitle: "",
  ctaBtn1:     "Apply Now →",
  ctaBtn2:     "Talk to Us",

  // ── General / Branding
  schoolName:      "EduSphere",
  logoText:        "EduSphere",
  logoTagline:     "Excellence in Education",
  footerDesc:      "Empowering students since 1999 through quality education and holistic development.",
  footerCopyright: "© 2025 EduSphere. All rights reserved.",
  loginTitle:      "Welcome Back",
  loginSubtitle:   "Sign in to your EduSphere account",
  loginQuote:      "Education is the most powerful weapon which you can use to change the world.",
  loginAuthor:     "Nelson Mandela",

  // ── Contact
  address:  "123 Education Lane, Knowledge Park, Bhopal, MP 462001",
  phone:    "+91 98765 43210",
  phone2:   "+91 98765 43211",
  email:    "info@edusphere.edu.in",
  email2:   "admissions@edusphere.edu.in",
  hours:    "Mon–Sat: 8:00 AM – 6:00 PM",
  whatsapp: "9876543210",
  mapEmbed: "",

  // ── Social
  socialFacebook:"", socialInstagram:"", socialYoutube:"", socialTwitter:"",

  // ── Images
  aboutImage:"", loginBg:"",

  // ── SEO
  metaTitle:"EduSphere – Shape Your Future",
  metaDesc: "EduSphere is a premier educational institution offering science, commerce, arts, and competitive exam coaching.",
}

/* ─── Helper to read siteSettings from localStorage ─────── */
function useSiteSettings() {
  const [s, setS] = useState({ ...DEFAULT_SITE })
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("siteSettings"))
      if (stored) setS({ ...DEFAULT_SITE, ...stored })
    } catch (_) {}
  }, [])
  return s
}

/* ─── Build arrays from flat settings object ─────────────── */
function buildCounters(s) {
  return [1,2,3,4,5,6].map(n => ({
    end:    parseInt(s[`counter${n}End`])    || 0,
    suffix: s[`counter${n}Suffix`]           || "+",
    label:  s[`counter${n}Label`]            || "",
    icon:   s[`counter${n}Icon`]             || "📊",
  }))
}
function buildFeatures(s) {
  return [1,2,3,4,5,6].map(n => ({
    icon:  s[`feat${n}Icon`]  || "📌",
    title: s[`feat${n}Title`] || "",
    desc:  s[`feat${n}Desc`]  || "",
  }))
}
function buildAchievements(s) {
  return [1,2,3,4].map(n => ({
    icon:  s[`ach${n}Icon`]  || "🏅",
    year:  s[`ach${n}Year`]  || "",
    title: s[`ach${n}Title`] || "",
    body:  s[`ach${n}Body`]  || "",
  }))
}
function buildTestimonials(s) {
  return [1,2,3,4,5,6].map(n => ({
    name:   s[`test${n}Name`]   || "",
    role:   s[`test${n}Role`]   || "",
    avatar: s[`test${n}Avatar`] || "?",
    text:   s[`test${n}Text`]   || "",
    rating: 5,
  }))
}
function buildTeam(s) {
  return [1,2,3,4,5,6].map(n => ({
    name:    s[`team${n}Name`]    || "",
    role:    s[`team${n}Role`]    || "",
    subject: s[`team${n}Subject`] || "",
    exp:     s[`team${n}Exp`]     || "",
    avatar:  s[`team${n}Avatar`]  || "?",
  }))
}
const EVENT_COLORS = ["#60a5fa","#f87171","#a78bfa","#f59e0b","#4ade80","#94a3b8"]
function buildEvents(s) {
  return [1,2,3,4,5,6].map((n,i) => ({
    date:  s[`ev${n}Date`]  || "",
    month: s[`ev${n}Month`] || "",
    title: s[`ev${n}Title`] || "",
    time:  s[`ev${n}Time`]  || "",
    venue: s[`ev${n}Venue`] || "",
    category: s[`ev${n}Cat`] || "",
    color: EVENT_COLORS[i],
  }))
}
function buildPartners(s) {
  const raw = s.partners || ""
  return raw.split(",").map(p => p.trim()).filter(Boolean)
}
function buildFaqs(s) {
  return [1,2,3,4,5,6].map(n => ({
    q: s[`faq${n}Q`] || "",
    a: s[`faq${n}A`] || "",
  })).filter(f => f.q)
}

/* ─── Animated Counter ───────────────────────────────────── */
function AnimatedCounter({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref               = useRef(null)
  const started           = useRef(false)

  useEffect(() => {
    started.current = false
    setCount(0)
  }, [end])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps     = 60
        const increment = end / steps
        let current     = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= end) { setCount(end); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {count >= 10000
        ? (count / 1000).toFixed(0) + "K"
        : count >= 1000
        ? count.toLocaleString()
        : count}
      {suffix}
    </span>
  )
}

/* ─── Live Chat Button ───────────────────────────────────── */
function LiveChat() {
  const [open, setOpen]     = useState(false)
  const [msgs, setMsgs]     = useState([{ from:"bot", text:"👋 Hi! Welcome to EduSphere. How can I help you today?" }])
  const [input, setInput]   = useState("")
  const [typing, setTyping] = useState(false)
  const endRef              = useRef(null)

  const AUTO_REPLIES = {
    admission:  "For admissions, please visit our Contact page or call +91 98765 43210. Seats are limited!",
    fee:        "Fee details vary by course. Visit the Courses page or contact us directly for a detailed fee structure.",
    hostel:     "Yes, we have hostel facilities for both boys and girls with 24/7 security and meals included.",
    scholarship:"We offer merit and need-based scholarships. Apply during admission with your marksheets.",
    default:    "Thank you for your message! Our team will get back to you shortly. You can also call us at +91 98765 43210.",
  }

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }) }, [msgs])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMsgs(m => [...m, { from:"user", text: userMsg }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      const lower = userMsg.toLowerCase()
      const reply = lower.includes("admission")  ? AUTO_REPLIES.admission
                  : lower.includes("fee")        ? AUTO_REPLIES.fee
                  : lower.includes("hostel")     ? AUTO_REPLIES.hostel
                  : lower.includes("scholar")    ? AUTO_REPLIES.scholarship
                  : AUTO_REPLIES.default
      setMsgs(m => [...m, { from:"bot", text: reply }])
      setTyping(false)
    }, 1200)
  }

  return (
    <>
      {open && (
        <div style={{ position:"fixed", bottom:90, right:24, width:320, background:"var(--dark2)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,0.6)", zIndex:9000, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ background:"linear-gradient(135deg,var(--gold),var(--gold-light))", padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontWeight:700, color:"var(--dark)", fontSize:14 }}>💬 EduSphere Support</div>
              <div style={{ fontSize:11, color:"rgba(13,13,13,0.7)" }}>● Online — Typically replies instantly</div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ background:"rgba(13,13,13,0.15)", border:"none", borderRadius:6, width:28, height:28, cursor:"pointer", color:"var(--dark)", fontSize:14 }}>✕</button>
          </div>
          <div style={{ flex:1, maxHeight:280, overflowY:"auto", padding:14, display:"flex", flexDirection:"column", gap:10 }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent: m.from==="user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth:"80%", padding:"9px 13px", borderRadius: m.from==="user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: m.from==="user" ? "linear-gradient(135deg,var(--gold),var(--gold-light))" : "rgba(255,255,255,0.07)", color: m.from==="user" ? "var(--dark)" : "var(--text)", fontSize:13, lineHeight:1.5 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", gap:5, padding:"10px 14px", background:"rgba(255,255,255,0.07)", borderRadius:"12px 12px 12px 2px", width:"fit-content" }}>
                {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, background:"var(--gold)", borderRadius:"50%", animation:`bounce 1s ${i*0.2}s infinite` }} />)}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div style={{ padding:"10px 12px", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:8 }}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Type a message..."
              style={{ flex:1, padding:"9px 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text)", fontSize:13, outline:"none", fontFamily:"'DM Sans',sans-serif" }}
            />
            <button onClick={send} style={{ padding:"9px 14px", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", border:"none", borderRadius:8, color:"var(--dark)", cursor:"pointer", fontSize:15 }}>➤</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{ position:"fixed", bottom:24, right:24, width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(201,168,76,0.5)", zIndex:9000, fontSize:22, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
        {open ? "✕" : "💬"}
      </button>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }`}</style>
    </>
  )
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════ */
export default function Home() {
  const s                  = useSiteSettings()
  const navigate           = useNavigate()
  const [email, setEmail]  = useState("")
  const [subDone, setSubDone] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Build data arrays from settings
  const COUNTERS     = buildCounters(s)
  const FEATURES     = buildFeatures(s)
  const ACHIEVEMENTS = buildAchievements(s)
  const TESTIMONIALS = buildTestimonials(s)
  const TEAM         = buildTeam(s)
  const EVENTS       = buildEvents(s)
  const PARTNERS     = buildPartners(s)
  const FAQS         = buildFaqs(s)

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [TESTIMONIALS.length])

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email) return
    setSubDone(true)
    setEmail("")
    setTimeout(() => setSubDone(false), 4000)
  }

  return (
    <div>
      {/* ══ HERO ══ */}
      <div className="hero" style={{ flexDirection:"column" }}>
        <div
          className="hero-bg"
          style={{
            backgroundImage: s.heroImage ? `url(${s.heroImage})` : undefined,
            backgroundSize:"cover",
            backgroundPosition:"center",
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content" style={{ paddingTop:"var(--nav-h)" }}>
          <div className="fade-up hero-badge"><span className="pulse" />{s.heroBadge}</div>
          <h1 className="fade-up delay-1 hero-title">
            {s.tagline} <em className="gold-text">Future</em><br />with Excellence
          </h1>
          <p className="fade-up delay-2 hero-desc">{s.heroDesc} Join thousands of students on the path to academic mastery and lifelong success.</p>
          <div className="fade-up delay-3 hero-actions">
            <button className="btn-primary" onClick={()=>navigate("/courses")}>Explore Courses →</button>
            <button className="btn-outline" onClick={()=>navigate("/about")}>Our Story</button>
          </div>
        </div>
        <div className="hero-stats fade-in delay-4" style={{ width:"100%" }}>
          {[
            [s.stat1Val, s.stat1Label],
            [s.stat2Val, s.stat2Label],
            [s.stat3Val, s.stat3Label],
            [s.stat4Val, s.stat4Label],
          ].map(([num, label]) => (
            <div className="stat-item" key={label}>
              <span className="stat-num">{num}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ ANIMATED COUNTERS ══ */}
      <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.06),rgba(201,168,76,0.02))", borderTop:"1px solid rgba(201,168,76,0.1)", borderBottom:"1px solid rgba(201,168,76,0.1)", padding:"60px 5%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <span className="section-label">By The Numbers</span>
            <h2 className="section-title">Our <span className="gold-text">Impact</span> in Numbers</h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:24 }}>
            {COUNTERS.filter(c => c.label).map((c, i) => (
              <div key={i} className="card" style={{ padding:"28px 20px", textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{c.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, color:"var(--gold)", marginBottom:6 }}>
                  <AnimatedCounter end={c.end} suffix={c.suffix} />
                </div>
                <div style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.4 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FEATURES ══ */}
      <div className="section">
        <span className="section-label fade-up">Why Choose Us</span>
        <h2 className="section-title fade-up delay-1">Built for <span className="gold-text">Brilliance</span></h2>
        <div className="divider" />
        <p className="section-desc fade-up delay-2">Everything you need to thrive academically — under one roof.</p>
        <div className="features-grid">
          {FEATURES.filter(f => f.title).map((f, i) => (
            <div key={i} className={`card feature-card fade-up delay-${(i%3)+1}`}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ VIDEO SECTION ══ */}
      <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
          <div>
            <span className="section-label">See Us in Action</span>
            <h2 className="section-title">{s.videoHeading.includes("Campus") ? <>{s.videoHeading.replace("Campus Life","")}<span className="gold-text">Campus Life</span></> : <span className="gold-text">{s.videoHeading}</span>}</h2>
            <div className="divider" />
            <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.8, marginBottom:28 }}>{s.videoDesc}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {["State-of-the-art laboratories and classrooms","Expert faculty with global experience","Vibrant student life and extracurriculars"].map((item,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"var(--dark)", fontWeight:700, flexShrink:0 }}>✓</div>
                  <span style={{ fontSize:14, color:"var(--text-muted)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:"relative", borderRadius:16, overflow:"hidden", aspectRatio:"16/9", boxShadow:"0 24px 64px rgba(0,0,0,0.6)", border:"1px solid rgba(201,168,76,0.2)" }}>
            <iframe
              width="100%" height="100%"
              src={s.videoUrl}
              title="EduSphere Campus Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display:"block" }}
            />
          </div>
        </div>
      </div>

      {/* ══ ACHIEVEMENTS ══ */}
      <div style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">Recognition</span>
            <h2 className="section-title">Awards & <span className="gold-text">Achievements</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
            <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>Excellence recognized at every level — national and beyond.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
            {ACHIEVEMENTS.filter(a => a.title).map((a, i) => (
              <div key={i} className="card" style={{ padding:32, borderTop:"3px solid var(--gold)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                  <div style={{ fontSize:40 }}>{a.icon}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"rgba(201,168,76,0.2)" }}>{a.year}</div>
                </div>
                <div style={{ fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:10 }}>{a.title}</div>
                <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>{a.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TESTIMONIALS ══ */}
      <div style={{ padding:"80px 5%", background:"linear-gradient(135deg,rgba(201,168,76,0.04),transparent)", borderTop:"1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">Student Stories</span>
            <h2 className="section-title">What Our <span className="gold-text">Alumni Say</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>

          {/* Featured Testimonial */}
          <div className="card" style={{ padding:"48px", marginBottom:32, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:20, left:32, fontSize:80, color:"rgba(201,168,76,0.08)", fontFamily:"Georgia,serif", lineHeight:1 }}>"</div>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ display:"flex", gap:6, marginBottom:20 }}>
                {[...Array(TESTIMONIALS[activeTestimonial]?.rating || 5)].map((_,i)=>(
                  <span key={i} style={{ color:"var(--gold)", fontSize:18 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize:"clamp(16px,2vw,20px)", color:"var(--cream)", lineHeight:1.8, fontStyle:"italic", marginBottom:28, maxWidth:800 }}>
                "{TESTIMONIALS[activeTestimonial]?.text}"
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"var(--dark)" }}>
                  {TESTIMONIALS[activeTestimonial]?.avatar}
                </div>
                <div>
                  <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16 }}>{TESTIMONIALS[activeTestimonial]?.name}</div>
                  <div style={{ fontSize:13, color:"var(--gold)" }}>{TESTIMONIALS[activeTestimonial]?.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:32 }}>
            {TESTIMONIALS.map((_,i) => (
              <button key={i} onClick={()=>setActiveTestimonial(i)} style={{ width: i===activeTestimonial?28:8, height:8, borderRadius:100, border:"none", cursor:"pointer", background: i===activeTestimonial?"var(--gold)":"rgba(201,168,76,0.25)", transition:"all 0.3s" }} />
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
            {TESTIMONIALS.filter(t=>t.name).map((t,i) => (
              <div key={i} onClick={()=>setActiveTestimonial(i)} className="card" style={{ padding:20, cursor:"pointer", borderColor: i===activeTestimonial?"rgba(201,168,76,0.5)":"rgba(201,168,76,0.1)", transform: i===activeTestimonial?"translateY(-4px)":"none" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"var(--dark)", flexShrink:0 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"var(--gold)" }}>{t.role.split(",")[0]}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:"var(--text-muted)", lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ OUR TEAM ══ */}
      <div style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">The People Behind EduSphere</span>
            <h2 className="section-title">Meet Our <span className="gold-text">Expert Team</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
            <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>World-class educators dedicated to nurturing the next generation of leaders.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24 }}>
            {TEAM.filter(m=>m.name).map((m, i) => (
              <div key={i} className="card" style={{ padding:0, overflow:"hidden", textAlign:"center" }}>
                <div style={{ background:"linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.03))", padding:"32px 20px 24px" }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,var(--gold),var(--gold-light))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:700, color:"var(--dark)", margin:"0 auto 16px", border:"3px solid rgba(201,168,76,0.3)" }}>{m.avatar}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>{m.name}</div>
                  <div style={{ fontSize:12, color:"var(--gold)", marginBottom:2 }}>{m.role}</div>
                </div>
                <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:12, color:"var(--text-muted)" }}>📚 {m.subject}</span>
                  <span style={{ fontSize:12, color:"var(--text-muted)" }}>⏳ {m.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ UPCOMING EVENTS ══ */}
      <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:48, flexWrap:"wrap", gap:16 }}>
            <div>
              <span className="section-label">What's Coming Up</span>
              <h2 className="section-title" style={{ marginBottom:0 }}>Upcoming <span className="gold-text">Events</span></h2>
            </div>
            <button className="btn-outline" style={{ fontSize:13 }} onClick={()=>navigate("/contact")}>View All Events →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {EVENTS.filter(ev=>ev.title).map((ev, i) => (
              <div key={i} className="card" style={{ padding:0, overflow:"hidden", display:"flex" }}>
                <div style={{ background:`${ev.color}18`, borderRight:`3px solid ${ev.color}`, padding:"20px 18px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minWidth:72, flexShrink:0 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:900, color:ev.color, lineHeight:1 }}>{ev.date}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:ev.color, letterSpacing:1, textTransform:"uppercase" }}>{ev.month}</div>
                </div>
                <div style={{ padding:"18px 20px", flex:1 }}>
                  <div style={{ display:"inline-block", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:ev.color, background:`${ev.color}18`, padding:"2px 8px", borderRadius:100, marginBottom:8 }}>{ev.category}</div>
                  <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:6, lineHeight:1.4 }}>{ev.title}</div>
                  <div style={{ fontSize:12, color:"var(--text-muted)" }}>🕐 {ev.time} &nbsp;·&nbsp; 📍 {ev.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA BANNER ══ */}
      <div style={{ margin:"0 5%", borderRadius:20, padding:"60px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24, backgroundImage:"url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=70')", backgroundSize:"cover", backgroundPosition:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(13,13,13,0.82)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <div className="section-label">{s.ctaBadge}</div>
          <h2 className="section-title" style={{ fontSize:"clamp(26px,4vw,42px)", marginBottom:0 }}>{s.ctaTitle.replace("Journey?","")} <span className="gold-text">Journey?</span></h2>
        </div>
        <div style={{ position:"relative", zIndex:1, display:"flex", gap:16, flexWrap:"wrap" }}>
          <button className="btn-primary" onClick={()=>navigate("/login")}>{s.ctaBtn1}</button>
          <button className="btn-outline" onClick={()=>navigate("/contact")}>{s.ctaBtn2}</button>
        </div>
      </div>

      {/* ══ PARTNERS ══ */}
      <div style={{ padding:"60px 5%", overflow:"hidden" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <span className="section-label">Trusted By</span>
            <h2 className="section-title">Our <span className="gold-text">Partners & Affiliates</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div style={{ overflow:"hidden", position:"relative" }}>
            <div style={{ display:"flex", gap:20, animation:"marquee 18s linear infinite", width:"max-content" }}>
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div key={i} className="card" style={{ padding:"16px 28px", whiteSpace:"nowrap", fontSize:14, fontWeight:600, color:"var(--text-muted)", flexShrink:0, minWidth:150, textAlign:"center", transition:"border-color 0.3s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.5)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.15)"}
                >{p}</div>
              ))}
            </div>
          </div>
          <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <div style={{ padding:"80px 5%", background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <span className="section-label">Got Questions?</span>
            <h2 className="section-title">Frequently Asked <span className="gold-text">Questions</span></h2>
            <div className="divider" style={{ margin:"16px auto" }} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="card" style={{ overflow:"hidden", borderColor: activeFaq===i?"rgba(201,168,76,0.4)":"rgba(201,168,76,0.12)" }}>
                <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{ width:"100%", padding:"20px 24px", background:"transparent", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:16, textAlign:"left" }}>
                  <span style={{ fontSize:15, fontWeight:600, color:"var(--cream)", fontFamily:"'DM Sans',sans-serif", lineHeight:1.4 }}>{faq.q}</span>
                  <span style={{ fontSize:18, color:"var(--gold)", flexShrink:0, transform: activeFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform 0.3s" }}>+</span>
                </button>
                {activeFaq === i && (
                  <div style={{ padding:"0 24px 20px", fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ NEWSLETTER ══ */}
      <div style={{ padding:"80px 5%" }}>
        <div style={{ maxWidth:650, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📬</div>
          <span className="section-label">Stay Updated</span>
          <h2 className="section-title">{s.newsletterTitle} <span className="gold-text">Newsletter</span></h2>
          <div className="divider" style={{ margin:"16px auto" }} />
          <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.7, marginBottom:36 }}>{s.newsletterDesc}</p>
          {subDone ? (
            <div style={{ background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.3)", borderRadius:12, padding:"20px 28px", color:"#4ade80", fontSize:16, fontWeight:600 }}>
              ✅ Thank you for subscribing! Welcome to EduSphere family.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} style={{ display:"flex", gap:12, maxWidth:480, margin:"0 auto", flexWrap:"wrap" }}>
              <input
                type="email" required
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{ flex:1, padding:"14px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:10, color:"var(--text)", fontSize:15, outline:"none", fontFamily:"'DM Sans',sans-serif", minWidth:220 }}
              />
              <button type="submit" className="btn-primary" style={{ fontSize:14, padding:"14px 28px" }}>Subscribe →</button>
            </form>
          )}
          <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:16 }}>🔒 No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  )
}