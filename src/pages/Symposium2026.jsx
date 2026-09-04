import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

/* ── SVG Icon Components ── */
const IconGlobe = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
)
const IconCalendar = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
)
const IconMonitor = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
)
const IconExternalLink = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
)

/* Icons for highlights */
const IconMic = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
)
const IconUsers = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
)
const IconCertificate = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2" /><path d="M3 7h18" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="10" y1="14" x2="14" y2="14" /><line x1="9" y1="17" x2="9" y2="22" /><line x1="15" y1="17" x2="15" y2="22" /><line x1="9" y1="22" x2="12" y2="19" /><line x1="15" y1="22" x2="12" y2="19" /></svg>
)
const IconNetwork = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3" /><circle cx="5" cy="19" r="3" /><circle cx="19" cy="19" r="3" /><line x1="12" y1="8" x2="5" y2="16" /><line x1="12" y1="8" x2="19" y2="16" /></svg>
)
const IconLeaf = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L7 18" /><path d="M17 8c2-1 4-2 6-2 0 4-1 8-6 12-3.28 2.63-8 4-12 4" /></svg>
)

const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
)

const REGISTRATION_LINK = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAq5SaORUMERXSlZSNUlZRU1FSjFRRlRTNkExTlpTRi4u&route=shorturl'

const discussions = [
    {
        title: 'Green Entrepreneurship and Sustainable Business Models',
        icon: '🌱',
    },
    {
        title: 'Green Skills and Workforce Development for the Future Economy',
        icon: '⚙️',
    },
    {
        title: 'Industry 5.0: Emerging Technologies for a Sustainable Future',
        icon: '🏭',
    },
]

const attendees = [
    'Academicians & Researchers',
    'Postgraduate & Undergraduate Students',
    'Industry Professionals',
    'Entrepreneurs & Start-ups',
    'Government & Policy Makers',
    'Corporate Executives',
    'Sustainability Practitioners',
    'Consultants',
]

const highlights = [
    { icon: <IconMic />, title: 'International Keynote Speakers', desc: 'Distinguished speakers from across the globe sharing insights on sustainability and resilience.' },
    { icon: <IconUsers />, title: 'Global Participants', desc: 'Connect with researchers, professionals and policymakers from around the world.' },
    { icon: <IconNetwork />, title: 'Networking & Collaboration', desc: 'Build meaningful connections and explore partnership opportunities across disciplines.' },
    { icon: <IconCertificate />, title: 'E-Certificate for All', desc: 'All registered participants receive an official e-certificate of participation.' },
]

const objectives = [
    'Promote sustainability and resilience',
    'Share cutting-edge research and innovations',
    'Foster interdisciplinary collaboration',
    'Support the United Nations Sustainable Development Goals (SDGs)',
    'Connect academia, industry and policymakers',
]

