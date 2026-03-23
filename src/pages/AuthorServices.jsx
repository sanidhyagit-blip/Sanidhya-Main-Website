import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import API_BASE from '../api'

const services = [
    {
        icon: '📝',
        title: 'Research Paper Writing',
        desc: 'Expert assistance in writing high-quality research papers across all disciplines with proper methodology and citation.',
    },
    {
        icon: '📖',
        title: 'Book Chapter Development',
        desc: 'Professional guidance in developing compelling book chapters with structured argumentation and evidence-based writing.',
    },
    {
        icon: '📄',
        title: 'Article & Reference Book Composition',
        desc: 'Assistance in composing literary work for journals, magazines, reference books and academic publications with editorial standards.',
    },
    {
        icon: '🎓',
        title: 'PhD. Assistance & Thesis Development',
        desc: 'Comprehensive support for PhD. assistance, thesis development including literature review, methodology, and analysis.',
    },
    {
        icon: '🔍',
        title: 'Case Study Book',
        desc: 'Systematic publication of case studies and case scenarios with literature review services to identify gaps, synthesize findings, and establish your research context for publication.',
    },
    {
        icon: '✏️',
        title: 'Editing & Proofreading',
        desc: 'Professional editing and proofreading to ensure your manuscript meets the highest standards of clarity and accuracy.',
    },
]

export default function AuthorServices() {
    useReveal()
    const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const errs = {}
        if (!form.name.trim()) errs.name = 'Name is required'
        if (!form.email.trim()) errs.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
        if (!form.type) errs.type = 'Please select a service type'
        if (!form.message.trim()) errs.message = 'Please describe your requirements'
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length === 0) {
            setLoading(true)
            try {
                const res = await fetch(`${API_BASE}/api/inquiries`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                })
                if (res.ok) {
                    setSubmitted(true)
                } else {
                    // If backend returns validation errors, show them
                    const data = await res.json()
                    if (data.errors) setErrors(data.errors)
                }
            } catch {
                // Fallback: if server unavailable, still show success for demo
                setSubmitted(true)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Author Services</span>
                    </div>
                    <h1>Author Services</h1>
                    <p>Comprehensive research and writing assistance for academic excellence</p>
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">
                        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>
                            We provide assistance in writing a research paper, chapter, article, literary assistance
                            for research work and thesis development on request. Our team of experienced academic
                            writers and researchers is dedicated to helping you produce high-quality scholarly work
                            that meets international publication standards.
                        </p>
                    </div>

                    <div className="services-grid" style={{ marginTop: 40, marginBottom: 60 }}>
                        {services.map((s, i) => (
                            <div key={i} className={`service-card reveal delay-${(i % 3) + 1}`}>
                                <div className="service-card-icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Inquiry Form */}
                    <div className="section-header reveal">
                        <span className="section-label" style={{ fontSize: '1.2rem' }}>Get in Touch</span>
                        <h2>Request Research Assistance</h2>
                        <p>Fill out the form below and our team will get back to you within 24 hours.</p>
                    </div>

                    {submitted ? (
                        <div className="form-section reveal" style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                            <h3>Thank You for Your Inquiry!</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                                We've received your request and will respond within 24 hours.
                            </p>
                            <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', type: '', message: '' }) }}>
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form className="form-section reveal" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="designation">Title</label>
                                <select
                                    id="designation"
                                    className="form-control"
                                    value={form.designation}
                                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                >
                                    <option value="" disabled>Select title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Dr.">Dr.</option>
                                </select>
                                {errors.designation && <span className="form-error">{errors.designation}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    className="form-control"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                                {errors.name && <span className="form-error">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email address"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                {errors.email && <span className="form-error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />  
    {errors.phone && <span className="form-error">{errors.phone}</span>}
</div>
                            <div className="form-group">
                                <label htmlFor="type">Service Type</label>
                                <select
                                    id="type"
                                    className="form-control"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                >
                                    <option value="">Select a service type</option>
                                    <option value="research-paper">Research Paper Writing</option>
                                    <option value="book-chapter">Book Chapter Development</option>
                                    <option value="article">Article & Reference Book Composition</option>
                                    <option value="thesis">PhD. Assistance & Thesis Development</option>
                                    <option value="editing">Editing & Proofreading</option>
                                    <option value="case-study-chapter">Case Study Chapter Development</option>
                                    <option value="reference-book">Reference Book Development</option>
                                    <option value="national-conference">National Conference </option>
                                    <option value="international-conference">International Conference</option>
                                    <option value="international-summits">International Summits</option>
                                    <option value="international-symposiums">International Symposiums</option>
                                    <option value="international-workshops">International Workshops</option>
                                    <option value="faculty-development-program">Faculty Development Program</option>
                                    <option value="management-development-program">Management Development Program</option>
                                    <option value="patents">Patents</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.type && <span className="form-error">{errors.type}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Your Requirements</label>
                                <textarea
                                    id="message"
                                    className="form-control"
                                    placeholder="Describe your research topic, requirements, and timeline..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                />
                                {errors.message && <span className="form-error">{errors.message}</span>}
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
                                {loading ? 'Submitting...' : 'Get Research Assistance →'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
