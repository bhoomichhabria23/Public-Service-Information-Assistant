import { useLocation, useNavigate } from "react-router-dom";
import schemes from "../data/schemesData";

function EligibilityResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { selectedSchemeId, evaluation } = state;
  const selectedScheme = schemes.find((scheme) => scheme.id.toString() === selectedSchemeId);

  if (!selectedScheme || !evaluation) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl text-center">
          <h1 className="text-3xl font-bold text-slate-900">Eligibility result not available</h1>
          <p className="mt-4 text-slate-600">
            Please return to the eligibility checker and submit your details to see a personalized result.
          </p>
          <button
            onClick={() => navigate("/eligibility")}
            className="mt-8 rounded-2xl bg-sky-600 px-6 py-3 text-white shadow-sm hover:bg-sky-700"
          >
            Return to eligibility checker
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-xl">
          <button
            onClick={() =>
              navigate("/eligibility", {
                state: {
                  fromResult: true,
                  selectedSchemeId: location.state?.selectedSchemeId,
                  userDetails: location.state?.userDetails,
                },
              })
            }
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Back
          </button>

          <div className={`mt-8 rounded-3xl border p-8 shadow-sm ${evaluation.eligible ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-col items-center gap-6 text-center">
              <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${evaluation.eligible ? "bg-emerald-100" : "bg-rose-100 text-rose-700"}`}>
                {evaluation.eligible ? <span className="text-4xl font-bold text-emerald-700 leading-none">✓</span> : "✕"}
              </div>
              <div>
                <p className={`text-2xl font-bold ${evaluation.eligible ? "text-emerald-700" : "text-rose-700"}`}>
                  {evaluation.eligible ? "Congratulations!" : "We're sorry."}
                </p>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {evaluation.title}
                </p>
                <p className="mt-2 text-slate-600">{evaluation.summary}</p>
              </div>
            </div>
          </div>

          <div className={`mt-6 grid gap-4 ${evaluation.eligible ? "sm:grid-cols-2" : "grid-cols-1"}`}>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                {evaluation.eligible ? "Why you are eligible" : "Why you are not eligible"}
              </h3>
              <p className="mt-3 text-slate-600">
                {evaluation.eligible
                  ? "Based on the information you provided, you qualify for this scheme because:"
                  : "Based on the information you provided, you do not qualify for this scheme because:"
                }
              </p>
              <div className="mt-4 space-y-3">
                {evaluation.reasons.map((reason, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 ${evaluation.eligible ? "border-emerald-100 bg-emerald-50 text-emerald-800" : "border-rose-100 bg-rose-50 text-rose-800"}`}
                  >
                    <span className="mt-0.5 text-lg font-bold">
                      {evaluation.eligible ? "✓" : "✕"}
                    </span>
                    <p className="text-sm leading-6">{reason}</p>
                  </div>
                ))}
              </div>
            </div>
            {evaluation.eligible && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">Next steps</h3>
                <p className="mt-4 text-slate-700 leading-7">
                  Gather your documents and follow the scheme guide to apply with confidence.
                </p>
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate(`/schemes/${selectedScheme.id}#documents`)}
                    className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-white shadow-sm hover:bg-sky-700"
                  >
                    View required documents
                  </button>
                  <button
                    onClick={() => window.open(selectedScheme.website, "_blank", "noreferrer")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Apply Scheme
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityResult;
