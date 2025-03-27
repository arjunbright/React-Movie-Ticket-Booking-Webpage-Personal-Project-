import React, { useState } from "react";
import "../styles/contact.css";

const faqs = [
    {
        question: "How do I book a movie ticket on your platform?",
        answer: "Simply navigate to the Movies section, choose your preferred movie, time, and seat, then proceed to payment.",
    },
    {
        question: "Can I cancel or reschedule my movie ticket?",
        answer: "Yes, tickets can be cancelled or rescheduled up to 1 hour before the showtime from your account dashboard.",
    },
    {
        question: "Are digital tickets accepted at the theater?",
        answer: "Absolutely! Just show the QR code from your email or the app at the entrance.",
    },
    {
        question: "What should I do if I didn’t receive my ticket email?",
        answer: "Check your spam folder first. If it's not there, go to your account and resend the ticket, or contact our support team.",
    },
    {
        question: "Are there any discounts for students or group bookings?",
        answer: "Yes, we offer exclusive discounts for students and bulk bookings. Check the Offers section for current deals.",
    },
];

const Contact = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <h1>Get In Touch</h1>
                <p>Learn more about our work, connect with us, or suggest ideas anytime.</p>

                <div className="contact-details">
                    <p>📞 +1 647 000 0000</p>
                    <p>📧 hello@movietickets.com</p>
                    <p>📍 789 Movie Street, London</p>
                </div>

                <form className="contact-form">
                    <div className="form-row">
                        <input type="text" placeholder="First Name" required />
                        <input type="text" placeholder="Last Name" required />
                    </div>
                    <div className="form-row">
                        <input type="email" placeholder="Email" required />
                        <input type="text" placeholder="Phone" />
                    </div>
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </section>

            <section className="our-values">
                <h2>Our Values</h2>
                <p>Learn about our core beliefs, innovative approach to ticketing, and why customers trust us.</p>
                <div className="value-cards">
                    <div className="card">
                        <h3>🎯 Grow</h3>
                        <p>Special tools to grow ticket sales, user base, and streamline operations in one place.</p>
                    </div>
                    <div className="card">
                        <h3>🔗 Connect</h3>
                        <p>Reach users across platforms. Build experiences that foster loyalty and retention.</p>
                    </div>
                    <div className="card">
                        <h3>⚙️ Automate</h3>
                        <p>Self-managing processes for booking, refunding, notifying, and user support.</p>
                    </div>
                </div>
            </section>

            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((item, index) => (
                        <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`} onClick={() => toggleFAQ(index)}>
                            <div className="faq-question">
                                {item.question}
                                <span>{activeIndex === index ? "-" : "+"}</span>
                            </div>
                            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
                        </div>
                    ))}
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div>
                        <h4>Tech Info</h4>
                        <p>Home</p>
                        <p>Movies</p>
                        <p>About</p>
                    </div>
                    <div>
                        <h4>Solutions</h4>
                        <p>Pricing</p>
                        <p>FAQ</p>
                    </div>
                    <div>
                        <h4>Company</h4>
                        <p>Jobs</p>
                        <p>Legal</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <input type="email" placeholder="Your email" />
                        <button>Sign up</button>
                    </div>
                </div>
                <p className="copyright">Copyright © 2024 MovieTickets.com • Privacy Policy • Terms of Service</p>
            </footer>
        </div>
    );
};

export default Contact;
