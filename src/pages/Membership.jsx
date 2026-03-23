import { useState } from 'react'
import API_BASE from '../api'

const initialState = {
    // Personal Details
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    nationality: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',

    // Affiliation
    institution: '',
    department: '',
    designation: '',
    institutionAddress: '',
    institutionWebsite: '',

    // Membership Details
    membershipType: '',
    duration: '',
    researchArea: '',
    highestQualification: '',
    experience: '',

    // Payment
    paymentMode: '',
    transactionRef: '',

    // Consent
    agree: false,
}

export default function Membership() {
    const [form, setForm] = useState(initialState)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')

    const handle = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const validate = () => {
        const req = ['title', 'firstName', 'lastName', 'gender', 'dob', 'nationality',
            'email', 'phone', 'address', 'city', 'state', 'country', 'postalCode',
            'institution', 'designation', 'membershipType', 'duration',
            'researchArea', 'highestQualification', 'paymentMode', 'transactionRef', 'agree']
        const errs = {}
        req.forEach(k => {
            if (!form[k] || form[k] === false) errs[k] = 'This field is required.'
        })
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
        return errs
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true)
        setServerError('')
        try {
            const res = await fetch(`${API_BASE}/api/memberships`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setSubmitted(true)
                window.scrollTo(0, 0)
            } else {
                const data = await res.json()
                if (data.errors) setErrors(data.errors)
                else setServerError(data.error || 'Submission failed. Please try again.')
            }
        } catch {
            setServerError('Could not reach server. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) return (
        <div className="membership-page">
            <div className="membership-success">
                <div className="success-icon">✓</div>
                <h2>Registration Submitted!</h2>
                <p>Thank you for registering with <strong>Sanidhya</strong>. We have received your membership application and will get in touch with you shortly.</p>
                <button className="btn btn-primary" onClick={() => { setForm(initialState); setSubmitted(false) }}>
                    Register Another
                </button>
            </div>
        </div>
    )

    const Field = ({ label, name, type = 'text', required, children, placeholder }) => (
        <div className={`mf-group${errors[name] ? ' mf-error' : ''}`}>
            <label className="mf-label">{label}{required && <span className="mf-req">✶</span>}</label>
            {children ? children :
                <input
                    className="mf-input"
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handle}
                    placeholder={placeholder || ''}
                />
            }
            {errors[name] && <span className="mf-err-msg">{errors[name]}</span>}
        </div>
    )

    const Select = ({ label, name, required, options }) => (
        <div className={`mf-group${errors[name] ? ' mf-error' : ''}`}>
            <label className="mf-label">{label}{required && <span className="mf-req">✶</span>}</label>
            <select className="mf-input mf-select" name={name} value={form[name]} onChange={handle}>
                <option value="">— Select —</option>
                {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
            </select>
            {errors[name] && <span className="mf-err-msg">{errors[name]}</span>}
        </div>
    )

    return (
        <div className="membership-page">
            {/* Hero */}
            <div className="membership-hero">
                <div className="membership-hero-overlay" />
                <div className="membership-hero-content">
                    <span className="hero-badge" style={{ fontSize: '1.2rem' }}>Join Us</span>
                    <h1>Membership Registration</h1>
                    <p>Become a valued member of Sanidhya and unlock academic & research excellence together.</p>
                </div>
            </div>

            <div className="membership-wrapper">
                {/* Info Cards */}
                <div className="membership-info-row">
                    <div className="minfo-card">
                        <div className="minfo-icon"></div>
                        <h4>Eligibility</h4>
                        <ul>
                            <li>Academicians &amp; researchers from higher learning institutes</li>
                            <li>Industry experts including the education sector</li>
                            <li>UG / PG students from all disciplines</li>
                        </ul>
                    </div>
                    <div className="minfo-card">
                        <div className="minfo-icon"></div>
                        <h4>Membership Fee</h4>
                        <ul>
                            <li> ₹3000/- (1 year)</li>
                            <li> ₹5999/- (2 years)</li>
                        </ul>
                    </div>
                    <div className="minfo-card">
                        <div className="minfo-icon"></div>
                        <h4>Benefits</h4>
                        <ul>
                            <li>Free registration for Annual Research Excellence Awards</li>
                            <li>Lucrative discounts on conference registration fees</li>
                            <li>Opportunities to be invited as the organizing committee, reviewer, editorial board member, session chair, judge, moderator, and invited speaker in international conferences, webinars, symposia, seminars, workshops, and courses organized by Sanidhya.</li>
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <form className="membership-form" onSubmit={handleSubmit} noValidate>
                    <p className="mf-note">Fields marked with <span className="mf-req">✶</span> are required.</p>

                    {/* ─── Personal Details ─── */}
                    <div className="mf-section">
                        <h3 className="mf-section-title">Personal Details</h3>
                        <div className="mf-grid mf-grid-3">
                            <Select label="Title" name="title" required options={['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.']} />
                            <Field label="First Name" name="firstName" required placeholder="Enter first name" />
                            <Field label="Last Name" name="lastName" required placeholder="Enter last name" />
                        </div>
                        <div className="mf-grid mf-grid-3">
                            <Select label="Gender" name="gender" required options={['Male', 'Female', 'Other']} />
                            <Field label="Date of Birth" name="dob" type="date" required />
                            <Field label="Nationality" name="nationality" required placeholder="e.g. Indian" />
                        </div>
                        <div className="mf-grid mf-grid-2">
                            <Field label="Email Address" name="email" type="email" required placeholder="you@example.com" />
                            <Field label="Phone Number" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="mf-grid mf-grid-2">
                            <Field label="WhatsApp Number" name="whatsapp" type="tel" placeholder="+91 XXXXX XXXXX" />
                            <Field label="Postal / ZIP Code" name="postalCode" required placeholder="Enter postal code" />
                        </div>
                        <Field label="Residential Address" name="address" required placeholder="Street address">
                            <textarea className="mf-input mf-textarea" name="address" value={form.address} onChange={handle} placeholder="Street address, Apartment, Suite, etc." rows={2} />
                        </Field>
                        <div className="mf-grid mf-grid-3">
                            <Field label="City" name="city" required placeholder="City" />
                            <Field label="State / Province" name="state" required placeholder="State" />
                            <Field label="Country" name="country" required placeholder="Country" />
                        </div>
                    </div>

                    {/* ─── Affiliation ─── */}
                    <div className="mf-section">
                        <h3 className="mf-section-title">Affiliation</h3>
                        <div className="mf-grid mf-grid-2">
                            <Field label="Institution / Organisation Name" name="institution" required placeholder="Full name of institution" />
                            <Field label="Department" name="department" placeholder="e.g. Computer Science" />
                        </div>
                        <div className="mf-grid mf-grid-2">
                            <Field label="Designation / Position" name="designation" required placeholder="e.g. Assistant Professor" />
                            <Field label="Institution Website" name="institutionWebsite" placeholder="https://your-institution.edu" />
                        </div>
                        <Field label="Institution Address" name="institutionAddress" placeholder="Full address of your institution">
                            <textarea className="mf-input mf-textarea" name="institutionAddress" value={form.institutionAddress} onChange={handle} placeholder="Full address of your institution" rows={2} />
                        </Field>
                    </div>

                    {/* ─── Membership Details ─── */}
                    <div className="mf-section">
                        <h3 className="mf-section-title">Membership Details</h3>
                        <div className="mf-grid mf-grid-2">
    
                            <Select label="Membership Duration" name="duration" required
                                options={[{ value: '1year', label: '1 Year' }, { value: '2year', label: '2 Years' }]} />
                        </div>
                        <div className="mf-grid mf-grid-2">
                            <Select label="Highest Qualification" name="highestQualification" required
                                options={['Undergraduate', 'Postgraduate', 'Ph.D.', 'Post-Doctoral', 'Other']} />
                            <Select label="Years of Experience" name="experience"
                                options={['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', 'More than 10 years']} />
                        </div>
                        <Field label="Area of Research / Specialisation" name="researchArea" required placeholder="e.g. Machine Learning, Management, Biochemistry…" />
                    </div>

                    {/* ─── Membership Certification ─── */}
                    <div className="mf-section mf-cert-section">
                        <h3 className="mf-section-title">Membership Certification</h3>
                        <p className="mf-note mf-cert-note">Upon approval, you will receive an official Sanidhya Membership Certificate valid for the selected duration. Benefits include free participation in Annual Research Excellence Awards and a lucarative discount on all conference registration fees. Opportunities to be invited as the organizing committee, reviewer, editorial board member, session chair, judge, moderator, and invited speaker in international conferences, webinars, symposia, seminars, workshops, and courses organized by Sanidhya.</p>
                        </div>

                    {/* ─── Payment ─── */}
                    <div className="mf-section">
                        <h3 className="mf-section-title">Payment Details</h3>
                        <div className="mf-bank-box">
                            <div className="mf-bank-row"><span>Bank Name</span><strong>Sanidhya Inspiring Academic Excellence</strong></div>
                            <div className="mf-bank-row"><span>Account Number</span><strong>60571391574</strong></div>
                            <div className="mf-bank-row"><span>Branch</span><strong>Ramraoadik College Of Engineering</strong></div>
                            <div className="mf-bank-row"><span>IFSC Code</span><strong>MAHB00001292</strong></div>
                            {/* <div className="mf-bank-row"><span>Swift Code</span><strong>HDFCINBB</strong></div> */}
                            {/* <div className="mf-bank-row"><span>WhatsApp (queries)</span><strong>+91-7845059475</strong></div> */}
                        </div>
                        <div className="mf-grid mf-grid-2">
                            <Select label="Payment Mode" name="paymentMode" required
                                options={['Bank Transfer / NEFT / RTGS', 'UPI', 'International Wire Transfer', 'Other']} />
                            <Field label="Transaction Reference / UTR Number" name="transactionRef" required placeholder="Enter transaction ID or UTR" />
                        </div>
                    </div>

                    {/* ─── Declaration ─── */}
                    <div className="mf-section mf-declaration">
                        <div className={`mf-checkbox-group${errors.agree ? ' mf-error' : ''}`}>
                            <label className="mf-checkbox-label">
                                <input type="checkbox" name="agree" checked={form.agree} onChange={handle} />
                                <span>I hereby declare that the information provided above is true and correct to the best of my knowledge. I agree to abide by the rules and regulations of Sanidhya's membership programme.</span>
                            </label>
                            {errors.agree && <span className="mf-err-msg">{errors.agree}</span>}
                        </div>
                    </div>

                    {serverError && (
                        <div style={{ color: 'var(--error, #e53e3e)', marginBottom: 12, textAlign: 'center', fontWeight: 500 }}>
                            {serverError}
                        </div>
                    )}
                    <div className="mf-submit-row">
                        <button type="submit" className="btn btn-primary mf-submit-btn" disabled={loading}>
                            {loading ? 'Submitting…' : 'Submit Membership Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
