import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaRss,
  FaGooglePlus,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-black py-10 text-center">
      <div className="container mx-auto">
        <div className="footer-grid flex justify-between py-5">
          <div className="footer-column flex-1 text-left">
            <img 
              src="https://logowik.com/content/uploads/images/unsplash8609.jpg" 
              className="max-w-full h-auto w-38 mx-auto" 
              alt="Logo"
            />
          </div>

          <div className="footer-column flex-1 text-left">
            <ul className="footer-links list-none p-0">
              <li><a href="#weebly-themes" className="text-black text-sm hover:text-gray-600">Weebly Themes</a></li>
              <li><a href="#pre-sale-faqs" className="text-black text-sm hover:text-gray-600">Pre-sale FAQs</a></li>
              <li><a href="#submit-ticket" className="text-black text-sm hover:text-gray-600">Submit a Ticket</a></li>
            </ul>
          </div>

          <div className="footer-column flex-1 text-left">
            <ul className="footer-links list-none p-0">
              <li><a href="#services" className="text-black text-sm hover:text-gray-600">Services</a></li>
              <li><a href="#theme-tweak" className="text-black text-sm hover:text-gray-600">Theme Tweak</a></li>
            </ul>
          </div>

          <div className="footer-column flex-1 text-left">
            <ul className="footer-links list-none p-0">
              <li><a href="#showcase" className="text-black text-sm hover:text-gray-600">Showcase</a></li>
              <li><a href="#widgetkit" className="text-black text-sm hover:text-gray-600">WidgetKit</a></li>
              <li><a href="#support" className="text-black text-sm hover:text-gray-600">Support</a></li>
            </ul>
          </div>

          <div className="footer-column flex-1 text-left">
            <ul className="footer-links list-none p-0">
              <li><a href="#about-us" className="text-black text-sm hover:text-gray-600">About Us</a></li>
              <li><a href="#contact-us" className="text-black text-sm hover:text-gray-600">Contact Us</a></li>
              <li><a href="#affiliates" className="text-black text-sm hover:text-gray-600">Affiliates</a></li>
              <li><a href="#resources" className="text-black text-sm hover:text-gray-600">Resources</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800" />

        <div className="footer-bottom flex flex-col items-center justify-center p-4 text-center">
          <div className="footer-social flex justify-center gap-4 mb-4">
            <a href="#facebook" className="text-black text-xl hover:text-gray-600">
              <FaFacebookF />
            </a>
            <a href="#twitter" className="text-black text-xl hover:text-gray-600">
              <FaTwitter />
            </a>
            <a href="#instagram" className="text-black text-xl hover:text-gray-600">
              <FaInstagram />
            </a>
            <a href="#rss" className="text-black text-xl hover:text-gray-600">
              <FaRss />
            </a>
            <a href="#google-plus" className="text-black text-xl hover:text-gray-600">
              <FaGooglePlus />
            </a>
            <a href="#linkedin" className="text-black text-xl hover:text-gray-600">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-gray-500 text-xs mt-4">© Copyright. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
