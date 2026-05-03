import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ── Live Price Ticker ── */
const tickerItems = [
  { label: 'W180 Premium', price: '$4.85/kg', change: '+12%', region: 'Côte d\'Ivoire' },
  { label: 'W210 Grade A',  price: '$4.20/kg', change: '+8%',  region: 'Ghana' },
  { label: 'W320 Standard', price: '$3.60/kg', change: '+5%',  region: 'Nigeria' },
  { label: 'W450 Economy',  price: '$2.90/kg', change: '+3%',  region: 'Benin' },
  { label: 'Organic W180', price: '$5.40/kg', change: '+18%', region: 'Senegal' },
  { label: 'W240 Special',  price: '$4.05/kg', change: '+9%',  region: 'Togo' },
  { label: 'W320 Bulk',     price: '$3.45/kg', change: '+6%',  region: 'Tanzania' },
  { label: 'W180 Direct',   price: '$4.90/kg', change: '+14%', region: 'Mozambique' },
]

function PriceTicker() {
  const doubled = [...tickerItems, ...tickerItems]
  return (
    <div style={{
      background: 'rgba(27,67,50,0.96)',
      padding: '10px 0',
      overflow: 'hidden',
      position: 'relative',
      borderBottom: '1px solid rgba(82,183,136,0.3)',
    }}>
      <div style={{
        display: 'flex',
        gap: 0,
        animation: 'ticker 38s linear infinite',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 32px',
            borderRight: '1px solid rgba(82,183,136,0.2)',
          }}>
            <span style={{ fontSize: 11, color: '#74C69D', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
            <span style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{item.price}</span>
            <span style={{ fontSize: 11, color: '#95D5B2', fontWeight: 600 }}>▲ {item.change} vs market</span>
            <span style={{ fontSize: 11, color: '#4A6B57' }}>· {item.region}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Animated Counter ── */
function AnimCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

/* ── Stats Section ── */
const stats = [
  { icon: '👨‍🌾', value: 12400, suffix: '+', label: 'Verified Farmers', sub: 'Across 14 countries' },
  { icon: '📦', value: 8200,  suffix: ' tons', label: 'Volume Traded', sub: 'This season' },
  { icon: '💰', value: 38,    suffix: '%',   label: 'Avg. Price Uplift', sub: 'vs traditional brokers' },
  { icon: '⚡', value: 24,    suffix: 'hrs',  label: 'Avg. Settlement', sub: 'Escrow release time' },
]

/* ── How It Works ── */
const steps = [
  {
    icon: '🪪',
    step: '01',
    title: 'Verify Your Identity',
    desc: 'Complete SOBA Network KYC in minutes. Upload your national ID and farm location — blockchain-anchored for life.',
    color: '#2D6A4F',
  },
  {
    icon: '📸',
    step: '02',
    title: 'List with AI Assistance',
    desc: 'Upload a photo of your cashews. Our AI instantly grades quality (W180–W450), detects diseases, and suggests a competitive price.',
    color: '#40916C',
  },
  {
    icon: '🤝',
    step: '03',
    title: 'Sell Direct, Get Paid Fast',
    desc: 'Buyers discover you via geolocation. Funds held in smart-contract escrow and released within 24 hours of delivery.',
    color: '#52B788',
  },
]

/* ── Features ── */
const features = [
  { icon: '🤖', title: 'AI Quality Grading', desc: 'Computer vision automatically classifies W180–W450 grades and flags diseases in seconds.' },
  { icon: '⛓️', title: 'Blockchain Trust', desc: 'Every listing, bid, and payment is immutably recorded on the SOBA Network ledger.' },
  { icon: '📍', title: 'Geolocation Discovery', desc: 'Buyers set a radius to find nearby sellers and minimise freight costs.' },
  { icon: '🔒', title: 'Escrow Protection', desc: 'Smart-contract escrow holds funds until delivery is confirmed by both parties.' },
  { icon: '🏦', title: 'Flexible Payments', desc: 'Accept card, cash on delivery, or crypto — whichever works for your community.' },
  { icon: '📊', title: 'Live Price Intelligence', desc: 'Real-time market data helps farmers price competitively against global benchmarks.' },
]

/* ── Testimonials ── */
const testimonials = [
  {
    name: 'Kofi Mensah',
    role: 'Cashew Farmer, Ghana',
    text: 'Before CashewDirect, I sold my entire harvest to a single middleman for $2.10/kg. Last season I averaged $3.80/kg selling to 7 different buyers directly. My family\'s income doubled.',
    avatar: 'KM',
    stars: 5,
    improvement: '+81% income',
  },
  {
    name: 'Amina Traoré',
    role: 'Cooperative Leader, Côte d\'Ivoire',
    text: 'The AI grading tool is a game-changer. Our cooperative used to argue over grades with buyers. Now the AI report is the final word — buyers trust it and we get fair prices every time.',
    avatar: 'AT',
    stars: 5,
    improvement: '+42% price',
  },
  {
    name: 'Raj Patel',
    role: 'Wholesale Buyer, India',
    text: 'I source over 200 tonnes per season through CashewDirect. The verified quality scores, direct farmer contact, and escrow payment give me the confidence to buy without physical inspection.',
    avatar: 'RP',
    stars: 5,
    improvement: '−18% costs',
  },
]

export default function Landing() {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrentStat(s => (s + 1) % stats.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ paddingTop: 68 }}>
      <PriceTicker />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section style={{
        minHeight: 'calc(100vh - 108px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 0 80px',
      }}>
        {/* Background blobs */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(82,183,136,0.14) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', left: '-8%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(233,196,106,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left — Text */}
          <div className="anim-fade-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span className="badge badge-green">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s ease-in-out infinite' }} />
                SOBA Network Verified
              </span>
              <span className="badge badge-amber">🤖 AI-Powered</span>
            </div>

            <h1 className="display-font" style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              color: '#1B2E22',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}>
              From{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Farm to Market
              </span>
              <br />Direct &amp; Fair 🥜
            </h1>

            <p style={{ fontSize: 17, color: '#4A6B57', lineHeight: 1.75, maxWidth: 500, marginBottom: 36 }}>
              CashewDirect eliminates exploitative middlemen. AI grades your produce, blockchain verifies every trade, and buyers bid competitively — so farmers earn what they deserve.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
              <Link to="/sell" className="btn btn-primary btn-lg" aria-label="Start selling your cashews">
                🌱 Start Selling
              </Link>
              <Link to="/marketplace" className="btn btn-ghost btn-lg" aria-label="Browse cashews on the marketplace">
                🔍 Browse Cashews
              </Link>
            </div>

            {/* Mini Stats Row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[
                { icon: '👨‍🌾', val: '12,400+', label: 'Farmers' },
                { icon: '💰', val: '38%', label: 'More Income' },
                { icon: '⚡', val: '24 hrs', label: 'Payout' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{
                    width: 40, height: 40,
                    background: 'rgba(82,183,136,0.1)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, border: '1px solid rgba(82,183,136,0.18)',
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#1B2E22', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: '#8BA898', marginTop: 2 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="anim-fade-up delay-2 hide-sm" style={{ position: 'relative' }}>
            {/* Main Glass Card */}
            <div className="glass-strong anim-float" style={{ padding: 28, position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 13, color: '#8BA898', fontWeight: 500 }}>AI-Verified Listing</div>
                  <div style={{ fontWeight: 800, fontSize: 20, color: '#1B2E22', marginTop: 2 }}>Premium W180 Cashews</div>
                </div>
                <div style={{ fontSize: 36 }}>🥜</div>
              </div>

              {/* Grade Badges */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <span className="badge badge-green">✓ W180 Grade</span>
                <span className="badge badge-amber">⭐ Disease-Free</span>
                <span className="badge badge-blue">🔗 On-Chain</span>
              </div>

              {/* Price Display */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(45,106,79,0.08), rgba(82,183,136,0.05))',
                borderRadius: 14,
                padding: '14px 18px',
                marginBottom: 18,
                border: '1px solid rgba(82,183,136,0.15)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#8BA898' }}>Asking Price</div>
                    <div style={{ fontWeight: 800, fontSize: 28, color: '#1B2E22' }}>$4.85<span style={{ fontSize: 14, fontWeight: 500, color: '#6B8C78' }}>/kg</span></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#8BA898' }}>vs. Middleman</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#22C55E' }}>+$1.60 ▲ 49%</div>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: '#8BA898' }}>Farmer Earnings</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#2D6A4F' }}>$4.73/kg after 2.5% fee</span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: '88%' }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#8BA898', marginTop: 4 }}>Farmer keeps 97.5% of sale price</div>
                </div>
              </div>

              {/* Seller Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="avatar">KO</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1B2E22' }}>Kwame Owusu</div>
                  <div style={{ fontSize: 12, color: '#8BA898' }}>📍 Brong-Ahafo, Ghana · 500 kg available</div>
                </div>
                <Link to="/marketplace" className="btn btn-primary btn-sm">View</Link>
              </div>
            </div>

            {/* Floating Mini Cards */}
            <div className="glass" style={{
              position: 'absolute', top: -20, left: -40,
              padding: '12px 16px', zIndex: 3,
              animation: 'float 5s ease-in-out infinite',
              animationDelay: '1s',
              minWidth: 160,
            }}>
              <div style={{ fontSize: 11, color: '#8BA898', marginBottom: 3 }}>Live Auction</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2E22' }}>2.5 tons W320</div>
              <div style={{ fontSize: 12, color: '#E76F51', fontWeight: 600 }}>🔥 7 bids · 2h left</div>
            </div>

            <div className="glass" style={{
              position: 'absolute', bottom: -16, right: -30,
              padding: '12px 16px', zIndex: 3,
              animation: 'float 4.5s ease-in-out infinite',
              animationDelay: '0.5s',
              minWidth: 170,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#1B2E22' }}>Payment Released</div>
                  <div style={{ fontSize: 12, color: '#22C55E' }}>$2,425 → Kofi M.</div>
                </div>
              </div>
            </div>

            <div className="glass" style={{
              position: 'absolute', top: '40%', right: -45,
              padding: '12px 16px', zIndex: 3,
              animation: 'float 3.8s ease-in-out infinite',
              animationDelay: '2s',
            }}>
              <div style={{ fontSize: 11, color: '#8BA898' }}>AI Quality Score</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#2D6A4F' }}>98.2<span style={{ fontSize: 12 }}>/100</span></div>
              <div style={{ fontSize: 11, color: '#52B788' }}>🤖 Grade: W180</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════ */}
      <section className="section-sm" style={{ background: 'rgba(255,255,255,0.5)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}>
            {stats.map((s, i) => (
              <div key={i} className="glass" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
                <div style={{
                  fontWeight: 800, fontSize: 32, color: '#1B2E22', lineHeight: 1,
                  background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  marginBottom: 6,
                }}>
                  <AnimCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: '#8BA898' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="badge badge-green" style={{ marginBottom: 14 }}>Simple Process</span>
            <h2 className="display-font" style={{ marginBottom: 14 }}>
              How CashewDirect Works
            </h2>
            <p style={{ fontSize: 16, color: '#6B8C78', maxWidth: 520, margin: '0 auto' }}>
              From field to payment in three transparent steps — no hidden fees, no middlemen, no surprises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, position: 'relative' }}>
            {/* Connector Line */}
            <div className="hide-sm" style={{
              position: 'absolute', top: '22%', left: '18%', right: '18%',
              height: 2,
              background: 'linear-gradient(90deg, #2D6A4F, #52B788, #2D6A4F)',
              zIndex: 0, borderRadius: 2,
            }} />

            {steps.map((step, i) => (
              <div key={i} className="glass" style={{ padding: '36px 28px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  position: 'absolute', top: -14, left: 28,
                  background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                  color: '#fff', fontWeight: 800, fontSize: 11,
                  padding: '4px 12px', borderRadius: 20, letterSpacing: '0.05em',
                }}>
                  STEP {step.step}
                </div>
                <div style={{
                  width: 60, height: 60,
                  background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                  border: `2px solid ${step.color}30`,
                  borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 20,
                }}>{step.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: '#6B8C78', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link to="/sell" className="btn btn-primary btn-lg">
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.45)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge badge-amber" style={{ marginBottom: 14 }}>Platform Features</span>
            <h2 className="display-font">Everything You Need to Trade Fairly</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="glass" style={{
                padding: '28px 24px', display: 'flex', gap: 18, alignItems: 'flex-start',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 50px rgba(31,100,70,0.14)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'var(--glass-shadow)'
                }}
              >
                <div style={{
                  width: 52, height: 52, flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(82,183,136,0.15), rgba(45,106,79,0.08))',
                  borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, border: '1px solid rgba(82,183,136,0.2)',
                }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: '#1B2E22', marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#6B8C78', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge badge-blue" style={{ marginBottom: 14 }}>Real Stories</span>
            <h2 className="display-font">Farmers &amp; Buyers Love CashewDirect</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="glass" style={{ padding: '32px 28px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(34,197,94,0.08)', borderRadius: 20,
                  padding: '6px 14px', marginBottom: 20,
                  border: '1px solid rgba(34,197,94,0.2)',
                }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#15803D' }}>{t.improvement}</span>
                </div>
                <p style={{ fontSize: 14, color: '#4A6B57', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div className="divider" style={{ margin: '0 0 20px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar">{t.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#1B2E22' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#8BA898' }}>{t.role}</div>
                  </div>
                  <div style={{ color: '#F4A261', fontSize: 14 }}>{'★'.repeat(t.stars)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="section-sm">
        <div className="container">
          <div className="glass-strong" style={{
            padding: '64px 48px', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(45,106,79,0.92) 0%, rgba(27,67,50,0.95) 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 260, height: 260,
              background: 'radial-gradient(circle, rgba(82,183,136,0.25) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: -40, left: -40,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(233,196,106,0.18) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />

            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.12)', borderRadius: 20,
              padding: '6px 16px', marginBottom: 20,
              border: '1px solid rgba(255,255,255,0.2)',
              fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
            }}>
              🚀 Join 12,400+ farmers today
            </span>

            <h2 className="display-font" style={{ color: '#fff', marginBottom: 16, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Ready to Earn What Your Harvest Deserves?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
              Sign up free, get verified in 24 hours, and start receiving competitive bids directly from buyers worldwide.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/sell" className="btn btn-accent btn-lg">
                🌱 I'm a Farmer — Start Selling
              </Link>
              <Link to="/marketplace" className="btn" style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
                padding: '16px 28px',
                borderRadius: 'var(--r-lg)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
              }}>
                🛒 I'm a Buyer — Browse
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
