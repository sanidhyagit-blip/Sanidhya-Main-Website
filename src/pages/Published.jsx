import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { BookOpen, BookMarked } from 'lucide-react'

const publishedWorks = [
    { title: 'Advances in Sustainable Engineering', type: 'Edited Book', year: 2025, icon: BookOpen },
    { title: 'Contemporary Management Practices', type: 'Reference Book', year: 2025, icon: BookMarked },
    // { title: 'Innovation in Higher Education', type: 'Conference Proceedings', year: 2024, icon: '📙' },
    // { title: 'Digital Transformation in Healthcare', type: 'Edited Book', year: 2024, icon: '📕' },
    // { title: 'Research Methodology: A Modern Approach', type: 'Reference Book', year: 2024, icon: '📗' },
    // { title: 'Artificial Intelligence in Education', type: 'Edited Book', year: 2024, icon: '📘' },
    // { title: 'Global Business Strategy', type: 'Case Study Collection', year: 2023, icon: '📙' },
    // { title: 'Environmental Science & Policy', type: 'Conference Proceedings', year: 2023, icon: '📕' },
    // { title: 'Entrepreneurship & Innovation', type: 'Edited Book', year: 2023, icon: '📗' },
    // { title: 'Data Science for Social Good', type: 'Reference Book', year: 2023, icon: '📘' },
    // { title: 'Advances in Biotechnology', type: 'Conference Proceedings', year: 2022, icon: '📙' },
    // { title: 'Leadership in the Digital Age', type: 'Edited Book', year: 2022, icon: '📕' },
]

export default function Published() {
    useReveal()

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Published & Accomplished</span>
                    </div>
                    <h1>Published & Accomplished</h1>
                    <p>A curated showcase of our published academic works and accomplishments</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Our Publications</span>
                        <h2>Published Works</h2>
                        <p>Browse through our collection of published books, proceedings, and academic resources.</p>
                    </div>

                    <div className="published-grid">
                        {publishedWorks.map((work, i) => (
                            <div key={i} className="published-item reveal">
                                <div className="published-item-icon"><work.icon size={24} strokeWidth={1.5} /></div>
                                <h4>{work.title}</h4>
                                <p>{work.type} • {work.year}</p>
                                <a href="#" style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                                    View Details →
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 50 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary">
                            Publish Your Work
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
