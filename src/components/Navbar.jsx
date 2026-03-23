import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'Literary Services',
        children: [
            { label: 'Call for Book Chapter', to: '/literary/book-chapter' },
            { label: 'Call for Case Studies', to: '/literary/case-studies' },
            { label: 'Reference Books', to: '/literary/reference-books' },
        ],
    },
    {
        label: 'Research Services',
        children: [
            { label: 'National Conference', to: '/research/national-conference' },
            { label: 'International Conference', to: '/research/international-conference' },
            { label: 'International Summits', to: '/research/international-summits' },
            { label: 'International Symposiums', to: '/research/international-symposiums' },
            { label: 'International Workshops', to: '/research/international-workshops' },
            { label: 'Seminars / Webinars', to: '/research/seminars-webinars' },
        ],
    },
    {
        label: 'Development Programs',
        children: [
            { label: 'Faculty Development Program', to: '/development/fdp' },
            { label: 'Management Development Program', to: '/development/mdp' },
        ],
    },
    {
        label: 'IPR',
        children: [
            { label: 'Patents', to: '/ipr/patents' },
        ],
    },
    { label: 'Author Services', to: '/author-services' },
    { label: 'FAQs', to: '/faq' },
    { label: 'Published', to: '/published' },
    { label: 'Membership', to: '/membership' },
    { label: 'About Us', to: '/about' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
        setOpenDropdown(null)
    }, [location.pathname])

    const toggleDropdown = (idx) => {
        setOpenDropdown(openDropdown === idx ? null : idx)
    }

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.png" alt="Sanidhya Logo" />
                    {/* <div className="navbar-logo-text">
                        <span className="brand-name">SANIDHYA</span>
                        <span className="brand-tagline">Inspiring Academic Excellence</span>
                    </div> */}
                </Link>

                <button
                    className={`mobile-toggle${mobileOpen ? ' active' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
                    {navItems.map((item, idx) => (
                        <li
                            key={idx}
                            className={`nav-item${item.children ? '' : ''}${openDropdown === idx ? ' open' : ''}`}
                            onMouseEnter={() => item.children && window.innerWidth > 1024 && setOpenDropdown(idx)}
                            onMouseLeave={() => item.children && window.innerWidth > 1024 && setOpenDropdown(null)}
                        >
                            {item.children ? (
                                <>
                                    <span
                                        className="nav-link"
                                        onClick={() => toggleDropdown(idx)}
                                    >
                                        {item.label}
                                        <span className="arrow">▼</span>
                                    </span>
                                    <div className="dropdown">
                                        {item.children.map((child, cIdx) => (
                                            <Link key={cIdx} to={child.to} className="dropdown-link">
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={item.to}
                                    className={`nav-link${location.pathname === item.to ? ' active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
