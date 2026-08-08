import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookmark,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import schemes from "../data/schemesData";

function Dashboard() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const savedSchemes = auth?.user?.savedSchemes ?? [];
  const getSchemeCategory = (scheme) => {
    if (scheme?.category) {
      return scheme.category;
    }

    const fallbackScheme = schemes.find((item) => item.id === scheme?.id);
    return fallbackScheme?.category || "Unknown";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-200">
          <div className="absolute right-0 top-0 h-full w-64 bg-blue-50 rounded-l-full opacity-70"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center p-10">
            <div className="max-w-2xl">
              <p className="text-blue-700 font-semibold uppercase tracking-wider">
                Dashboard
              </p>

              <h1 className="text-4xl font-bold text-slate-900 mt-2">
                Welcome Back,
                <span className="text-blue-900"> {auth?.user?.name || "User"}</span>
              </h1>

              <p className="text-slate-600 mt-5 text-lg leading-8">
                Manage your government services securely through one centralized
                platform. Access your saved schemes and stay informed with
                important application guidance.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 p-8 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Saved Schemes
              </h2>

              <p className="text-slate-500 mt-2">
                Access your bookmarked government schemes anytime.
              </p>
            </div>
          </div>

          {savedSchemes.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-3xl py-16 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                <FaBookmark className="text-5xl text-blue-700" />
              </div>

              <h3 className="text-2xl font-semibold mt-6 text-slate-900">
                No Saved Schemes Yet
              </h3>

              <p className="text-slate-500 text-center mt-3 max-w-md">
                Browse government schemes and bookmark your favourites for quick
                access from your dashboard.
              </p>

              <button
                onClick={() => navigate("/schemes")}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-6 py-3 text-white font-medium hover:bg-blue-800 transition"
              >
                Browse Schemes
                <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
              {savedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-slate-50 rounded-3xl border border-slate-200 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-4xl">{scheme.icon}</div>
                    <span className="rounded-2xl bg-blue-50 px-3 py-2 text-blue-700 text-sm">
                      {getSchemeCategory(scheme)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-5 text-slate-900">
                    {scheme.name}
                  </h3>

                  <p className="text-slate-500 mt-3 leading-7">
                    {scheme.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-gray-500">
                    <FaMapMarkerAlt />
                    <span>{scheme.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900  ">
              Application Tips
            </h2>

            <p className="text-slate-500 mt-2">
              Follow these recommendations before applying for any government
              scheme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>

              <h3 className="text-xl font-semibold mt-5 text-slate-900">
                Keep Documents Ready
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                Ensure all required documents are updated and available before
                starting your application.
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>

              <h3 className="text-xl font-semibold mt-5 text-slate-900">
                Verify Eligibility
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                Review the eligibility criteria carefully before applying to
                avoid unnecessary rejections.
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>

              <h3 className="text-xl font-semibold mt-5 text-slate-900">
                Save Useful Schemes
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                Bookmark schemes you're interested in to access them quickly
                from your dashboard.
              </p>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>

              <h3 className="text-xl font-semibold mt-5 text-slate-900">
                Review Before Applying
              </h3>

              <p className="text-slate-600 mt-3 leading-7">
                Double-check your details and uploaded documents before
                submitting your application.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Find quick answers to common questions.
          </p>

          <div className="space-y-4">
            <details className="group rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="cursor-pointer list-none flex justify-between items-center p-5 font-semibold text-slate-800 hover:bg-slate-50">
                How do I check my eligibility?
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>

              <div className="px-5 pb-5 text-slate-600 leading-7">
                Open the Eligibility Checker page, enter the required details,
                and the system will determine whether you qualify for the
                selected government scheme.
              </div>
            </details>

            <details className="group rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="cursor-pointer list-none flex justify-between items-center p-5 font-semibold text-slate-800 hover:bg-slate-50">
                How do I save a scheme?
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>

              <div className="px-5 pb-5 text-slate-600 leading-7">
                Click the bookmark icon on any scheme. Saved schemes will appear
                on your dashboard for quick access.
              </div>
            </details>

            <details className="group rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="cursor-pointer list-none flex justify-between items-center p-5 font-semibold text-slate-800 hover:bg-slate-50">
                What documents are usually required?
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>

              <div className="px-5 pb-5 text-slate-600 leading-7">
                Requirements vary by scheme but commonly include Aadhaar Card,
                income certificate, address proof, and other supporting
                documents.
              </div>
            </details>

            <details className="group rounded-2xl border border-slate-200 overflow-hidden">
              <summary className="cursor-pointer list-none flex justify-between items-center p-5 font-semibold text-slate-800 hover:bg-slate-50">
                How does the AI Assistant help?
                <span className="text-xl transition group-open:rotate-45">+</span>
              </summary>

              <div className="px-5 pb-5 text-slate-600 leading-7">
                The AI Assistant answers questions, explains scheme details,
                guides you through eligibility requirements, and helps you
                understand required documents.
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;