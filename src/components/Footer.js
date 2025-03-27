import React from "react";
import "../styles/footer.css";

const Footer = () => {
    return (
        <footer className="custom-footer">
            <div className="footer-columns">
                <div className="footer-column">
                    <h3>Products</h3>
                    <ul>
                        <li>Stream Movies</li>
                        <li>Exclusive Originals</li>
                        <li>Top Rated Content</li>
                        <li>Download for Offline</li>
                        <li>New Arrivals</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Community</h3>
                    <ul>
                        <li>Movie Reviews</li>
                        <li>Actor Spotlight</li>
                        <li>Movie Magazine</li>
                        <li>Events</li>
                        <li>Clubs</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>Contact Support</li>
                        <li>Refund Policy</li>
                        <li>Downloads</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Subscribe</h3>
                    <div className="subscribe-section">
                        <input type="email" placeholder="Your Email" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="footer-social">
                <a href="#">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                    <i className="fab fa-pinterest"></i>
                </a>
            </div>

            <div className="footer-bottom">
                <p>© 2024 EasyTicket. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
