import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { BookOpen, Search, Globe, Building, BarChart3, GraduationCap, Library, PenTool, Trophy } from 'lucide-react'

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
    useReveal()
    const data = serviceData[type]

    if (!data) return <div className="container" style={{ paddingTop: 120 }}><p>Page not found.</p></div>

    return (
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
    )
}
