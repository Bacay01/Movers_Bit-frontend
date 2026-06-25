import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ContactPage.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-text">Movers<span>_Bit</span></span>
          </Link>
          <div className="nav-links">
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <Link to="/" className="nav-track-btn">Track Order</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <p className="page-eyebrow">Get in touch</p>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have a question or need a quote? Our team is ready to help you.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-section">
        <div className="contact-inner">

          {/* INFO CARDS */}
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Our Address</h3>
              <p className="info-text">123 Logistics Way<br />Manhattan, New York<br />United State</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3 className="info-title">Phone</h3>
              <p className="info-text"> +1 800 000 0000<br />+1 900 000 0000<br />Mon - Sat, 8am - 6pm</p>
            </div>
            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3 className="info-title">Email</h3>
              <p className="info-text">support@moversbit.com<br />business@moversbit.com</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3 className="info-title">Working Hours</h3>
              <p className="info-text">Monday - Friday: 8am - 6pm<br />Saturday: 9am - 4pm<br />Sunday: Closed</p>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form-wrap">
            <div className="form-left">
              <h2 className="form-title">Send us a message</h2>
              <p className="form-desc">Fill out the form and our team will get back to you within 24 hours.</p>

              {sent && (
                <div className="form-success">
                  ✅ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <div className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Phone number</label>
                  <input
                    type="tel"
                    placeholder=" +1 800 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>
                  Send Message →
                </button>
              </div>
            </div>

            <div className="form-right">
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <p className="map-text">New York, USA</p>
                <p className="map-sub"> 123 Logistics Way, New York</p>
              </div>
              <div className="social-links">
                <p className="social-title">Follow us</p>
                <div className="social-icons">
                  <a href="#" className="social-icon">𝕏</a>
                  <a href="#" className="social-icon">f</a>
                  <a href="#" className="social-icon">in</a>
                  <a href="#" className="social-icon">📸</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <p className="footer-brand-name">Movers<span>_Bit</span></p>
              <p className="footer-brand-desc">Fast, reliable, and transparent parcel delivery worldwide and beyond.</p>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Quick Links</p>
              <Link to="/">Track Order</Link>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Contact Us</p>
              <p><span>Email:</span> support@moversbit.com</p>
              <p><span>Phone:</span>  +1 800 000 0000</p>
              <p><span>Address:</span> New York, USA</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 <span>Movers_Bit</span>. All rights reserved.</p>
            <p className="footer-copy">Delivering worldwide since 2020</p>
          </div>
        </div>
      </footer>

    </div>
  )
}