import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Logo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
    <div style={{
      width: 40, height: 40,
      background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
      borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20, boxShadow: '0 4px 14px rgba(45,106,79,0.35)',
      flexShrink: 0,
    }}>🥜</div>
    <div>
      <div style={{ fontWeight: 800, fontSize: 18, color: '#1B2E22', lineHeight: 1, letterSpacing: '-0.02em' }}>
        Cashew<span style={{ color: '#40916C' }}>Direct</span>
      </div>
      <div style={{ fontSize: 10, color: '#8BA898', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 1 }}>
        Farm-to-Market
      </div>
    </div>
  </Link>
)

const navLinks = [
  { label: 'Marketplace', to: '/marketplace' },
  { label: 'Sell Cashews', to: '/sell' },
  { label: 'How It Works', to: '/#how-it-works' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const navStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    background: scrolled
      ? 'rgba(255,255,255,0.88)'
      : 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: scrolled
      ? '1px solid rgba(82,183,136,0.18)'
      : '1px solid rgba(255,255,255,0.4)',
    boxShadow: scrolled ? '0 4px 24px rgba(31,100,70,0.08)' : 'none',
  }

  const isActive = (to) => location.pathname === to

  return (
    <nav style={navStyle} role="navigation" aria-label="Main navigation">
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 68 }}>
        <Logo />

        {/* Desktop Links */}
        <div className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 40 }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: '8px 15px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                color: isActive(link.to) ? '#2D6A4F' : '#4A6B57',
                background: isActive(link.to) ? 'rgba(82,183,136,0.12)' : 'transparent',
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { if (!isActive(link.to)) e.currentTarget.style.background = 'rgba(82,183,136,0.07)' }}
              onMouseLeave={e => { if (!isActive(link.to)) e.currentTarget.style.background = 'transparent' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Live Indicator */}
        <div className="hide-md" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px',
          background: 'rgba(34,197,94,0.08)',
          borderRadius: 20,
          border: '1px solid rgba(34,197,94,0.2)',
          marginRight: 16,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#22C55E',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#15803D' }}>Live Market</span>
        </div>

        {/* Auth Buttons */}
        <div className="hide-sm" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link to="/marketplace"
            style={{
              padding: '9px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600,
              color: '#2D6A4F', background: 'transparent',
              border: '1.5px solid rgba(45,106,79,0.3)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(45,106,79,0.06)'
              e.currentTarget.style.borderColor = '#2D6A4F'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(45,106,79,0.3)'
            }}
          >Log In</Link>
          <Link to="/sell" className="btn btn-primary btn-sm" aria-label="Get started as a seller">
            Get Started
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hide-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          style={{
            background: 'rgba(255,255,255,0.8)',
            border: '1.5px solid rgba(82,183,136,0.2)',
            borderRadius: 10,
            padding: '8px 10px',
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(82,183,136,0.15)',
          padding: '16px 24px 24px',
          animation: 'fadeInUp 0.25s ease both',
        }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{
              display: 'block', padding: '12px 0',
              borderBottom: '1px solid rgba(82,183,136,0.1)',
              fontSize: 15, fontWeight: 600, color: '#2D6A4F',
              textDecoration: 'none',
            }}>{link.label}</Link>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            <Link to="/marketplace" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Log In</Link>
            <Link to="/sell" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
