import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const team = [
    { name: 'Dr. Pushpendu Rakshit', role: 'Founder & CEO', icon: '👩‍🎓', desc: 'Academician, Researcher, Author, Publisher, International copyright and patent holder' },
    { name: 'Dr. Vinit Joshi ', role: 'Chief Editor', icon: '👨‍🏫', desc: 'Academician, Researcher, Author, Publisher' },

    { name: 'Mrs. Vardha Joshi', role: 'Sub-Editor', icon: '⚖️', desc: 'Academician, Researcher & Publisher' },
    { name: 'Mr. Vedant Naikwadi', role: 'Tech-Support', icon: '🧑‍💻', desc: 'Research Scholar and Software Developer' },
]

const stats = [
    { number: '200+', label: 'Published Works' },
    { number: '50+', label: 'Expert Reviewers' },
    { number: '25+', label: 'Conferences Organized' },
    { number: '30+', label: 'Countries Reached' },
    { number: '500+', label: 'Authors Supported' },
    { number: '2+', label: 'Years of Excellence' },
]

const values = [
    { icon: '🎯', title: 'Academic Integrity', desc: 'We uphold the highest standards of academic honesty, ethical research practices, and plagiarism-free publishing.' },
    { icon: '🌍', title: 'Global Reach', desc: 'Our publications and conferences connect researchers across 30+ countries, fostering international academic collaboration.' },
    { icon: '⭐', title: 'Quality Assurance', desc: 'Every publication undergoes rigorous double-blind peer review by subject matter experts to ensure scholarly excellence.' },
    { icon: '🤝', title: 'Author Support', desc: 'We provide end-to-end assistance — from manuscript preparation to post-publication support — nurturing academic careers.' },
    { icon: '💡', title: 'Innovation', desc: 'We embrace cutting-edge research methodologies, digital publishing technologies, and interdisciplinary approaches.' },
    { icon: '📚', title: 'Knowledge Sharing', desc: 'We believe in open access to knowledge, democratizing academic resources for researchers at every career stage.' },
]

export default function About() {
    useReveal()

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>About Us</span>
                    </div>
                    <h1>About Sanidhya</h1>
                    <p>Inspiring Academic Excellence through innovative publishing and research solutions</p>
                </div>
            </div>

            {/* WHO WE ARE */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Who We Are</span>
                        <h2>Empowering Academic Excellence</h2>
                    </div>
                    <div className="content-body reveal" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.9 }}>
                            <strong>Sanidhya</strong> is a premier academic publishing and research consultancy
                            dedicated to empowering scholars, researchers, and educators worldwide. Founded with the
                            vision of bridging the gap between academic research and professional growth, we provide
                            comprehensive services that span literary publishing, research conferences, development
                            programs, and intellectual property rights management.
                        </p>
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9, marginTop: 16 }}>
                            Our name "Sanidhya" reflects the essence of closeness and companionship — we walk alongside
                            every author, researcher, and academic in their journey toward scholarly success. With a
                            network of 100+ expert reviewers and collaborations spanning 30+ countries, we ensure your
                            academic contributions receive the global recognition they deserve.
                        </p>
                    </div>
                </div>
            </section>

            {/* VISION & MISSION */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label">Our Purpose</span>
                        <h2>Vision & Mission</h2>
                    </div>
                    <div className="about-grid">
                        <div className="about-card reveal-left delay-1">
                            <div className="about-icon">🔭</div>
                            <h3>Need</h3>
                            <p>
                                To be a globally recognized platform that drives innovative practices in academic
                                publishing and research — enhancing quality, fostering continuous exploration, and
                                creating growth prospects for scholars at every stage of their academic journey. We
                                envision a world where every researcher has access to premium publishing platforms
                                that amplify their contributions to human knowledge.
                            </p>
                        </div>
                        <div className="about-card reveal-right delay-2">
                            <div className="about-icon">🎯</div>
                            <h3>Purpose</h3>
                            <p>
                                Our purpose is to bridge academia and research, fostering continuous exploration
                                and innovation. We strengthen employability by furnishing skills and nurturing
                                academic talent, empowering individuals to thrive in the evolving professional
                                landscape. Through peer-reviewed publishing, international conferences, and
                                development programs, we create pathways to academic excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>What Drives Us</span>
                        <h2>Our Core Values</h2>
                        <p>The principles that guide every decision and interaction at Sanidhya.</p>
                    </div>
                    <div className="services-grid">
                        {values.map((v, i) => (
                            <div key={i} className={`service-card reveal delay-${(i % 3) + 1}`}>
                                <div className="service-card-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="section section-dark">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Our Impact</span>
                        <h2 style={{ color: '#fff' }}>By the Numbers</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                        gap: 32,
                        textAlign: 'center',
                        maxWidth: 900,
                        margin: '0 auto',
                    }}>
                        {stats.map((s, i) => (
                            <div key={i} className={`reveal delay-${(i % 6) + 1}`} style={{ padding: 20 }}>
                                <span style={{
                                    display: 'block',
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '2.4rem',
                                    fontWeight: 700,
                                    color: 'var(--accent-gold)',
                                    marginBottom: 6,
                                }}>{s.number}</span>
                                <span style={{
                                    fontSize: '0.82rem',
                                    color: 'rgba(255,255,255,0.55)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Leadership</span>
                        <h2>Our Team</h2>
                        <p>Meet the experts behind Sanidhya's academic publishing excellence.</p>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 28,
                        maxWidth: 1000,
                        margin: '0 auto',
                    }}>
                        {team.map((t, i) => (
                            <div key={i} className={`service-card reveal delay-${(i % 4) + 1}`} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: 80, height: 80,
                                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2rem',
                                    margin: '0 auto 16px',
                                }}>{t.icon}</div>
                                <h3 style={{ marginBottom: 4 }}>{t.name}</h3>
                                <span style={{
                                    display: 'block',
                                    color: 'var(--accent-gold)',
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    marginBottom: 12,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}>{t.role}</span>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-alt" style={{ textAlign: 'center' }}>
                <div className="container reveal">
                    <h2>Ready to Collaborate?</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 28px', fontSize: '1.05rem' }}>
                        Join our community of researchers and academics. Let us help you publish your next
                        breakthrough work.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/author-services" className="btn btn-primary">Get Started</Link>
                        <Link to="/faq" className="btn btn-outline">Have Questions?</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
