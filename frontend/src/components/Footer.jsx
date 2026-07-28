import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-2">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-orange-400">
            Public Service Information Assistant
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            An AI-powered platform that helps citizens discover government
            schemes, check eligibility, generate document checklists, and
            receive multilingual assistance.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="/" className="hover:text-orange-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/schemes" className="hover:text-orange-400 transition">
                Schemes
              </a>
            </li>

            <li>
              <a
                href="/eligibility"
                className="hover:text-orange-400 transition"
              >
                Eligibility Checker
              </a>
            </li>

            <li>
              <a href="/chatbot" className="hover:text-orange-400 transition">
                  AI Assistant
                </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-orange-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Services</h3>

          <ul className="space-y-3 text-gray-300">
            <li>Education Schemes</li>
            <li>Healthcare</li>
            <li>Employment</li>
            <li>Agriculture</li>
            <li>Housing</li>
            <li>Financial Assistance</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-5">Contact</h3>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-400" />
              support@publicserviceai.in
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-400" />
              +91 98765 43210
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              India
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>
            © 2026 AI-Powered Public Service Information Assistant. All Rights
            Reserved.
          </p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-orange-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-orange-400">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-orange-400">
              FAQs
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
