import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════════════════ */
const allProducts = [
  { id: 'P001', grade: 'W180', seller: 'Kofi Mensah', location: 'Brong-Ahafo, Ghana', distance: 12, price: 4.85, weight: 500,  verified: true,  rating: 4.9, reviews: 47, disease: 'Free', harvest: '2026-04-20', img: '🥜' },
  { id: 'P002', grade: 'W210', seller: 'Amina Traoré', location: 'Bondoukou, CI',     distance: 45, price: 4.20, weight: 800,  verified: true,  rating: 4.8, reviews: 33, disease: 'Free', harvest: '2026-04-18', img: '🥜' },
  { id: 'P003', grade: 'W320', seller: 'Emmanuel Ade', location: 'Ogun State, NG',    distance: 89, price: 3.60, weight: 1200, verified: true,  rating: 4.7, reviews: 62, disease: 'Free', harvest: '2026-04-15', img: '🥜' },
  { id: 'P004', grade: 'W240', seller: 'Fatou Diallo',  location: 'Casamance, SN',    distance: 120,price: 3.95, weight: 400,  verified: false, rating: 4.2, reviews: 8,  disease: 'Free', harvest: '2026-04-22', img: '🥜' },
  { id: 'P005', grade: 'W180', seller: 'Joseph Okafor', location: 'Benue, Nigeria',   distance: 76, price: 4.90, weight: 650,  verified: true,  rating: 4.9, reviews: 29, disease: 'Free', harvest: '2026-04-25', img: '🥜' },
  { id: 'P006', grade: 'W320', seller: 'Grace Asante',  location: 'Eastern, Ghana',   distance: 33, price: 3.50, weight: 2000, verified: true,  rating: 4.6, reviews: 55, disease: 'Free', harvest: '2026-04-12', img: '🥜' },
  { id: 'P007', grade: 'W450', seller: 'Moussa Coulibaly', location: 'Sikasso, ML',   distance: 200,price: 2.85, weight: 3000, verified: true,  rating: 4.5, reviews: 41, disease: 'Free', harvest: '2026-04-10', img: '🥜' },
  { id: 'P008', grade: 'W210', seller: 'Nadia Boukari',  location: 'Atacora, Benin',  distance: 55, price: 4.10, weight: 300,  verified: false, rating: 4.0, reviews: 4,  disease: 'Flag', harvest: '2026-04-28', img: '🥜' },
  { id: 'P009', grade: 'W180', seller: 'Kwame Acheampong', location: 'Ashanti, GH',   distance: 18, price: 4.75, weight: 420,  verified: true,  rating: 4.8, reviews: 38, disease: 'Free', harvest: '2026-04-27', img: '🥜' },
]

const allAuctions = [
  { id: 'A001', grade: 'W180', seller: 'Farmers Co-op Kumasi', location: 'Kumasi, Ghana', currentBid: 4.65, weight: 5000, bids: 12, endsIn: 7200,  minBid: 4.50, verified: true },
  { id: 'A002', grade: 'W320', seller: 'Bondoukou Growers Ltd', location: 'Bondoukou, CI', currentBid: 3.40, weight: 8000, bids: 7,  endsIn: 14400, minBid: 3.20, verified: true },
  { id: 'A003', grade: 'W210', seller: 'Benue Valley Exports',  location: 'Makurdi, NG',   currentBid: 3.95, weight: 3500, bids: 5,  endsIn: 3600,  minBid: 3.80, verified: true },
]

