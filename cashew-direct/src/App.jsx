import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import SellerDashboard from './pages/SellerDashboard'
import Marketplace from './pages/Marketplace'
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"            element={<Landing />} />
            <Route path="/sell"        element={<SellerDashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/checkout"    element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
