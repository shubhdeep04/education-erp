// import { useParams, useNavigate } from "react-router-dom"
// import Footer from "../components/Footer"
// import { useSiteSettings, FEATURE_SLUGS } from "./Home"

// /* ─── Extra detail bullet points shown on each feature page ── */
// const EXTRA_POINTS = {
//   "expert-faculty": [
//     "Decades of real-world teaching & industry expertise",
//     "Personalized attention with low student-teacher ratio",
//     "Continuous training on latest curriculum & methods",
//     "Subject-matter specialists across all streams",
//   ],
//   "digital-learning": [
//     "Recorded lectures accessible anytime, anywhere",
//     "Interactive online quizzes & practice tests",
//     "Smart classrooms with digital whiteboards",
//     "Mobile-friendly student learning portal",
//   ],
//   "proven-results": [
//     "Consistent top ranks in board & entrance exams",
//     "Hundreds placed in top universities & companies",
//     "Structured test series & performance analysis",
//     "Track record built over 25+ years",
//   ],
//   "mentorship": [
//     "Dedicated mentor assigned to every student",
//     "Regular one-on-one progress reviews",
//     "Career & stream guidance from experts",
//     "Emotional & academic support system",
//   ],
//   "progress-tracking": [
//     "Live attendance & performance dashboard",
//     "Instant notification to parents & students",
//     "Subject-wise strength & weakness analysis",
//     "Downloadable progress reports",
//   ],
//   "global-network": [
//     "Active alumni network in 20+ countries",
//     "Global exposure through exchange programs",
//     "Networking events & guest lectures",
//     "Lifelong professional relationships",
//   ],
// }

// export default function FeatureDetail() {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const s = useSiteSettings()

//   const idx = FEATURE_SLUGS.indexOf(slug)

//   // Unknown / bad slug — same UI shell, friendly fallback
//   if (idx === -1) {
//     return (
//       <div>
//         <div style={{ padding: "200px 5% 100px", textAlign: "center" }}>
//           <span className="section-label fade-up">Oops</span>
//           <h2 className="section-title fade-up delay-1">
//             Feature <span className="gold-text">Not Found</span>
//           </h2>
//           <div className="divider" style={{ margin: "16px auto" }} />
//           <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>
//             The feature you're looking for doesn't exist.
//           </p>
//           <button className="btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   const n      = idx + 1
//   const icon   = s[`feat${n}Icon`]  || "📌"
//   const title  = s[`feat${n}Title`] || ""
//   const desc   = s[`feat${n}Desc`]  || ""
//   const points = EXTRA_POINTS[slug] || []

//   const titleParts = title.split(" ")
//   const firstWord   = titleParts[0]
//   const restWords   = titleParts.slice(1).join(" ")

//   return (
//     <div>
//       <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
//         <div style={{ maxWidth: 900, margin: "0 auto" }}>

//           <span className="section-label fade-up">Why Choose Us</span>
//           <h1 className="section-title fade-up delay-1">
//             {firstWord} {restWords && <span className="gold-text">{restWords}</span>}
//           </h1>
//           <div className="divider" />

//           <div className="card fade-up delay-2" style={{ padding: 40 }}>
//             <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
//             <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28 }}>
//               {desc}
//             </p>

//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               {points.map((point, i) => (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                   <div style={{
//                     width: 22, height: 22, borderRadius: "50%",
//                     background: "linear-gradient(135deg,var(--gold),var(--gold-light))",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     fontSize: 11, color: "var(--dark)", fontWeight: 700, flexShrink: 0,
//                   }}>✓</div>
//                   <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{point}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
//             <button className="btn-outline" onClick={() => navigate("/")}>← Back to Home</button>
//             <button className="btn-primary" onClick={() => navigate("/contact")}>Get in Touch →</button>
//           </div>

//           {/* ── Other Features (quick nav) ── */}
//           <div style={{ marginTop: 64 }}>
//             <div style={{ textAlign: "center", marginBottom: 24 }}>
//               <span className="section-label">Explore More</span>
//               <h2 className="section-title" style={{ fontSize: "clamp(20px,3vw,28px)" }}>
//                 Other <span className="gold-text">Strengths</span>
//               </h2>
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
//               {FEATURE_SLUGS.filter(sl => sl !== slug).map((sl, i) => {
//                 const on = i + 1 <= 6 ? FEATURE_SLUGS.indexOf(sl) + 1 : 1
//                 const t = s[`feat${FEATURE_SLUGS.indexOf(sl) + 1}Title`] || ""
//                 const ic = s[`feat${FEATURE_SLUGS.indexOf(sl) + 1}Icon`] || "📌"
//                 return (
//                   <div
//                     key={sl}
//                     className="card"
//                     style={{ padding: "20px 16px", textAlign: "center", cursor: "pointer" }}
//                     onClick={() => navigate(`/features/${sl}`)}
//                   >
//                     <div style={{ fontSize: 26, marginBottom: 8 }}>{ic}</div>
//                     <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)" }}>{t}</div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }


