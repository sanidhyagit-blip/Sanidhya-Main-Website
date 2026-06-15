import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import API_BASE from '../api'

/**
 * Generates a membership number based on sequential order.
 * Format: SIAE26XXX (e.g., SIAE26001, SIAE26002, ...)
 */
function getMembershipNumber(index) {
    return `SIAE26${String(index + 1).padStart(3, '0')}`
}

/**
 * Calculates membership tenure: 1 year from joining date.
 * Returns formatted string like "May 2026 – May 2027"
 */
function getTenure(joiningDate) {
    const d = new Date(joiningDate)
    if (isNaN(d.getTime())) return '—'
    const startMonth = d.toLocaleString('en-US', { month: 'long' })
    const startYear = d.getFullYear()
    const endDate = new Date(d)
    endDate.setFullYear(endDate.getFullYear() + 1)
    const endMonth = endDate.toLocaleString('en-US', { month: 'long' })
    const endYear = endDate.getFullYear()
    return `${startMonth} ${startYear} – ${endMonth} ${endYear}`
}

/**
 * Formats a date string to a readable format like "15 Jun 2026"
 */
function formatDate(dateStr) {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function Members() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    useReveal()

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/memberships/approved`)
                if (!res.ok) {
                    setError('Server returned an error. Please try again later.')
                    return
                }
                const data = await res.json()
                if (data.success) {
                    setMembers(data.applications || [])
                } else {
                    setError('Failed to load member data.')
                }
            } catch {
                setError('Unable to connect to server. Make sure the backend server is running.')
            } finally {
                setLoading(false)
            }
        }
        fetchMembers()
    }, [])

    // Sort by createdAt (form submission date) ascending and apply search
    const filteredMembers = useMemo(() => {
        const sorted = [...members].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        if (!search.trim()) return sorted
        const q = search.toLowerCase()
        return sorted.filter(m =>
            `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
            (m.email && m.email.toLowerCase().includes(q)) ||
            (m.institution && m.institution.toLowerCase().includes(q))
        )
    }, [members, search])

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Members Directory</span>
                    </div>
                    <h1>Members Directory</h1>
                    <p>Our community of approved members and researchers</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {/* Search Bar */}
                    <div className="members-search-bar reveal">
                        <div className="members-search-wrapper">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, email, or institution..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="members-search-input"
                            />
                        </div>
                        <span className="members-count">
                            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="members-loading reveal">
                            <div className="members-spinner" />
                            <p>Loading members...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="members-error reveal">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-red)" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredMembers.length === 0 && (
                        <div className="members-empty reveal">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                            </svg>
                            <p>{search ? 'No members found matching your search.' : 'No approved members yet.'}</p>
                        </div>
                    )}

                    {/* Members Table (Desktop) */}
                    {!loading && !error && filteredMembers.length > 0 && (
                        <>
                            <div className="members-table-wrapper reveal">
                                <table className="members-table" id="members-directory-table">
                                    <thead>
                                        <tr>
                                            <th>Membership No.</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Institution</th>
                                            <th>Membership Type</th>
                                            <th>Joining Date</th>
                                            <th>Tenure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.map((m, idx) => (
                                            <tr key={m._id}>
                                                <td>
                                                    <span className="member-id-badge">{getMembershipNumber(idx)}</span>
                                                </td>
                                                <td>
                                                    <div className="member-name-cell">
                                                        <div className="member-avatar">
                                                            {(m.firstName?.[0] || '').toUpperCase()}{(m.lastName?.[0] || '').toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <strong>{m.title ? `${m.title} ` : ''}{m.firstName} {m.lastName}</strong>
                                                            {m.designation && <span className="member-designation">{m.designation}</span>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="member-email">{m.email}</td>
                                                <td>{m.institution || '—'}</td>
                                                <td>
                                                    <span className="member-type-badge">{m.membershipType}</span>
                                                </td>
                                                <td>{formatDate(m.createdAt)}</td>
                                                <td>
                                                    <span className="member-tenure">{getTenure(m.createdAt)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Members Cards (Mobile) */}
                            <div className="members-cards-mobile">
                                {filteredMembers.map((m, idx) => (
                                    <div key={m._id} className={`member-card-mobile reveal delay-${(idx % 4) + 1}`}>
                                        <div className="member-card-header">
                                            <div className="member-avatar-lg">
                                                {(m.firstName?.[0] || '').toUpperCase()}{(m.lastName?.[0] || '').toUpperCase()}
                                            </div>
                                            <div>
                                                <h4>{m.title ? `${m.title} ` : ''}{m.firstName} {m.lastName}</h4>
                                                <span className="member-id-badge">{getMembershipNumber(idx)}</span>
                                            </div>
                                        </div>
                                        <div className="member-card-details">
                                            {m.designation && <div className="member-card-row"><span>Designation</span><span>{m.designation}</span></div>}
                                            {m.institution && <div className="member-card-row"><span>Institution</span><span>{m.institution}</span></div>}
                                            <div className="member-card-row"><span>Email</span><span className="member-email">{m.email}</span></div>
                                            <div className="member-card-row"><span>Type</span><span className="member-type-badge">{m.membershipType}</span></div>
                                            <div className="member-card-row"><span>Joining Date</span><span>{formatDate(m.createdAt)}</span></div>
                                            <div className="member-card-row"><span>Tenure</span><span className="member-tenure">{getTenure(m.createdAt)}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}
