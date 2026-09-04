import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { BookOpen, Search, Globe, Building, BarChart3, GraduationCap, Library, PenTool, Trophy, X } from 'lucide-react'

const serviceData = {
    'book-chapter': {
        title: 'Call for Book Chapter',
        breadcrumb: 'Literary Services',
        intro: 'We invite scholars, researchers, and academicians to contribute book chapters across a wide range of disciplines. Our edited volumes bring together diverse perspectives to create comprehensive academic resources.',
        guidelines: [
            'Manuscripts should be between 3,000 to 8,000 words including references.',
            'Follow APA 7th Edition citation and referencing style.',
            'All submissions must be original and not under consideration elsewhere.',
            'Include an abstract of 200–300 words with 5–6 keywords.',
            'Figures, tables, and images must be high resolution (300 DPI minimum).',
            'A brief author biography (100 words) must accompany the submission.',
            'Plagiarism must be below 10% (checked via Turnitin/iThenticate).',
        ],
        cta: 'Submit Your Chapter',
        features: [
            { icon: BookOpen, title: 'ISBN Registration', desc: 'Every published book receives an ISBN for global identification and cataloging.' },
            { icon: Search, title: 'Peer Reviewed', desc: 'All chapters undergo rigorous double-blind peer review by domain experts.' },
            { icon: Globe, title: 'Global Reach', desc: 'Published works are distributed across major academic databases and libraries.' },
        ],
        posters: [
            { src: '/CallForBookChapter1.jpeg', alt: 'Call for Book Chapter – Poster 1' },
            { src: '/CallForBookChapter2.jpeg', alt: 'Call for Book Chapter – Poster 2' },
        ],
    },
    'case-studies': {
        title: 'Call for Case Studies',
        breadcrumb: 'Literary Services',
        intro: 'We welcome well-researched case studies that provide in-depth analysis of real-world scenarios across business, management, engineering, healthcare, and social sciences. Case studies should demonstrate practical application of theoretical concepts.',
        guidelines: [
            'Case studies should be 2,500 to 6,000 words in length.',
            'Must include an executive summary, introduction, methodology, findings, and conclusion.',
            'Follow APA or Harvard referencing style.',
            'Include discussion questions for classroom use where applicable.',
            'Original data and analysis are preferred over secondary research.',
            'Teaching notes may accompany the case study submission.',
        ],
        cta: 'Submit Your Case Study',
        features: [
            { icon: Building, title: 'Industry Relevant', desc: 'Case studies are selected for their practical relevance to current industry challenges.' },
            { icon: BarChart3, title: 'Data-Driven', desc: 'We prioritize case studies backed by robust data analysis and methodology.' },
            { icon: GraduationCap, title: 'Academic Impact', desc: 'Published case studies are used in classrooms and cited in academic journals worldwide.' },
        ],
    },
    'reference-books': {
        title: 'Reference Books',
        breadcrumb: 'Literary Services',
        intro: 'We publish comprehensive reference books that serve as authoritative sources of information in their respective fields. Our reference books are curated by leading experts and reviewed by editorial boards to ensure accuracy and relevance.',
        guidelines: [
            'Reference book proposals should include a detailed table of contents and chapter summaries.',
            'Each chapter should be authored or co-authored by subject matter experts.',
            'Minimum 10 chapters per reference book (negotiable based on scope).',
            'Comprehensive bibliography and index are mandatory.',
            'Follow the provided template for consistent formatting across chapters.',
            'All contributors must sign intellectual property agreements.',
        ],
        cta: 'Propose a Reference Book',
        features: [
            { icon: Library, title: 'Comprehensive Coverage', desc: 'Our reference books provide exhaustive coverage of subjects for researchers and practitioners.' },
            { icon: PenTool, title: 'Expert Authorship', desc: 'Each volume is curated by recognized experts with extensive domain knowledge.' },
            { icon: Trophy, title: 'Quality Assurance', desc: 'Multi-stage review process ensures accuracy, clarity, and academic rigor.' },
        ],
    },
}

