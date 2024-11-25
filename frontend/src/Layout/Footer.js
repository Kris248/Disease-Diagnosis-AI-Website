import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* About Us Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            At <strong>VitalCare AI</strong>, we prioritize your health with
            AI-driven solutions and cutting-edge medical technologies to deliver
            accurate diagnoses and insights.
            <br />
            Learn more about our{" "}
            <a href="#" className="footer-link">
              <u>mission</u>
            </a>
            ,{" "}
            <a href="#" className="footer-link">
              <u>team</u>
            </a>{" "}
            and{" "}
            <a href="#" className="footer-link">
              <u>values</u>
            </a>
            .
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            <b>Email</b>: <u>support@vitalcareai.info</u>
          </p>
          <p>
            <b>Phone</b>: +992 827 1803
          </p>
          <p>
            <b>Address</b>: 789 Pine Avenue, Houston City, Texas 77056
          </p>
        </div>

        {/* Additional Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                <u>Careers</u>
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                <u>Privacy Policy</u>
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                <u>Terms & Conditions</u>
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                <u>FAQ</u>
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="25"
                fill="currentColor"
                class="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 VitalCare Ai. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