/* ─── Timer Hook ─── */
function useCountdown(seconds) {
  const [remaining, setRemaining] = useState(seconds)
  useEffect(() => {
    const t = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = Math.floor(remaining / 3600)
  const m = Math.floor((remaining % 3600) / 60)
  const s = remaining % 60
  return `${h}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`
}

/* ─── Auction Card ─── */
function AuctionCard({ auction }) {
  const countdown = useCountdown(auction.endsIn)
  const [bidInput, setBidInput] = useState('')
  const [bidPlaced, setBidPlaced] = useState(false)
  const [myBid, setMyBid] = useState(auction.currentBid)

  const handleBid = () => {
    const v = parseFloat(bidInput)
    if (!v || v <= myBid) return
    setMyBid(v)
    setBidPlaced(true)
    setBidInput('')
    setTimeout(() => setBidPlaced(false), 3000)
  }

  const urgent = auction.endsIn < 3700

  return (
    <div className="glass-strong" style={{
      padding: 24,
      border: urgent ? '1.5px solid rgba(231,111,81,0.35)' : '1px solid rgba(255,255,255,0.55)',
      position: 'relative', overflow: 'hidden',
    }}>
      {urgent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, #E76F51, #F4A261)',
        }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <span className="badge badge-amber">{auction.grade}</span>
            {auction.verified && <span className="badge badge-green">✓ Verified Seller</span>}
            <span className="badge badge-coral">🔥 Live Auction</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: '#1B2E22' }}>{auction.seller}</div>
          <div style={{ fontSize: 12, color: '#8BA898', marginTop: 3 }}>📍 {auction.location} · {auction.weight.toLocaleString()} kg batch</div>
        </div>
        <div style={{
          background: urgent ? 'rgba(231,111,81,0.1)' : 'rgba(82,183,136,0.08)',
          border: `1px solid ${urgent ? 'rgba(231,111,81,0.3)' : 'rgba(82,183,136,0.2)'}`,
          borderRadius: 10, padding: '8px 12px', textAlign: 'center', flexShrink: 0,
        }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: urgent ? '#B83A20' : '#6B8C78', marginBottom: 3 }}>ENDS IN</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: urgent ? '#E76F51' : '#1B2E22', fontVariantNumeric: 'tabular-nums' }}>{countdown}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'rgba(45,106,79,0.06)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#8BA898' }}>Current Bid</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#2D6A4F', lineHeight: 1.2 }}>${myBid.toFixed(2)}<span style={{ fontSize: 12, fontWeight: 500, color: '#8BA898' }}>/kg</span></div>
          <div style={{ fontSize: 11, color: '#52B788', marginTop: 2 }}>Total: ${(myBid * auction.weight).toLocaleString()}</div>
        </div>
        <div style={{ background: 'rgba(233,196,106,0.08)', borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: '#8BA898' }}>Bids Placed</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#8B6914', lineHeight: 1.2 }}>{auction.bids + (bidPlaced ? 1 : 0)}</div>
          <div style={{ fontSize: 11, color: '#8BA898', marginTop: 2 }}>Min bid: ${auction.minBid}/kg</div>
        </div>
      </div>

      {bidPlaced && (
        <div className="alert alert-success" style={{ marginBottom: 12 }}>
          <span>🎉</span><span style={{ fontSize: 13 }}>Bid placed! You're the highest bidder at ${myBid.toFixed(2)}/kg.</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#8BA898', fontSize: 14, fontWeight: 600 }}>$</span>
          <input
            type="number" step="0.01"
            placeholder={`>${myBid.toFixed(2)}/kg`}
            value={bidInput}
            onChange={e => setBidInput(e.target.value)}
            className="form-input"
            style={{ paddingLeft: 26 }}
            aria-label="Your bid per kilogram"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleBid}
          disabled={!bidInput || parseFloat(bidInput) <= myBid}
          style={{ opacity: (!bidInput || parseFloat(bidInput) <= myBid) ? 0.5 : 1 }}
          aria-label="Place bid"
        >
          Place Bid
        </button>
      </div>
    </div>
  )
}

