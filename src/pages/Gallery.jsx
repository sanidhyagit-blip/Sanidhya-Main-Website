import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import API_BASE from '../api'

// ── Lightbox ──────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext, hasPrev, hasNext }) {
    useEffect(() => {
        if (!image) return
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
    }, [image, onClose, onPrev, onNext, hasPrev, hasNext])

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
                <img src={image.src} alt={image.alt || image.name} className="lightbox-image" />
                {(image.name || image.caption) && (
                    <div className="lightbox-caption">
                        {image.name && <strong style={{ display: 'block' }}>{image.name}</strong>}
                        {image.caption && <span>{image.caption}</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

// ── Gallery Skeleton ──────────────────────────────────
function GallerySkeleton() {
    return (
        <div className="gallery-grid" style={{ opacity: 0.5 }}>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="gallery-item gallery-placeholder" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
                    <div className="gallery-placeholder-inner">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>Loading…</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ── Main Gallery Page ─────────────────────────────────
export default function Gallery() {
    const [activeAlbum, setActiveAlbum] = useState('all')
    const [lightboxImage, setLightboxImage] = useState(null)
    const [albums, setAlbums] = useState([])
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useReveal()

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true)
            setError(null)
            try {
                const [albumsRes, photosRes] = await Promise.all([
                    fetch(`${API_BASE}/api/gallery/albums`),
                    fetch(`${API_BASE}/api/gallery/photos`),
                ])
                const albumsData = await albumsRes.json()
                const photosData = await photosRes.json()
                if (albumsData.success) setAlbums(albumsData.albums)
                if (photosData.success) setPhotos(photosData.photos)
            } catch {
                setError('Could not load gallery. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchGallery()
    }, [])

    const displayPhotos = activeAlbum === 'all'
        ? photos
        : photos.filter(p => p.albumId?._id === activeAlbum || p.albumId === activeAlbum)

    const currentIndex = lightboxImage
        ? displayPhotos.findIndex(p => p._id === lightboxImage._id)
        : -1

    const openLightbox = useCallback((img) => setLightboxImage(img), [])
    const closeLightbox = useCallback(() => setLightboxImage(null), [])
    const prevImage = useCallback(() => {
        if (currentIndex > 0) setLightboxImage(displayPhotos[currentIndex - 1])
    }, [currentIndex, displayPhotos])
    const nextImage = useCallback(() => {
        if (currentIndex < displayPhotos.length - 1) setLightboxImage(displayPhotos[currentIndex + 1])
    }, [currentIndex, displayPhotos])

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
                            All Photos {!loading && `(${photos.length})`}
                        </button>
                        {albums.map(album => (
                            <button
                                key={album._id}
                                className={`gallery-filter-btn ${activeAlbum === album._id ? 'active' : ''}`}
                                onClick={() => setActiveAlbum(album._id)}
                                id={`gallery-filter-${album.slug}`}
                            >
                                {album.name}
                            </button>
                        ))}
                    </div>

                    {/* Album description */}
                    {activeAlbum !== 'all' && (() => {
                        const a = albums.find(a => a._id === activeAlbum)
                        return a?.description
                            ? <p className="reveal" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>{a.description}</p>
                            : null
                    })()}

                    {/* States */}
                    {loading && <GallerySkeleton />}

                    {!loading && error && (
                        <div className="gallery-empty reveal">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <h3>Something went wrong</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && displayPhotos.length === 0 && (
                        <div className="gallery-empty reveal">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                            <h3>Photos Coming Soon</h3>
                            <p>Images for this album will be uploaded shortly. Check back later!</p>
                        </div>
                    )}

                    {/* Gallery Grid */}
                    {!loading && !error && displayPhotos.length > 0 && (
                        <div className="gallery-grid reveal">
                            {displayPhotos.map((photo, idx) => (
                                <div
                                    key={photo._id}
                                    className={`gallery-item delay-${(idx % 6) + 1}`}
                                    onClick={() => openLightbox(photo)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(photo)}
                                    id={`gallery-image-${photo._id}`}
                                >
                                    <img src={photo.src} alt={photo.alt || photo.name} loading="lazy" />
                                    <div className="gallery-item-overlay">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                                        </svg>
                                        {(photo.name || photo.caption) && (
                                            <span className="gallery-item-caption">{photo.name || photo.caption}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
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
                hasNext={currentIndex < displayPhotos.length - 1}
            />
        </div>
    )
}
