import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import AuthorInquiry from './models/AuthorInquiry.js'
import MembershipApplication from './models/MembershipApplication.js'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'sanidhya-admin-2026'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// ==========================================
// Connect to MongoDB Atlas
// ==========================================
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('  ✦ Connected to MongoDB Atlas'))
    .catch(err => {
        console.error('  ✗ MongoDB connection error:', err.message)
        process.exit(1)
    })

// ==========================================
// API Routes
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' })
})

// ── Author Services Inquiry ──────────────────────────
app.post('/api/inquiries', async (req, res) => {
    const { designation, name, email, phone, type, message } = req.body

    const errors = {}
    if (!name?.trim()) errors.name = 'Name is required'
    if (!email?.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format'
    if (!type) errors.type = 'Service type is required'
    if (!message?.trim()) errors.message = 'Message is required'

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    try {
        const inquiry = await AuthorInquiry.create({
            designation: designation?.trim() || '',
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || '',
            type,
            message: message.trim(),
        })
        res.status(201).json({ success: true, inquiry })
    } catch (err) {
        console.error('Error saving inquiry:', err)
        res.status(500).json({ success: false, error: 'Failed to save inquiry' })
    }
})

// Get all inquiries (admin)
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await AuthorInquiry.find().sort({ createdAt: -1 })
        res.json({ success: true, count: inquiries.length, inquiries })
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch inquiries' })
    }
})

// ── Membership Applications ──────────────────────────
app.post('/api/memberships', async (req, res) => {
    const { firstName, lastName, email, membershipType, duration } = req.body

    const errors = {}
    if (!firstName?.trim()) errors.firstName = 'First name is required'
    if (!lastName?.trim()) errors.lastName = 'Last name is required'
    if (!email?.trim()) errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format'
    if (!membershipType) errors.membershipType = 'Membership type is required'
    if (!duration) errors.duration = 'Duration is required'

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    try {
        const application = await MembershipApplication.create(req.body)
        res.status(201).json({ success: true, application })
    } catch (err) {
        console.error('Error saving membership:', err)
        res.status(500).json({ success: false, error: 'Failed to save membership application' })
    }
})

// Get all membership applications (admin)
app.get('/api/memberships', async (req, res) => {
    try {
        const applications = await MembershipApplication.find().sort({ createdAt: -1 })
        res.json({ success: true, count: applications.length, applications })
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to fetch applications' })
    }
})

// Approve or reject a membership application (admin)
app.patch('/api/memberships/:id', async (req, res) => {
    const { status } = req.body
    if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' })
    }
    try {
        const application = await MembershipApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!application) return res.status(404).json({ success: false, error: 'Not found' })
        res.json({ success: true, application })
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to update status' })
    }
})

// Mark an inquiry as handled (admin)
app.patch('/api/inquiries/:id', async (req, res) => {
    const { status } = req.body
    if (!['received', 'handled'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' })
    }
    try {
        const inquiry = await AuthorInquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!inquiry) return res.status(404).json({ success: false, error: 'Not found' })
        res.json({ success: true, inquiry })
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to update status' })
    }
})

// Admin login (simple password check)
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true })
    } else {
        res.status(401).json({ success: false, error: 'Incorrect password' })
    }
})

// ── Other existing routes ────────────────────────────

// Get recent activities / events
app.get('/api/activities', (req, res) => {
    const activities = [
        {
            id: 1,
            tag: 'Conference',
            title: 'International Conference on Research Innovation 2026',
            description: 'Join leading researchers from across the globe to discuss breakthrough innovations in science and technology.',
            date: '2026-04-15',
            registrationOpen: true,
            registrationLink: '#',
            type: 'brochure',
        },
        {
            id: 2,
            tag: 'Workshop',
            title: 'Research Methodology Workshop – March 2026',
            description: 'A hands-on workshop covering advanced research methodologies, data analysis, and publication strategies.',
            date: '2026-03-10',
            registrationOpen: true,
            registrationLink: '#',
            type: 'flyer',
        },
        {
            id: 3,
            tag: 'Webinar',
            title: 'Academic Writing Excellence Webinar Series',
            description: 'Expert-led sessions on crafting high-impact research papers, systematic reviews, and grant proposals.',
            date: '2026-02-28',
            registrationOpen: true,
            registrationLink: '#',
            type: 'flyer',
        },
        {
            id: 4,
            tag: 'Summit',
            title: 'International Summit on Sustainable Development 2026',
            description: 'High-level summit addressing SDGs through interdisciplinary research and global policy collaboration.',
            date: '2026-06-20',
            registrationOpen: false,
            registrationLink: '#',
            type: 'brochure',
        },
    ]
    res.json({ success: true, activities })
})