/* ─── Product Card ─── */
function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false)

  return (
    <div className="glass-strong" style={{
      padding: 22, transition: 'transform 0.22s, box-shadow 0.22s',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = '0 18px 50px rgba(31,100,70,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--glass-shadow-lg)'
      }}
    >
      {/* Image Placeholder */}
      <div style={{
        height: 140, borderRadius: 12, marginBottom: 16,
        background: 'linear-gradient(135deg, #D8F3DC, #B7E4C7, #95D5B2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 56, position: 'relative', overflow: 'hidden',
      }}>
        {product.img}
        <div style={{
          position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end',
        }}>
          <span className="badge badge-amber">{product.grade}</span>
          {product.verified && <span className="badge badge-green" style={{ fontSize: 10 }}>✓ Verified</span>}
        </div>
        {product.disease === 'Free' && (
          <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.85)', color: '#15803D', fontSize: 10 }}>
              🛡️ Disease-Free
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 3 }}>{product.seller}</div>
        <div style={{ fontSize: 12, color: '#8BA898', marginBottom: 8 }}>📍 {product.location} · {product.distance} km away</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#F4A261' }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#4A6B57' }}>{product.rating}</span>
          <span style={{ fontSize: 11, color: '#8BA898' }}>({product.reviews})</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#1B2E22', lineHeight: 1 }}>
              ${product.price}<span style={{ fontSize: 13, fontWeight: 500, color: '#8BA898' }}>/kg</span>
            </div>
            <div style={{ fontSize: 12, color: '#6B8C78', marginTop: 3 }}>{product.weight.toLocaleString()} kg available</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#8BA898', marginBottom: 3 }}>Total Value</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#2D6A4F' }}>${(product.price * product.weight).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="divider" style={{ margin: '0 0 14px' }} />

      <div style={{ display: 'flex', gap: 8 }}>
        <Link to="/checkout" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}
          aria-label={`Buy ${product.grade} from ${product.seller}`}>
          🛒 Buy Now
        </Link>
        <button
          className="btn btn-ghost btn-icon btn-sm"
          onClick={() => setInCart(c => !c)}
          aria-label={inCart ? 'Remove from watchlist' : 'Add to watchlist'}
          style={{ color: inCart ? '#E76F51' : '#8BA898', borderColor: inCart ? 'rgba(231,111,81,0.3)' : undefined }}
        >
          {inCart ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FILTER SIDEBAR
═══════════════════════════════════════════════════════════ */
function FilterSidebar({ filters, setFilters }) {
  const grades    = ['W180', 'W210', 'W240', 'W320', 'W450']
  const countries = ['Ghana', "Côte d'Ivoire", 'Nigeria', 'Senegal', 'Tanzania']

  const toggleGrade = (g) => {
    setFilters(f => ({
      ...f,
      grades: f.grades.includes(g) ? f.grades.filter(x => x !== g) : [...f.grades, g],
    }))
  }

  return (
    <div className="glass-strong" style={{ padding: 22, position: 'sticky', top: 84 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#1B2E22', marginBottom: 20 }}>🔍 Filter</div>

      {/* Geolocation Radius */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <label className="form-label" style={{ marginBottom: 0 }}>📍 Max Distance</label>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#2D6A4F' }}>{filters.radius} km</span>
        </div>
        <input type="range" min={10} max={500} step={10}
          value={filters.radius}
          onChange={e => setFilters(f => ({ ...f, radius: Number(e.target.value) }))}
          aria-label="Maximum distance in kilometers"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontSize: 10, color: '#8BA898' }}>10 km</span>
          <span style={{ fontSize: 10, color: '#8BA898' }}>500 km</span>
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { r: 50,  label: '< 50 km — Lowest freight' },
            { r: 150, label: '< 150 km — Regional' },
            { r: 500, label: 'Any distance' },
          ].map(opt => (
            <button key={opt.r} className={`chip ${filters.radius === opt.r ? 'active' : ''}`}
              style={{ justifyContent: 'flex-start', fontSize: 11 }}
              onClick={() => setFilters(f => ({ ...f, radius: opt.r }))}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Grade Filter */}
      <div style={{ marginBottom: 22 }}>
        <label className="form-label">🏷️ Cashew Grade</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {grades.map(g => (
            <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox"
                checked={filters.grades.includes(g)}
                onChange={() => toggleGrade(g)}
                aria-label={`Filter by grade ${g}`}
                style={{ accentColor: '#2D6A4F', width: 16, height: 16 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#4A6B57' }}>{g}</span>
                <span className="badge badge-amber" style={{ fontSize: 10 }}>
                  {allProducts.filter(p => p.grade === g).length}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Price Range */}
      <div style={{ marginBottom: 22 }}>
        <label className="form-label">💰 Price Range ($/kg)</label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input className="form-input" type="number" step="0.1" placeholder="Min"
            value={filters.priceMin} onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))}
            aria-label="Minimum price per kg" style={{ flex: 1 }}
          />
          <span style={{ color: '#8BA898', fontWeight: 600 }}>—</span>
          <input className="form-input" type="number" step="0.1" placeholder="Max"
            value={filters.priceMax} onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}
            aria-label="Maximum price per kg" style={{ flex: 1 }}
          />
        </div>
      </div>

      <div className="divider" />

      {/* Quality */}
      <div style={{ marginBottom: 22 }}>
        <label className="form-label">🛡️ Quality</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'verified', label: 'Verified Sellers Only' },
            { id: 'disease', label: 'Disease-Free Badge' },
          ].map(opt => (
            <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox"
                checked={filters[opt.id]}
                onChange={() => setFilters(f => ({ ...f, [opt.id]: !f[opt.id] }))}
                aria-label={opt.label}
                style={{ accentColor: '#2D6A4F', width: 16, height: 16 }}
              />
              <span style={{ fontSize: 13, fontWeight: 500, color: '#4A6B57' }}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        className="btn btn-outline btn-sm w-full"
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={() => setFilters({ radius: 500, grades: [], priceMin: '', priceMax: '', verified: false, disease: false })}
      >
        Clear All Filters
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN MARKETPLACE PAGE
═══════════════════════════════════════════════════════════ */
export default function Marketplace() {
  const [view, setView]     = useState('products') // products | auctions
  const [search, setSearch] = useState('')
  const [sort, setSort]     = useState('price-asc')
  const [filters, setFilters] = useState({
    radius: 500, grades: [], priceMin: '', priceMax: '', verified: false, disease: false,
  })

  const filtered = allProducts.filter(p => {
    if (search && !p.seller.toLowerCase().includes(search.toLowerCase()) &&
        !p.grade.toLowerCase().includes(search.toLowerCase()) &&
        !p.location.toLowerCase().includes(search.toLowerCase())) return false
    if (p.distance > filters.radius) return false
    if (filters.grades.length && !filters.grades.includes(p.grade)) return false
    if (filters.priceMin && p.price < parseFloat(filters.priceMin)) return false
    if (filters.priceMax && p.price > parseFloat(filters.priceMax)) return false
    if (filters.verified && !p.verified) return false
    if (filters.disease && p.disease !== 'Free') return false
    return true
  }).sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'weight')     return b.weight - a.weight
    if (sort === 'rating')     return b.rating - a.rating
    if (sort === 'distance')   return a.distance - b.distance
    return 0
  })

  return (
    <div style={{ paddingTop: 68 }}>
      {/* ── Page Header ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(45,106,79,0.07) 0%, rgba(82,183,136,0.04) 100%)',
        borderBottom: '1px solid rgba(82,183,136,0.15)',
        padding: '36px 0 28px',
      }}>
        <div className="container">
          {/* F-Pattern: most important info at the top-left */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B2E22', marginBottom: 6 }}>
                🥜 Cashew Marketplace
              </h1>
              <p style={{ fontSize: 14, color: '#6B8C78' }}>
                {filtered.length} verified listings · Avg. {((filtered.reduce((s,p) => s + p.price, 0) / (filtered.length || 1))).toFixed(2)} $/kg · Direct from farmers
              </p>
            </div>
            {/* View Toggle */}
            <div className="glass" style={{ display: 'flex', padding: 4, gap: 0, borderRadius: 12 }}>
              {[
                { id: 'products', label: '🛒 Shop', count: allProducts.length },
                { id: 'auctions', label: '🔥 Auctions', count: allAuctions.length },
              ].map(v => (
                <button key={v.id} onClick={() => setView(v.id)}
                  style={{
                    padding: '9px 18px', borderRadius: 9, border: 'none', cursor: 'pointer',
                    fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
                    background: view === v.id ? 'linear-gradient(135deg, #2D6A4F, #52B788)' : 'transparent',
                    color: view === v.id ? '#fff' : '#6B8C78',
                  }}
                  aria-pressed={view === v.id}
                >
                  {v.label}
                  <span style={{
                    marginLeft: 7, fontSize: 10, fontWeight: 700, padding: '1px 6px',
                    borderRadius: 10,
                    background: view === v.id ? 'rgba(255,255,255,0.25)' : 'rgba(82,183,136,0.15)',
                    color: view === v.id ? '#fff' : '#2D6A4F',
                  }}>{v.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search + Sort Bar */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="input-with-icon" style={{ flex: 1, minWidth: 220 }}>
              <span className="input-icon" style={{ fontSize: 14 }}>🔍</span>
              <input
                className="form-input"
                placeholder="Search by grade, seller, region…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search marketplace"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              />
            </div>
            <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}
              aria-label="Sort listings" style={{ width: 'auto', background: 'rgba(255,255,255,0.9)' }}>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="weight">Largest Batch</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="container" style={{ paddingTop: 28, paddingBottom: 60 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'start' }}>
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Main Content */}
          <div>
            {view === 'products' ? (
              <>
                {filtered.length === 0 ? (
                  <div className="glass" style={{ padding: '60px 40px', textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <h3 style={{ fontWeight: 700, fontSize: 18, color: '#1B2E22', marginBottom: 10 }}>No listings match your filters</h3>
                    <p style={{ fontSize: 13, color: '#6B8C78' }}>Try expanding the distance radius or removing some grade filters.</p>
                    <button className="btn btn-outline" style={{ marginTop: 20 }}
                      onClick={() => setFilters({ radius: 500, grades: [], priceMin: '', priceMax: '', verified: false, disease: false })}>
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </>
            ) : (
              <div>
                <div className="alert alert-warning" style={{ marginBottom: 24 }}>
                  <span>ℹ️</span>
                  <span style={{ fontSize: 13 }}>
                    Wholesale auctions are for buyers of <strong>1,000 kg+</strong>. Bids are binding and secured by smart-contract escrow. Winning buyer has 24h to confirm.
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {allAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
