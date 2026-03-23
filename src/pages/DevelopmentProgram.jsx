import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const programData = {
    fdp: {
        title: 'Faculty Development Program',
        intro: 'Our Faculty Development Programs are designed to empower educators with modern teaching methodologies, research skills, and industry-relevant competencies to enhance academic excellence.',
        content: [
            {
                heading: 'Program Overview',
                text: 'Sanidhya\'s Faculty Development Programs (FDPs) provide intensive training modules for faculty members across all academic & research disciplines. Our programs are recognized by leading universities and are designed to enhance pedagogical skills, research capabilities, and professional growth.',
            },
            {
                heading: 'Key Focus Areas',
                items: [
                    'Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science',
                    'Technology Integration in Education',
                    'Curriculum Design & Outcome-Based Education',
                    'Intellectual Property Rights & Patent Filing',
                ],
            },
            {
                heading: 'Program Benefits',
                items: [
                    'Certificate of completion recognized by academic institutions.',
                    'Hands-on training with expert facilitators.',
                    'Access to curated resources and publication opportunities.',
                    'Networking with peers from diverse institutions.',
                    'Flexible delivery: in-person, online, and hybrid options.',
                    'Register for free or paid sessions as applicable.',
                    'Join via the provided link (virtual) or at the designated venue (in-person).',
                    'Participate in live Q&A and discussions.',
                ],
            },
        ],
    },
    mdp: {
        title: 'Management Development Program',
        intro: 'Our Management Development Programs equip professionals and faculty in Arts, Science and Management disciplines with cutting-edge frameworks, leadership skills, and strategic thinking capabilities.',
        content: [
            {
                heading: 'Program Overview',
                text: 'Sanidhya\'s Management Development Programs (MDPs) are designed for Arts, Science and Management faculty, corporate trainers, and emerging leaders. These intensive programs combine theoretical foundations with practical case studies to build competencies in strategic management, innovation, and organizational leadership.',
            },
            {
                heading: 'Key Focus Areas',
                items: [
                    'Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science',
                    'Strategic Leadership & Decision Making',
                    'Digital Transformation & Innovation Management',
                    'Financial Management & Risk Analysis',
                    'Human Resource Development & Organizational Behavior',
                    'Marketing Strategy & Consumer Analytics',
                    'Entrepreneurship & Start-up Ecosystem',
                    'International Business & Cross-Cultural Management',
                ],
            },
            {
                heading: 'Program Benefits',
                items: [
                    'Industry-recognized certification',
                    'Case-study and use case based learning with real-world scenarios',
                    'Mentorship from industry leaders and academic experts',
                    'Collaborative projects with peers from diverse backgrounds',
                    'Post-program support and resource access',
                    'Register for free or paid sessions as applicable.',
                    'Join via the provided link (virtual) or at the designated venue (in-person).',
                    'Participate in live Q&A and discussions.',
                ],
            },
        ],
    },
}

export default function DevelopmentProgram({ type }) {
    useReveal()
    const data = programData[type]

    if (!data) return <div className="container" style={{ paddingTop: 120 }}><p>Page not found.</p></div>

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Development Programs</span> / <span>{data.title}</span>
                    </div>
                    <h1>{data.title}</h1>
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>{data.intro}</p>

                        {data.content.map((section, i) => (
                            <div key={i}>
                                <h2>{section.heading}</h2>
                                {section.text && <p>{section.text}</p>}
                                {section.items && (
                                    <ul>
                                        {section.items.map((item, j) => <li key={j}>{item}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary" style={{ marginRight: 16 }}>
                            Enroll Now
                        </Link>
                        <Link to="/faq" className="btn btn-outline">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
