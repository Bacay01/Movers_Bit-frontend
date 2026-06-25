import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './TrackPage.css'

const STAGE_ICONS = {
  'Order placed': '📋',
  'Picked up by courier': '🧑‍💼',
  'Arrived at origin hub': '🏭',
  'In transit': '🚚',
  'Arrived at destination hub': '📍',
  'Out for delivery': '🛵',
  'Delivered': '✅',
}

export default function TrackPage() {
  const [input, setInput] = useState('')
  const [parcel, setParcel] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setParcel(null)
    try {
      const { data } = await axios.get(`/api/track/${input.trim()}`)
      setParcel(data)
      setTimeout(() => {
        document.getElementById('result-anchor')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking number not found. Please check and try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })

  const formatDateTime = (d) =>
    new Date(d).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

  const getPct = (p) => Math.round((p.currentStageIndex / (p.totalStages - 1)) * 100)

  const getStatusPill = (p) => {
    if (p.paused) return <span className="status-pill paused"> On Hold</span>
    if (p.currentStageIndex === p.totalStages - 1) return <span className="status-pill delivered">✅ Delivered</span>
    return <span className="status-pill active">🚚 In Transit</span>
  }

  return (
    <div className="track-page">

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
          <a href="#track" className="nav-track-btn">Track Order</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="track">
        <div className="hero-inner">
          <div className="hero-left">
            <span className="hero-eyebrow">🚚 Real-time parcel tracking</span>
            <h1 className="hero-title">Fast. Reliable.<br /><span>Trackable.</span></h1>
            <p className="hero-desc">
              We deliver your parcels safely across the globe with speed and reliability.
              Track your shipment in real-time with your unique tracking number.
            </p>
            <div className="track-card">
              <p className="track-card-label">Enter your tracking number</p>
              <form className="track-row" onSubmit={handleTrack}>
                <input
                  type="text" className="track-input"
                  placeholder="e.g. TRK-2026-001"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="track-btn" type="submit" disabled={loading}>
                  {loading ? 'Searching…' : 'Track'}
                </button>
              </form>
              <p className="track-card-note">Enter the tracking number provided by your sender</p>
              {error && <div className="track-error">⚠️ {error}</div>}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-graphic">
              <div className="hero-stats">
                <div className="stat-box">
                  <div className="stat-icon">📦</div>
                  <div className="stat-num">10k+</div>
                  <div className="stat-label">Parcels delivered</div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">🌍</div>
                  <div className="stat-num">150+</div>
                  <div className="stat-label">Countries covered</div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-num">24/7</div>
                  <div className="stat-label">Live tracking</div>
                </div>
                <div className="stat-box">
                  <div className="stat-icon">✅</div>
                  <div className="stat-num">99%</div>
                  <div className="stat-label">Success rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULT */}
      {parcel && (
        <section className="result-section" id="result-anchor">
          <div className="result-section-inner">

            {/* TOP HEADER */}
            <div className="parcel-result">
              <div className="result-header">
                <div>
                  <p className="result-eyebrow">Tracking number</p>
                  <p className="result-tracking">{parcel.trackingNumber}</p>
                  <p className="result-route">{parcel.origin} → {parcel.destination}</p>
                </div>
                {getStatusPill(parcel)}
              </div>

              <div className="result-body">

                {/* HOLD BANNER */}
  {parcel.paused && (
  <div className="hold-banner">
    
    <div>
      <p className="hold-title">Shipment is temporarily on hold</p>
      <p className="hold-sub">
        {parcel.pauseReason ? `Reason: ${parcel.pauseReason}` : 'Your parcel will continue moving soon.'}
      </p>
      <p className="hold-sub">We apologize for the inconvenience.</p>
    </div>
  </div>
)}

                {/* PROGRESS */}
                <div className="progress-section">
                  <div className="progress-header">
                    <span className="progress-title">Delivery progress</span>
                    <span className="progress-pct">{getPct(parcel)}% complete</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${getPct(parcel)}%` }} />
                  </div>
                  <div className="progress-ends">
                    <span>{parcel.origin}</span>
                    <span>{parcel.destination}</span>
                  </div>
                </div>

                {/* SENDER & RECIPIENT */}
                <div className="persons-grid">
                  <div className="person-card">
                    <p className="person-card-title">📤 Sender Info</p>
                    <div className="person-row"><span className="person-label">Name</span><span className="person-val">{parcel.sender?.name}</span></div>
                    {parcel.sender?.phone && <div className="person-row"><span className="person-label">Phone</span><span className="person-val">{parcel.sender.phone}</span></div>}
                    {parcel.sender?.address && <div className="person-row"><span className="person-label">Address</span><span className="person-val">{parcel.sender.address}</span></div>}
                    {parcel.sender?.country && <div className="person-row"><span className="person-label">Country</span><span className="person-val">{parcel.sender.country}</span></div>}
                  </div>
                  <div className="person-card">
                    <p className="person-card-title">📥 Recipient Info</p>
                    <div className="person-row"><span className="person-label">Name</span><span className="person-val">{parcel.recipient?.name}</span></div>
                    {parcel.recipient?.phone && <div className="person-row"><span className="person-label">Phone</span><span className="person-val">{parcel.recipient.phone}</span></div>}
                    {parcel.recipient?.address && <div className="person-row"><span className="person-label">Address</span><span className="person-val">{parcel.recipient.address}</span></div>}
                    {parcel.recipient?.country && <div className="person-row"><span className="person-label">Country</span><span className="person-val">{parcel.recipient.country}</span></div>}
                  </div>
                </div>

                {/* SHIPMENT DETAILS */}
                <div className="shipment-details">
                  <p className="details-title">Shipment Details</p>
                  <div className="details-grid">
                    <div className="detail-item"><span className="detail-label">Track ID</span><span className="detail-val">{parcel.trackingNumber}</span></div>
                    <div className="detail-item"><span className="detail-label">Status</span><span className="detail-val">{parcel.paused ? 'On Hold' : parcel.currentStage}</span></div>
                    <div className="detail-item"><span className="detail-label">Origin</span><span className="detail-val">{parcel.origin}</span></div>
                    <div className="detail-item"><span className="detail-label">Destination</span><span className="detail-val">{parcel.destination}</span></div>
                    <div className="detail-item"><span className="detail-label">Est. Delivery</span><span className="detail-val">{formatDate(parcel.estimatedDelivery)}</span></div>
                    <div className="detail-item"><span className="detail-label">Date Created</span><span className="detail-val">{formatDateTime(parcel.createdAt)}</span></div>
                  </div>
                </div>

                {/* PACKAGES */}
                {parcel.packages && parcel.packages.length > 0 && (
                  <div className="packages-section">
                    <p className="details-title">Package Details</p>
                    <table className="packages-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item Name</th>
                          <th>Weight</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parcel.packages.map((pkg, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{pkg.itemName}</td>
                            <td>{pkg.weight}</td>
                            <td>{pkg.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* TIMELINE */}
                <div className="timeline-section">
                  <p className="details-title">Shipment History</p>
                  <div className="timeline">
                    {parcel.timeline.slice().reverse().map((entry, i) => (
                      <div className="t-item" key={i}>
                        <div className={`t-icon-wrap ${i === 0 ? 'current' : 'completed'}`}>
                          <span className="t-icon">{STAGE_ICONS[entry.stage] || '📦'}</span>
                        </div>
                        <div className="t-body">
                          <p className="t-stage-name">{entry.stage}</p>
                          {entry.note && <p className="t-note">{entry.note}</p>}
                          <p className="t-time">{formatDateTime(entry.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                    {parcel.stages.slice(parcel.currentStageIndex + 1).map((stage, i) => (
                      <div className="t-item" key={`p-${i}`}>
                        <div className="t-icon-wrap pending">
                          <span className="t-icon" style={{ opacity: 0.3 }}>{STAGE_ICONS[stage] || '📦'}</span>
                        </div>
                        <div className="t-body">
                          <p className="t-stage-name pending-text">{stage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-left">
            <p className="section-eyebrow">About Movers_Bit</p>
            <h2 className="section-title">Your trusted logistics partner</h2>
            <p className="section-desc">
              Movers_Bit is a modern logistics company built on speed, reliability, and transparency.
              We provide end-to-end parcel delivery services with real-time tracking so you always
              know where your shipment is.
            </p>
            <div className="about-points">
              <div className="about-point">
                <div className="point-icon">✅</div>
                <p className="point-text"><b>Reliable delivery</b> — We handle your parcels with the utmost care and professionalism.</p>
              </div>
              <div className="about-point">
                <div className="point-icon">📍</div>
                <p className="point-text"><b>Real-time tracking</b> — Track your shipment at every stage of its journey.</p>
              </div>
              <div className="about-point">
                <div className="point-icon">🤝</div>
                <p className="point-text"><b>Customer first</b> — Our support team is always available to assist you.</p>
              </div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-card"><div className="about-card-icon">🚚</div><p className="about-card-title">Road Freight</p><p className="about-card-desc">Fast and reliable road delivery across all major cities worldwide.</p></div>
            <div className="about-card"><div className="about-card-icon">✈️</div><p className="about-card-title">Air Freight</p><p className="about-card-desc">Express air delivery for urgent and high-value shipments.</p></div>
            <div className="about-card"><div className="about-card-icon">🏭</div><p className="about-card-title">Warehousing</p><p className="about-card-desc">Secure storage facilities at all major hubs worldwide.</p></div>
            <div className="about-card"><div className="about-card-icon">📦</div><p className="about-card-title">Last Mile</p><p className="about-card-desc">Doorstep delivery to any address anywhere in the world.</p></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="services-inner">
          <div className="section-header">
            <p className="section-eyebrow">What we offer</p>
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="services-grid">
            <div className="service-card"><div className="service-icon">🚚</div><p className="service-title">Standard Delivery</p><p className="service-desc">Affordable and reliable delivery worldwide. Perfect for non-urgent shipments with full tracking included.</p></div>
            <div className="service-card"><div className="service-icon">⚡</div><p className="service-title">Express Delivery</p><p className="service-desc">Need it fast? Our express service guarantees same-day or next-day delivery to major cities.</p></div>
            <div className="service-card"><div className="service-icon">🏢</div><p className="service-title">Business Logistics</p><p className="service-desc">Tailored logistics solutions for businesses. Bulk shipping, scheduled pickups, and dedicated account management.</p></div>
            <div className="service-card"><div className="service-icon">🌍</div><p className="service-title">International Shipping</p><p className="service-desc">Send parcels worldwide with full customs support and end-to-end tracking across borders.</p></div>
            <div className="service-card"><div className="service-icon">❄️</div><p className="service-title">Fragile & Special Care</p><p className="service-desc">Extra care handling for fragile, perishable, or high-value items with specialized packaging.</p></div>
            <div className="service-card"><div className="service-icon">📦</div><p className="service-title">Warehousing</p><p className="service-desc">Short and long-term storage solutions at our secure hubs across New York, London, and Dubai.</p></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <p className="footer-brand-name">Movers<span>_Bit</span></p>
              <p className="footer-brand-desc">Fast, reliable, and transparent parcel delivery across the globe.</p>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Quick Links</p>
              <a href="#track">Track Order</a>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Contact Us</p>
              <p><span>Email:</span> support@moversbit.com</p>
              <p><span>Phone:</span> +1 800 000 0000</p>
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