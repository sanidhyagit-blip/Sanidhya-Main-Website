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
const IconFile = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
)
const IconExternalLink = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
)
const IconMic = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
)
const IconPresentation = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="6" y1="8" x2="6" y2="13" /><line x1="10" y1="6" x2="10" y2="13" /><line x1="14" y1="9" x2="14" y2="13" /><line x1="18" y1="7" x2="18" y2="13" /></svg>
)
const IconBook = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
)
const IconUsers = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
)
const IconDollar = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
)
const IconClock = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
)
const IconCreditCard = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
)

const tracks = [
    {
        title: 'Track 1: Financial Inclusion & Sustainability',
        icon: <IconDollar />,
        topics: [
            'Digital Banking for the Unbanked',
            'Microfinance & Poverty Reduction',
            'Women\'s Financial Inclusion',
            'Blockchain for Financial Inclusion',
            'Green Finance & Climate Investments',
            'AI-driven Financial Inclusion Platforms',
        ],
    },
    {
        title: 'Track 2: Contemporary Management',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
        topics: [
            'Green Human Resource Management (GHRM)',
            'Sustainable Leadership & Corporate Culture',
            'Digital Transformation for Sustainability',
            'Green Supply Chain Management',
            'Smart Manufacturing & Industry 5.0',
            'Blue Economy & Ocean Sustainability',
        ],
    },
    {
        title: 'Track 3: Technology & Management',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>,
        topics: [
            'AI in Decision-Making',
            'Big Data Analytics for Business Intelligence',
            'Cybersecurity Governance',
            'Blockchain in Supply Chain',
            'Neuromarketing & Consumer Behavior',
            'DEI Strategies & AI in Talent Acquisition',
        ],
    },
    {
        title: 'Track 4: FinTech Innovations',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>,
        topics: [
            'Digital Payments & Cashless Economies',
            'Cryptocurrencies & CBDCs',
            'Open Banking & API-Driven Ecosystems',
            'AI/ML in Financial Decision-Making',
            'RegTech & Compliance Automation',
            'ESG Integration in Digital Finance',
        ],
    },
]

const deadlines = [
    { label: 'Full Paper Submission', date: '05 May 2026' },
    { label: 'Acceptance Notification', date: '10 May 2026' },
    { label: 'Registration & Payment', date: '15 May 2026' },
    { label: 'Conference Date', date: '03 June 2026', highlight: true },
]

const fees = [
    { category: 'Indian Delegates', amount: '$55' },
    { category: 'Indian Students', amount: '$30' },
    { category: 'Foreign Delegates', amount: '$150' },
    { category: 'Foreign Students', amount: '$100' },
]

const officials = [
    { role: 'Conference Patron', name: 'Dr. Ir. Frysa Wiriantari', affiliation: 'Dwijendra University, Bali, Indonesia' },
    { role: 'Conference Chairperson', name: 'Dr. Gede Sedana', affiliation: 'Dwijendra University, Bali, Indonesia' },
    { role: 'Conference Coordinator', name: 'Dr. Pushpendu Rakshit', affiliation: 'Team Sanidhya, India' },
]

const partnerLogos = [
    { src: '/logo-dwijendra.png', alt: 'Universitas Dwijendra', name: 'Universitas Dwijendra' },
    { src: '/logo-perhepi.png', alt: 'PERHEPI Indonesia', name: 'PERHEPI Indonesia' },
    { src: '/logo-hkti.png', alt: 'HKTI', name: 'HKTI' },
    { src: '/logo.png', alt: 'Sanidhya', name: 'Sanidhya' },
]

