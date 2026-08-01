import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaRegClock,
  FaRupeeSign,
} from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import AuthContext from "../context/AuthContext";
import schemes from "../data/schemesData";

function SchemeDetails() {
  const { auth, saveScheme } = useContext(AuthContext);
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState(null);
  const documentsRef = useRef(null);

  useEffect(() => {
    const id = Number(schemeId);
    const found = schemes.find((item) => item.id === id);
    setScheme(found);
  }, [schemeId]);

  useEffect(() => {
    if (!scheme) return;

    const hash = window.location.hash;
    if (hash === "#documents" && documentsRef.current) {
      window.requestAnimationFrame(() => {
        documentsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [scheme]);

  if (!scheme) {
    return (
      <div className="min-h-screen bg-[#f8fbff] py-10 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white p-10 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-slate-900">Scheme Not Found</h1>
          <p className="mt-4 text-slate-600">
            We couldn't locate the selected scheme. Please return to the schemes page and try again.
          </p>
          <button
            onClick={() => navigate("/schemes")}
            className="mt-8 rounded-2xl bg-blue-900 px-6 py-3 text-white hover:bg-blue-800"
          >
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        <div className="mt-8 rounded-[32px] bg-white p-10 shadow-xl border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex h-32 w-32 items-center justify-center rounded-[32px] bg-blue-50 text-5xl">
              {scheme.icon}
            </div>

            <div className="flex-1">
              <h1 className="mt-4 text-4xl font-bold text-slate-900">
                {scheme.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {scheme.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-2xl bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  Location: {scheme.location}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="text-blue-700 text-xl" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-400">
                        Launch Date
                      </p>
                      <p className="mt-3 text-base font-semibold text-slate-900">
                        {scheme.launchDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <FaRegClock className="text-blue-700 text-3xl" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-400">
                        Eligible Beneficiaries
                      </p>
                      <p className="mt-3 text-base font-semibold text-slate-900">
                        {scheme.beneficiaries}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <FaRupeeSign className="text-blue-700 text-xl" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-400">
                        Financial Assistance
                      </p>
                      <p className="mt-3 text-base font-semibold text-slate-900">
                        {scheme.financialAssistance}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-blue-50 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <FaExternalLinkAlt className="text-blue-700 text-xl" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] font-semibold text-slate-400">
                        Official Website
                      </p>
                      <a
                        href={scheme.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block w-full text-sm font-semibold text-blue-700 hover:underline break-all"
                      >
                        {new URL(scheme.website).hostname}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => saveScheme(scheme)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:bg-blue-50 transition"
                title={auth?.user?.savedSchemes?.some((item) => item.id === scheme.id)
                  ? "Remove from saved"
                  : "Save scheme"}
              >
                {auth?.user?.savedSchemes?.some((item) => item.id === scheme.id) ? (
                  <BsBookmarkFill className="text-xl text-blue-700" />
                ) : (
                  <BsBookmark className="text-xl text-gray-500 hover:text-blue-700" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-blue-700" />
                <h2 className="text-2xl font-semibold text-slate-900">Key Benefits</h2>
              </div>
              <ul className="mt-5 space-y-3 text-slate-600">
                {scheme.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 text-blue-700">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <FaRegClock className="text-blue-700" />
                <h2 className="text-2xl font-semibold text-slate-900">Eligibility Criteria</h2>
              </div>
              <ul className="mt-5 space-y-3 text-slate-600">
                {scheme.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 text-blue-700">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div ref={documentsRef} id="documents" className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Documents Required</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {scheme.documents.map((doc) => (
                <div key={doc} className="rounded-2xl bg-blue-100 p-4 text-slate-700 shadow-sm">
                  {doc}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">How to Apply</h2>
            <p className="mt-4 text-slate-700 leading-8">{scheme.howToApply}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-blue-100 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] font-semibold text-black">Official Portal</p>
                <a
                  href={scheme.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-blue-900 hover:text-blue-700 hover:underline"
                >
                  {scheme.website}
                </a>
              </div>

              <div className="rounded-3xl bg-blue-100 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] font-semibold text-black">Contact</p>
                <p className="mt-3 text-slate-700">{scheme.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemeDetails;
