import { Link } from 'react-router-dom'
import './ServicesPage.css'

export default function ServicesPage() {
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
          <p className="page-eyebrow">What we offer</p>
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            From standard delivery to international freight, we have a solution
            for every shipping need.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="content-section">
        <div className="content-inner">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrap">🚚</div>
              <h3 className="service-title">Standard Delivery</h3>
              <p className="service-desc">
                Affordable and reliable delivery worldwide. Perfect for non-urgent
                shipments with full tracking included at every stage.
              </p>
              <ul className="service-features">
                <li>✅ Full real-time tracking</li>
                <li>✅ Delivery across all 36 states</li>
                <li>✅ 2 - 5 business days</li>
                <li>✅ SMS & email updates</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div className="featured-badge">Most Popular</div>
              <div className="service-icon-wrap">⚡</div>
              <h3 className="service-title">Express Delivery</h3>
              <p className="service-desc">
                Need it fast? Our express service guarantees same-day or next-day
                delivery to all major cities in United State.
              </p>
              <ul className="service-features">
                <li>✅ Same-day or next-day</li>
                <li>✅ Priority handling</li>
                <li>✅ Live GPS tracking</li>
                <li>✅ Dedicated courier</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">🏢</div>
              <h3 className="service-title">Business Logistics</h3>
              <p className="service-desc">
                Tailored logistics solutions for businesses of all sizes. Bulk shipping,
                scheduled pickups, and a dedicated account manager.
              </p>
              <ul className="service-features">
                <li>✅ Bulk shipment discounts</li>
                <li>✅ Scheduled pickups</li>
                <li>✅ Dedicated account manager</li>
                <li>✅ Monthly invoicing</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">🌍</div>
              <h3 className="service-title">International Shipping</h3>
              <p className="service-desc">
                Send parcels worldwide with full customs clearance support and
                end-to-end tracking across borders.
              </p>
              <ul className="service-features">
                <li>✅ Worldwide delivery</li>
                <li>✅ Customs clearance support</li>
                <li>✅ International tracking</li>
                <li>✅ Door-to-door service</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">❄️</div>
              <h3 className="service-title">Fragile & Special Care</h3>
              <p className="service-desc">
                Extra care handling for fragile, perishable, or high-value items
                with specialized packaging and insurance.
              </p>
              <ul className="service-features">
                <li>✅ Specialized packaging</li>
                <li>✅ Fragile item insurance</li>
                <li>✅ Temperature control</li>
                <li>✅ White glove handling</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">🏭</div>
              <h3 className="service-title">Warehousing</h3>
              <p className="service-desc">
                
              </p>Short and long-term storage at our secure hubs across New York,
                    London, and Dubai with 24/7 CCTV surveillance.
              <ul className="service-features">
                <li>✅ Secure storage facilities</li>
                <li>✅ New York, London, and Dubai</li>
                <li>✅ 24/7 surveillance</li>
                <li>✅ Inventory management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="content-section bg-navy">
        <div className="content-inner">
          <div className="section-header-center">
            <p className="page-eyebrow">Simple process</p>
            <h2 className="section-title-sm white">How It Works</h2>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-num">01</div>
              <h3 className="step-title">Book your shipment</h3>
              <p className="step-desc">Contact us with your parcel details and we'll arrange a pickup.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-num">02</div>
              <h3 className="step-title">We pick it up</h3>
              <p className="step-desc">Our courier collects your parcel and logs it into our system.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-num">03</div>
              <h3 className="step-title">Track in real-time</h3>
              <p className="step-desc">Use your tracking number to follow your parcel every step of the way.</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-num">04</div>
              <h3 className="step-title">Delivered!</h3>
              <p className="step-desc">Your parcel arrives safely at its destination on time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Ready to ship?</h2>
          <p className="cta-desc">Contact us today and we'll find the best solution for your needs.</p>
          <div className="cta-btns">
            <Link to="/contact" className="cta-btn-primary">Get in Touch</Link>
            <Link to="/" className="cta-btn-outline">Track a Parcel</Link>
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