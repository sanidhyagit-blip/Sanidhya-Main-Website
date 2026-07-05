import mongoose from 'mongoose'

const GalleryAlbumSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true, default: '' },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

export default mongoose.model('GalleryAlbum', GalleryAlbumSchema)
