import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

/**
 * Past events data — easily scalable by adding new entries.
 * Each event has: id, title, description, date, banner (placeholder SVG), link to its existing page.
 */
const pastEvents = [
    {
        id: 'ivcgsmt-2026',
        title: 'IVCGSMT 2026 – International Virtual Conference on Global Sustainable Management & Technologies',
        description: 'A premier international virtual conference organized in association with Dwijendra University, Bali, Indonesia. Covered tracks on Financial Inclusion, Contemporary Management, Technology & Management, and FinTech Innovations.',
        date: '3rd June 2026',
        location: 'Virtual (Dwijendra University, Bali)',
        tag: 'Conference',
        link: '/ivcgsmt',
        banner: '/conference-poster-1.jpg',
    },
    {
        id: 'fdp-supply-chain-2026',
        title: 'One Day International Virtual FDP – Advancements in Supply Chain Management',
        description: 'A Faculty Development Program focused on the latest advancements in supply chain management, digital logistics, and sustainable practices. Open to faculty and researchers from all disciplines.',
        date: '7th April 2026',
        location: 'Online',
        tag: 'FDP',
        link: '/development/fdp',
        banner: '/fdp-poster.jpg',
    },
]

function EventBannerPlaceholder({ tag }) {
    return (
        <div className="event-banner-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {tag === 'Conference' ? (
                    <>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </>
                ) : (
                    <>
                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                    </>
                )}
            </svg>
            <span>{tag}</span>
        </div>
    )
}

export default function OlderEvents() {
    useReveal()

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Past Events</span>
                    </div>
                    <h1>Past Events & Conferences</h1>
                    <p>A look back at our previously conducted events, conferences, and programs</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Event Archive</span>
                        <h2>Previously Conducted Events</h2>
                        <p>Explore our past conferences, FDPs, workshops, and more. Click "View Details" to see the full event page.</p>
                    </div>

                    <div className="events-archive-grid">
                        {pastEvents.map((event, i) => (
                            <div key={event.id} className={`event-archive-card reveal delay-${(i % 4) + 1}`}>
                                <div className="event-archive-banner">
                                    {event.banner ? (
                                        <img src={event.banner} alt={event.title} />
                                    ) : (
                                        <EventBannerPlaceholder tag={event.tag} />
                                    )}
                                    <span className="event-archive-tag">{event.tag}</span>
                                </div>
                                <div className="event-archive-body">
                                    <h3>{event.title}</h3>
                                    <div className="event-archive-meta">
                                        <span className="event-archive-meta-item">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                            {event.date}
                                        </span>
                                        <span className="event-archive-meta-item">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                                            </svg>
                                            {event.location}
                                        </span>
                                    </div>
                                    <p className="event-archive-desc">{event.description}</p>
                                    <Link to={event.link} className="btn btn-outline event-archive-btn" id={`view-event-${event.id}`}>
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* More Events Coming Soon */}
                    <div className="events-coming-soon reveal">
                        <div className="events-coming-soon-inner">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                            <div>
                                <h4>More Events Coming Soon</h4>
                                <p>We are continuously organizing new conferences, workshops, and development programs. Stay tuned for updates!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
