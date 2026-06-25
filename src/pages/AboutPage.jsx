import { Link } from 'react-router-dom'
import './AboutPage.css'

export default function AboutPage() {
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
          <p className="page-eyebrow">Who we are</p>
          <h1 className="page-title">About Movers_Bit</h1>
          <p className="page-subtitle">
            We are a modern logistics company built on speed, reliability, and transparency.
            Delivering smiles worldwide and beyond.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="content-section">
        <div className="content-inner">
          <div className="two-col">
            <div>
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title-sm">Built for the modern Citizen</h2>
              <p className="section-body">
                Movers_Bit was founded with a simple mission — make parcel delivery fast, affordable,
                and fully transparent for every Citizen. We saw how frustrating it was to send a
                package and have no idea where it was. So we built a platform that changes that.
              </p>
              <p className="section-body">
                Today we serve thousands of customers across all 36 states, delivering everything
                from documents to large cargo with full real-time tracking at every step.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat-card">
                <p className="stat-num">10k+</p>
                <p className="stat-label">Parcels delivered</p>
              </div>
              <div className="stat-card">
                <p className="stat-num">36</p>
                <p className="stat-label">States covered</p>
              </div>
              <div className="stat-card">
                <p className="stat-num">99%</p>
                <p className="stat-label">Success rate</p>
              </div>
              <div className="stat-card">
                <p className="stat-num">24/7</p>
                <p className="stat-label">Live tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="content-section bg-gray">
        <div className="content-inner">
          <div className="section-header-center">
            <p className="section-eyebrow">What drives us</p>
            <h2 className="section-title-sm">Our Core Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3 className="value-title">Speed</h3>
              <p className="value-desc">We move fast so your parcels arrive on time, every time.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3 className="value-title">Safety</h3>
              <p className="value-desc">Every parcel is handled with care and insured against damage.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">📍</div>
              <h3 className="value-title">Transparency</h3>
              <p className="value-desc">Full real-time tracking so you always know where your parcel is.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3 className="value-title">Trust</h3>
              <p className="value-desc">We are accountable, honest, and committed to our customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to ship with us?</h2>
          <p className="cta-desc">Track your parcel or get in touch with our team today.</p>
          <div className="cta-btns">
            <Link to="/" className="cta-btn-primary">Track a Parcel</Link>
            <Link to="/contact" className="cta-btn-outline">Contact Us</Link>
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