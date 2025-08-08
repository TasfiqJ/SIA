import React from 'react'
import './App.css'
import Navbar from './components/Navigation/Navbar'
import Hero from './components/Hero/Hero'
import EventsNews from './components/EventsNews/EventsNews'
import { MosqueServices } from './components/MosqueServices/MosqueServices'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div 
        className="mobile-events-section"
        style={{
          // Force display on mobile for debugging
          display: window.innerWidth <= 1000 ? 'block' : 'none',
          background: '#e3e3db',
          minHeight: 'auto',
          padding: '0.5rem 0',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '0 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px'
        }}>
          <EventsNews />
        </div>
      </div>
      <MosqueServices />
    </div>
  )
}

export default App 