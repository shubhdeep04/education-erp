/* ─── Services ─────────────────────────────────────────────── */
// 
import { useState } from "react"
import Footer from "../components/Footer"

/* ─── Data ─────────────────────────────────────────────── */
const SERVICES = [
  { num:"01", icon:"🎓", title:"Academic Counselling",  text:"One-on-one guidance sessions to help students choose the right career path and course.",         color:"#60a5fa" },
  { num:"02", icon:"📚", title:"Library & E-Resources", text:"Access to 10,000+ books, journals, and premium online learning platforms including JSTOR.",       color:"var(--gold)" },
  { num:"03", icon:"💻", title:"Digital Labs",          text:"State-of-the-art computer labs with 500Mbps internet, latest hardware, available 7 days a week.", color:"#a78bfa" },
  { num:"04", icon:"🏋️", title:"Sports & Wellness",    text:"Indoor sports, yoga classes, meditation rooms, and dedicated mental health counsellors.",          color:"#4ade80" },
  { num:"05", icon:"🚌", title:"Transport Facility",    text:"Comfortable AC buses covering 40+ routes across the city with real-time GPS tracking.",           color:"#fb923c" },
  { num:"06", icon:"🏠", title:"Hostel Accommodation",  text:"Safe hostels for boys & girls with 24/7 CCTV, biometric access, nutritious meals included.",      color:"#f87171" },
  { num:"07", icon:"🍽️", title:"Cafeteria",            text:"Hygienic, FSSAI-certified canteen serving nutritious meals at highly subsidized rates daily.",     color:"#fbbf24" },
  { num:"08", icon:"🏆", title:"Scholarships",          text:"Merit-based (up to 100%) and need-based scholarships. Special provisions for girl students.",     color:"#34d399" },
]

const PLANS = [
  {
    name:"Foundation",  price:"₹8,000",  period:"/course", color:"#60a5fa", popular:false,
    features:["1 Course Access","Digital Study Material","Weekly Tests","Email Support","Basic Library Access","Progress Reports"],
    unavailable:["Hostel","Transport","Counselling Sessions","Lab Access"],
  },
  {
    name:"Scholar",  price:"₹18,000",  period:"/semester", color:"var(--gold)", popular:true,
    features:["All Courses in Stream","Full Digital Library","Mock Tests + Analysis","Personal Mentor","Lab & Sports Access","Counselling (2/month)","Transport Facility","Progress Dashboard"],
    unavailable:["Hostel"],
  },
  {
    name:"Elite",  price:"₹35,000",  period:"/year", color:"#a78bfa", popular:false,
    features:["All Courses Unlimited","Premium Study Material","Unlimited Mock Tests","Dedicated Mentor","Full Campus Access","Counselling (Unlimited)","Transport Included","Hostel Option","Priority Placement Support","Parent Portal Access"],
    unavailable:[],
  },
]