// Get published works
app.get('/api/published', (req, res) => {
    const works = [
        { id: 1, title: 'Advances in Sustainable Engineering', type: 'Edited Book', year: 2025, isbn: '978-81-XXXXX-01' },
        { id: 2, title: 'Contemporary Management Practices', type: 'Reference Book', year: 2025, isbn: '978-81-XXXXX-02' },
        { id: 3, title: 'Innovation in Higher Education', type: 'Conference Proceedings', year: 2024, isbn: '978-81-XXXXX-03' },
        { id: 4, title: 'Digital Transformation in Healthcare', type: 'Edited Book', year: 2024, isbn: '978-81-XXXXX-04' },
        { id: 5, title: 'Research Methodology: A Modern Approach', type: 'Reference Book', year: 2024, isbn: '978-81-XXXXX-05' },
        { id: 6, title: 'Artificial Intelligence in Education', type: 'Edited Book', year: 2024, isbn: '978-81-XXXXX-06' },
        { id: 7, title: 'Global Business Strategy', type: 'Case Study Collection', year: 2023, isbn: '978-81-XXXXX-07' },
        { id: 8, title: 'Environmental Science & Policy', type: 'Conference Proceedings', year: 2023, isbn: '978-81-XXXXX-08' },
        { id: 9, title: 'Entrepreneurship & Innovation', type: 'Edited Book', year: 2023, isbn: '978-81-XXXXX-09' },
        { id: 10, title: 'Data Science for Social Good', type: 'Reference Book', year: 2023, isbn: '978-81-XXXXX-10' },
        { id: 11, title: 'Advances in Biotechnology', type: 'Conference Proceedings', year: 2022, isbn: '978-81-XXXXX-11' },
        { id: 12, title: 'Leadership in the Digital Age', type: 'Edited Book', year: 2022, isbn: '978-81-XXXXX-12' },
    ]
    res.json({ success: true, works })
})

// Conference / event registration
app.post('/api/register', (req, res) => {
    const { name, email, eventId, institution, designation } = req.body

    const errors = {}
    if (!name?.trim()) errors.name = 'Name is required'
    if (!email?.trim()) errors.email = 'Email is required'
    if (!eventId) errors.eventId = 'Event selection is required'

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }

    res.status(201).json({
        success: true,
        registration: {
            confirmationId: `REG-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            eventId,
            institution: institution?.trim() || '',
            designation: designation?.trim() || '',
            registeredAt: new Date().toISOString(),
        },
    })
})

// FAQ data endpoint
app.get('/api/faq', (req, res) => {
    const faqs = [
        { id: 1, question: 'What types of academic works can I submit?', answer: 'We accept research papers, book chapters, case studies, review articles, and conference papers across all academic disciplines.' },
        { id: 2, question: 'How long does the peer review process take?', answer: 'Our average peer review turnaround time is 2–4 weeks from submission date.' },
        { id: 3, question: 'What is your plagiarism policy?', answer: 'All submissions must have a plagiarism score below 10% as checked by Turnitin or iThenticate.' },
        { id: 4, question: 'Do you provide ISBN and DOI?', answer: 'Yes, all books receive ISBNs and journal articles receive DOIs for global identification.' },
    ]
    res.json({ success: true, faqs })
})

// Start server
app.listen(PORT, () => {
    console.log(`\n  ✦ Sanidhya API Server`)
    console.log(`  ➜ Local:   http://localhost:${PORT}`)
    console.log(`  ➜ Health:  http://localhost:${PORT}/api/health`)
    console.log(`  ➜ Ready to accept requests\n`)
})
