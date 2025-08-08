import { forwardRef, useState } from 'react'
import './PrayerTimes.css'
import { prayerTimes } from '../../data/prayerTimes'

const PrayerTimes = forwardRef((props, ref) => {
  const [activeLocation, setActiveLocation] = useState('ajax')
  
  const regularPrayers = prayerTimes.filter(prayer => !prayer.isJummah)
  const jummahTimes = prayerTimes.filter(prayer => prayer.isJummah)

  const getCurrentTimes = (prayer) => {
    return prayer[activeLocation]
  }

  return (
    <div className="prayer-times-container" ref={ref}>
      <div className="islamic-date">
        1 Safar 1447 | Saturday, July 26, 2025
      </div>
      
      <div className="location-toggle">
        <button 
          className={`location-btn ${activeLocation === 'ajax' ? 'active' : ''}`}
          onClick={() => setActiveLocation('ajax')}
        >
          Ajax
        </button>
        <button 
          className={`location-btn ${activeLocation === 'scarborough' ? 'active' : ''}`}
          onClick={() => setActiveLocation('scarborough')}
        >
          Scarborough
        </button>
      </div>
      
      <div className="regular-prayers">
        {regularPrayers.map((prayer, index) => {
          const times = getCurrentTimes(prayer)
          return (
            <div key={index} className="prayer-time-item">
              <div className="prayer-icon-placeholder"></div>
              <div className="prayer-info">
                <h2 className="prayer-name">{prayer.name}</h2>
                <div className="prayer-times-row">
                  <div className="time-group">
                    <span className="time-label">Adhan</span>
                    <span className="prayer-time">{times.time}</span>
                  </div>
                  <div className="time-group">
                    <span className="time-label">Iqamah</span>
                    <span className="prayer-time iqamah-time">{times.iqamah}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        
        <div className="prayer-time-item jummah-container">
          <div className="prayer-icon-placeholder jummah-icon-placeholder"></div>
          <div className="prayer-info">
            <div className="jummah-times-grid">
              {jummahTimes.map((prayer, index) => {
                const times = getCurrentTimes(prayer)
                return (
                  <div key={`jummah-${index}`} className="jummah-time-item">
                    <span className="jummah-label">{prayer.name}</span>
                    <span className="prayer-time">{times.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

PrayerTimes.displayName = 'PrayerTimes'

export default PrayerTimes 