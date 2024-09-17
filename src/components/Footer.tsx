import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaRss,
  FaGooglePlus,
} from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column logo-section">
            <img src="https://logowik.com/content/uploads/images/unsplash8609.jpg"></img>
          </div>

          <div className="footer-column">
            <ul className="footer-links">
              <li>
                <a href="#weebly-themes">Weebly Themes</a>
              </li>
              <li>
                <a href="#pre-sale-faqs">Pre-sale FAQs</a>
              </li>
              <li>
                <a href="#submit-ticket">Submit a Ticket</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <ul className="footer-links">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#theme-tweak">Theme Tweak</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <ul className="footer-links">
              <li>
                <a href="#showcase">Showcase</a>
              </li>
              <li>
                <a href="#widgetkit">WidgetKit</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <ul className="footer-links">
              <li>
                <a href="#about-us">About Us</a>
              </li>
              <li>
                <a href="#contact-us">Contact Us</a>
              </li>
              <li>
                <a href="#affiliates">Affiliates</a>
              </li>
              <li>
                <a href="#resources">Resources</a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="#facebook">
              <FaFacebookF />
            </a>
            <a href="#twitter">
              <FaTwitter />
            </a>
            <a href="#instagram">
              <FaInstagram />
            </a>
            <a href="#rss">
              <FaRss />
            </a>
            <a href="#google-plus">
              <FaGooglePlus />
            </a>
            <a href="#linkedin">
              <FaLinkedin />
            </a>
          </div>
          <p>© Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
