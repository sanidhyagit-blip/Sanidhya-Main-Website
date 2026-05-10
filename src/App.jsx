import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import LiteraryService from './pages/LiteraryService'
import ResearchService from './pages/ResearchService'
import DevelopmentProgram from './pages/DevelopmentProgram'
import IPR from './pages/IPR'
import AuthorServices from './pages/AuthorServices'
import FAQ from './pages/FAQ'
import Published from './pages/Published'
import ProcessDetail from './pages/ProcessDetail'
import About from './pages/About'
import Membership from './pages/Membership'
import Admin from './pages/Admin'
import IVCGSMT from './pages/IVCGSMT'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Admin (standalone, no Navbar/Footer) ── */}
        <Route path="/admin" element={<Admin />} />

        {/* ── Public site (with Navbar + Footer) ── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/literary/book-chapter" element={<LiteraryService type="book-chapter" />} />
          <Route path="/literary/case-studies" element={<LiteraryService type="case-studies" />} />
          <Route path="/literary/reference-books" element={<LiteraryService type="reference-books" />} />
          <Route path="/research/national-conference" element={<ResearchService type="national-conference" />} />
          <Route path="/research/international-conference" element={<ResearchService type="international-conference" />} />
          <Route path="/research/international-summits" element={<ResearchService type="international-summits" />} />
          <Route path="/research/international-symposiums" element={<ResearchService type="international-symposiums" />} />
          <Route path="/research/international-workshops" element={<ResearchService type="international-workshops" />} />
          <Route path="/research/seminars-webinars" element={<ResearchService type="seminars-webinars" />} />
          <Route path="/development/fdp" element={<DevelopmentProgram type="fdp" />} />
          <Route path="/development/mdp" element={<DevelopmentProgram type="mdp" />} />
          <Route path="/ipr/patents" element={<IPR />} />
          <Route path="/author-services" element={<AuthorServices />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/published" element={<Published />} />
          <Route path="/process" element={<ProcessDetail />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/ivcgsmt" element={<IVCGSMT />} />
        </Route>
      </Routes>
    </>
  )
}