export default function IVCGSMT() {
    useReveal()

    return (
        <div className="page-enter">
            {/* ===== HERO BANNER ===== */}
            <div className="ivcgsmt-hero">
                <div className="ivcgsmt-hero-particles" />
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="ivcgsmt-hero-content">
                        <span className="ivcgsmt-badge">
                            <IconGlobe /> International Virtual Conference
                        </span>
                        <h1>IVCGSMT 2026</h1>
                        <p className="ivcgsmt-subtitle">
                            Global Sustainable Management & Technologies
                        </p>
                        <div className="ivcgsmt-meta-row">
                            <span className="ivcgsmt-meta-chip">
                                <IconCalendar />
                                03 June 2026, Wednesday
                            </span>
                            <span className="ivcgsmt-meta-chip">
                                <IconMonitor />
                                Virtual Mode
                            </span>
                        </div>
                        <p className="ivcgsmt-tagline">Integration &nbsp;|&nbsp; Information &nbsp;|&nbsp; Innovation &nbsp;|&nbsp; Investment</p>
                        <div className="ivcgsmt-organizers">
                            <span><strong>Organizer:</strong> Sanidhya – Inspiring Academic Excellence</span>
                            <span><strong>Host & Co-Organizer:</strong> Dwijendra University, Bali, Indonesia</span>
                        </div>
                        <div className="ivcgsmt-hero-actions">
                            <a
                                href="https://drive.google.com/file/d/1jZXPRfegUySUb4tSBAl8D5PcZnDg9RcR/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <IconFile /> Download Brochure
                            </a>
                            <a
                                href="https://dwijendra.ac.id/pengumuman-international-virtual-conference-on-global-sustainable-management-and-technologies-ivcgsmt-2026/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <IconExternalLink /> Official Conference Page
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== PARTNER LOGOS ===== */}
            <section className="ivcgsmt-logos-strip">
                <div className="container">
                    <span className="ivcgsmt-logos-label">In Association With</span>
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
            <section className="section" id="ivcgsmt-highlights">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>About the Conference</span>
                        <h2>Major Highlights</h2>
                    </div>
                    <div className="ivcgsmt-highlights-grid">
                        {[
                            { icon: <IconMic />, title: 'Keynote Sessions', desc: 'International keynote and valedictory sessions by distinguished scholars.' },
                            { icon: <IconPresentation />, title: 'Paper Presentations', desc: 'Research paper presentations with track-wise best paper awards.' },
                            { icon: <IconBook />, title: 'Publications', desc: 'ISBN proceedings with reputed publisher. Selected papers in Scopus & ABDC journals.' },
                            { icon: <IconUsers />, title: 'Networking', desc: 'Connect with international colleagues and professionals in business & innovation.' },
                        ].map((h, i) => (
                            <div key={i} className={`ivcgsmt-highlight-card reveal delay-${i + 1}`}>
                                <span className="ivcgsmt-highlight-icon">{h.icon}</span>
                                <h4>{h.title}</h4>
                                <p>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRACKS ===== */}
            <section className="section section-alt" id="ivcgsmt-tracks">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Sub-Themes & Tracks</span>
                        <h2>Conference Tracks</h2>
                        <p>Manuscripts on these themes and related studies in Finance, Management, Economics, Science & Technology are welcome.</p>
                    </div>
                    <div className="ivcgsmt-tracks-grid">
                        {tracks.map((track, i) => (
                            <div key={i} className={`ivcgsmt-track-card reveal delay-${i + 1}`}>
                                <div className="ivcgsmt-track-header">
                                    <span className="ivcgsmt-track-icon">{track.icon}</span>
                                    <h4>{track.title}</h4>
                                </div>
                                <ul>
                                    {track.topics.map((t, j) => (
                                        <li key={j}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DEADLINES & FEES ===== */}
            <section className="section" id="ivcgsmt-info">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Important Information</span>
                        <h2>Deadlines & Fees</h2>
                    </div>
                    <div className="ivcgsmt-info-grid">
                        {/* Deadlines */}
                        <div className="ivcgsmt-info-card reveal delay-1">
                            <h3><IconClock /> Important Deadlines</h3>
                            <div className="ivcgsmt-deadlines">
                                {deadlines.map((d, i) => (
                                    <div key={i} className={`ivcgsmt-deadline-row ${d.highlight ? 'highlight' : ''}`}>
                                        <span className="ivcgsmt-deadline-label">{d.label}</span>
                                        <span className="ivcgsmt-deadline-date">{d.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fees */}
                        <div className="ivcgsmt-info-card reveal delay-2">
                            <h3><IconCreditCard /> Registration Fees</h3>
                            <div className="ivcgsmt-fees">
                                {fees.map((f, i) => (
                                    <div key={i} className="ivcgsmt-fee-row">
                                        <span className="ivcgsmt-fee-category">{f.category}</span>
                                        <span className="ivcgsmt-fee-amount">{f.amount}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="ivcgsmt-note">Selected papers to be published in reputed ABDC/Scopus journals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== OFFICIALS ===== */}
            <section className="section section-alt" id="ivcgsmt-officials">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Conference Team</span>
                        <h2>Conference Officials</h2>
                    </div>
                    <div className="ivcgsmt-officials-grid">
                        {officials.map((o, i) => (
                            <div key={i} className={`ivcgsmt-official-card reveal delay-${i + 1}`}>
                                <span className="ivcgsmt-official-role">{o.role}</span>
                                <h4>{o.name}</h4>
                                <p>{o.affiliation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="section section-dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Ready to Participate?</span>
                        <h2 style={{ color: '#fff', marginBottom: 16 }}>Submit Your Research Paper</h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 24px', fontSize: '1.05rem' }}>
                            For any queries, reach out to us at <strong style={{ color: 'var(--accent-gold)' }}>contact@mysanidhya.com</strong>
                        </p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/author-services" className="btn btn-primary">Register Now</Link>
                            <a
                                href="https://drive.google.com/file/d/1jZXPRfegUySUb4tSBAl8D5PcZnDg9RcR/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gold-outline"
                            >
                                Download Brochure
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
