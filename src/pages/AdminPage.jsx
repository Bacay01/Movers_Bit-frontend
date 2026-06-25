import { useState, useEffect } from 'react'
import axios from 'axios'
import './AdminPage.css'
import BASE_URL from '../api'

const ADMIN_SECRET = 'moversbit2026'
const ADMIN_PASSWORD = 'moversbit2026'

const STAGES = [
  'Order placed',
  'Picked up by courier',
  'Arrived at origin hub',
  'In transit',
  'Arrived at destination hub',
  'Out for delivery',
  'Delivered',
]

const EMPTY_FORM = {
  trackingNumber: '',
  origin: '',
  destination: '',
  estimatedDelivery: '',
  sender: { name: '', phone: '', address: '', country: '' },
  recipient: { name: '', phone: '', address: '', country: '' },
  packages: [{ itemName: '', weight: '', quantity: 1 }],
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [parcels, setParcels] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [noteMap, setNoteMap] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchParcels = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/admin/parcels`, {
      headers: { 'x-admin-secret': ADMIN_SECRET }
    })
    setParcels(data)
  }

  useEffect(() => {
    if (unlocked) fetchParcels()
  }, [unlocked])

  const handleUnlock = (e) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setUnlocked(true)
    } else {
      setPasswordError('Incorrect password. Access denied.')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setLoading(true)
    try {
      await axios.post(`${BASE_URL}/api/admin/parcels`, form, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      })
      setFormSuccess(`Parcel ${form.trackingNumber} created successfully!`)
      setForm(EMPTY_FORM)
      fetchParcels()
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create parcel.')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = async (parcel) => {
    try {
      await axios.patch(`${BASE_URL}/api/admin/parcels/${parcel._id}/next`, {
        note: noteMap[parcel._id] || '',
      }, { headers: { 'x-admin-secret': ADMIN_SECRET } })
      setNoteMap((prev) => ({ ...prev, [parcel._id]: '' }))
      fetchParcels()
    } catch (err) {
      alert(err.response?.data?.message || 'Error advancing stage.')
    }
  }

  const handlePause = async (parcel) => {
    if (!parcel.paused) {
      const reason = prompt('Enter reason for pausing this parcel:')
      if (reason === null) return
      await axios.patch(`${BASE_URL}/api/admin/parcels/${parcel._id}/pause`, { reason }, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      })
    } else {
      await axios.patch(`${BASE_URL}/api/admin/parcels/${parcel._id}/pause`, {}, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      })
    }
    fetchParcels()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this parcel?')) return
    await axios.delete(`${BASE_URL}/api/admin/parcels/${id}`, {
      headers: { 'x-admin-secret': ADMIN_SECRET }
    })
    fetchParcels()
  }

  const updatePerson = (type, field, value) => {
    setForm((prev) => ({ ...prev, [type]: { ...prev[type], [field]: value } }))
  }

  const updatePackage = (index, field, value) => {
    const updated = [...form.packages]
    updated[index] = { ...updated[index], [field]: value }
    setForm((prev) => ({ ...prev, packages: updated }))
  }

  const addPackage = () => {
    setForm((prev) => ({ ...prev, packages: [...prev.packages, { itemName: '', weight: '', quantity: 1 }] }))
  }

  const removePackage = (index) => {
    setForm((prev) => ({ ...prev, packages: prev.packages.filter((_, i) => i !== index) }))
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

  if (!unlocked) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-lock-card">
          <div className="admin-lock-icon">🔐</div>
          <h2 className="admin-lock-title">Admin Access</h2>
          <p className="admin-lock-desc">Enter the admin password to continue</p>
          <form onSubmit={handleUnlock} className="admin-lock-form">
            <input
              type="password"
              className="admin-lock-input"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            {passwordError && <p className="admin-lock-error">{passwordError}</p>}
            <button type="submit" className="admin-lock-btn">Unlock →</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <span className="admin-logo">📦 Movers_Bit</span>
            <span className="admin-badge">Admin Panel</span>
          </div>
          <a href="/" className="view-site-link" target="_blank" rel="noreferrer">
            View customer site ↗
          </a>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-section">
          <h2 className="section-title">Create new parcel</h2>
          <div className="create-form">

            <p className="form-section-title">Shipment info</p>
            <div className="form-row">
              <div className="form-group">
                <label>Tracking number</label>
                <input type="text" placeholder="e.g. TRK-2026-001"
                  value={form.trackingNumber}
                  onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Est. delivery date</label>
                <input type="date" value={form.estimatedDelivery}
                  onChange={(e) => setForm({ ...form, estimatedDelivery: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Origin city</label>
                <input type="text" placeholder="e.g. New York"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Destination city</label>
                <input type="text" placeholder="e.g. London"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })} />
              </div>
            </div>

            <p className="form-section-title">Sender details</p>
            <div className="form-row">
              <div className="form-group">
                <label>Full name</label>
                <input type="text" placeholder="Sender name"
                  value={form.sender.name}
                  onChange={(e) => updatePerson('sender', 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="text" placeholder="+1 800 000 0000"
                  value={form.sender.phone}
                  onChange={(e) => updatePerson('sender', 'phone', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Street address"
                  value={form.sender.address}
                  onChange={(e) => updatePerson('sender', 'address', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" placeholder="e.g. United States"
                  value={form.sender.country}
                  onChange={(e) => updatePerson('sender', 'country', e.target.value)} />
              </div>
            </div>

            <p className="form-section-title">Recipient details</p>
            <div className="form-row">
              <div className="form-group">
                <label>Full name</label>
                <input type="text" placeholder="Recipient name"
                  value={form.recipient.name}
                  onChange={(e) => updatePerson('recipient', 'name', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input type="text" placeholder="+1 800 000 0000"
                  value={form.recipient.phone}
                  onChange={(e) => updatePerson('recipient', 'phone', e.target.value)} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Address</label>
                <input type="text" placeholder="Street address"
                  value={form.recipient.address}
                  onChange={(e) => updatePerson('recipient', 'address', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input type="text" placeholder="e.g. United Kingdom"
                  value={form.recipient.country}
                  onChange={(e) => updatePerson('recipient', 'country', e.target.value)} />
              </div>
            </div>

            <p className="form-section-title">Package details</p>
            {form.packages.map((pkg, i) => (
              <div className="package-row" key={i}>
                <div className="form-group">
                  <label>Item name</label>
                  <input type="text" placeholder="e.g. Electronics"
                    value={pkg.itemName}
                    onChange={(e) => updatePackage(i, 'itemName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Weight</label>
                  <input type="text" placeholder="e.g. 2.5 KG"
                    value={pkg.weight}
                    onChange={(e) => updatePackage(i, 'weight', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" min="1" placeholder="1"
                    value={pkg.quantity}
                    onChange={(e) => updatePackage(i, 'quantity', e.target.value)} />
                </div>
                {form.packages.length > 1 && (
                  <button className="btn-remove-pkg" onClick={() => removePackage(i)}>🗑</button>
                )}
              </div>
            ))}
            <button className="btn-add-pkg" onClick={addPackage}>+ Add another package</button>

            {formError && <p className="form-error">{formError}</p>}
            {formSuccess && <p className="form-success">{formSuccess}</p>}
            <button className="btn-primary" onClick={handleCreate} disabled={loading}>
              {loading ? 'Creating…' : '+ Create Parcel'}
            </button>
          </div>
        </section>

        <section className="admin-section">
          <h2 className="section-title">All parcels ({parcels.length})</h2>
          {parcels.length === 0 && <p className="empty-msg">No parcels yet. Create one above.</p>}
          <div className="parcels-list">
            {parcels.map((p) => {
              const isDelivered = p.currentStageIndex === STAGES.length - 1
              return (
                <div className={`parcel-card ${p.paused ? 'paused' : ''}`} key={p._id}>
                  <div className="parcel-card-top">
                    <div>
                      <div className="parcel-tracking">{p.trackingNumber}</div>
                      <div className="parcel-route">{p.origin} → {p.destination}</div>
                    </div>
                    <div className="parcel-card-actions">
                      <button className={`btn-pause ${p.paused ? 'unpaused' : ''}`} onClick={() => handlePause(p)}>
                        {p.paused ? '▶ Unpause' : '⏸ Pause'}
                      </button>
                      <button className="btn-delete" onClick={() => handleDelete(p._id)}>🗑</button>
                    </div>
                  </div>

                  <div className="parcel-meta">
                    <span>Sender: <b>{p.sender?.name}</b></span>
                    <span>Recipient: <b>{p.recipient?.name}</b></span>
                    <span>Est. delivery: <b>{formatDate(p.estimatedDelivery)}</b></span>
                  </div>

                  <div className="stage-progress">
                    {STAGES.map((stage, i) => (
                      <div key={i}
                        className={`stage-pip ${i < p.currentStageIndex ? 'done' : i === p.currentStageIndex ? 'active' : 'future'}`}
                        title={stage} />
                    ))}
                  </div>
                  <div className="current-stage-label">
                    Current: <b>{STAGES[p.currentStageIndex]}</b>
                    {p.paused && <span className="paused-tag">⏸ Paused</span>}
                  </div>

                  {!isDelivered && (
                    <div className="advance-row">
                      <input type="text" className="note-input"
                        placeholder="Optional note e.g. Arrived New York hub"
                        value={noteMap[p._id] || ''}
                        onChange={(e) => setNoteMap((prev) => ({ ...prev, [p._id]: e.target.value }))} />
                      <button className="btn-next" onClick={() => handleNext(p)} disabled={p.paused}>
                        Push → {STAGES[p.currentStageIndex + 1]}
                      </button>
                    </div>
                  )}

                  {isDelivered && <div className="delivered-tag">✅ Delivered</div>}
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}