const sdgs = [
    { number: 3, title: 'Good Health and Well-Being', color: '#4C9F38' },
    { number: 4, title: 'Quality Education', color: '#C5192D' },
    { number: 9, title: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
    { number: 11, title: 'Sustainable Cities and Communities', color: '#FD9D24' },
    { number: 17, title: 'Partnerships for the Goals', color: '#19486A' },
]

const partnerLogos = [
    { src: '/logo-nilai.png', alt: 'Nilai University', name: 'Nilai University' },
    { src: '/logo.png', alt: 'Sanidhya', name: 'Sanidhya' },
    { src: '/logo-mila.png', alt: 'MILA University', name: 'MILA University' },
]

export default function Symposium2026() {
    useReveal()

    return (
        <div className="page-enter">
            {/* ===== HERO BANNER ===== */}
            <div className="ivcgsmt-hero" style={{ background: 'linear-gradient(135deg, #062a1e 0%, #0f3d2e 40%, #1a5c40 100%)' }}>
                <div className="ivcgsmt-hero-particles" style={{
                    background:
                        'radial-gradient(ellipse at 25% 30%, rgba(34, 197, 94, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="ivcgsmt-hero-content">
                        <span className="ivcgsmt-badge" style={{ background: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#4ade80' }}>
                            <IconGlobe /> International Symposium
                        </span>
                        <h1 style={{
                            background: 'linear-gradient(135deg, #fff 0%, #4ade80 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            lineHeight: 1.2
                        }}>
                            International Symposium on Resilience, Sustainability, and Green Solutions for a Changing World
                        </h1>
                        <p className="ivcgsmt-tagline" style={{ color: '#4ade80', fontSize: '1.1rem', letterSpacing: '0.15em' }}>
                            Planet &nbsp;•&nbsp; People &nbsp;•&nbsp; Prosperity
                        </p>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '12px 28px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.25)',
                            borderRadius: 12,
                            marginBottom: 24
                        }}>
                            <IconLeaf />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Theme</div>
                                <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>Sustainability for a Resilient Future</div>
                            </div>
                        </div>
                        <div className="ivcgsmt-meta-row">
                            <span className="ivcgsmt-meta-chip">
                                <IconCalendar />
                                23 September 2026, Wednesday
                            </span>
                            <span className="ivcgsmt-meta-chip">
                                <IconMonitor />
                                Online Mode
                            </span>
                            <span className="ivcgsmt-meta-chip">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                12:00 PM – 5:00 PM (MYT) / 9:30 AM – 1:30 PM (IST)
                            </span>
                        </div>
                        <div className="ivcgsmt-organizers">
                            <span><strong>Organizer:</strong> Nilai University, Malaysia</span>
                            <span><strong>Co-Organizer:</strong> Sanidhya – Inspiring Academic Excellence &nbsp;|&nbsp; MILA University</span>
                        </div>
                        <div className="ivcgsmt-hero-actions">
                            <a
                                href={REGISTRATION_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', borderColor: '#22c55e' }}
                            >
                                <IconExternalLink /> Register Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== PARTNER LOGOS ===== */}
            <section className="ivcgsmt-logos-strip">
                <div className="container">
                    <span className="ivcgsmt-logos-label">Organized By</span>
                    <div className="ivcgsmt-logos-row">
                        {partnerLogos.map((logo, i) => (
                            <div key={i} className="ivcgsmt-logo-item">
                                <img src={logo.src} alt={logo.alt} />
                                <span>{logo.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HIGHLIGHTS ===== */}
            <section className="section" id="symposium-highlights">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Symposium Highlights</span>
                        <h2>Why Attend?</h2>
                    </div>
                    <div className="ivcgsmt-highlights-grid">
                        {highlights.map((h, i) => (
                            <div key={i} className="ivcgsmt-highlight-card reveal">
                                <span className="ivcgsmt-highlight-icon">{h.icon}</span>
                                <h4>{h.title}</h4>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ROUND TABLE DISCUSSIONS ===== */}
            <section className="section section-alt" id="symposium-discussions">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Plenary Discussions</span>
                        <h2>International Round Table Plenary Discussions</h2>
                    </div>
                    <div className="ivcgsmt-tracks-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                        {discussions.map((d, i) => (
                            <div key={i} className="ivcgsmt-track-card reveal" style={{ textAlign: 'center', padding: '40px 24px' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{d.icon}</div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700 }}>{d.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHO SHOULD ATTEND & OBJECTIVES ===== */}
            <section className="section" id="symposium-info">
                <div className="container">
                    <div className="ivcgsmt-info-grid">
                        {/* Who Should Attend */}
                        <div className="ivcgsmt-info-card reveal delay-1">
                            <h3>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                                Who Should Attend?
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                                {attendees.map((a, i) => (
                                    <div key={i} className={`ivcgsmt-deadline-row`} style={{ justifyContent: 'flex-start', gap: 10 }}>
                                        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>✓</span>
                                        <span className="ivcgsmt-deadline-label">{a}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Objectives */}
                        <div className="ivcgsmt-info-card reveal delay-2">
                            <h3>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                Objectives
                            </h3>
                            <div className="ivcgsmt-deadlines">
                                {objectives.map((obj, i) => (
                                    <div key={i} className="ivcgsmt-deadline-row" style={{ justifyContent: 'flex-start', gap: 12 }}>
                                        <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1rem' }}>✓</span>
                                        <span className="ivcgsmt-deadline-label">{obj}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SDGS ===== */}
            <section className="section section-alt" id="symposium-sdgs">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Our Commitment</span>
                        <h2>Supporting the United Nations Sustainable Development Goals</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap', marginTop: 40 }}>
                        {sdgs.map((sdg, i) => (
                            <div key={i} className="reveal" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 10,
                                padding: '20px 16px',
                                background: 'var(--bg-white)',
                                border: '1px solid var(--border-light)',
                                borderRadius: 'var(--radius-md)',
                                width: 140,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}>
                                <div style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 12,
                                    background: sdg.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    fontSize: '1.4rem',
                                    fontWeight: 800,
                                }}>
                                    {sdg.number}
                                </div>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, lineHeight: 1.3 }}>
                                    {sdg.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section className="section" id="symposium-contact">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Get In Touch</span>
                        <h2>Contact Information</h2>
                    </div>
                    <div className="ivcgsmt-officials-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <div className="ivcgsmt-official-card reveal">
                            <span className="ivcgsmt-official-role">For Inquiries</span>
                            <h4>Dr. Benedict</h4>
                            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                                <IconMail />
                                <a href="mailto:dr.benedict@nilai.edu.my" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                                    dr.benedict@nilai.edu.my
                                </a>
                            </p>
                        </div>
                        <div className="ivcgsmt-official-card reveal">
                            <span className="ivcgsmt-official-role">For Inquiries</span>
                            <h4>Dr. Pushpendu</h4>
                            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
                                <IconMail />
                                <a href="mailto:contact@mysanidhya.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                                    contact@mysanidhya.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="section section-dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Ready to Participate?</span>
                        <h2 style={{ color: '#fff', marginBottom: 16 }}>Register Now!</h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 8px', fontSize: '1.05rem' }}>
                            Be part of a global conversation for a sustainable tomorrow.
                        </p>
                        <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto 32px', fontSize: '0.9rem' }}>
                            23 September 2026 &nbsp;|&nbsp; Online Mode &nbsp;|&nbsp; 12:00 PM – 5:00 PM (MYT)
                        </p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a
                                href={REGISTRATION_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', borderColor: '#22c55e' }}
                            >
                                Register Now
                            </a>
                            <Link to="/" className="btn btn-gold-outline">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
