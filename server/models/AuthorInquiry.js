import mongoose from 'mongoose'

const authorInquirySchema = new mongoose.Schema({
    designation: { type: String, default: '' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    type: { type: String, required: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, default: 'received' },
}, { timestamps: true })

export default mongoose.model('AuthorInquiry', authorInquirySchema)
