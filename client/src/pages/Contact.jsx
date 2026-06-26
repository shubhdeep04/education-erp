// import { useState } from "react"
// import Footer from "../components/Footer"

// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
//   const [sent, setSent] = useState(false)

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
//   const submit = () => { setSent(true); setTimeout(() => setSent(false), 4000) }

//   return (
//     <div>
//       <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <span className="section-label fade-up">Get in Touch</span>
//           <h1 className="section-title fade-up delay-1">We'd Love to <span className="gold-text">Hear from You</span></h1>
//           <div className="divider" />

//           <div className="contact-grid">
//             <div className="card contact-info-card fade-up delay-1">
//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
//                 Contact Information
//               </h3>
//               {[
//                 { icon: "📍", title: "Address", value: "EDUCATIONERP Campus, Civil Lines,\nKhandwa, Madhya Pradesh 450001" },
//                 { icon: "📞", title: "Phone", value: "+91 98765 43210\n+91 73213 00000" },
//                 { icon: "✉️", title: "Email", value: "info@educationerp.in\nadmissions@edusphere.in" },
//                 { icon: "⏰", title: "Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM\nSunday: Closed" },
//               ].map((item, i) => (
//                 <div key={i} className="contact-item">
//                   <div className="contact-icon">{item.icon}</div>
//                   <div>
//                     <div className="contact-item-title">{item.title}</div>
//                     <div className="contact-item-value" style={{ whiteSpace: "pre-line" }}>{item.value}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="card fade-up delay-2" style={{ padding: "40px" }}>
//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
//                 Send a Message
//               </h3>
//               {sent && (
//                 <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "14px 18px", marginBottom: 24, color: "#4ade80", fontSize: 14 }}>
//                   ✅ Message sent! We'll get back to you within 24 hours.
//                 </div>
//               )}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">Name</label>
//                   <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Phone</label>
//                   <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Email</label>
//                 <input className="form-input" name="email" value={form.email} onChange={handle} placeholder="your@email.com" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Subject</label>
//                 <input className="form-input" name="subject" value={form.subject} onChange={handle} placeholder="How can we help?" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Message</label>
//                 <textarea className="form-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us more..." />
//               </div>
//               <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
//                 Send Message →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }
// export default Contact














import { useState, useEffect } from "react"
import Footer from "../components/Footer"

const DEFAULTS = {
  address:  "EDUCATIONERP Campus, Civil Lines,\nKhandwa, Madhya Pradesh 450001",
  phone:    "+91 98765 43210",
  phone2:   "+91 73213 00000",
  email:    "info@educationerp.in",
  email2:   "admissions@edusphere.in",
  hours:    "Mon–Sat: 8:00 AM – 6:00 PM\nSunday: Closed",
  whatsapp: "",
  mapEmbed: "",
}

function getSite() {
  try {
    const d = JSON.parse(localStorage.getItem("siteSettings") || "{}")
    return { ...DEFAULTS, ...d }
  } catch {
    return DEFAULTS
  }
}

export default function Contact() {
  const [site, setSite] = useState(getSite)
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSite(getSite()), 1000)
    return () => clearInterval(t)
  }, [])

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const submit = () => { setSent(true); setTimeout(() => setSent(false), 4000) }

  const info = [
    { icon: "📍", title: "Address", value: site.address },
    { icon: "📞", title: "Phone",   value: [site.phone, site.phone2].filter(Boolean).join("\n") },
    { icon: "✉️", title: "Email",   value: [site.email, site.email2].filter(Boolean).join("\n") },
    { icon: "⏰", title: "Hours",   value: site.hours },
  ]

  return (
    <div>
      <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <span className="section-label fade-up">Get in Touch</span>
          <h1 className="section-title fade-up delay-1">
            We'd Love to <span className="gold-text">Hear from You</span>
          </h1>
          <div className="divider" />

          <div className="contact-grid">

            {/* ── Info Card ── */}
            <div className="card contact-info-card fade-up delay-1">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
                Contact Information
              </h3>

              {info.map((item, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-title">{item.title}</div>
                    <div className="contact-item-value" style={{ whiteSpace: "pre-line" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              {site.whatsapp ? (
                <a
                  href={"https://wa.me/91" + site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ marginTop: 24, display: "inline-flex", fontSize: 13, gap: 8 }}
                >
                  💬 Chat on WhatsApp
                </a>
              ) : null}
            </div>

            {/* ── Form Card ── */}
            <div className="card fade-up delay-2" style={{ padding: 40 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
                Send a Message
              </h3>

              {sent && (
                <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "14px 18px", marginBottom: 24, color: "#4ade80", fontSize: 14 }}>
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" name="email" value={form.email} onChange={handle} placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" value={form.subject} onChange={handle} placeholder="How can we help?" />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us more..." />
              </div>

              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
                Send Message →
              </button>
            </div>
          </div>

          {/* ── Map ── */}
          {site.mapEmbed ? (
            <div style={{ marginTop: 60 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <span className="section-label">Find Us</span>
                <h2 className="section-title" style={{ fontSize: "clamp(22px,3vw,32px)" }}>
                  Our <span className="gold-text">Location</span>
                </h2>
              </div>
              <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", height: 380 }}>
                <iframe
                  src={site.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          ) : null}

        </div>
      </div>
      <Footer />
    </div>
  )
}