import mongoose from 'mongoose'

const membershipSchema = new mongoose.Schema({
    // Personal Details
    title: { type: String, default: '' },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, default: '' },
    dob: { type: String, default: '' },
    nationality: { type: String, default: '' },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },

    // Affiliation
    institution: { type: String, default: '' },
    department: { type: String, default: '' },
    designation: { type: String, default: '' },
    institutionAddress: { type: String, default: '' },
    institutionWebsite: { type: String, default: '' },

    // Membership Details
    membershipType: { type: String, required: true },
    duration: { type: String, required: true },
    researchArea: { type: String, default: '' },
    highestQualification: { type: String, default: '' },
    experience: { type: String, default: '' },

    // Payment
    paymentMode: { type: String, default: '' },
    transactionRef: { type: String, default: '' },

    // Status
    status: { type: String, default: 'pending' },
}, { timestamps: true })

export default mongoose.model('MembershipApplication', membershipSchema)
