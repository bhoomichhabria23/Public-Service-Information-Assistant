import {
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
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
            <a href="/contact" className="flex items-start gap-3 hover:text-orange-400 transition">
              <FaEnvelope className="text-orange-400" />
              <span>For queries and assistance, please use the contact form available on this website.</span>
            </a>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-400 mt-1" />
              Mumbai, Maharashtra, India
            </div>

            <div className="flex items-center gap-3">
              <span className="text-orange-400" aria-hidden="true">24/7</span>
              Online 24/7
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-gray-400 text-sm">
          <p>
            © 2026 AI-Powered Public Service Information Assistant. All Rights
            Reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 md:mt-0">
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
