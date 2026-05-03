import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(82,183,136,0.15)',
      padding: '56px 0 32px',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38,
                background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>🥜</div>
              <span style={{ fontWeight: 800, fontSize: 17, color: '#1B2E22' }}>
                Cashew<span style={{ color: '#40916C' }}>Direct</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#6B8C78', lineHeight: 1.7, maxWidth: 220 }}>
              Empowering farmers with AI and blockchain technology. Fair prices, direct connections, verified trust.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {['𝕏', 'in', 'fb'].map(s => (
                <div key={s} style={{
                  width: 34, height: 34,
                  background: 'rgba(82,183,136,0.1)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#2D6A4F',
                  cursor: 'pointer', border: '1px solid rgba(82,183,136,0.18)',
                }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1B2E22', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Marketplace
            </h4>
            {['Browse Cashews', 'Wholesale Auctions', 'Price Tracker', 'Geolocation Search', 'Quality Grades'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link to="/marketplace" style={{ fontSize: 13, color: '#6B8C78', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2D6A4F'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B8C78'}
                >{item}</Link>
              </div>
            ))}
          </div>

          {/* Sellers */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1B2E22', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Farmers
            </h4>
            {['Start Selling', 'Identity Verification', 'AI Listing Tool', 'Seller Dashboard', 'Cooperative Accounts'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <Link to="/sell" style={{ fontSize: 13, color: '#6B8C78', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2D6A4F'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B8C78'}
                >{item}</Link>
              </div>
            ))}
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1B2E22', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Trust & Safety
            </h4>
            {['Blockchain Verification', 'Escrow Protection', 'SOBA Network', 'Dispute Resolution', 'Privacy Policy'].map(item => (
              <div key={item} style={{ marginBottom: 10 }}>
                <a href="#" style={{ fontSize: 13, color: '#6B8C78', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2D6A4F'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B8C78'}
                >{item}</a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(82,183,136,0.2), transparent)', marginBottom: 24 }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#8BA898' }}>
            © 2026 CashewDirect. Powered by SOBA Network & AI Vision. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {['Terms', 'Privacy', 'Cookies'].map(t => (
              <a key={t} href="#" style={{ fontSize: 12, color: '#8BA898', textDecoration: 'none' }}>{t}</a>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 12, color: '#15803D', fontWeight: 600 }}>System Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
