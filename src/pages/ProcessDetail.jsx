import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

export default function ProcessDetail() {
    useReveal()

    return (
        <div className="page-enter">
            <div className="page-header">
                <div className="container">
                    <div className="page-breadcrumb">
                        <Link to="/">Home</Link> / <span>Detailed Publication Process</span>
                    </div>
                    <h1>Detailed Publication Process</h1>
                    <p>Everything you need to know about publishing with Sanidhya</p>
                </div>
            </div>

            <div className="content-page">
                <div className="container">
                    <div className="content-body reveal">

                        {/* STEP 1 */}
                        <h2>1. Prepare Your Article</h2>
                        <p>
                            Before submitting your manuscript, ensure it meets all requirements for a successful publication.
                            Your article should be thoroughly prepared following these essential guidelines:
                        </p>

                        <h3>Submission Guidelines Compliance</h3>
                        <p>
                            Each publication type has specific formatting requirements. Download the appropriate template
                            from our submission portal and ensure your manuscript strictly adheres to the formatting
                            guidelines including font size, margins, heading hierarchy, and reference formatting.
                        </p>

                        <h3>Permissions for Images & Third-Party Content</h3>
                        <p>
                            If your manuscript includes images, figures, tables, or any content from third-party sources,
                            you must obtain written permission from the copyright holders. Include permission documentation
                            with your submission and properly attribute all third-party content.
                        </p>

                        <h3>Originality & Plagiarism Compliance</h3>
                        <ul>
                            <li>All submissions must be original work not published or under review elsewhere.</li>
                            <li>Plagiarism must be below 10% as checked by Turnitin or iThenticate.</li>
                            <li>Self-plagiarism from your own previously published work must be disclosed.</li>
                            <li>AI-generated content must be disclosed and is subject to editorial review.</li>
                        </ul>

                        <h3>Reuse Data Disclosure</h3>
                        <p>
                            If your research utilizes previously collected data, secondary data sources, or shares datasets
                            with other publications, this must be clearly disclosed in the methodology section. Data
                            availability statements are encouraged for transparency and reproducibility.
                        </p>

                        <h3>Research Ethics Policy</h3>
                        <ul>
                            <li>Studies involving human subjects must have IRB/Ethics Committee approval.</li>
                            <li>Animal research must comply with institutional and national guidelines.</li>
                            <li>Informed consent documentation must be available upon request.</li>
                            <li>Conflict of interest declarations are mandatory for all authors.</li>
                        </ul>

                        <h3>Cover Letter Requirement</h3>
                        <p>
                            Every submission must be accompanied by a cover letter addressed to the Editorial Board.
                            The cover letter should include:
                        </p>
                        <ul>
                            <li>Title of the manuscript and type of submission.</li>
                            <li>Brief summary of the work and its significance.</li>
                            <li>Statement confirming originality and exclusive submission.</li>
                            <li>All authors' names, affiliations, and the corresponding author's contact details.</li>
                            <li>Any competing interests or funding sources.</li>
                        </ul>

                        {/* STEP 2 */}
                        <h2>2. Editor and Peer Review</h2>
                        <p>
                            Our rigorous peer review process ensures that only high-quality, impactful research is published.
                            Here's what happens after you submit your manuscript:
                        </p>

                        <h3>Initial Screening</h3>
                        <p>
                            The editorial office conducts an initial assessment of your manuscript within 3–5 business days.
                            This includes formatting compliance checks, scope alignment verification, and a preliminary
                            plagiarism scan. Manuscripts that do not meet basic criteria are returned for revision.
                        </p>

                        <h3>Plagiarism Review</h3>
                        <p>
                            All manuscripts undergo comprehensive plagiarism screening using industry-standard tools.
                            Submissions exceeding the 10% threshold are returned to the author for revision. We also
                            check for image manipulation and data fabrication.
                        </p>

                        <h3>Expert Peer Review</h3>
                        <ul>
                            <li>Each manuscript is reviewed by a minimum of 2 expert reviewers.</li>
                            <li>Reviews are conducted on a double-blind basis (reviewer and author identities are anonymous).</li>
                            <li>Reviewers assess originality, methodology, significance, clarity, and contribution.</li>
                            <li>The typical review period is 2–4 weeks.</li>
                        </ul>

                        <h3>Editorial Feedback</h3>
                        <p>
                            Based on reviewer recommendations, the editor makes one of the following decisions:
                        </p>
                        <ul>
                            <li><strong>Accept:</strong> The manuscript is accepted for publication as-is.</li>
                            <li><strong>Minor Revisions:</strong> Small changes required; re-review may not be needed.</li>
                            <li><strong>Major Revisions:</strong> Significant changes required; manuscript will be re-reviewed.</li>
                            <li><strong>Reject:</strong> The manuscript does not meet publication standards.</li>
                        </ul>

                        <h3>Quality-Based Acceptance</h3>
                        <p>
                            All acceptance decisions are based solely on academic quality, rigor, and contribution to the
                            field. We maintain strict editorial independence and do not accept or reject based on any
                            non-academic criteria.
                        </p>

                        {/* STEP 3 */}
                        <h2>3. Acceptance & Registration</h2>

                        <h3>Copyright Agreement</h3>
                        <p>
                            Upon acceptance, authors must sign a copyright transfer agreement (CTA) or a creative commons
                            license agreement. This formalizes the publishing rights and ensures proper attribution and
                            distribution of the published work.
                        </p>

                        <h3>Registration Process</h3>
                        <p>
                            After acceptance, authors are required to complete the registration process, which includes:
                        </p>
                        <ul>
                            <li>Confirming author details and affiliations.</li>
                            <li>Submitting the final, revised manuscript with all corrections.</li>
                            <li>Providing high-resolution versions of all figures and supplementary materials.</li>
                            <li>Completing the mandatory forms and declarations.</li>
                        </ul>

                        <h3>Payment Guidelines</h3>
                        <ul>
                            <li>Publication fees are communicated in the acceptance letter and are non-refundable.</li>
                            <li>Payment can be made via bank transfer and online payment mode.</li>
                            <li>Early-bird discounts are available for timely registration.</li>
                            <li>Fee waivers may be available for researchers from qualifying institutions.</li>
                        </ul>

                        <h3>Deadline Compliance</h3>
                        <p>
                            Authors must complete registration and payment within the deadline specified in the acceptance
                            letter (typically 10–15 business days). Late registrations may result in deferral to the next
                            publication cycle.
                        </p>

                        {/* STEP 4 */}
                        <h2>4. Publication</h2>

                        <h3>Time Frame</h3>
                        <p>
                            From acceptance to publication, the typical timeline is 4–8 weeks. Conference proceedings
                            are usually published within 2–4 weeks of the event. We strive to minimize production delays
                            while maintaining the highest quality standards.
                        </p>

                        <h3>Hardcopy & Softcopy</h3>
                        <ul>
                            <li>All publications are available in digital format (PDF) on our online platform.</li>
                            <li>Hardcopy (print) versions are available for books and select proceedings.</li>
                            <li>Authors receive complimentary digital copies and can order hardcopies at discounted rates.</li>
                            <li>E-book versions are available for Kindle and other digital reading platforms.</li>
                        </ul>

                        <h3>Tracking System</h3>
                        <p>
                            After publication, your work is indexed and assigned a DOI (Digital Object Identifier) for
                            permanent identification. You can track citations, downloads, and impact through our
                            author dashboard. We also submit your work to major academic databases for maximum visibility.
                        </p>

                        <blockquote>
                            Ready to begin your publishing journey? Our streamlined process ensures your academic
                            contributions receive the attention and recognition they deserve. Submit your work today!
                        </blockquote>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
                        <Link to="/author-services" className="btn btn-primary" style={{ marginRight: 16 }}>
                            Submit Your Work
                        </Link>
                        <Link to="/faq" className="btn btn-outline">
                            View FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
