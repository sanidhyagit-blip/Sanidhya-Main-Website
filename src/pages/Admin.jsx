import { useState, useEffect, useCallback, useRef } from 'react'
import API_BASE from '../api'

const STATUS_COLORS = {
    pending: { bg: '#fef3c7', text: '#92400e', label: 'Pending' },
    approved: { bg: '#d1fae5', text: '#065f46', label: 'Approved' },
    rejected: { bg: '#fee2e2', text: '#991b1b', label: 'Rejected' },
    received: { bg: '#e0f2fe', text: '#0c4a6e', label: 'Received' },
    handled: { bg: '#f0fdf4', text: '#166534', label: 'Handled' },
}

function StatusBadge({ status }) {
    const c = STATUS_COLORS[status] || STATUS_COLORS.pending
    return (
        <span style={{
            background: c.bg, color: c.text,
            padding: '3px 10px', borderRadius: 20,
            fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap',
        }}>{c.label}</span>
    )
}

// ── Login Screen ─────────────────────────────────────
function AdminLogin({ onLogin }) {
    const [pw, setPw] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const res = await fetch(`${API_BASE}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pw }),
            })
            if (res.ok) { onLogin() }
            else { setError('Incorrect password. Please try again.') }
        } catch {
            setError('Cannot reach server.')
        } finally { setLoading(false) }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'var(--bg, #f8f7f4)',
        }}>
            <form onSubmit={submit} style={{
                background: '#fff', borderRadius: 16, padding: '48px 40px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.10)', width: '100%', maxWidth: 400,
                display: 'flex', flexDirection: 'column', gap: 16,
            }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>🔐</div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Admin Access</h2>
                    <p style={{ color: '#6b7280', marginTop: 6, fontSize: '0.9rem' }}>Sanidhya Dashboard</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter admin password"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        autoFocus
                    />
                </div>
                {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 4 }}>
                    {loading ? 'Verifying…' : 'Login →'}
                </button>
            </form>
        </div>
    )
}

// ── Membership Table ─────────────────────────────────
function MembershipCard({ app, onStatusChange }) {
    const [loading, setLoading] = useState(false)

    const update = async (status) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/api/memberships/${app._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })
            if (res.ok) {
                const data = await res.json()
                onStatusChange(data.application)
            }
        } finally { setLoading(false) }
    }

    return (
        <div style={{
            background: '#fff', borderRadius: 12, padding: '20px 24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 12,
            borderLeft: `4px solid ${app.status === 'approved' ? '#10b981' : app.status === 'rejected' ? '#ef4444' : '#f59e0b'}`,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>
                        {app.title} {app.firstName} {app.lastName}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: 2 }}>{app.email} · {app.phone}</div>
                    <div style={{ color: '#374151', fontSize: '0.85rem', marginTop: 2 }}>
                        <strong>{app.designation}</strong> · {app.institution}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: 4 }}>
                        {app.membershipType === 'student' ? '🎓 Student' : '💼 Working Adult'} · {app.duration === '1year' ? '1 Year' : '2 Years'} ·&nbsp;
                        {app.researchArea} · <em>Paid via {app.paymentMode}</em> · UTR: {app.transactionRef}
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: 4 }}>
                        Submitted: {new Date(app.createdAt).toLocaleString('en-IN')}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <StatusBadge status={app.status} />
                    {app.status !== 'approved' && (
                        <button
                            onClick={() => update('approved')}
                            disabled={loading}
                            style={{
                                background: '#10b981', color: '#fff', border: 'none',
                                borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                                fontWeight: 600, fontSize: '0.82rem',
                            }}>
                            ✓ Approve
                        </button>
                    )}
                    {app.status !== 'rejected' && (
                        <button
                            onClick={() => update('rejected')}
                            disabled={loading}
                            style={{
                                background: '#ef4444', color: '#fff', border: 'none',
                                borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                                fontWeight: 600, fontSize: '0.82rem',
                            }}>
                            ✗ Reject
                        </button>
                    )}
                    {app.status !== 'pending' && (
                        <button
                            onClick={() => update('pending')}
                            disabled={loading}
                            style={{
                                background: '#f3f4f6', color: '#374151', border: 'none',
                                borderRadius: 8, padding: '5px 12px', cursor: 'pointer',
                                fontSize: '0.78rem',
                            }}>
                            Reset
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

// ── Inquiry Card ─────────────────────────────────────
function InquiryCard({ inq, onStatusChange }) {
    const [loading, setLoading] = useState(false)

    const markHandled = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/api/inquiries/${inq._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: inq.status === 'handled' ? 'received' : 'handled' }),
            })
            if (res.ok) { const d = await res.json(); onStatusChange(d.inquiry) }
        } finally { setLoading(false) }
    }

    return (
        <div style={{
            background: '#fff', borderRadius: 12, padding: '20px 24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 12,
            borderLeft: `4px solid ${inq.status === 'handled' ? '#10b981' : '#3b82f6'}`,
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700 }}>{inq.designation} {inq.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>{inq.email} · {inq.phone}</div>
                    <div style={{ fontSize: '0.82rem', marginTop: 4 }}>
                        <strong>Service:</strong> {inq.type}
                    </div>
                    <div style={{ fontSize: '0.85rem', marginTop: 6, color: '#374151', background: '#f9fafb', borderRadius: 8, padding: '8px 12px' }}>
                        "{inq.message}"
                    </div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: 4 }}>
                        {new Date(inq.createdAt).toLocaleString('en-IN')}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                    <StatusBadge status={inq.status} />
                    <button
                        onClick={markHandled}
                        disabled={loading}
                        style={{
                            background: inq.status === 'handled' ? '#f3f4f6' : '#3b82f6',
                            color: inq.status === 'handled' ? '#374151' : '#fff',
                            border: 'none', borderRadius: 8, padding: '6px 14px',
                            cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
                        }}>
                        {inq.status === 'handled' ? 'Mark Unhandled' : '✓ Mark Handled'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Gallery Tab ───────────────────────────────────────
function GalleryTab() {
    const [albums, setAlbums] = useState([])
    const [photos, setPhotos] = useState([])
    const [galleryLoading, setGalleryLoading] = useState(true)
    const [galleryError, setGalleryError] = useState(null)

    // Album form state
    const [newAlbumName, setNewAlbumName] = useState('')
    const [newAlbumDesc, setNewAlbumDesc] = useState('')
    const [albumFormError, setAlbumFormError] = useState('')
    const [albumCreating, setAlbumCreating] = useState(false)

    // Edit album state
    const [editingAlbum, setEditingAlbum] = useState(null) // {_id, name, description}
    const [albumSaving, setAlbumSaving] = useState(false)

    // Upload form state
    const [uploadAlbumId, setUploadAlbumId] = useState('')
    const [uploadFile, setUploadFile] = useState(null)
    const [uploadPreview, setUploadPreview] = useState(null)
    const [uploadName, setUploadName] = useState('')
    const [uploadCaption, setUploadCaption] = useState('')
    const [uploadAlt, setUploadAlt] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [uploadSuccess, setUploadSuccess] = useState('')
    const fileInputRef = useRef()

    // Edit photo state
    const [editingPhoto, setEditingPhoto] = useState(null) // photo object
    const [photoSaving, setPhotoSaving] = useState(false)

    // Filter photos by album
    const [filterAlbumId, setFilterAlbumId] = useState('all')

    // Confirm delete state
    const [confirmDelete, setConfirmDelete] = useState(null) // { type: 'album'|'photo', id, label }
    const [deleting, setDeleting] = useState(false)

    const fetchGallery = useCallback(async () => {
        setGalleryLoading(true)
        setGalleryError(null)
        try {
            const [aRes, pRes] = await Promise.all([
                fetch(`${API_BASE}/api/gallery/albums`),
                fetch(`${API_BASE}/api/gallery/photos`),
            ])
            const aData = await aRes.json()
            const pData = await pRes.json()
            if (aData.success) setAlbums(aData.albums)
            if (pData.success) setPhotos(pData.photos)
        } catch {
            setGalleryError('Could not load gallery data.')
        } finally {
            setGalleryLoading(false)
        }
    }, [])

    useEffect(() => { fetchGallery() }, [fetchGallery])

    // ── Create Album
    const handleCreateAlbum = async (e) => {
        e.preventDefault()
        if (!newAlbumName.trim()) { setAlbumFormError('Album name is required'); return }
        setAlbumCreating(true); setAlbumFormError('')
        try {
            const res = await fetch(`${API_BASE}/api/gallery/albums`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newAlbumName, description: newAlbumDesc }),
            })
            const data = await res.json()
            if (data.success) {
                setAlbums(prev => [...prev, data.album])
                setNewAlbumName(''); setNewAlbumDesc('')
            } else {
                setAlbumFormError(data.error || 'Failed to create album')
            }
        } catch {
            setAlbumFormError('Network error. Please try again.')
        } finally { setAlbumCreating(false) }
    }

    // ── Save Album Edit
    const handleSaveAlbum = async () => {
        if (!editingAlbum?.name?.trim()) return
        setAlbumSaving(true)
        try {
            const res = await fetch(`${API_BASE}/api/gallery/albums/${editingAlbum._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingAlbum.name, description: editingAlbum.description }),
            })
            const data = await res.json()
            if (data.success) {
                setAlbums(prev => prev.map(a => a._id === data.album._id ? data.album : a))
                setEditingAlbum(null)
            }
        } finally { setAlbumSaving(false) }
    }

    // ── Delete Album or Photo (with confirmation)
    const handleConfirmDelete = async () => {
        if (!confirmDelete) return
        setDeleting(true)
        try {
            const url = confirmDelete.type === 'album'
                ? `${API_BASE}/api/gallery/albums/${confirmDelete.id}`
                : `${API_BASE}/api/gallery/photos/${confirmDelete.id}`
            const res = await fetch(url, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                if (confirmDelete.type === 'album') {
                    setAlbums(prev => prev.filter(a => a._id !== confirmDelete.id))
                    setPhotos(prev => prev.filter(p => {
                        const aid = p.albumId?._id || p.albumId
                        return aid !== confirmDelete.id
                    }))
                } else {
                    setPhotos(prev => prev.filter(p => p._id !== confirmDelete.id))
                }
                setConfirmDelete(null)
            }
        } finally { setDeleting(false) }
    }

    // ── File select
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            setUploadError('Only image files are allowed.')
            return
        }
        setUploadFile(file)
        setUploadError('')
        const reader = new FileReader()
        reader.onload = ev => setUploadPreview(ev.target.result)
        reader.readAsDataURL(file)
        // Auto-fill name from filename
        if (!uploadName) {
            setUploadName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
        }
    }

    // ── Upload Photo
    const handleUpload = async (e) => {
        e.preventDefault()
        if (!uploadFile) { setUploadError('Please select an image.'); return }
        if (!uploadAlbumId) { setUploadError('Please select an album.'); return }
        setUploading(true); setUploadError(''); setUploadSuccess('')
        try {
            const formData = new FormData()
            formData.append('image', uploadFile)
            formData.append('albumId', uploadAlbumId)
            formData.append('name', uploadName)
            formData.append('caption', uploadCaption)
            formData.append('alt', uploadAlt)
            const res = await fetch(`${API_BASE}/api/gallery/photos`, { method: 'POST', body: formData })
            const data = await res.json()
            if (data.success) {
                setPhotos(prev => [data.photo, ...prev])
                setUploadFile(null); setUploadPreview(null)
                setUploadName(''); setUploadCaption(''); setUploadAlt('')
                if (fileInputRef.current) fileInputRef.current.value = ''
                setUploadSuccess('Photo uploaded successfully!')
                setTimeout(() => setUploadSuccess(''), 4000)
            } else {
                setUploadError(data.error || 'Upload failed. Check your Cloudinary credentials.')
            }
        } catch {
            setUploadError('Network error. Please try again.')
        } finally { setUploading(false) }
    }

    // ── Save Photo Edit
    const handleSavePhoto = async () => {
        if (!editingPhoto) return
        setPhotoSaving(true)
        try {
            const res = await fetch(`${API_BASE}/api/gallery/photos/${editingPhoto._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editingPhoto.name, alt: editingPhoto.alt, caption: editingPhoto.caption }),
            })
            const data = await res.json()
            if (data.success) {
                setPhotos(prev => prev.map(p => p._id === data.photo._id ? data.photo : p))
                setEditingPhoto(null)
            }
        } finally { setPhotoSaving(false) }
    }

    const filteredPhotos = filterAlbumId === 'all'
        ? photos
        : photos.filter(p => (p.albumId?._id || p.albumId) === filterAlbumId)

    const photoCountForAlbum = (albumId) =>
        photos.filter(p => (p.albumId?._id || p.albumId) === albumId).length

    const cardStyle = {
        background: '#fff', borderRadius: 12, padding: '20px 24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 12,
    }
    const inputStyle = {
        border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '8px 12px',
        fontSize: '0.9rem', width: '100%', boxSizing: 'border-box', outline: 'none',
    }
    const btnStyle = (color = '#1e3a5f') => ({
        background: color, color: '#fff', border: 'none', borderRadius: 8,
        padding: '8px 18px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
    })
    const btnOutlineStyle = {
        background: '#f3f4f6', color: '#374151', border: '1.5px solid #e5e7eb',
        borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
    }

    if (galleryLoading) return <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>Loading gallery…</div>
    if (galleryError) return <div style={{ textAlign: 'center', color: '#dc2626', padding: 40 }}>{galleryError}</div>

    return (
        <div>
            {/* ── Confirm Delete Modal ── */}
            {confirmDelete && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 16, padding: '32px 36px',
                        maxWidth: 400, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    }}>
                        <div style={{ fontSize: '2rem', textAlign: 'center', marginBottom: 12 }}>⚠️</div>
                        <h3 style={{ textAlign: 'center', margin: '0 0 8px' }}>Confirm Delete</h3>
                        <p style={{ textAlign: 'center', color: '#6b7280', margin: '0 0 20px' }}>
                            {confirmDelete.type === 'album'
                                ? <>Delete album <strong>"{confirmDelete.label}"</strong>? This will permanently delete all photos in it from Cloudinary and MongoDB.</>
                                : <>Delete photo <strong>"{confirmDelete.label}"</strong>? This cannot be undone.</>
                            }
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                            <button onClick={() => setConfirmDelete(null)} style={btnOutlineStyle} disabled={deleting}>
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} style={btnStyle('#dc2626')} disabled={deleting}>
                                {deleting ? 'Deleting…' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Album Modal ── */}
            {editingAlbum && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 16, padding: '32px 36px',
                        maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    }}>
                        <h3 style={{ margin: '0 0 20px' }}>✏️ Edit Album</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Album Name *</label>
                                <input
                                    style={inputStyle}
                                    value={editingAlbum.name}
                                    onChange={e => setEditingAlbum(a => ({ ...a, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Description</label>
                                <textarea
                                    style={{ ...inputStyle, height: 72, resize: 'vertical' }}
                                    value={editingAlbum.description}
                                    onChange={e => setEditingAlbum(a => ({ ...a, description: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingAlbum(null)} style={btnOutlineStyle} disabled={albumSaving}>Cancel</button>
                            <button onClick={handleSaveAlbum} style={btnStyle()} disabled={albumSaving}>
                                {albumSaving ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Edit Photo Modal ── */}
            {editingPhoto && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                }}>
                    <div style={{
                        background: '#fff', borderRadius: 16, padding: '32px 36px',
                        maxWidth: 480, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                    }}>
                        <h3 style={{ margin: '0 0 16px' }}>✏️ Edit Photo</h3>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                            <img src={editingPhoto.src} alt={editingPhoto.alt}
                                style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Photo Name *</label>
                                    <input
                                        style={inputStyle}
                                        value={editingPhoto.name}
                                        onChange={e => setEditingPhoto(p => ({ ...p, name: e.target.value }))}
                                        placeholder="Display name for this photo"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Caption</label>
                                    <input
                                        style={inputStyle}
                                        value={editingPhoto.caption}
                                        onChange={e => setEditingPhoto(p => ({ ...p, caption: e.target.value }))}
                                        placeholder="Short description shown in gallery"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Alt Text</label>
                                    <input
                                        style={inputStyle}
                                        value={editingPhoto.alt}
                                        onChange={e => setEditingPhoto(p => ({ ...p, alt: e.target.value }))}
                                        placeholder="Accessibility description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingPhoto(null)} style={btnOutlineStyle} disabled={photoSaving}>Cancel</button>
                            <button onClick={handleSavePhoto} style={btnStyle()} disabled={photoSaving}>
                                {photoSaving ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════ */}
            {/* Section 1: Album Management                 */}
            {/* ═══════════════════════════════════════════ */}
            <div style={{ marginBottom: 32 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: '#1e3a5f', display: 'flex', alignItems: 'center', gap: 8 }}>
                    📁 Albums
                    <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#6b7280', background: '#f3f4f6', borderRadius: 20, padding: '2px 10px' }}>
                        {albums.length} album{albums.length !== 1 ? 's' : ''}
                    </span>
                </h2>

                {/* Create Album Form */}
                <form onSubmit={handleCreateAlbum} style={{
                    ...cardStyle,
                    borderLeft: '4px solid #2563eb',
                    display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#2563eb', marginBottom: 4 }}>+ Create New Album</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Album Name *</label>
                            <input
                                style={inputStyle}
                                value={newAlbumName}
                                onChange={e => setNewAlbumName(e.target.value)}
                                placeholder="e.g. IVCGSMT 2026 Conference"
                                id="admin-album-name-input"
                            />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Description (optional)</label>
                            <input
                                style={inputStyle}
                                value={newAlbumDesc}
                                onChange={e => setNewAlbumDesc(e.target.value)}
                                placeholder="Brief description of this album"
                                id="admin-album-desc-input"
                            />
                        </div>
                    </div>
                    {albumFormError && <p style={{ color: '#dc2626', fontSize: '0.82rem', margin: 0 }}>{albumFormError}</p>}
                    <div>
                        <button type="submit" style={btnStyle('#2563eb')} disabled={albumCreating} id="admin-create-album-btn">
                            {albumCreating ? 'Creating…' : '+ Create Album'}
                        </button>
                    </div>
                </form>

                {/* Albums List */}
                {albums.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#9ca3af', padding: '20px 0' }}>No albums yet. Create one above.</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {albums.map(album => (
                            <div key={album._id} style={{
                                ...cardStyle, marginBottom: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                flexWrap: 'wrap', gap: 12,
                            }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{album.name}</div>
                                    {album.description && (
                                        <div style={{ color: '#6b7280', fontSize: '0.82rem', marginTop: 2 }}>{album.description}</div>
                                    )}
                                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: 4 }}>
                                        Slug: <code style={{ background: '#f3f4f6', borderRadius: 4, padding: '1px 5px' }}>{album.slug}</code>
                                        &nbsp;·&nbsp; {photoCountForAlbum(album._id)} photo{photoCountForAlbum(album._id) !== 1 ? 's' : ''}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                    <button
                                        onClick={() => setEditingAlbum({ ...album })}
                                        style={btnOutlineStyle}
                                        id={`admin-edit-album-${album._id}`}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete({ type: 'album', id: album._id, label: album.name })}
                                        style={{ ...btnStyle('#ef4444') }}
                                        id={`admin-delete-album-${album._id}`}
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 2: Upload Photo                     */}
            {/* ═══════════════════════════════════════════ */}
            <div style={{ marginBottom: 32 }}>
                <h2 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: '#1e3a5f' }}>
                    📤 Upload Photo
                </h2>
                <form onSubmit={handleUpload} style={{ ...cardStyle, borderLeft: '4px solid #059669' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20, alignItems: 'start' }}>
                        {/* Image Preview */}
                        <div>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    width: '100%', aspectRatio: '4/3', borderRadius: 8,
                                    border: '2px dashed #d1d5db', cursor: 'pointer',
                                    overflow: 'hidden', background: '#f9fafb',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexDirection: 'column', gap: 6, color: '#9ca3af', fontSize: '0.8rem',
                                    transition: 'border-color 0.2s',
                                    ...(uploadPreview ? {} : {}),
                                }}
                                id="admin-upload-drop-zone"
                            >
                                {uploadPreview ? (
                                    <img src={uploadPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <>
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
                                        <span>Click to choose<br />image</span>
                                    </>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="admin-photo-file-input"
                            />
                            {uploadPreview && (
                                <button
                                    type="button"
                                    onClick={() => { setUploadFile(null); setUploadPreview(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                                    style={{ ...btnOutlineStyle, width: '100%', marginTop: 6, fontSize: '0.78rem', padding: '5px 0' }}
                                >
                                    ✕ Remove
                                </button>
                            )}
                        </div>

                        {/* Form Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Album *</label>
                                <select
                                    style={{ ...inputStyle, background: '#fff', cursor: 'pointer' }}
                                    value={uploadAlbumId}
                                    onChange={e => setUploadAlbumId(e.target.value)}
                                    id="admin-upload-album-select"
                                >
                                    <option value="">— Select Album —</option>
                                    {albums.map(a => (
                                        <option key={a._id} value={a._id}>{a.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Photo Name *</label>
                                <input
                                    style={inputStyle}
                                    value={uploadName}
                                    onChange={e => setUploadName(e.target.value)}
                                    placeholder="Display name for this photo"
                                    id="admin-upload-name-input"
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Caption</label>
                                <input
                                    style={inputStyle}
                                    value={uploadCaption}
                                    onChange={e => setUploadCaption(e.target.value)}
                                    placeholder="Short description shown in the gallery"
                                    id="admin-upload-caption-input"
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Alt Text</label>
                                <input
                                    style={inputStyle}
                                    value={uploadAlt}
                                    onChange={e => setUploadAlt(e.target.value)}
                                    placeholder="Screen reader description (accessibility)"
                                    id="admin-upload-alt-input"
                                />
                            </div>
                            {uploadError && <p style={{ color: '#dc2626', fontSize: '0.82rem', margin: 0 }}>{uploadError}</p>}
                            {uploadSuccess && <p style={{ color: '#059669', fontSize: '0.82rem', margin: 0 }}>✓ {uploadSuccess}</p>}
                            <div>
                                <button
                                    type="submit"
                                    style={{
                                        ...btnStyle('#059669'),
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        opacity: uploading ? 0.7 : 1,
                                    }}
                                    disabled={uploading}
                                    id="admin-upload-submit-btn"
                                >
                                    {uploading ? (
                                        <>
                                            <span style={{
                                                width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)',
                                                borderTopColor: '#fff', borderRadius: '50%',
                                                animation: 'spin 0.7s linear infinite', display: 'inline-block',
                                            }} />
                                            Uploading…
                                        </>
                                    ) : '⬆ Upload Photo'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 3: Photo Management                 */}
            {/* ═══════════════════════════════════════════ */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e3a5f' }}>
                        🖼 Photos
                        <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#6b7280', background: '#f3f4f6', borderRadius: 20, padding: '2px 10px', marginLeft: 8 }}>
                            {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
                        </span>
                    </h2>
                    {/* Album filter */}
                    <select
                        style={{ ...inputStyle, width: 'auto', minWidth: 200 }}
                        value={filterAlbumId}
                        onChange={e => setFilterAlbumId(e.target.value)}
                        id="admin-photos-filter-select"
                    >
                        <option value="all">All Albums</option>
                        {albums.map(a => (
                            <option key={a._id} value={a._id}>{a.name} ({photoCountForAlbum(a._id)})</option>
                        ))}
                    </select>
                </div>

                {filteredPhotos.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#9ca3af', padding: '30px 0' }}>
                        {photos.length === 0 ? 'No photos uploaded yet.' : 'No photos in this album.'}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 16,
                    }}>
                        {filteredPhotos.map(photo => {
                            const albumName = photo.albumId?.name || '—'
                            return (
                                <div key={photo._id} style={{
                                    background: '#fff', borderRadius: 12,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                    overflow: 'hidden', display: 'flex', flexDirection: 'column',
                                }}>
                                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#f3f4f6' }}>
                                        <img
                                            src={photo.src}
                                            alt={photo.alt || photo.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <div style={{
                                            position: 'absolute', top: 6, right: 6,
                                            background: 'rgba(0,0,0,0.55)', borderRadius: 20,
                                            padding: '2px 8px', fontSize: '0.7rem', color: '#fff',
                                        }}>
                                            {albumName}
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {photo.name || '(no name)'}
                                        </div>
                                        {photo.caption && (
                                            <div style={{ color: '#6b7280', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {photo.caption}
                                            </div>
                                        )}
                                        <div style={{ color: '#9ca3af', fontSize: '0.72rem', marginTop: 2 }}>
                                            {new Date(photo.createdAt).toLocaleDateString('en-IN')}
                                        </div>
                                    </div>
                                    <div style={{ padding: '0 14px 14px', display: 'flex', gap: 6 }}>
                                        <button
                                            onClick={() => setEditingPhoto({ ...photo })}
                                            style={{ ...btnOutlineStyle, flex: 1, padding: '6px 0', fontSize: '0.78rem' }}
                                            id={`admin-edit-photo-${photo._id}`}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => setConfirmDelete({ type: 'photo', id: photo._id, label: photo.name || 'this photo' })}
                                            style={{ ...btnStyle('#ef4444'), flex: 1, padding: '6px 0', fontSize: '0.78rem' }}
                                            id={`admin-delete-photo-${photo._id}`}
                                        >
                                            🗑
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

// ── Main Admin Dashboard ─────────────────────────────
export default function Admin() {
    const [authed, setAuthed] = useState(false)
    const [tab, setTab] = useState('memberships')
    const [memberships, setMemberships] = useState([])
    const [inquiries, setInquiries] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('all')

    const fetchData = useCallback(async () => {
        if (!authed) return
        setLoading(true)
        try {
            const [mRes, iRes] = await Promise.all([
                fetch(`${API_BASE}/api/memberships`),
                fetch(`${API_BASE}/api/inquiries`),
            ])
            const mData = await mRes.json()
            const iData = await iRes.json()
            if (mData.success) setMemberships(mData.applications)
            if (iData.success) setInquiries(iData.inquiries)
        } finally { setLoading(false) }
    }, [authed])

    useEffect(() => { fetchData() }, [fetchData])

    if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

    const filteredMemberships = filter === 'all'
        ? memberships
        : memberships.filter(m => m.status === filter)

    const counts = {
        total: memberships.length,
        pending: memberships.filter(m => m.status === 'pending').length,
        approved: memberships.filter(m => m.status === 'approved').length,
        rejected: memberships.filter(m => m.status === 'rejected').length,
        inquiries: inquiries.length,
        unhandled: inquiries.filter(i => i.status === 'received').length,
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f1f5f9', paddingBottom: 60 }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%)',
                padding: '28px 32px', color: '#fff',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>Sanidhya Admin</h1>
                    <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Membership, Inquiry & Gallery Management</p>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button onClick={fetchData} style={{
                        background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    }}>⟳ Refresh</button>
                    <button onClick={() => setAuthed(false)} style={{
                        background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                    }}>Logout</button>
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 32 }}>
                    {[
                        { label: 'Total Members', value: counts.total, color: '#1e3a5f' },
                        { label: 'Pending', value: counts.pending, color: '#d97706' },
                        { label: 'Approved', value: counts.approved, color: '#059669' },
                        { label: 'Rejected', value: counts.rejected, color: '#dc2626' },
                        { label: 'Inquiries', value: counts.inquiries, color: '#2563eb' },
                        { label: 'Unhandled', value: counts.unhandled, color: '#7c3aed' },
                    ].map(s => (
                        <div key={s.label} style={{
                            background: '#fff', borderRadius: 12, padding: '18px 20px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center',
                            borderTop: `3px solid ${s.color}`,
                        }}>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: 2 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                    {[
                        { key: 'memberships', label: `📋 Memberships (${counts.total})` },
                        { key: 'inquiries', label: `📩 Inquiries (${counts.inquiries})` },
                        { key: 'gallery', label: '🖼 Gallery' },
                    ].map(t => (
                        <button key={t.key} onClick={() => setTab(t.key)} style={{
                            padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                            fontWeight: 700, fontSize: '0.9rem',
                            background: tab === t.key ? '#1e3a5f' : '#fff',
                            color: tab === t.key ? '#fff' : '#374151',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Filter bar — memberships only */}
                {tab === 'memberships' && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                        {['all', 'pending', 'approved', 'rejected'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} style={{
                                padding: '6px 16px', borderRadius: 20, border: '1.5px solid',
                                borderColor: filter === f ? '#1e3a5f' : '#e5e7eb',
                                background: filter === f ? '#1e3a5f' : '#fff',
                                color: filter === f ? '#fff' : '#374151',
                                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                                textTransform: 'capitalize',
                            }}>
                                {f === 'all' ? `All (${counts.total})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f]})`}
                            </button>
                        ))}
                    </div>
                )}

                {/* Content */}
                {loading && <div style={{ textAlign: 'center', color: '#6b7280', padding: 40 }}>Loading…</div>}

                {!loading && tab === 'memberships' && (
                    filteredMemberships.length === 0
                        ? <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>No {filter === 'all' ? '' : filter} applications found.</div>
                        : filteredMemberships.map(app => (
                            <MembershipCard
                                key={app._id}
                                app={app}
                                onStatusChange={updated =>
                                    setMemberships(prev => prev.map(m => m._id === updated._id ? updated : m))
                                }
                            />
                        ))
                )}

                {!loading && tab === 'inquiries' && (
                    inquiries.length === 0
                        ? <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>No inquiries yet.</div>
                        : inquiries.map(inq => (
                            <InquiryCard
                                key={inq._id}
                                inq={inq}
                                onStatusChange={updated =>
                                    setInquiries(prev => prev.map(i => i._id === updated._id ? updated : i))
                                }
                            />
                        ))
                )}

                {tab === 'gallery' && <GalleryTab />}
            </div>

            {/* Spinner keyframes */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