export default function LiteraryService({ type }) {
    const data = serviceData[type]
    const posters = data?.posters || []

    const [popupVisible, setPopupVisible] = useState(false)
    const [popupIndex, setPopupIndex] = useState(0)
    useReveal()

    /* Auto-show popup on mount for pages with posters */
    useEffect(() => {
        if (posters.length === 0) return
        const timer = setTimeout(() => setPopupVisible(true), 1000)
        return () => clearTimeout(timer)
    }, [posters.length])

    /* Arrow-key navigation */
    useEffect(() => {
        if (!popupVisible || posters.length === 0) return
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                setPopupIndex((i) => (i > 0 ? i - 1 : posters.length - 1))
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                setPopupIndex((i) => (i < posters.length - 1 ? i + 1 : 0))
            } else if (e.key === 'Escape') {
                setPopupVisible(false)
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [popupVisible, posters.length])

    const popupPrev = useCallback(() => setPopupIndex((i) => (i > 0 ? i - 1 : posters.length - 1)), [posters.length])
    const popupNext = useCallback(() => setPopupIndex((i) => (i < posters.length - 1 ? i + 1 : 0)), [posters.length])

    if (!data) return <div className="container" style={{ paddingTop: 120 }}><p>Page not found.</p></div>

    return (
        <>
            {/* ===== POPUP CAROUSEL ===== */}
            {popupVisible && posters.length > 0 && createPortal(
                <div className="patent-popup-overlay" onClick={() => setPopupVisible(false)}>
                    <div className="patent-popup" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="patent-popup-close"
                            onClick={() => setPopupVisible(false)}
                            aria-label="Close popup"
                        >
                            <X size={20} />
                        </button>

                        {posters.length > 1 && (
                            <>
                                <button className="popup-nav popup-nav-prev" onClick={popupPrev} aria-label="Previous image">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                </button>
                                <button className="popup-nav popup-nav-next" onClick={popupNext} aria-label="Next image">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                                </button>
                            </>
                        )}

                        <img
                            src={posters[popupIndex].src}
                            alt={posters[popupIndex].alt}
                            className="patent-popup-image"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />

                        {posters.length > 1 && (
                            <div className="popup-dots">
                                {posters.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`popup-dot${i === popupIndex ? ' active' : ''}`}
                                        onClick={() => setPopupIndex(i)}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}

        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>{data.breadcrumb}</span> / <span>{data.title}</span>
                    </div>
                    <h1>{data.title}</h1>
                    
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>{data.intro}</p>

                        {/* ===== POSTER IMAGES (inline) ===== */}
                        {posters.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: posters.length > 1 ? 'repeat(2, 1fr)' : '1fr',
                                gap: 24,
                                margin: '32px 0',
                            }}>
                                {posters.map((poster, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            borderRadius: 'var(--radius-md)',
                                            overflow: 'hidden',
                                            border: '1px solid var(--border-light)',
                                            boxShadow: 'var(--shadow-sm)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onClick={() => { setPopupIndex(i); setPopupVisible(true) }}
                                        onMouseOver={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                                        onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(0)' }}
                                    >
                                        <img
                                            src={poster.src}
                                            alt={poster.alt}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <h2>Submission Guidelines</h2>
                        <ul>
                            {data.guidelines.map((g, i) => (
                                <li key={i}>{g}</li>
                            ))}
                        </ul>

                        <h2>Why Publish With Us</h2>
                    </div>

                    <div className="services-grid" style={{ marginTop: 32 }}>
                        {data.features.map((f, i) => (
                            <div key={i} className="service-card reveal">
                                <div className="service-card-icon"><f.icon size={24} strokeWidth={1.5} /></div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary" style={{ marginRight: 16 }}>
                            {data.cta}
                        </Link>
                        <Link to="/process" className="btn btn-outline">
                            View Publication Process
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

