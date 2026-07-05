import mongoose from 'mongoose'

const GalleryPhotoSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, default: '' },
        src: { type: String, required: true },
        alt: { type: String, trim: true, default: '' },
        caption: { type: String, trim: true, default: '' },
        albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'GalleryAlbum', required: true },
        publicId: { type: String, required: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

export default mongoose.model('GalleryPhoto', GalleryPhotoSchema)
