import { useState } from "react"
import Footer from "../components/Footer"

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => { setSent(true); setTimeout(() => setSent(false), 4000) }

  return (
    <div>
      <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <span className="section-label fade-up">Get in Touch</span>
          <h1 className="section-title fade-up delay-1">We'd Love to <span className="gold-text">Hear from You</span></h1>
          <div className="divider" />

          <div className="contact-grid">
            <div className="card contact-info-card fade-up delay-1">
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
                Contact Information
              </h3>
              {[
                { icon: "📍", title: "Address", value: "EDUCATIONERP Campus, Civil Lines,\nKhandwa, Madhya Pradesh 450001" },
                { icon: "📞", title: "Phone", value: "+91 98765 43210\n+91 73213 00000" },
                { icon: "✉️", title: "Email", value: "info@educationerp.in\nadmissions@edusphere.in" },
                { icon: "⏰", title: "Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM\nSunday: Closed" },
              ].map((item, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-title">{item.title}</div>
                    <div className="contact-item-value" style={{ whiteSpace: "pre-line" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card fade-up delay-2" style={{ padding: "40px" }}>
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
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Contact
