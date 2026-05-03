import React, { useState } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════
   MOCK CART ITEM
═══════════════════════════════════════════════════════════ */
const cartItem = {
  id: 'P001',
  grade: 'W180',
  seller: 'Kofi Mensah',
  location: 'Brong-Ahafo, Ghana',
  price: 4.85,
  quantity: 200,
  verified: true,
  disease: 'Free',
  txHash: null,
}

/* ═══════════════════════════════════════════════════════════
   PAYMENT METHOD CARD
═══════════════════════════════════════════════════════════ */
function PaymentMethodCard({ method, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(method.id)}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(method.id)}
      style={{
        padding: '20px 22px',
        borderRadius: 14,
        border: selected
          ? `2px solid ${method.color}`
          : '2px solid rgba(82,183,136,0.18)',
        background: selected
          ? `linear-gradient(135deg, ${method.color}10, ${method.color}06)`
          : 'rgba(255,255,255,0.6)',
        cursor: 'pointer',
        transition: 'all 0.25s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {method.recommended && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '3px 10px', borderBottomLeftRadius: 10,
          letterSpacing: '0.05em',
        }}>
          ✓ RECOMMENDED
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Radio */}
        <div style={{
          width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          border: `2.5px solid ${selected ? method.color : 'rgba(82,183,136,0.3)'}`,
          background: selected ? method.color : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}>
          {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 24 }}>{method.icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22' }}>{method.title}</div>
              {method.subtitle && <div style={{ fontSize: 11, color: '#8BA898', marginTop: 1 }}>{method.subtitle}</div>}
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#6B8C78', lineHeight: 1.6, marginTop: 4 }}>{method.desc}</p>
          {method.tags && (
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {method.tags.map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
                  background: `${method.color}15`, color: method.color, border: `1px solid ${method.color}30` }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Expanded detail when selected */}
      {selected && method.form && (
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${method.color}25`, animation: 'fadeInUp 0.25s ease' }}>
          {method.form}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CARD FORM
═══════════════════════════════════════════════════════════ */
function CardForm() {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Card Number</label>
        <input className="form-input" placeholder="•••• •••• •••• ••••" maxLength={19} aria-label="Card number" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="form-group">
          <label className="form-label">Expiry Date</label>
          <input className="form-input" placeholder="MM / YY" maxLength={7} aria-label="Card expiry date" />
        </div>
        <div className="form-group">
          <label className="form-label">CVC</label>
          <input className="form-input" placeholder="•••" maxLength={4} aria-label="Card security code" />
        </div>
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Cardholder Name</label>
        <input className="form-input" placeholder="As it appears on card" aria-label="Cardholder name" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CRYPTO FORM
═══════════════════════════════════════════════════════════ */
function CryptoForm() {
  const [copied, setCopied] = useState(false)
  const address = '0x3f2a9cA1b8f44E7d9F0D123456789aBcDeF01234'

  const handleCopy = () => {
    navigator.clipboard.writeText(address).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {['USDC', 'USDT', 'ETH', 'MATIC'].map(c => (
          <span key={c} className="chip" style={{ fontSize: 11 }}>{c}</span>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Payment Wallet Address</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="form-input" value={address} readOnly aria-label="Payment wallet address"
            style={{ fontSize: 11, fontFamily: 'monospace', background: 'rgba(139,92,246,0.04)' }} />
          <button className="btn btn-ghost btn-sm" onClick={handleCopy} aria-label="Copy wallet address">
            {copied ? '✅' : '📋'}
          </button>
        </div>
      </div>
      <div className="alert alert-info" style={{ marginTop: 8 }}>
        <span>⚡</span>
        <span style={{ fontSize: 12 }}>Send exact amount to the escrow contract. Funds release automatically on delivery confirmation.</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN CHECKOUT PAGE  (Z-pattern layout)
═══════════════════════════════════════════════════════════ */
export default function Checkout() {
  const [payment, setPayment]       = useState('cod')
  const [stage, setStage]           = useState('form') // form | processing | done
  const [qty, setQty]               = useState(cartItem.quantity)
  const [promoCode, setPromoCode]   = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [shippingForm, setShippingForm] = useState({ name: '', address: '', city: '', country: '', phone: '' })

  const subtotal      = cartItem.price * qty
  const platformFee   = subtotal * 0.025
  const discount      = promoApplied ? subtotal * 0.05 : 0
  const shipping      = payment === 'cod' ? 0 : 0
  const total         = subtotal + platformFee - discount + shipping

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'farmer10') setPromoApplied(true)
    else alert('Invalid promo code. Try FARMER10')
  }

  const handleConfirm = () => {
    setStage('processing')
    setTimeout(() => setStage('done'), 3000)
  }

  const paymentMethods = [
    {
      id: 'cod',
      icon: '💵',
      title: 'Cash on Delivery',
      subtitle: 'Ideal for local / first-time transactions',
      desc: 'Pay in cash when the cashews arrive. Funds are held in smart-contract escrow and only released to the farmer on your confirmation.',
      color: '#2D6A4F',
      recommended: true,
      tags: ['Most Trusted', 'Escrow Protected', 'Zero Fees'],
    },
    {
      id: 'card',
      icon: '💳',
      title: 'Debit / Credit Card',
      subtitle: 'Visa, Mastercard, Verve',
      desc: 'Instant payment via secure card processing. Funds held in escrow and released on delivery confirmation.',
      color: '#3B82F6',
      tags: ['Instant', 'Secure', '256-bit SSL'],
      form: <CardForm />,
    },
    {
      id: 'crypto',
      icon: '₿',
      title: 'Crypto Payment',
      subtitle: 'USDC, USDT, ETH, MATIC',
      desc: 'For B2B wholesale transactions. Send stablecoins directly to the smart-contract escrow. Auto-releases on delivery.',
      color: '#8B5CF6',
      tags: ['B2B / Wholesale', 'On-Chain', 'Smart Contract'],
      form: <CryptoForm />,
    },
  ]

  /* ── Order stages used only on the confirmation screen ── */
  const orderStages = [
    {
      key:   'received',
      icon:  '✅',
      label: 'Order Received',
      sub:   'Confirmed & escrow locked',
      active: true,
      done:   true,
    },
    {
      key:   'processing',
      icon:  '⚙️',
      label: 'Processing',
      sub:   'Seller preparing batch',
      active: true,
      done:   false,
    },
    {
      key:   'dispatched',
      icon:  '🚚',
      label: 'Dispatched',
      sub:   'En route to buyer',
      active: false,
      done:   false,
    },
  ]

  if (stage === 'done') {
    return (
      <div style={{ paddingTop: 68, minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: 620, margin: '40px auto', textAlign: 'center' }}>
          <div className="glass-strong" style={{ padding: '52px 40px' }}>
            <div style={{ fontSize: 64, marginBottom: 16, animation: 'scaleIn 0.5s ease' }}>🎉</div>
            <h2 style={{ fontWeight: 800, fontSize: 26, color: '#1B2E22', marginBottom: 10 }}>Order Confirmed!</h2>
            <p style={{ fontSize: 14, color: '#6B8C78', marginBottom: 28, lineHeight: 1.7 }}>
              Your order of <strong>{qty} kg of W180 cashews</strong> from Kofi Mensah has been confirmed.
              The total of <strong>${total.toFixed(2)}</strong> is locked in escrow.
            </p>

            {/* ── Order Stage Tracker ── */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(45,106,79,0.07), rgba(82,183,136,0.04))',
              border: '1px solid rgba(82,183,136,0.22)',
              borderRadius: 18, padding: '24px 28px', marginBottom: 28, textAlign: 'left',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2E22', marginBottom: 22 }}>
                📦 Order Status
              </div>

              {/* Stage Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>

                {/* Connector track behind the circles */}
                <div style={{
                  position: 'absolute',
                  top: 21,
                  left: 21,
                  right: 21,
                  height: 3,
                  background: 'rgba(82,183,136,0.15)',
                  borderRadius: 2,
                  zIndex: 0,
                }} />
                {/* Active fill — covers first two segments (received + processing) */}
                <div style={{
                  position: 'absolute',
                  top: 21,
                  left: 21,
                  width: 'calc(50% - 0px)',
                  height: 3,
                  background: 'linear-gradient(90deg, #2D6A4F, #52B788)',
                  borderRadius: 2,
                  zIndex: 1,
                  transition: 'width 1s ease',
                }} />

                {orderStages.map((s, i) => (
                  <div key={s.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>

                    {/* Circle */}
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                      background: s.done
                        ? 'linear-gradient(135deg, #2D6A4F, #40916C)'
                        : s.active
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.6)',
                      border: s.done
                        ? 'none'
                        : s.active
                          ? '2.5px solid #40916C'
                          : '2.5px solid rgba(82,183,136,0.25)',
                      boxShadow: s.done
                        ? '0 4px 16px rgba(45,106,79,0.35)'
                        : s.active
                          ? '0 0 0 5px rgba(82,183,136,0.14)'
                          : 'none',
                      transition: 'all 0.4s ease',
                      marginBottom: 12,
                      flexShrink: 0,
                    }}>
                      {/* Pulse ring on active-but-not-done stage */}
                      {s.active && !s.done && (
                        <div style={{
                          position: 'absolute', width: 56, height: 56, borderRadius: '50%',
                          border: '2px solid rgba(64,145,108,0.35)',
                          animation: 'pulse 2s ease-in-out infinite',
                        }} />
                      )}
                      {s.icon}
                    </div>

                    {/* Labels */}
                    <div style={{
                      textAlign: 'center',
                      fontWeight: s.active ? 700 : 500,
                      fontSize: 13,
                      color: s.active ? '#1B2E22' : '#B0C9BB',
                      lineHeight: 1.3,
                      marginBottom: 3,
                    }}>
                      {s.label}
                    </div>
                    <div style={{
                      fontSize: 11, textAlign: 'center',
                      color: s.active ? '#6B8C78' : '#B0C9BB',
                      lineHeight: 1.4,
                    }}>
                      {s.active ? s.sub : '—'}
                    </div>

                    {/* "Current" pill on the active in-progress stage */}
                    {s.active && !s.done && (
                      <div style={{
                        marginTop: 8, fontSize: 10, fontWeight: 700,
                        padding: '3px 10px', borderRadius: 20,
                        background: 'rgba(64,145,108,0.12)',
                        color: '#2D6A4F',
                        border: '1px solid rgba(64,145,108,0.25)',
                        animation: 'pulse 2.5s ease-in-out infinite',
                      }}>
                        Current
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{
              background: 'rgba(45,106,79,0.05)', borderRadius: 14, padding: '20px 22px',
              border: '1px solid rgba(82,183,136,0.18)', marginBottom: 24, textAlign: 'left',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2E22', marginBottom: 12 }}>📋 Order Details</div>
              {[
                ['Order ID',      `CD-${Date.now().toString().slice(-6)}`],
                ['Seller',        'Kofi Mensah · Brong-Ahafo, Ghana'],
                ['Product',       `W180 Cashews · ${qty} kg`],
                ['Payment',       payment === 'cod' ? 'Cash on Delivery (Escrow)' : payment === 'card' ? 'Card Payment' : 'Crypto (USDC)'],
                ['Escrow Status', '🔒 Funds Locked — releases on your confirmation'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(82,183,136,0.08)', gap: 12 }}>
                  <span style={{ fontSize: 13, color: '#8BA898', flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2E22', textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="alert alert-success" style={{ marginBottom: 24, textAlign: 'left' }}>
              <span style={{ fontSize: 20 }}>🔗</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Transaction Recorded on SOBA Network</div>
                <div style={{ fontSize: 11, marginTop: 3, wordBreak: 'break-all', opacity: 0.8 }}>
                  TX: 0x3f2a9c{Math.random().toString(16).slice(2, 16)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/marketplace" className="btn btn-outline">← Continue Shopping</Link>
              <Link to="/sell" className="btn btn-primary">View Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 68 }}>
      <div className="container" style={{ paddingTop: 32, paddingBottom: 60 }}>
        {/* Page Header — Z start */}
        <div style={{ marginBottom: 32 }}>
          <Link to="/marketplace" style={{ fontSize: 13, color: '#8BA898', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            ← Back to Marketplace
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1B2E22' }}>Secure Checkout</h1>
          <p style={{ fontSize: 13, color: '#6B8C78', marginTop: 4 }}>
            Protected by SOBA escrow · 2.5% platform fee · 256-bit SSL
          </p>
        </div>

        {/* Z-pattern: single column becomes 2-col on wide screens */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, alignItems: 'start' }}>

          {/* ── LEFT: Form ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Product Summary */}
            <div className="glass-strong" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 18 }}>🥜 Your Order</div>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 14, flexShrink: 0,
                  background: 'linear-gradient(135deg, #D8F3DC, #95D5B2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
                }}>🥜</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                    <span className="badge badge-amber">W180</span>
                    {cartItem.verified && <span className="badge badge-green">✓ Verified</span>}
                    <span className="badge badge-green">🛡️ Disease-Free</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2E22' }}>Premium W180 Cashews</div>
                  <div style={{ fontSize: 13, color: '#8BA898', marginTop: 3 }}>By {cartItem.seller} · 📍 {cartItem.location}</div>
                </div>
              </div>

              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Quantity (kg)</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setQty(q => Math.max(50, q - 50))} aria-label="Decrease quantity by 50 kg">−</button>
                    <input type="number" className="form-input"
                      value={qty} min={50}
                      onChange={e => setQty(Math.max(50, Number(e.target.value)))}
                      aria-label="Order quantity in kilograms"
                      style={{ textAlign: 'center', width: 100, fontWeight: 700 }}
                    />
                    <button className="btn btn-ghost btn-sm" onClick={() => setQty(q => q + 50)} aria-label="Increase quantity by 50 kg">+</button>
                    <span style={{ fontSize: 13, color: '#8BA898' }}>kg</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#8BA898', marginBottom: 3 }}>Unit Price</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: '#1B2E22' }}>
                    ${cartItem.price.toFixed(2)}<span style={{ fontSize: 13, fontWeight: 500, color: '#8BA898' }}>/kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="glass-strong" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 18 }}>📦 Delivery Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Your full name" aria-label="Full name"
                    value={shippingForm.name} onChange={e => setShippingForm({ ...shippingForm, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" placeholder="+1 234 567 8900" aria-label="Phone number"
                    value={shippingForm.phone} onChange={e => setShippingForm({ ...shippingForm, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input className="form-input" placeholder="Street address, warehouse, or port" aria-label="Delivery address"
                  value={shippingForm.address} onChange={e => setShippingForm({ ...shippingForm, address: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-input" placeholder="City" aria-label="City"
                    value={shippingForm.city} onChange={e => setShippingForm({ ...shippingForm, city: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select className="form-select" aria-label="Country"
                    value={shippingForm.country} onChange={e => setShippingForm({ ...shippingForm, country: e.target.value })}>
                    <option value="">— Select —</option>
                    {['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Netherlands', 'Japan', 'China', 'Brazil'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="glass-strong" style={{ padding: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 18 }}>
                💳 Payment Method
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {paymentMethods.map(m => (
                  <PaymentMethodCard key={m.id} method={m} selected={payment === m.id} onSelect={setPayment} />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div style={{ position: 'sticky', top: 84 }}>
            <div className="glass-strong" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 20 }}>💰 Order Summary</div>

              {/* Line Items */}
              {[
                { label: `W180 Cashews × ${qty} kg`, value: `$${subtotal.toFixed(2)}` },
                { label: '📦 Shipping', value: 'Negotiated with seller' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
                  <span style={{ fontSize: 13, color: '#6B8C78' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2E22' }}>{value}</span>
                </div>
              ))}

              {/* Platform Fee */}
              <div style={{ padding: '10px 0', borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 13, color: '#6B8C78' }}>Platform Fee (2.5%)</span>
                    <div style={{ fontSize: 10, color: '#52B788', marginTop: 2 }}>✓ Covers escrow & blockchain record</div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2E22' }}>${platformFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo */}
              <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(82,183,136,0.08)' }}>
                {!promoApplied ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="form-input" placeholder="Promo code" value={promoCode}
                      onChange={e => setPromoCode(e.target.value.toUpperCase())} aria-label="Promo code"
                      style={{ flex: 1 }} />
                    <button className="btn btn-ghost btn-sm" onClick={handleApplyPromo}>Apply</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#15803D', fontWeight: 600 }}>✅ FARMER10 applied!</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#15803D' }}>−${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0' }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: '#1B2E22' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#2D6A4F' }}>${total.toFixed(2)}</span>
              </div>

              <div style={{ fontSize: 10, color: '#8BA898', marginTop: 4, textAlign: 'right' }}>
                USD · Escrow-protected
              </div>
            </div>

            {/* Escrow Trust Card */}
            <div className="glass" style={{
              padding: '16px 18px', marginBottom: 16,
              background: 'linear-gradient(135deg, rgba(45,106,79,0.08), rgba(82,183,136,0.05))',
              border: '1px solid rgba(82,183,136,0.25)',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>🔐</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1B2E22', marginBottom: 4 }}>
                    Escrow Protection Active
                  </div>
                  <p style={{ fontSize: 11, color: '#6B8C78', lineHeight: 1.6 }}>
                    Your payment is locked in a SOBA smart contract and released to the farmer <strong>only after you confirm delivery</strong>. Full dispute resolution included.
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    {['Buyer Protected', 'On-Chain', 'Disputable'].map(t => (
                      <span key={t} style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        background: 'rgba(45,106,79,0.12)', color: '#2D6A4F', border: '1px solid rgba(45,106,79,0.2)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '16px' }}
              onClick={handleConfirm}
              disabled={stage === 'processing'}
              aria-label="Confirm and place order"
            >
              {stage === 'processing' ? (
                <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Processing…</>
              ) : (
                `🔒 Confirm Order · $${total.toFixed(2)}`
              )}
            </button>

            <p style={{ fontSize: 10, color: '#8BA898', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
              By confirming, you agree to the CashewDirect Terms of Service and escrow conditions.
              Transaction recorded on the SOBA Network blockchain.
            </p>

            {/* Trust Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
              {[
                { icon: '🔒', label: '256-bit SSL' },
                { icon: '⛓️', label: 'Blockchain Verified' },
                { icon: '🛡️', label: 'SOBA Protected' },
                { icon: '🤝', label: 'Dispute Cover' },
              ].map(b => (
                <div key={b.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 12px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(82,183,136,0.15)',
                }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: '#4A6B57' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
