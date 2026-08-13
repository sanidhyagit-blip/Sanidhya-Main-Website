import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

/**
 * Hardcoded members catalogue data.
 * To add new members, simply append to this array.
 */
const membersData = [
    { srNo: 1, id: 'SIAE26001', name: 'Dr. Vinit Joshi', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 2, id: 'SIAE26002', name: 'Mr. Zaffar Khan', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 3, id: 'SIAE26003', name: 'Mr. Aditya Patil', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 4, id: 'SIAE26004', name: 'Mrs. Varada Joshi', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 5, id: 'SIAE26005', name: 'Mr. Nilraj Vasudeo', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 6, id: 'SIAE26006', name: 'Dr. Elvis Madondo', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 7, id: 'SIAE26007', name: 'Mr. Vedant Naikwadi', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 8, id: 'SIAE26008', name: 'Dr. Suraj Shah', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 9, id: 'SIAE26009', name: 'Mr. Manjunath KP', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 10, id: 'SIAE26010', name: 'Dr. Manomoney Jayaraman', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 11, id: 'SIAE26011', name: 'Mr. Vighnesh Chalekar', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 12, id: 'SIAE26012', name: 'Dr. Snehal Patil', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 13, id: 'SIAE26013', name: 'Dr. Tushar Raut', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 14, id: 'SIAE26014', name: 'Dr. Rajalakshmi Ananthraman', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 15, id: 'SIAE26015', name: 'Dr. Vishesh Shrivastava', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 16, id: 'SIAE26016', name: 'Prof. Dr. Vennilaa Shree Vijay Sadagopan', issued: 'May 2026', expiry: 'May 2027' },
    { srNo: 17, id: 'SIAE26017', name: 'Dr. Koel Roy Choudhury', issued: 'July 2026', expiry: 'July 2027' },
    { srNo: 18, id: 'SIAE26018', name: 'Dr. Faith Tinonetsana', issued: 'August 2026', expiry: 'August 2027' },
]

export default function Members() {
    const [search, setSearch] = useState('')
    useReveal()

    const filteredMembers = useMemo(() => {
        if (!search.trim()) return membersData
        const q = search.toLowerCase()
        return membersData.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.id.toLowerCase().includes(q)
        )
    }, [search])

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
                                placeholder="Search by name or membership number..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="members-search-input"
                            />
                        </div>
                        <span className="members-count">
                            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {/* Empty search result */}
                    {filteredMembers.length === 0 && (
                        <div className="members-empty reveal">
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                            </svg>
                            <p>No members found matching your search.</p>
                        </div>
                    )}

                    {/* Members Table (Desktop) */}
                    {filteredMembers.length > 0 && (
                        <>
                            <div className="members-table-wrapper reveal">
                                <table className="members-table" id="members-directory-table">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>SIAE Membership Number</th>
                                            <th>Name</th>
                                            <th>Month of Issue</th>
                                            <th>Month of Expiry</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMembers.map((m) => (
                                            <tr key={m.id}>
                                                <td>{m.srNo}</td>
                                                <td>
                                                    <span className="member-id-badge">{m.id}</span>
                                                </td>
                                                <td>
                                                    <div className="member-name-cell">
                                                        <div className="member-avatar">
                                                            {m.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, '').charAt(0).toUpperCase()}
                                                        </div>
                                                        <strong>{m.name}</strong>
                                                    </div>
                                                </td>
                                                <td>{m.issued}</td>
                                                <td>{m.expiry}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Members Cards (Mobile) */}
                            <div className="members-cards-mobile">
                                {filteredMembers.map((m) => (
                                    <div key={m.id} className={`member-card-mobile reveal delay-${((m.srNo - 1) % 4) + 1}`}>
                                        <div className="member-card-header">
                                            <div className="member-avatar-lg">
                                                {m.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/i, '').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4>{m.name}</h4>
                                                <span className="member-id-badge">{m.id}</span>
                                            </div>
                                        </div>
                                        <div className="member-card-details">
                                            <div className="member-card-row"><span>Sr. No.</span><span>{m.srNo}</span></div>
                                            <div className="member-card-row"><span>Issued</span><span>{m.issued}</span></div>
                                            <div className="member-card-row"><span>Expiry</span><span>{m.expiry}</span></div>
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
