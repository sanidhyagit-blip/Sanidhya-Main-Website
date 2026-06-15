import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

/**
 * Gallery data — organized into albums/categories.
 * Each album has a name and array of images.
 * Images will be replaced with real photos later; currently uses professional placeholders.
 */
const galleryAlbums = [
    {
        id: 'ivcgsmt-2026',
        name: 'IVCGSMT 2026 Conference',
        description: 'International Virtual Conference on Global Sustainable Management & Technologies',
        images: [
            { id: 1, src: '/conference-poster-1.jpg', alt: 'IVCGSMT 2026 Conference Details', caption: 'Conference Poster – Details' },
            { id: 2, src: '/conference-poster-2.jpg', alt: 'IVCGSMT 2026 Conference Deadlines', caption: 'Conference Poster – Deadlines' },
        ],
    },
    {
        id: 'fdp-2026',
        name: 'Faculty Development Program',
        description: 'One Day International Virtual FDP on Supply Chain Management',
        images: [
            { id: 3, src: '/fdp-poster.jpg', alt: 'FDP Poster', caption: 'FDP Event Poster' },
        ],
    },
    {
        id: 'general',
        name: 'General Gallery',
        description: 'Photos and media from various events and activities',
        images: [],
    },
]

function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft' && hasPrev) onPrev()
            if (e.key === 'ArrowRight' && hasNext) onNext()
        }
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [onClose, onPrev, onNext, hasPrev, hasNext])

    if (!image) return null

    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                {hasPrev && (
                    <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}
                {hasNext && (
                    <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                )}
                <img src={image.src} alt={image.alt} className="lightbox-image" />
                {image.caption && (
                    <div className="lightbox-caption">{image.caption}</div>
                )}
            </div>
        </div>
    )
}

export default function Gallery() {
    const [activeAlbum, setActiveAlbum] = useState('all')
    const [lightboxImage, setLightboxImage] = useState(null)
    const [allImages, setAllImages] = useState([])
    useReveal()

    // Flatten all images across albums for "All" filter
    useEffect(() => {
        const imgs = galleryAlbums.flatMap(album =>
            album.images.map(img => ({ ...img, albumId: album.id, albumName: album.name }))
        )
        setAllImages(imgs)
    }, [])

    const displayImages = activeAlbum === 'all'
        ? allImages
        : allImages.filter(img => img.albumId === activeAlbum)

    const currentIndex = lightboxImage ? displayImages.findIndex(img => img.id === lightboxImage.id) : -1

    const openLightbox = useCallback((img) => setLightboxImage(img), [])
    const closeLightbox = useCallback(() => setLightboxImage(null), [])
    const prevImage = useCallback(() => {
        if (currentIndex > 0) setLightboxImage(displayImages[currentIndex - 1])
    }, [currentIndex, displayImages])
    const nextImage = useCallback(() => {
        if (currentIndex < displayImages.length - 1) setLightboxImage(displayImages[currentIndex + 1])
    }, [currentIndex, displayImages])

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Gallery</span>
                    </div>
                    <h1>Gallery</h1>
                    <p>Moments captured from our events, conferences, and programs</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Album Filter Tabs */}
                    <div className="gallery-filters reveal">
                        <button
                            className={`gallery-filter-btn ${activeAlbum === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveAlbum('all')}
                            id="gallery-filter-all"
                        >
                            All Photos
                        </button>
                        {galleryAlbums.map(album => (
                            <button
                                key={album.id}
                                className={`gallery-filter-btn ${activeAlbum === album.id ? 'active' : ''}`}
                                onClick={() => setActiveAlbum(album.id)}
                                id={`gallery-filter-${album.id}`}
                            >
                                {album.name}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    {displayImages.length > 0 ? (
                        <div className="gallery-grid reveal">
                            {displayImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={`gallery-item delay-${(idx % 6) + 1}`}
                                    onClick={() => openLightbox(img)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
                                    id={`gallery-image-${img.id}`}
                                >
                                    <img src={img.src} alt={img.alt} loading="lazy" />
                                    <div className="gallery-item-overlay">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                                        </svg>
                                        {img.caption && <span className="gallery-item-caption">{img.caption}</span>}
                                    </div>
                                </div>
                            ))}

                            {/* Placeholder slots for future images */}
                            {[1, 2, 3].map(i => (
                                <div key={`placeholder-${i}`} className="gallery-item gallery-placeholder">
                                    <div className="gallery-placeholder-inner">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span>Coming Soon</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="gallery-empty reveal">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                            <h3>Photos Coming Soon</h3>
                            <p>Images for this album will be uploaded shortly. Check back later!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <Lightbox
                image={lightboxImage}
                onClose={closeLightbox}
                onPrev={prevImage}
                onNext={nextImage}
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < displayImages.length - 1}
            />
        </div>
    )
}
