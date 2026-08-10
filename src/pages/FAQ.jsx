import { useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const faqData = [
    {
        q: 'What types of academic works can I submit to Sanidhya?',
        a: 'We accept research papers, book chapters, case studies, review articles, and conference papers across all academic disciplines including science, technology, management, humanities, social sciences, and education.',
    },
    {
        q: 'How long does the peer review process take?',
        a: 'Our average peer review turnaround time is 2–4 weeks from the date of submission. For conferences and special issues, timelines may vary. You will receive regular status updates throughout the review process.',
    },
    {
        q: 'What is your plagiarism policy?',
        a: 'All submissions must have a plagiarism score below 10% as checked by Turnitin or iThenticate. We have zero tolerance for academic dishonesty. Any submission found to contain plagiarized content will be immediately rejected.',
    },
    {
        q: 'What citation and formatting styles do you accept?',
        a: 'We primarily follow APA 7th Edition, Harvard, and IEEE citation styles depending on the publication type. Specific formatting templates are provided upon acceptance. Please refer to the submission guidelines for your chosen publication.',
    },
    {
        q: 'How do I track the status of my submission?',
        a: 'Upon submission, you receive a unique tracking ID. Use this ID on our submission tracking portal to check real-time status. You will also receive email notifications at key stages of the review process.',
    },
    {
        q: 'What are the publication fees?',
        a: 'Publication fees vary by type: each service have different fee structures which is non-refundable once the process of services commences. Detailed pricing is shared after acceptance via proper communication channel. We offer early-bird discounts and institutional packages.',
    },
    {
        q: 'Can I publish previously published work?',
        a: 'No, all submissions must be original and not under consideration elsewhere. If your work builds upon a previously published study, proper disclosure and citation are required. Extended versions of conference papers may be considered case-by-case.',
    },
    {
        q: 'Do you provide ISBN and DOI for publications?',
        a: 'Yes, all our books are assigned ISBNs and journal articles receive DOIs for global identification and indexing. These identifiers ensure your work is discoverable in major academic databases.',
    },
    {
        q: 'What is the typical publication timeline?',
        a: 'From acceptance to publication, the typical timeline is 4–8 weeks depending on the publication type. Any publication is subjected to specific timelines as mentioned in the flyer/ brochure of the event. Some of them might be time stretched processes due to the high volume of submissions. We strive to minimize delays while maintaining quality.',
    },
    {
        q: 'How can I avail author services for research assistance?',
        a: 'Visit our Author Services page and fill out the inquiry form with your requirements. Our team will contact you within 24 hours to discuss your project, timeline, and provide a detailed proposal.',
    },
    {
        q: 'Are your conferences and workshops conducted online or offline?',
        a: 'We offer hybrid participation options for most events. You can attend in-person at the designated venue or join virtually through our online platform. Both modes offer full participation including Q&A, networking, and certificate of participation.',
    },
    {
        q: 'How do I apply for patent filing assistance?',
        a: 'Contact us through the IPR/Patents page or the Author Services inquiry form. Our IPR experts will schedule an initial consultation to understand your invention and guide you through the patentability assessment and filing process.',
    },
]

export default function FAQ() {
    useReveal()
    const [openIdx, setOpenIdx] = useState(null)

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>FAQ</span>
                    </div>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions about our publishing services</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="faq-list">
                        {faqData.map((item, i) => (
                            <div key={i} className="reveal">
                                <div
                                    className={`faq-item${openIdx === i ? ' open' : ''}`}
                                >
                                    <button
                                        className="faq-question"
                                        onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                    >
                                        <span>{item.q}</span>
                                        <span className="faq-icon">+</span>
                                    </button>
                                    <div className="faq-answer">
                                        <div className="faq-answer-inner">{item.a}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
                            Can't find what you're looking for?
                        </p>
                        <Link to="/author-services" className="btn btn-primary">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
