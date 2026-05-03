import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════
   SOBA VERIFICATION FLOW
═══════════════════════════════════════════════════════════ */
const verifySteps = [
  { id: 1, label: 'Personal Info', icon: '👤' },
  { id: 2, label: 'Identity Docs', icon: '🪪' },
  { id: 3, label: 'Farm Location', icon: '📍' },
  { id: 4, label: 'Blockchain Reg.', icon: '⛓️' },
]

function SOBAVerification({ onComplete }) {
  const [step, setStep]   = useState(1)
  const [form, setForm]   = useState({ name: '', phone: '', country: '', idType: '', idNumber: '', lat: '', lng: '', farmSize: '' })
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [txHash, setTxHash]       = useState('')

  const handleUploadSim = () => {
    setUploading(true)
    setTimeout(() => { setUploading(false); setUploaded(true) }, 1800)
  }

  const handleNext = () => {
    if (step === 4) {
      setLoading(true)
      setTimeout(() => {
        setTxHash('0x3f2a9c' + Math.random().toString(16).slice(2, 14))
        setLoading(false)
        onComplete && onComplete()
      }, 2400)
      return
    }
    setStep(s => s + 1)
  }

  const stepContent = {
    1: (
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 6 }}>Personal Information</h3>
        <p style={{ fontSize: 13, color: '#8BA898', marginBottom: 24 }}>This information is encrypted and stored on the SOBA Network.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Legal Name</label>
            <input className="form-input" placeholder="e.g. Kofi Mensah" aria-label="Full legal name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+233 XX XXX XXXX" aria-label="Phone number"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Country of Operation</label>
          <select className="form-select" aria-label="Country">
            <option value="">— Select country —</option>
            {['Ghana', "Côte d'Ivoire", 'Nigeria', 'Senegal', 'Tanzania', 'Mozambique', 'Benin', 'Togo'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="alert alert-info" style={{ marginTop: 16 }}>
          <span>🔒</span>
          <span style={{ fontSize: 12 }}>Your data is encrypted end-to-end. SOBA Network uses zero-knowledge proofs for verification.</span>
        </div>
      </div>
    ),
    2: (
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 6 }}>Identity Documents</h3>
        <p style={{ fontSize: 13, color: '#8BA898', marginBottom: 24 }}>Upload a government-issued ID. Accepted: National ID, Passport, or Driver's Licence.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">ID Type</label>
            <select className="form-select" aria-label="ID type">
              <option>National ID Card</option>
              <option>Passport</option>
              <option>Driver's Licence</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">ID Number</label>
            <input className="form-input" placeholder="GHA-XXXXXXXXXXXX" aria-label="ID number" />
          </div>
        </div>

        {/* Upload Zone */}
        <div
          onClick={!uploaded ? handleUploadSim : undefined}
          style={{
            border: `2px dashed ${uploaded ? 'rgba(34,197,94,0.4)' : 'rgba(82,183,136,0.3)'}`,
            borderRadius: 16,
            padding: '36px 24px',
            textAlign: 'center',
            background: uploaded ? 'rgba(34,197,94,0.05)' : 'rgba(82,183,136,0.04)',
            cursor: uploaded ? 'default' : 'pointer',
            transition: 'all 0.3s',
          }}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div className="spinner spinner-lg" />
              <span style={{ fontSize: 13, color: '#6B8C78' }}>Uploading securely…</span>
            </div>
          ) : uploaded ? (
            <div>
              <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#15803D' }}>Document Uploaded!</div>
              <div style={{ fontSize: 12, color: '#8BA898', marginTop: 4 }}>national_id_front.jpg · AI verification in progress</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#4A6B57', marginBottom: 6 }}>
                Drop your ID document here or click to upload
              </div>
              <div style={{ fontSize: 12, color: '#8BA898' }}>JPG, PNG, or PDF · Max 5MB · End-to-end encrypted</div>
            </div>
          )}
        </div>
      </div>
    ),
    3: (
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 6 }}>Farm Location</h3>
        <p style={{ fontSize: 13, color: '#8BA898', marginBottom: 24 }}>Buyers filter by proximity. Accurate location increases your discovery rate by up to 60%.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input className="form-input" placeholder="6.6885° N" aria-label="Latitude" />
          </div>
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input className="form-input" placeholder="1.6244° W" aria-label="Longitude" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Farm Size (Hectares)</label>
          <input className="form-input" type="number" placeholder="e.g. 5.5" aria-label="Farm size in hectares" />
        </div>

        {/* Simulated Map */}
        <div style={{
          height: 180, borderRadius: 14,
          background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 50%, #b1dfbb 100%)',
          border: '1.5px solid rgba(82,183,136,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
          marginTop: 8,
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(45,106,79,0.15) 0px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(45,106,79,0.15) 0px, transparent 1px, transparent 30px)' }} />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>📍</div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#2D6A4F' }}>Click to pin farm location</div>
            <div style={{ fontSize: 11, color: '#6B8C78' }}>Or use GPS auto-detect</div>
          </div>
          <button style={{
            position: 'absolute', bottom: 12, right: 12,
            background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 10,
            padding: '8px 14px', fontSize: 12, fontWeight: 600, color: '#2D6A4F', cursor: 'pointer',
          }}>📡 Use My GPS</button>
        </div>
      </div>
    ),
    4: (
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 6 }}>Blockchain Registration</h3>
        <p style={{ fontSize: 13, color: '#8BA898', marginBottom: 24 }}>
          Your verified identity will be anchored on the SOBA Network blockchain. This creates a permanent, tamper-proof trust record.
        </p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(45,106,79,0.06), rgba(82,183,136,0.04))',
          borderRadius: 14, padding: '20px 22px', marginBottom: 20,
          border: '1px solid rgba(82,183,136,0.2)',
        }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2E22', marginBottom: 14 }}>Registration Summary</div>
          {[
            ['Identity', '✅ Verified (KYC Level 2)'],
            ['Document', '✅ Uploaded & AI-Checked'],
            ['Location', '✅ GPS-Pinned (Ghana)'],
            ['Network', 'SOBA Mainnet'],
            ['Fee', 'Zero — Subsidised by platform'],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: '1px solid rgba(82,183,136,0.1)',
            }}>
              <span style={{ fontSize: 13, color: '#8BA898' }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2E22' }}>{v}</span>
            </div>
          ))}
        </div>

        {txHash ? (
          <div className="alert alert-success">
            <span style={{ fontSize: 20 }}>🎉</span>
            <div>
              <div style={{ fontWeight: 700 }}>Successfully Registered!</div>
              <div style={{ fontSize: 11, marginTop: 4, wordBreak: 'break-all', opacity: 0.8 }}>TX: {txHash}</div>
            </div>
          </div>
        ) : (
          <div className="alert alert-info">
            <span>⛓️</span>
            <span style={{ fontSize: 13 }}>Clicking "Register on Blockchain" will broadcast your verified identity to the SOBA Network. This action is irreversible.</span>
          </div>
        )}
      </div>
    ),
  }

  return (
    <div className="glass-strong" style={{ padding: 32 }}>
      {/* Steps Indicator */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 36 }}>
        {verifySteps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: step > s.id ? 'var(--primary-600)' : step === s.id ? 'linear-gradient(135deg, #2D6A4F, #52B788)' : 'rgba(82,183,136,0.12)',
                border: `2px solid ${step >= s.id ? '#2D6A4F' : 'rgba(82,183,136,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: step > s.id ? 16 : 18,
                color: step >= s.id ? '#fff' : '#8BA898',
                transition: 'all 0.3s',
                marginBottom: 8,
              }}>
                {step > s.id ? '✓' : s.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: step >= s.id ? '#2D6A4F' : '#8BA898', textAlign: 'center' }}>
                {s.label}
              </span>
            </div>
            {i < verifySteps.length - 1 && (
              <div style={{
                flex: 1, height: 2, background: step > s.id ? '#2D6A4F' : 'rgba(82,183,136,0.18)',
                marginTop: 20, transition: 'background 0.3s',
              }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ minHeight: 320 }}>
        {stepContent[step]}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28 }}>
        <button
          className="btn btn-ghost"
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          style={{ opacity: step === 1 ? 0.4 : 1 }}
        >← Back</button>
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={loading || !!txHash}
        >
          {loading ? (
            <><div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} /> Broadcasting…</>
          ) : step === 4 ? (txHash ? '✅ Verified!' : '⛓️ Register on Blockchain') : 'Continue →'}
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   AI LISTING TOOL
═══════════════════════════════════════════════════════════ */
const aiGrades = [
  { grade: 'W180', confidence: 94, label: 'Extra Large', color: '#22C55E' },
  { grade: 'W210', confidence: 4,  label: 'Large',       color: '#F59E0B' },
  { grade: 'W240', confidence: 2,  label: 'Medium-Large', color: '#8B5CF6' },
]

function AIListingTool() {
  const [stage, setStage]   = useState('idle') // idle | uploading | analyzing | done
  const [price, setPrice]   = useState('')
  const [weight, setWeight] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef()

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    triggerUpload()
  }, [])

  const triggerUpload = () => {
    setStage('uploading')
    setTimeout(() => setStage('analyzing'), 1200)
    setTimeout(() => setStage('done'), 3600)
  }

  const handleSubmit = () => {
    if (!weight || !price) return
    setSubmitted(true)
  }

  return (
    <div>
      {submitted ? (
        <div className="glass-strong" style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontWeight: 800, fontSize: 22, color: '#1B2E22', marginBottom: 10 }}>Listing Published!</h3>
          <p style={{ fontSize: 14, color: '#6B8C78', marginBottom: 24 }}>
            Your W180 cashews ({weight} kg @ LKR {price}/kg) are now live on the marketplace and indexed on the SOBA blockchain.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={() => { setStage('idle'); setSubmitted(false); setPrice(''); setWeight('') }}>
              Add Another Listing
            </button>
            <Link to="/marketplace" className="btn btn-primary">View Marketplace →</Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Drop Zone */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#4A6B57', marginBottom: 12 }}>
              📸 Upload Cashew Photo
            </div>
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => stage === 'idle' && triggerUpload()}
              style={{
                border: `2px dashed ${stage === 'done' ? 'rgba(34,197,94,0.5)' : 'rgba(82,183,136,0.35)'}`,
                borderRadius: 16,
                minHeight: 260,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                cursor: stage === 'idle' ? 'pointer' : 'default',
                background: stage === 'done' ? 'rgba(34,197,94,0.04)' : 'rgba(82,183,136,0.03)',
                transition: 'all 0.3s', position: 'relative', overflow: 'hidden', gap: 12,
                padding: 24,
              }}
            >
              {stage === 'idle' && (
                <>
                  <div style={{ fontSize: 48 }}>📷</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: '#4A6B57' }}>Drag & drop or click to upload</div>
                    <div style={{ fontSize: 12, color: '#8BA898', marginTop: 4 }}>AI will auto-detect grade, quality & disease status</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['JPG', 'PNG', 'WEBP'].map(t => (
                      <span key={t} className="badge badge-green" style={{ fontSize: 10 }}>{t}</span>
                    ))}
                  </div>
                </>
              )}
              {stage === 'uploading' && (
                <>
                  <div className="spinner spinner-lg" />
                  <span style={{ fontSize: 13, color: '#6B8C78', fontWeight: 500 }}>Uploading photo…</span>
                </>
              )}
              {stage === 'analyzing' && (
                <>
                  <div style={{ position: 'relative' }}>
                    <div style={{ fontSize: 52 }}>🥜</div>
                    <div style={{
                      position: 'absolute', inset: -8,
                      border: '3px solid rgba(82,183,136,0.6)',
                      borderRadius: '50%',
                      animation: 'spin 1.5s linear infinite',
                    }} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#2D6A4F' }}>🤖 AI Analyzing Quality…</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {['Detecting grade…', 'Checking moisture…', 'Disease scan…'].map((t, i) => (
                      <span key={i} style={{ fontSize: 11, color: '#6B8C78', animation: `pulse 1.5s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>
                        ⚙️ {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {stage === 'done' && (
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ fontSize: 40 }}>🥜</div>
                    <div>
                      <div style={{ fontSize: 11, color: '#8BA898' }}>Uploaded: cashews_batch.jpg</div>
                      <span className="badge badge-green" style={{ marginTop: 3 }}>✅ Analysis Complete</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span className="badge badge-green">✓ Disease-Free</span>
                    <span className="badge badge-green">✓ Low Moisture</span>
                    <span className="badge badge-amber">⚠ 2 broken nuts detected</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1B2E22', marginBottom: 10 }}>Grade Confidence:</div>
                  {aiGrades.map(g => (
                    <div key={g.grade} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#1B2E22' }}>{g.grade} ({g.label})</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.confidence}%</span>
                      </div>
                      <div className="progress">
                        <div style={{ height: '100%', width: `${g.confidence}%`, background: g.color, borderRadius: 3, transition: 'width 0.8s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Listing Form */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#4A6B57', marginBottom: 12 }}>📝 Listing Details</div>
            <div className="glass-strong" style={{ padding: 24 }}>
              {stage === 'done' && (
                <div className="alert alert-success" style={{ marginBottom: 20 }}>
                  <span>🤖</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>AI Suggested Price: LKR 4.85/kg</div>
                    <div style={{ fontSize: 11, marginTop: 2 }}>Based on W180 grade, current market, and your location</div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Cashew Grade</label>
                <select className="form-select" aria-label="Cashew grade" value={stage === 'done' ? 'W180' : ''} readOnly={stage === 'done'}>
                  {stage !== 'done' && <option value="">— AI will detect —</option>}
                  {['W180', 'W210', 'W240', 'W320', 'W450', 'SW240', 'SW320'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Total Weight Available (kg)</label>
                <input className="form-input" type="number" placeholder="e.g. 500" min="1"
                  aria-label="Total weight in kilograms"
                  value={weight} onChange={e => setWeight(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Asking Price (LKR/kg)</label>
                <div className="input-with-icon">
                  <span className="input-icon" style={{ fontSize: 11, fontWeight: 700 }}>LKR</span>
                  <input className="form-input" type="number" step="0.01" placeholder="e.g. 4.85"
                    aria-label="Asking price per kilogram"
                    value={price} onChange={e => setPrice(e.target.value)} />
                </div>
              </div>

              {price && weight && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(45,106,79,0.07), rgba(82,183,136,0.04))',
                  borderRadius: 12, padding: '14px 16px', marginBottom: 20,
                  border: '1px solid rgba(82,183,136,0.18)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1B2E22', marginBottom: 8 }}>💰 Estimated Earnings</div>
                  {[
                    ['Gross Revenue', `LKR ${(price * weight).toFixed(2)}`],
                    ['Platform Fee (2.5%)', `-LKR ${(price * weight * 0.025).toFixed(2)}`],
                    ['Net Payout', `LKR ${(price * weight * 0.975).toFixed(2)}`],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                      <span style={{ fontSize: 12, color: '#8BA898' }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: k === 'Net Payout' ? '#2D6A4F' : '#1B2E22' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Additional Notes (Optional)</label>
                <textarea className="form-textarea" placeholder="Harvested this week, sun-dried, ready to ship..." aria-label="Additional notes" style={{ height: 70 }} />
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={handleSubmit}
                disabled={!weight || !price || stage !== 'done'}
                style={{ width: '100%', justifyContent: 'center', opacity: (!weight || !price || stage !== 'done') ? 0.5 : 1 }}
                aria-label="Publish listing to marketplace"
              >
                {stage !== 'done' ? '📸 Upload photo first' : '🚀 Publish to Marketplace'}
              </button>
              {stage !== 'done' && (
                <p style={{ fontSize: 11, color: '#8BA898', textAlign: 'center', marginTop: 10 }}>
                  Photo analysis required before publishing
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MY LISTINGS TABLE
═══════════════════════════════════════════════════════════ */
const myListings = [
  { id: 'CD-4421', grade: 'W180', weight: 500, price: 4.85, status: 'Active', bids: 7, views: 234, date: '2026-04-28' },
  { id: 'CD-4388', grade: 'W320', weight: 1200, price: 3.60, status: 'Sold', bids: 12, views: 580, date: '2026-04-20' },
  { id: 'CD-4350', grade: 'W210', weight: 300, price: 4.20, status: 'Pending', bids: 3, views: 89, date: '2026-04-15' },
]

/* ═══════════════════════════════════════════════════════════
   DASHBOARD STATS
═══════════════════════════════════════════════════════════ */
const dashStats = [
  { icon: '📦', label: 'Active Listings', value: '3', sub: '+1 this week', color: '#2D6A4F' },
  { icon: '💰', label: 'Total Revenue', value: 'LKR 8,420', sub: 'This season', color: '#40916C' },
  { icon: '📈', label: 'Avg. Price', value: 'LKR 4.22/kg', sub: '+18% vs last year', color: '#52B788' },
  { icon: '⭐', label: 'Seller Rating', value: '4.9 / 5', sub: '47 reviews', color: '#E9C46A' },
]

/* ═══════════════════════════════════════════════════════════
   MAIN SELLER DASHBOARD PAGE
═══════════════════════════════════════════════════════════ */
export default function SellerDashboard() {
  const [activeTab, setActiveTab]       = useState('overview')
  const [verifyDone, setVerifyDone]     = useState(false)
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'verify',   label: 'Verification', icon: '🪪' },
    { id: 'list',     label: 'New Listing', icon: '➕' },
    { id: 'listings', label: 'My Listings', icon: '📦' },
  ]

  return (
    <div style={{ paddingTop: 68, minHeight: 'calc(100vh - 68px)' }}>
      <div className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div className="avatar avatar-lg" style={{ fontSize: 24 }}>👨‍🌾</div>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1B2E22', lineHeight: 1 }}>Seller Dashboard</h1>
                <div style={{ display: 'flex', gap: 8, marginTop: 5, alignItems: 'center' }}>
                  {verifyDone ? (
                    <span className="badge badge-green">✅ SOBA Verified</span>
                  ) : (
                    <span className="badge badge-amber">⚠️ Verification Pending</span>
                  )}
                  <span className="badge badge-blue">🔗 SOBA Network</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/marketplace" className="btn btn-ghost btn-sm">👁 View Marketplace</Link>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('list')}>+ New Listing</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Sidebar Nav */}
          <div className="glass-strong" style={{ padding: 16, position: 'sticky', top: 84 }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: activeTab === t.id
                    ? 'linear-gradient(135deg, rgba(45,106,79,0.12), rgba(82,183,136,0.08))'
                    : 'transparent',
                  color: activeTab === t.id ? '#2D6A4F' : '#6B8C78',
                  fontWeight: activeTab === t.id ? 700 : 500,
                  fontSize: 14,
                  transition: 'all 0.2s',
                  marginBottom: 4,
                  borderLeft: activeTab === t.id ? '3px solid #2D6A4F' : '3px solid transparent',
                }}
                aria-current={activeTab === t.id ? 'page' : undefined}
              >
                <span style={{ fontSize: 18 }}>{t.icon}</span> {t.label}
              </button>
            ))}

            <div className="divider" style={{ margin: '16px 0' }} />
            <div style={{
              background: 'linear-gradient(135deg, rgba(45,106,79,0.08), rgba(82,183,136,0.04))',
              borderRadius: 12, padding: '14px 14px',
              border: '1px solid rgba(82,183,136,0.18)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2D6A4F', marginBottom: 6 }}>💡 Quick Tip</div>
              <p style={{ fontSize: 11, color: '#6B8C78', lineHeight: 1.6 }}>
                Listings with AI-verified photos get <strong>3× more views</strong> and sell 40% faster.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18, marginBottom: 28 }}>
                  {dashStats.map((s, i) => (
                    <div key={i} className="glass-strong" style={{ padding: '22px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{ fontSize: 28 }}>{s.icon}</div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: s.color, background: `${s.color}18`, padding: '2px 8px', borderRadius: 20, border: `1px solid ${s.color}30` }}>
                          LIVE
                        </span>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 22, color: '#1B2E22', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#4A6B57', marginBottom: 3 }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: '#8BA898' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Verification Banner */}
                {!verifyDone && (
                  <div className="glass" style={{
                    padding: '20px 24px', marginBottom: 24,
                    background: 'linear-gradient(135deg, rgba(233,196,106,0.12), rgba(244,162,97,0.08))',
                    border: '1px solid rgba(233,196,106,0.3)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap',
                  }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{ fontSize: 32 }}>🪪</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22' }}>Complete SOBA Verification</div>
                        <div style={{ fontSize: 13, color: '#8BA898', marginTop: 3 }}>Verified sellers get 3× more buyer trust & can list unlimited products</div>
                      </div>
                    </div>
                    <button className="btn btn-accent btn-sm" onClick={() => setActiveTab('verify')}>Verify Now →</button>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="glass-strong" style={{ padding: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2E22', marginBottom: 18 }}>Recent Activity</div>
                  {[
                    { icon: '🔔', text: 'New bid on W180 listing from buyer in India', time: '2 min ago', color: '#3B82F6' },
                    { icon: '✅', text: 'Payment of LKR 1,400 released for CD-4388 (W320)', time: '1 hr ago', color: '#22C55E' },
                    { icon: '💬', text: 'Buyer message: "Can you ship to Lagos?"', time: '3 hrs ago', color: '#F59E0B' },
                    { icon: '🤖', text: 'AI quality report generated for new photo upload', time: '5 hrs ago', color: '#8B5CF6' },
                  ].map((a, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(82,183,136,0.08)' : 'none',
                    }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                        {a.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#1B2E22' }}>{a.text}</div>
                        <div style={{ fontSize: 11, color: '#8BA898', marginTop: 3 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VERIFY TAB */}
            {activeTab === 'verify' && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B2E22', marginBottom: 6 }}>SOBA Network Identity Verification</h2>
                  <p style={{ fontSize: 13, color: '#6B8C78' }}>
                    Complete KYC verification to unlock unlimited listings, buyer trust badges, and escrow protection.
                  </p>
                </div>
                <SOBAVerification onComplete={() => { setVerifyDone(true); setTimeout(() => setActiveTab('overview'), 600) }} />
              </div>
            )}

            {/* LIST TAB */}
            {activeTab === 'list' && (
              <div>
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B2E22', marginBottom: 6 }}>Create New Listing</h2>
                  <p style={{ fontSize: 13, color: '#6B8C78' }}>
                    Upload a photo — our AI will grade your cashews automatically and suggest a competitive price.
                  </p>
                </div>
                <div className="glass-strong" style={{ padding: 28 }}>
                  <AIListingTool />
                </div>
              </div>
            )}

            {/* LISTINGS TAB */}
            {activeTab === 'listings' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B2E22' }}>My Listings</h2>
                  <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('list')}>+ New Listing</button>
                </div>
                <div className="glass-strong" style={{ overflow: 'hidden' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(82,183,136,0.15)', background: 'rgba(82,183,136,0.04)' }}>
                          {['ID', 'Grade', 'Weight', 'Price', 'Status', 'Bids', 'Views', 'Date'].map(h => (
                            <th key={h} style={{ padding: '14px 18px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#8BA898', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {myListings.map((l, i) => (
                          <tr key={l.id} style={{ borderBottom: '1px solid rgba(82,183,136,0.08)', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(82,183,136,0.03)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <td style={{ padding: '16px 18px', fontSize: 13, fontWeight: 700, color: '#2D6A4F' }}>{l.id}</td>
                            <td style={{ padding: '16px 18px' }}>
                              <span className="badge badge-amber">{l.grade}</span>
                            </td>
                            <td style={{ padding: '16px 18px', fontSize: 13, color: '#4A6B57', fontWeight: 600 }}>{l.weight.toLocaleString()} kg</td>
                            <td style={{ padding: '16px 18px', fontSize: 13, color: '#1B2E22', fontWeight: 700 }}>LKR {l.price}/kg</td>
                            <td style={{ padding: '16px 18px' }}>
                              <span className={`badge ${l.status === 'Active' ? 'badge-green' : l.status === 'Sold' ? 'badge-blue' : 'badge-amber'}`}>
                                {l.status === 'Active' && '● '}
                                {l.status}
                              </span>
                            </td>
                            <td style={{ padding: '16px 18px', fontSize: 13, fontWeight: 600, color: l.bids > 5 ? '#E76F51' : '#4A6B57' }}>🏷️ {l.bids}</td>
                            <td style={{ padding: '16px 18px', fontSize: 13, color: '#8BA898' }}>👁 {l.views}</td>
                            <td style={{ padding: '16px 18px', fontSize: 12, color: '#8BA898' }}>{l.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