import { useParams, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useSiteSettings, FEATURE_SLUGS } from "./Home"

/* ─── Extra detail bullet points shown on each feature page ── */
const EXTRA_POINTS = {
  "expert-faculty": [
    "Decades of real-world teaching & industry expertise",
    "Personalized attention with low student-teacher ratio",
    "Continuous training on latest curriculum & methods",
    "Subject-matter specialists across all streams",
  ],
  "digital-learning": [
    "Recorded lectures accessible anytime, anywhere",
    "Interactive online quizzes & practice tests",
    "Smart classrooms with digital whiteboards",
    "Mobile-friendly student learning portal",
  ],
  "proven-results": [
    "Consistent top ranks in board & entrance exams",
    "Hundreds placed in top universities & companies",
    "Structured test series & performance analysis",
    "Track record built over 25+ years",
  ],
  "mentorship": [
    "Dedicated mentor assigned to every student",
    "Regular one-on-one progress reviews",
    "Career & stream guidance from experts",
    "Emotional & academic support system",
  ],
  "progress-tracking": [
    "Live attendance & performance dashboard",
    "Instant notification to parents & students",
    "Subject-wise strength & weakness analysis",
    "Downloadable progress reports",
  ],
  "global-network": [
    "Active alumni network in 20+ countries",
    "Global exposure through exchange programs",
    "Networking events & guest lectures",
    "Lifelong professional relationships",
  ],
}

export default function FeatureDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const s = useSiteSettings()

  const idx = FEATURE_SLUGS.indexOf(slug)

  // Unknown / bad slug — same UI shell, friendly fallback
  if (idx === -1) {
    return (
      <div>
        <div style={{ padding: "200px 5% 100px", textAlign: "center" }}>
          <span className="section-label fade-up">Oops</span>
          <h2 className="section-title fade-up delay-1">
            Feature <span className="gold-text">Not Found</span>
          </h2>
          <div className="divider" style={{ margin: "16px auto" }} />
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28 }}>
            The feature you're looking for doesn't exist.
          </p>
          <button className="btn-primary" onClick={() => navigate("/")}>← Back to Home</button>
        </div>
        <Footer />
      </div>
    )
  }

  const n      = idx + 1
  const icon   = s[`feat${n}Icon`]  || "📌"
  const title  = s[`feat${n}Title`] || ""
  const desc   = s[`feat${n}Desc`]  || ""
  const points = EXTRA_POINTS[slug] || []

  const titleParts = title.split(" ")
  const firstWord   = titleParts[0]
  const restWords   = titleParts.slice(1).join(" ")

  return (
    <div>
      <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <span className="section-label fade-up">Why Choose Us</span>
          <h1 className="section-title fade-up delay-1">
            {firstWord} {restWords && <span className="gold-text">{restWords}</span>}
          </h1>
          <div className="divider" />

          <div className="card fade-up delay-2" style={{ padding: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28 }}>
              {desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {points.map((point, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--gold),var(--gold-light))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: "var(--dark)", fontWeight: 700, flexShrink: 0,
                  }}>✓</div>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
            <button className="btn-outline" onClick={() => navigate("/")}>← Back to Home</button>
            <button className="btn-primary" onClick={() => navigate("/contact")}>Get in Touch →</button>
          </div>

          {/* ── Other Features (quick nav) ── */}
          <div style={{ marginTop: 64 }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span className="section-label">Explore More</span>
              <h2 className="section-title" style={{ fontSize: "clamp(20px,3vw,28px)" }}>
                Other <span className="gold-text">Strengths</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
              {FEATURE_SLUGS.filter(sl => sl !== slug).map((sl, i) => {
                const on = i + 1 <= 6 ? FEATURE_SLUGS.indexOf(sl) + 1 : 1
                const t = s[`feat${FEATURE_SLUGS.indexOf(sl) + 1}Title`] || ""
                const ic = s[`feat${FEATURE_SLUGS.indexOf(sl) + 1}Icon`] || "📌"
                return (
                  <div
                    key={sl}
                    className="card"
                    style={{ padding: "20px 16px", textAlign: "center", cursor: "pointer" }}
                    onClick={() => navigate(`/features/${sl}`)}
                  >
                    <div style={{ fontSize: 26, marginBottom: 8 }}>{ic}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)" }}>{t}</div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}