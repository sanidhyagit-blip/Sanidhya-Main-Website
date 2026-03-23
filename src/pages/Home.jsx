import { useState, useMemo, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const timelineSteps = [
    {
        title: 'Prepare Your Article',
        short: 'Follow submission guidelines and prepare your manuscript.',
        detail: 'Ensure your article follows all formatting guidelines. Obtain proper permissions for images, verify originality, and disclose any re-used data. Comply with research ethics policies.'
    },
    {
        title: 'Inscribe a Cover Letter',
        short: 'Draft a compelling cover letter for your submission.',
        detail: 'Your cover letter should summarize the work, its significance, and confirm it has not been submitted elsewhere. Address it to the editorial board.'
    },
    {
        title: 'Submit Your Literary Work',
        short: 'Upload your manuscript through our submission portal.',
        detail: 'Submit your complete manuscript along with supplementary materials through our online portal. You will receive a confirmation and tracking ID upon submission.'
    },
    {
        title: 'Editor & Peer Review',
        short: 'Your work undergoes rigorous expert evaluation.',
        detail: 'Formatting checks and plagiarism review are conducted first. Then 2+ expert reviewers evaluate your work. You will receive editorial feedback on quality-based acceptance.'
    },
    {
        title: 'Status Updates',
        short: 'Track your submission progress in real-time.',
        detail: 'Receive regular updates about where your submission is in the review pipeline. Our tracking system keeps you informed at every stage.'
    },
    {
        title: 'Acceptance Notification',
        short: 'Receive your acceptance confirmation and next steps.',
        detail: 'Upon acceptance, you will receive a copyright agreement, registration process details, payment guidelines, and deadline compliance information.'
    },
    {
        title: 'Payment',
        short: 'Complete the publication fee through secure payment.',
        detail: 'Process your payment through our secure gateway. Multiple payment options available. Receipt and confirmation will be sent immediately.'
    },
    {
        title: 'Publish',
        short: 'Your work goes live with global visibility.',
        detail: 'Your work is published in the specified time frame. Both hardcopy and softcopy options are available. A tracking system is provided for post-publication access.'
    },
]

const recentActivities = [
    {
        tag: 'Conference',
        type: '',
        title: 'National Conference',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Conference',
        type: '',
        title: 'International Conference',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },      
    {
        tag: 'Conference',
        type: '',
        title: 'International Summits',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Conference',
        type: '',
        title: 'International Symposiums',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Workshop',
        type: '',
        title: 'International Workshops',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Seminar',
        type: '',
        title: 'Seminars/Webinars',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Conference',
        type: '',
        title: 'Faculty Development Program',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },
    {
        tag: 'Conference',
        type: '',
        title: 'Management Development Program',
        desc: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
        icon: '🎓',
        date: 'TBA',
        location: 'TBA',
        registrationOpen: false,
    },

]

function HeroParticles() {
    const particles = useMemo(() => (
        Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 20 - 10}%`,
            size: `${4 + Math.random() * 6}px`,
            duration: `${8 + Math.random() * 12}s`,
            delay: `${Math.random() * 8}s`,
            opacity: 0.2 + Math.random() * 0.4,
        }))
    ), [])

    return (
        <div className="hero-particles">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="hero-particle"
                    style={{
                        left: p.left,
                        bottom: p.bottom,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        opacity: p.opacity,
                    }}
                />
            ))}
        </div>
    )
}

function Hero3DBook() {
    const bookRef = useRef(null)
    const animFrameRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        if (!bookRef.current) return
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

        animFrameRef.current = requestAnimationFrame(() => {
            const rect = bookRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12
            const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 8
            bookRef.current.style.setProperty('--mouse-x', `${rotateX}deg`)
            bookRef.current.style.setProperty('--mouse-y', `${rotateY}deg`)
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        if (!bookRef.current) return
        bookRef.current.style.setProperty('--mouse-x', '0deg')
        bookRef.current.style.setProperty('--mouse-y', '0deg')
    }, [])

    return (
        <div
            className="hero-3d-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="hero-3d-book" ref={bookRef}>
                {/* Front Cover */}
                <div className="book-face book-front">
                    <div className="book-front-inner">
                        <div className="book-cover-ornament top" />
                        <div className="book-cover-content">
                            <span className="book-cover-label" style={{ fontSize: '1rem' }} fontWeight="bold">Sanidhya</span>
                            <span className="book-cover-title">Academic & Research<br />Publishing</span>
                            <span className="book-cover-year">2026</span>
                        </div>
                        <div className="book-cover-ornament bottom" />
                    </div>
                </div>
                {/* Spine */}
                <div className="book-face book-spine">
                    <span className="book-spine-text">SANIDHYA</span>
                </div>
                {/* Page edges (right side) */}
                <div className="book-face book-pages" />
                {/* Top edge */}
                <div className="book-face book-top" />
                {/* Bottom edge */}
                <div className="book-face book-bottom" />
                {/* Back Cover */}
                <div className="book-face book-back" />
            </div>
            {/* Shadow underneath */}
            <div className="book-shadow" />
        </div>
    )
}

function SubmissionTracker() {
    const steps = ['Submitted', 'In Review', 'Accepted', 'Payment', 'Published']
    const currentStep = 2

    return (
        <div className="tracker-container reveal">
            <div className="tracker-header">
                <div>
                    <h4 style={{ marginBottom: 4, fontFamily: 'var(--font-body)', fontSize: '1rem' }}>
                        Submission Tracking
                    </h4>
                    <span className="tracker-id">ID: SND-2026-001458</span>
                </div>
                <span className="tracker-status-badge">In Review</span>
            </div>
            <div className="tracker-steps">
                {steps.map((step, i) => (
                    <div key={i} className={`tracker-step${i < currentStep ? ' completed' : ''}${i === currentStep ? ' current' : ''}`}>
                        <div className="tracker-step-dot">
                            {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span className="tracker-step-label">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Home() {
    const [activeStep, setActiveStep] = useState(null)
    useReveal()

    return (
        <div className="page-enter">
            {/* ===== HERO ===== */}
            <section className="hero" id="hero">
                <HeroParticles />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge" style={{ fontSize: '1.3rem' }}>Welcome to Sanidhya</div>
                        <h1>
                            Publish Your <span className="highlight">Academic & Research Contributions</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join us to publish your valuable literary work and research.
                            Empower your academic journey with peer-reviewed publishing and global recognition.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/author-services" className="btn btn-primary">Submit Your Work</Link>
                            <Link to="/literary/book-chapter" className="btn btn-secondary">Explore Services</Link>
                        </div>
                    </div>
                    <Hero3DBook />
                </div>
                <div className="hero-stats-bar">
                    <div className="hero-stat">
                        <span className="hero-stat-number">200+</span>
                        <span className="hero-stat-label">Published Works</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-number">50+</span>
                        <span className="hero-stat-label">Expert Reviewers</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-number">25+</span>
                        <span className="hero-stat-label">Conferences</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-number">30+</span>
                        <span className="hero-stat-label">Countries</span>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT ===== */}
            <section className="section" id="about">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>About Sanidhya</span>
                        <h2>Inspiring Academic Excellence</h2>
                        <p>Bridging the gap between academic research and professional growth through innovative platforms for research and publishing solutions.</p>
                    </div>
                    <div className="about-grid">
                        <div className="about-card reveal-left delay-1">
                            <div className="about-icon">🔭</div>
                            <h3>Our Vision</h3>
                            <p>
                                Our Vision is to bridge academic and research, fostering continuous exploration and innovation.
                            </p>
                        </div>
                        <div className="about-card reveal-right delay-2">
                            <div className="about-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>
                                Innovative practices to enhance academic quality and growth prospects by furnishing skills.
                                We envision a world where every researcher has access to premium research & publishing platforms that
                                amplify their contributions to knowledge. We strengthen employability by nurturing skills, empowering individuals to thrive in the evolving
                                professional landscape.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE ===== */}
            <section className="section section-alt" id="process">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Publication Process</span>
                        <h2>Your Path to Publication</h2>
                        <p>A streamlined 8-step process designed to guide your academic work from manuscript to published excellence.</p>
                    </div>
                    <div className="timeline-container reveal">
                        <div className="timeline-line" />
                        {timelineSteps.map((step, i) => (
                            <div
                                key={i}
                                className={`timeline-item ${activeStep === i ? 'expanded' : ''}`}
                                onClick={() => setActiveStep(activeStep === i ? null : i)}
                            >
                                <div className="timeline-node">{i + 1}</div>
                                <div className="timeline-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.short}</p>
                                    <div className="timeline-detail">{step.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                        <Link to="/process" className="btn btn-outline reveal">View Detailed Process →</Link>
                    </div>
                </div>
            </section>

            {/* ===== SUBMISSION TRACKER MOCK ===== */}
            {/* <section className="section" id="tracker">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Track Your Submission</span>
                        <h2>Real-Time Submission Tracking</h2>
                        <p>Stay informed at every stage of your publication journey with our transparent tracking system.</p>
                    </div>
                    <SubmissionTracker />
                </div>
            </section> */}

            {/* ===== RECENT ACTIVITIES ===== */}
            <section className="section section-alt" id="activities">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>What's Happening</span>
                        <h2>Recent Activities</h2>
                        <p>Stay updated with our latest conferences, workshops, and academic events.</p>
                    </div>
                    <div className="activities-grid">
                        {recentActivities.map((act, i) => (
                            <div key={i} className={`activity-card reveal delay-${(i % 4) + 1}`}>
                                <div className="activity-card-image">
                                    <span style={{ position: 'relative', zIndex: 2, fontSize: '3rem' }}>{act.icon}</span>
                                    <span style={{
                                        position: 'absolute', top: 12, right: 12, zIndex: 3,
                                        background: act.type === 'Brochure' ? 'rgba(200,169,80,0.9)' : 'rgba(27,42,74,0.9)',
                                        color: '#fff', padding: '4px 12px', borderRadius: '50px',
                                        fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
                                    }}>{act.type}</span>
                                </div>
                                <div className="activity-card-body">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <span className="activity-tag">{act.tag}</span>
                                        {act.registrationOpen ? (
                                            <span style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 600 }}>● Registration Open</span>
                                        ) : (
                                            <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 600 }}>● Coming Soon</span>
                                        )}
                                    </div>
                                    <h4>{act.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                            {act.date}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                            {act.location}
                                        </span>
                                    </p>
                                    <p style={{ fontSize: '0.88rem' }}>{act.desc}</p>
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                        <Link to="/research/international-conference" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
                                            View Details →
                                        </Link>
                                        {act.registrationOpen && (
                                            <Link to="/author-services" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
                                                Register Now
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="section section-dark">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="reveal">
                        <span className="section-label" style={{ fontSize: '1.5rem' }}>Ready to Publish?</span>
                        <h2 style={{ color: '#fff', marginBottom: 16 }}>Start Your Academic Publishing Journey</h2>
                        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 32px', fontSize: '1.05rem' }}>
                            Submit your research, book chapters, or case studies today and join a community of
                            distinguished academics and researchers worldwide.
                        </p>
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/author-services" className="btn btn-primary">Get Started</Link>
                            <Link to="/faq" className="btn btn-gold-outline">Have Questions?</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
