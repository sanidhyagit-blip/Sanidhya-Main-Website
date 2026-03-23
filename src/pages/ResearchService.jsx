import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const serviceData = {
    'national-conference': {
        title: 'National Conference',
        intro: 'Sanidhya organizes national conferences that bring together researchers, academicians, students, research scholars and industry professionals from across India to share knowledge, present findings, and foster collaborative partnerships along with networking opportunities.',
        overview: 'Our national conferences provide a premier platform for researchers to present their original work across multiple disciplines including science, technology, management, humanities, and social sciences. With keynote speeches from distinguished scholars, panel discussions, and networking sessions, our conferences are designed to catalyze academic excellence.',
        tracks: ['Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'Submit your abstract (250–300 words) through our online portal.',
            'Abstracts are reviewed by the scientific committee within 7 business days.',
            'Upon acceptance, submit your full paper following the provided template.',
            'Full papers undergo double-blind peer review.',
            'Accepted papers are scheduled for presentation and published in conference proceedings.',
        ],
    },
    'international-conference': {
        title: 'International Conference',
        intro: 'Our international conferences attracts researchers, academicians, students, research scholars and industry professionals from 30+ countries, providing a global stage for knowledge exchange, cross-cultural collaboration, and cutting-edge research presentations along with networking opportunities.',
        overview: 'Sanidhya\'s international conferences are flagship events that bring together the brightest minds from around the world. With hybrid participation options, simultaneous translation, and indexed proceedings, these events offer unmatched academic value and global visibility for your research.',
        tracks: ['Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'Submit your abstract through our international submission portal.',
            'Review by an international panel of experts from diverse institutions.',
            'Full paper submission after abstract acceptance.',
            'Peer review and editorial feedback provided.',
            'Presentation at the conference (in-person or virtual) and publication in indexed proceedings.',
        ],
    },
    'international-summits': {
        title: 'International Summits',
        intro: 'Our international summits are high-level gatherings that convene thought leaders, policymakers, researchers, academicians, students, research scholars and industry professionals to address pressing global challenges and shape the future of research and education.',
        overview: 'International summits organized by Sanidhya focus on strategic-level discussions about the direction of academic research, policy implications, and industry-academia collaboration. These invite-only events feature keynote addresses from world-renowned experts and produce actionable recommendations.',
        tracks: ['Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'Expression of interest submitted through our summit portal.',
            'Invitation extended based on academic credentials and contribution potential.',
            'Position paper submission for panel discussions.',
            'Participation in roundtable and breakout sessions.',
            'Summit proceedings and recommendations published post-event.',
        ],
    },
    'international-symposiums': {
        title: 'International Symposiums',
        intro: 'Sanidhya\'s international symposiums provide focused, interdisciplinary forums for researchers to present and discuss specific themes, fostering deep scholarly engagement and innovation.',
        overview: 'Our symposiums are designed for in-depth exploration of specific academic themes or research questions. Unlike broad conferences, symposiums create an intimate environment where experts can engage in substantive discourse, share methodological insights, and build long-term research partnerships.',
        tracks: ['Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'Submit an extended abstract (500 words) aligned with the symposium theme.',
            'Review by thematic committee within 10 business days.',
            'Full paper submission with detailed methodology and findings.',
            'Peer review by subject-specific experts.',
            'Oral or poster presentation at the symposium with published proceedings.',
        ],
    },
    'international-workshops': {
        title: 'International Workshops',
        intro: 'Our international workshops offer hands-on training and skill development opportunities for researchers, academicians, students, research scholars and industry professionals looking to enhance their academic capabilities.',
        overview: 'Sanidhya workshops are practical, skill-oriented events led by experienced facilitators and domain experts. Participants gain hands-on experience in research methodologies, academic writing, data analysis tools, and publication strategies. We provide 1-day/2-days/3-days or 1 month to 3 months workshops for any learner who looks forward to explore more understanding in advanced areas of studies. We provide workshops over 35 topics or on need based customised curriculum based on the requirements of learners and organizers. Workshops include interactive exercises, case discussions, and personalized feedback.',
        tracks: ['Research Methodology', 'Academic Writing', 'Publication Strategy' ,'Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'Browse available workshops and select your preferred topic and date.',
            'Register through our online portal with payment.',
            'Receive pre-workshop materials and preparation guidelines.',
            'Attend interactive sessions (in-person or virtual).',
            'Receive a certificate of participation and workshop resources.',
        ],
    },
    'seminars-webinars': {
        title: 'Seminars & Webinars',
        intro: 'Sanidhya regularly hosts seminars and webinars featuring international expert speakers who share insights on current trends, research findings, and academic best practices.',
        overview: 'Our seminars and webinars are accessible, knowledge-sharing events designed to keep the academic community updated on the latest developments across disciplines. Whether you join in-person or online, you\'ll benefit from expert presentations, Q&A sessions, and networking opportunities.',
        tracks: ['Research Trends', 'Academic Career Development', 'Technology in Education', 'Scholarly Communication', 'Science & Technology', 'Business & Management', 'Social Sciences', 'Engineering & Innovation', 'Education & Pedagogy', 'Advanced Sciences', 'Digital Transformation', 'Sustainable Development', 'Healthcare Innovation', 'Global Business Strategy', 'Artificial Intelligence & Data Science'],
        process: [
            'View our upcoming seminars and webinars calendar.',
            'Register for free or paid sessions as applicable.',
            'Join via the provided link (virtual) or at the designated venue (in-person).',
            'Participate in live Q&A and discussions.',
            'Access recorded sessions and materials post-event.',
        ],
    },
}

export default function ResearchService({ type }) {
    useReveal()
    const data = serviceData[type]

    if (!data) return <div className="container" style={{ paddingTop: 120 }}><p>Page not found.</p></div>

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Research Services</span> / <span>{data.title}</span>
                    </div>
                    <h1>{data.title}</h1>
                    
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>{data.intro}</p>

                        <h2>Overview</h2>
                        <p>{data.overview}</p>

                        {data.tracks && (
                            <>
                                <h2>Area of Research</h2>
                                <ul>
                                    {data.tracks.map((t, i) => <li key={i}>{t}</li>)}
                                </ul>
                            </>
                        )}

                        <h2>Submission & Registration Process</h2>
                        <ul>
                            {data.process.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary" style={{ marginRight: 16 }}>
                            Register Now
                        </Link>
                        <Link to="/faq" className="btn btn-outline">
                            Have Questions?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