const FACILITIES = [
  { img:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=70", title:"Science Labs",        desc:"Equipped with latest apparatus for Physics, Chemistry, and Biology experiments." },
  { img:"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=70", title:"Central Library",     desc:"10,000+ books, digital terminals, silent reading zones, and 24/7 e-library access." },
  { img:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=70", title:"Sports Complex",      desc:"Cricket ground, basketball court, badminton, table tennis, and indoor games hall." },
  { img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=70", title:"Computer Centre",    desc:"200+ high-speed workstations with licensed software and uninterrupted internet." },
]

const FAQS = [
  { q:"Is hostel facility compulsory?",              a:"No, hostel is optional. Day scholars are also welcome. We offer transport facility as an alternative." },
  { q:"Can I get a fee waiver based on merit?",      a:"Yes. Students scoring 90%+ in their previous exam are eligible for merit scholarships up to 100%." },
  { q:"Is the cafeteria food vegetarian?",           a:"We serve both vegetarian and non-vegetarian food. Special dietary requirements can be accommodated." },
  { q:"What sports facilities are available?",       a:"Cricket, football, basketball, badminton, table tennis, chess, yoga, and athletics track." },
  { q:"Are the labs available outside class hours?", a:"Yes, labs are open Mon-Sat 7AM–8PM. Students can book time slots through the student portal." },
]

export default function Services() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [activeTab, setActiveTab] = useState("services")

  return (
    <div>
      <style>{`
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .facilities-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; max-width: 400px; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          .facilities-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <div className="services-hero">
        <span className="section-label fade-up">What We Offer</span>
        <h1 className="section-title fade-up delay-1">Beyond <span className="gold-text">the Classroom</span></h1>
        <div className="divider" style={{ margin:"16px auto" }} />
        <p className="section-desc fade-up delay-2" style={{ margin:"16px auto 32px", textAlign:"center" }}>
          A holistic educational environment where every student can thrive — academically, physically, and emotionally.
        </p>

        {/* Quick Stats */}
        <div style={{ display:"flex", gap:32, justifyContent:"center", flexWrap:"wrap", margin:"0 auto" }}>
          {[["40+","Bus Routes"],["10K+","Library Books"],["500Mbps","Internet Speed"],["24/7","Security"]].map(([v,l],i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:900, color:"var(--gold)" }}>{v}</div>
              <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{ background:"var(--dark2)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"0 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:0, overflowX:"auto" }}>
          {[
            { key:"services",   label:"🛠️ Services"   },
            { key:"facilities", label:"🏛️ Facilities" },
            { key:"plans",      label:"💳 Plans"      },
            { key:"faq",        label:"❓ FAQ"        },
          ].map(t => (
            <button key={t.key} onClick={()=>setActiveTab(t.key)} style={{ padding:"16px 24px", background:"transparent", border:"none", borderBottom:`3px solid ${activeTab===t.key?"var(--gold)":"transparent"}`, color:activeTab===t.key?"var(--cream)":"var(--text-muted)", fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ SERVICES TAB ══ */}
      {activeTab === "services" && (
        <div className="services-grid" style={{ paddingTop:60 }}>
          {SERVICES.map((s,i) => (
            <div key={i} className={`card service-card fade-up delay-${(i%3)+1}`} style={{ borderTop:`3px solid ${s.color}20`, position:"relative", overflow:"hidden" }}
              onMouseEnter={e=>e.currentTarget.style.borderTopColor=s.color}
              onMouseLeave={e=>e.currentTarget.style.borderTopColor=`${s.color}20`}>
              <div className="service-num" style={{ color:`${s.color}25` }}>{s.num}</div>
              <div className="service-icon" style={{ fontSize:36 }}>{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <div className="service-text">{s.text}</div>
              <div style={{ marginTop:16, display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:s.color, cursor:"pointer" }}>
                Learn more →
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══ FACILITIES TAB ══ */}
      {activeTab === "facilities" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">World-Class Infrastructure</span>
              <h2 className="section-title">Our <span className="gold-text">Facilities</span></h2>
              <div className="divider" style={{ margin:"16px auto" }} />
            </div>
            <div className="facilities-grid">
              {FACILITIES.map((f,i) => (
                <div key={i} className="card" style={{ overflow:"hidden" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={f.img} alt={f.title} style={{ width:"100%", height:200, objectFit:"cover", display:"block", transition:"transform 0.5s" }}
                      onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                      onMouseLeave={e=>e.target.style.transform="scale(1)"} />
                  </div>
                  <div style={{ padding:"20px 24px" }}>
                    <div style={{ fontWeight:700, color:"var(--cream)", fontSize:16, marginBottom:8 }}>{f.title}</div>
                    <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Campus Map Placeholder */}
            <div className="card" style={{ marginTop:40, padding:0, overflow:"hidden" }}>
              <div style={{ background:"rgba(201,168,76,0.05)", borderBottom:"1px solid rgba(201,168,76,0.1)", padding:"20px 28px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--cream)", marginBottom:4 }}>Campus Location</div>
                  <div style={{ fontSize:13, color:"var(--text-muted)" }}>📍 Civil Lines, Khandwa, Madhya Pradesh 450001</div>
                </div>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-outline" style={{ fontSize:13 }}>Open in Maps →</a>
              </div>
              <div style={{ height:280, background:"var(--dark3)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12 }}>
                <div style={{ fontSize:48 }}>🗺️</div>
                <div style={{ fontSize:14, color:"var(--text-muted)" }}>Interactive map — click "Open in Maps" to navigate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PLANS TAB ══ */}
      {activeTab === "plans" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Flexible Options</span>
              <h2 className="section-title">Choose Your <span className="gold-text">Plan</span></h2>
              <div className="divider" style={{ margin:"16px auto" }} />
              <p className="section-desc" style={{ margin:"0 auto", textAlign:"center" }}>All plans include access to our world-class faculty and digital learning resources.</p>
            </div>
            <div className="plans-grid">
              {PLANS.map((p,i) => (
                <div key={i} className="card" style={{ padding:0, overflow:"hidden", position:"relative", transform:p.popular?"scale(1.03)":"scale(1)", borderColor:p.popular?"rgba(201,168,76,0.5)":"rgba(201,168,76,0.15)" }}>
                  {p.popular && (
                    <div style={{ background:"linear-gradient(135deg,var(--gold),var(--gold-light))", textAlign:"center", padding:"8px", fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"var(--dark)" }}>
                      ⭐ Most Popular
                    </div>
                  )}
                  <div style={{ padding:"32px 28px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:p.color, marginBottom:4 }}>{p.name}</div>
                    <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
                      <span style={{ fontFamily:"'Playfair Display',serif", fontSize:40, fontWeight:900, color:"var(--cream)" }}>{p.price}</span>
                      <span style={{ fontSize:14, color:"var(--text-muted)" }}>{p.period}</span>
                    </div>
                  </div>
                  <div style={{ padding:"24px 28px 32px" }}>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
                      {p.features.map((f,j) => (
                        <div key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14 }}>
                          <span style={{ color:"#4ade80", flexShrink:0 }}>✓</span>
                          <span style={{ color:"var(--text-muted)" }}>{f}</span>
                        </div>
                      ))}
                      {p.unavailable.map((f,j) => (
                        <div key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, opacity:0.4 }}>
                          <span style={{ color:"#f87171", flexShrink:0 }}>✕</span>
                          <span style={{ color:"var(--text-muted)", textDecoration:"line-through" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href="/contact" className={p.popular?"btn-primary":"btn-outline"} style={{ width:"100%", justifyContent:"center", display:"flex", fontSize:14 }}>
                      Get Started →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ textAlign:"center", fontSize:13, color:"var(--text-muted)", marginTop:32 }}>
              💬 Not sure which plan? <a href="/contact" style={{ color:"var(--gold)", textDecoration:"none" }}>Talk to our counsellors →</a>
            </p>
          </div>
        </div>
      )}

      {/* ══ FAQ TAB ══ */}
      {activeTab === "faq" && (
        <div style={{ padding:"60px 5% 80px" }}>
          <div style={{ maxWidth:800, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <span className="section-label">Common Questions</span>
              <h2 className="section-title">Services <span className="gold-text">FAQ</span></h2>
              <div className="divider" style={{ margin:"16px auto" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {FAQS.map((faq,i) => (
                <div key={i} className="card" style={{ overflow:"hidden", borderColor:activeFaq===i?"rgba(201,168,76,0.4)":"rgba(201,168,76,0.12)" }}>
                  <button onClick={()=>setActiveFaq(activeFaq===i?null:i)} style={{ width:"100%", padding:"20px 24px", background:"transparent", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:16, textAlign:"left" }}>
                    <span style={{ fontSize:15, fontWeight:600, color:"var(--cream)", fontFamily:"'DM Sans',sans-serif", lineHeight:1.4 }}>{faq.q}</span>
                    <span style={{ fontSize:18, color:"var(--gold)", flexShrink:0, transform:activeFaq===i?"rotate(45deg)":"rotate(0deg)", transition:"transform 0.3s", display:"inline-block" }}>+</span>
                  </button>
                  {activeFaq===i && (
                    <div style={{ padding:"0 24px 20px", fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>{faq.a}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="card" style={{ padding:"32px", textAlign:"center", marginTop:32, background:"rgba(201,168,76,0.04)" }}>
              <div style={{ fontSize:28, marginBottom:12 }}>🤝</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"var(--cream)", marginBottom:8 }}>Still have questions?</div>
              <div style={{ fontSize:14, color:"var(--text-muted)", marginBottom:20 }}>Our team is available Mon–Sat, 8AM–6PM. We're happy to help!</div>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <a href="/contact" className="btn-primary" style={{ fontSize:13 }}>Contact Us →</a>
                <a href="tel:+919876543210" className="btn-outline" style={{ fontSize:13 }}>📞 Call Now</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
