import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

export default function IPR() {
    useReveal()

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>IPR</span> / <span>Patents</span>
                    </div>
                    <h1>Patents & Intellectual Property Rights</h1>
                    <p>Protect your innovations with expert patent filing assistance</p>
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>
                            Sanidhya provides comprehensive patent filing assistance to researchers, inventors, and
                            academic institutions. Our team of IPR experts guides you through every step of the patent
                            process, from prior art search to filing.
                        </p>

                        <h2>Our Patent Services</h2>
                        <ul>
                            <li>Prior art search and patentability analysis.</li>
                            <li>Patent drafting and specification writing.</li>
                            <li>Filing with Indian Patent Office (IPO) and international bodies.</li>
                            <li>Patent prosecution and examination support.</li>
                            <li>PCT (Patent Cooperation Treaty) international applications.</li>
                            <li>IP portfolio management and strategy.</li>
                            <li>Patent licensing and commercialization guidance.</li>
                        </ul>

                        <h2>Why Protect Your Intellectual Property?</h2>
                        <p>
                            In today's knowledge economy, protecting your intellectual property is crucial for maintaining
                            competitive advantage and ensuring fair recognition. Whether you're a researcher with a novel
                            methodology, an engineer with an innovative design, or a faculty member with a unique educational
                            tool, patent protection secures your rights.
                        </p>

                        <h2>Our Process</h2>
                        <ul>
                            <li>Initial consultation to understand your invention and its novelty.</li>
                            <li>Comprehensive prior art search to assess patentability.</li>
                            <li>Drafting of patent specification with claims.</li>
                            <li>Filing the application with the appropriate patent office.</li>
                            <li>Responding to examination reports and office actions.</li>
                            <li>Patent grant and maintenance support.</li>
                        </ul>

                        <blockquote>
                            "Innovation distinguishes between a leader and a follower." – Our patent services ensure
                            your innovations receive the protection and recognition they deserve.
                        </blockquote>

                        <h2>Types of Patents We Handle</h2>
                        <ul>
                            <li>Utility Patents – for new and useful inventions.</li>
                            <li>Design Patents – for new, original ornamental designs.</li>
                            <li>Plant Patents – for new plant varieties.</li>
                            <li>Provisional Patents – to secure an early filing date.</li>
                        </ul>
                    </div>

                    <div className="services-grid" style={{ marginTop: 40 }}>
                        <div className="service-card reveal delay-1">
                            <div className="service-card-icon">🔬</div>
                            <h3>Expert Guidance</h3>
                            <p>Our team of patent attorneys and IPR specialists provides end-to-end support for your patent journey.</p>
                        </div>
                        <div className="service-card reveal delay-2">
                            <div className="service-card-icon">⚡</div>
                            <h3>Fast Processing</h3>
                            <p>Streamlined processes to ensure your patent applications are filed promptly and accurately.</p>
                        </div>
                        <div className="service-card reveal delay-3">
                            <div className="service-card-icon">🛡️</div>
                            <h3>Complete Protection</h3>
                            <p>From filing to grant, we manage every aspect of your patent lifecycle for maximum protection.</p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary" style={{ marginRight: 16 }}>
                            Contact Us for Patent Filing
                        </Link>
                        <Link to="/faq" className="btn btn-outline">
                            Patent FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
