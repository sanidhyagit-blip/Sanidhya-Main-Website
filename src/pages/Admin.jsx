import { useState, useEffect, useCallback } from 'react'
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
                    <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Membership & Inquiry Management</p>
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

            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 20px' }}>
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
                <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                    {['memberships', 'inquiries'].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                            fontWeight: 700, fontSize: '0.9rem',
                            background: tab === t ? '#1e3a5f' : '#fff',
                            color: tab === t ? '#fff' : '#374151',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        }}>
                            {t === 'memberships' ? `📋 Memberships (${counts.total})` : `📩 Inquiries (${counts.inquiries})`}
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
            </div>
        </div>
    )
}
