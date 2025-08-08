import { forwardRef, useEffect } from 'react'
import './EventsNews.css'
import { getFeaturedEvents } from '../../data/eventsData'

const EventsNews = forwardRef((props, ref) => {
  const events = getFeaturedEvents()

  useEffect(() => {
    console.log('EventsNews component mounted:', events.length, 'events')
    console.log('Events data:', events)
    console.log('Window width:', window.innerWidth)
  }, [events])

  const handleReadMore = (slug) => {
    // Future CMS integration point
    console.log(`Navigate to event: ${slug}`)
    // This will eventually navigate to: `/events/${slug}`
  }

  if (!events || events.length === 0) {
    return (
      <div className="events-news-container" ref={ref}>
        <div className="events-header">
          <h2 className="events-title">Events & News</h2>
        </div>
        <div className="events-list">
          <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
            No events found or events data not loading
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="events-news-container" ref={ref}>
      <div className="events-header">
        <h2 className="events-title">Events & News</h2>
      </div>
      
      <div className="events-list">
        {events.map((event, index) => {
          console.log(`Rendering event: ${event.title}`, event.image)
          return (
            <div key={event.id} className="event-card">
              <div className="event-image-container">
                <img 
                  src={event.image} 
                  alt={event.imageAlt}
                  className="event-image"
                  onLoad={() => console.log(`Image loaded: ${event.title}`)}
                  onError={(e) => console.error(`Image failed to load: ${event.title}`, e)}
                />
              </div>
              
              <div className="event-content">
                <div className="event-meta">
                  <span className="event-date">Posted on {event.publishedDate}</span>
                  <span className="event-category">{event.category}</span>
                </div>
                
                <h3 className="event-title">{event.title}</h3>
                
                <p className="event-excerpt">{event.excerpt}</p>
                
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(event.slug)}
                  aria-label={`Read more about ${event.title}`}
                >
                  Read More
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

EventsNews.displayName = 'EventsNews'

export default EventsNews 