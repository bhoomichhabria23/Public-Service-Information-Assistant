import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import schemes from "../data/schemesData";
import AuthContext from "../context/AuthContext";

function Eligibility() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialState = location.state || {};
  const [selectedSchemeId, setSelectedSchemeId] = useState(initialState.selectedSchemeId || "");
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState(initialState.userDetails || {
    fullName: "",
    age: "",
    gender: "",
    candidateCategory: "",
    annualIncome: "",
    maritalStatus: "",
    occupation: "",
    state: "",
    familyMembers: "",
    existingBenefits: "no",
  });

  useEffect(() => {
    if (location.state?.fromResult) {
      setStep(1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.state]);

  const { auth } = useContext(AuthContext);
  const selectedScheme = schemes.find((scheme) => scheme.id.toString() === selectedSchemeId);

  const handleNext = () => {
    if (selectedSchemeId) {
      setStep(2);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const evaluateEligibility = () => {
    if (!selectedScheme) {
      return {
        eligible: false,
        title: "Select a scheme",
        summary: "Please choose a scheme before checking eligibility.",
        reasons: ["No scheme is selected yet."],
      };
    }

    const age = Number(userDetails.age);
    const income = Number(userDetails.annualIncome);
    const occupation = userDetails.occupation.toLowerCase();
    const hasValidAge = age > 0 && age < 120;
    const hasValidIncome = income >= 0;
    const messages = [];
    let eligible = true;

    if (!userDetails.fullName.trim()) {
      messages.push("Enter your full name.");
      eligible = false;
    }

    if (!hasValidAge) {
      messages.push("Enter a valid age.");
      eligible = false;
    }

    if (!userDetails.gender) {
      messages.push("Select your gender.");
      eligible = false;
    }

    if (!userDetails.candidateCategory) {
      messages.push("Select your category.");
      eligible = false;
    }

    if (!hasValidIncome) {
      messages.push("Enter a valid annual income.");
      eligible = false;
    }

    switch (selectedScheme.category) {
      case "Agriculture":
        if (!occupation.includes("farmer") && !occupation.includes("cultivator")) {
          eligible = false;
          messages.push("This scheme is best suited for farmers or cultivators.");
        }
        if (income > 500000) {
          eligible = false;
          messages.push("Higher incomes may make you less likely to qualify.");
        }
        break;
      case "Housing":
        if (income > 750000) {
          eligible = false;
          messages.push("Household income above the scheme limit may disqualify you.");
        }
        break;
      case "Healthcare":
        if (userDetails.existingBenefits === "yes") {
          eligible = false;
          messages.push("You may not qualify if you already receive a similar health benefit.");
        }
        break;
      case "Finance":
        if (age < 18 || age > 70) {
          eligible = false;
          messages.push("This scheme typically serves people aged 18 to 70.");
        }
        break;
      case "Education":
        if (age > 28) {
          eligible = false;
          messages.push("This education support is usually for younger students.");
        }
        break;
      case "Skill Development":
        if (age < 15 || age > 45) {
          eligible = false;
          messages.push("This scheme is mainly for youth between 15 and 45 years old.");
        }
        break;
      case "Energy":
        if (income > 1000000) {
          eligible = false;
          messages.push("High-income households are less likely to qualify.");
        }
        break;
      case "Women & Child":
        if (!userDetails.gender.toLowerCase().includes("female") && !userDetails.gender.toLowerCase().includes("woman")) {
          eligible = false;
          messages.push("This scheme is primarily for women and girls.");
        }
        break;
      case "Insurance":
        if (age < 18 || age > 70) {
          eligible = false;
          messages.push("This insurance scheme is for ages 18 to 70.");
        }
        break;
      case "Employment":
        if (age < 18 || age > 25) {
          eligible = false;
          messages.push("This internship scheme is for youth aged 18 to 25.");
        }
        break;
      default:
        break;
    }

    const buildReasons = () => {
      const reasons = [];
      const incomeCutoffs = {
        Agriculture: 500000,
        Housing: 750000,
        Healthcare: 500000,
        Energy: 1000000,
        "Women & Child": 750000,
        Finance: 1000000,
        Education: 300000,
        "Skill Development": 500000,
        Insurance: 1000000,
        Employment: 300000,
      };
      const familyIncomeLabel = income >= 0 ? `₹${income.toLocaleString("en-IN")}` : "a valid income";
      const isFemale = userDetails.gender.toLowerCase().includes("female") || userDetails.gender.toLowerCase().includes("woman");
      const isSpecialCategory = userDetails.candidateCategory && userDetails.candidateCategory !== "General" && userDetails.candidateCategory !== "Other";

      if (eligible) {
        // Produce concrete, scheme-specific positive reasons using user inputs and scheme thresholds
        switch (selectedScheme.id) {
          case 1: // PM Kisan Samman Nidhi
            if (occupation.includes("farmer") || occupation.includes("cultivator")) {
              reasons.push(`Your occupation "${userDetails.occupation}" indicates you are a farmer/cultivator, matching PM Kisan's beneficiary profile.`);
            }
            if (income >= 0 && income <= 500000) {
              reasons.push(`Your declared annual income of ${familyIncomeLabel} is below PM Kisan's commonly used cutoff of ₹500,000.`);
            }
            if (userDetails.state) {
              reasons.push(`Your state/UT (${userDetails.state}) participates in PM Kisan disbursements, which supports local verification.`);
            }
            reasons.push(`Your occupation and income satisfy ${selectedScheme.name} eligibility guidelines.`);
            break;
          case 2: // Pradhan Mantri Awas Yojana
            if (income >= 0 && income <= 750000) {
              reasons.push(`Your declared annual income of ${familyIncomeLabel} is below PMAY's typical subsidy threshold of ₹750,000.`);
            }
            if (userDetails.candidateCategory && userDetails.candidateCategory !== 'General') {
              reasons.push(`You belong to the ${userDetails.candidateCategory} category, which PMAY often gives priority to.`);
            }
            if (userDetails.state) {
              reasons.push(`Your state/UT (${userDetails.state}) administers PMAY benefits and will verify household eligibility.`);
            }
            reasons.push(`Your household income and category satisfy ${selectedScheme.name} eligibility guidelines.`);
            break;
          case 3: // Ayushman Bharat
            if (userDetails.existingBenefits === 'no') {
              reasons.push(`You indicated you are not receiving similar benefits, which supports Ayushman Bharat eligibility.`);
            }
            if (income >= 0 && income <= 500000) {
              reasons.push(`Your declared annual income of ${familyIncomeLabel} fits typical means-tested criteria used for Ayushman Bharat.`);
            }
            if (userDetails.state) {
              reasons.push(`Your state/UT (${userDetails.state}) will be used during SECC/database verification for this scheme.`);
            }
            reasons.push(`Your income and benefit status satisfy ${selectedScheme.name} eligibility guidelines.`);
            break;
          case 4: // Sukanya Samriddhi Yojana
            reasons.push("Sukanya Samriddhi is for parents/guardians of a girl child below 10 years of age.");
            reasons.push("Account eligibility requires the girl's birth certificate and parent/guardian identity proof.");
            if (userDetails.state) {
              reasons.push(`Local banks/post offices in ${userDetails.state} facilitate SSY account opening.`);
            }
            reasons.push(`Your household details satisfy ${selectedScheme.name} account-opening guidelines.`);
            break;
          case 5: // Pradhan Mantri Mudra Loan
            if (userDetails.occupation) {
              reasons.push(`Your occupation "${userDetails.occupation}" suggests involvement in micro/small enterprise activity, matching Mudra targets.`);
            }
            reasons.push("Mudra loans support micro and small entrepreneurs with viable business plans and credit needs.");
            if (income >= 0) {
              reasons.push(`Lenders will assess your declared annual income of ${familyIncomeLabel} during the credit appraisal.`);
            }
            reasons.push(`Your business profile and income satisfy typical ${selectedScheme.name} eligibility considerations.`);
            break;
          case 6: // National Scholarship Portal
            reasons.push("NSP contains multiple scholarships; eligibility depends on the selected scheme's criteria.");
            if (income >= 0) {
              reasons.push(`Your declared annual income of ${familyIncomeLabel} will be used to check means-tested scholarship limits.`);
            }
            if (userDetails.state) {
              reasons.push(`Some scholarships on NSP are state-specific; your state/UT (${userDetails.state}) will determine availability.`);
            }
            reasons.push(`Your academic and income details satisfy common ${selectedScheme.name} scholarship guidelines.`);
            break;
          case 7: // Pradhan Mantri Vishwakarma
            if (occupation && (occupation.includes('artisan') || occupation.includes('craft') || occupation.includes('carpenter') || occupation.includes('blacksmith') || occupation.includes('hand'))) {
              reasons.push(`Your occupation "${userDetails.occupation}" aligns with PM Vishwakarma's target beneficiaries (traditional artisans/craftsmen).`);
            }
            reasons.push("PM Vishwakarma prioritizes applicants actively engaged in traditional crafts or village-based trades.");
            if (userDetails.state) {
              reasons.push(`Artisan welfare or training centres in ${userDetails.state} can confirm your local eligibility.`);
            }
            reasons.push(`Your artisan profile and local standing satisfy ${selectedScheme.name} beneficiary guidelines.`);
            break;
          case 8: // Atal Pension Yojana
            if (hasValidAge && age >= 18 && age <= 40) {
              reasons.push(`Your age (${age}) falls within APY's subscriber range (18–40).`);
            }
            reasons.push("APY targets unorganised sector workers who can contribute through a savings/post office account for a guaranteed pension." );
            if (userDetails.occupation) {
              reasons.push(`If your occupation (${userDetails.occupation}) is in the informal sector, you match APY's target beneficiaries.`);
            }
            reasons.push(`Your age and occupation satisfy ${selectedScheme.name} subscriber guidelines.`);
            break;
          case 9: // PM Internship Scheme
            if (hasValidAge && age >= 18 && age <= 25) {
              reasons.push(`Your age (${age}) meets the PM Internship eligibility window (18–25).`);
            }
            reasons.push("This scheme targets students and recent graduates who meet posting-specific educational criteria.");
            if (userDetails.occupation) {
              reasons.push(`If you are currently a student or recent graduate (${userDetails.occupation}), you fit the program's beneficiary profile.`);
            }
            reasons.push(`Your age and education details satisfy ${selectedScheme.name} eligibility guidelines.`);
            break;
          case 10: // Skill India Mission
            if (hasValidAge && age >= 15 && age <= 45) {
              reasons.push(`Your age (${age}) fits Skill India's target range (15–45).`);
            }
            if (userDetails.occupation) {
              reasons.push(`Your background or interest in ${userDetails.occupation} may align with available vocational courses.`);
            }
            reasons.push("Skill India provides industry-aligned training and certification to improve employability.");
            reasons.push(`Your age and training interest satisfy ${selectedScheme.name} program guidelines.`);
            break;
          case 11: // Pradhan Mantri Ujjwala Yojana
            if (userDetails.gender && userDetails.gender.toLowerCase().includes('female')) {
              reasons.push(`You indicated gender "${userDetails.gender}", matching PMUY's primary beneficiary group (women).`);
            }
            reasons.push("PMUY targets women from deprived households without existing LPG connections; proof of BPL/deprivation supports eligibility.");
            if (userDetails.state) {
              reasons.push(`Local Ujjwala offices in ${userDetails.state} process applications and verify household status.`);
            }
            reasons.push(`Your household and gender details satisfy ${selectedScheme.name} beneficiary guidelines.`);
            break;
          case 12: // Beti Bachao Beti Padhao
            reasons.push("BBBP focuses on improving welfare and education outcomes for girl children at the community level.");
            if (userDetails.state) {
              reasons.push(`Your local schools or WCD offices in ${userDetails.state} will have program enrollment details.`);
            }
            reasons.push("Participation is community-driven; households with girl children are the intended beneficiaries.");
            reasons.push(`Your family details satisfy local ${selectedScheme.name} program guidelines.`);
            break;
          case 13: // Pradhan Mantri Jan Dhan Yojana
            reasons.push("PMJDY provides no-frills bank accounts to unbanked citizens to promote financial inclusion.");
            if (userDetails.age && age >= 18) {
              reasons.push(`Your age (${age}) meets typical bank account opening age requirements.`);
            }
            reasons.push("Simplified KYC under PMJDY enables account opening even with limited documents.");
            reasons.push(`Your identity and age satisfy ${selectedScheme.name} account-opening guidelines.`);
            break;
          case 14: // PM Surya Ghar
            reasons.push("PM Surya Ghar supports rooftop solar adoption for households with suitable roof space and an electricity connection.");
            if (userDetails.state) {
              reasons.push(`Your state DISCOM in ${userDetails.state} manages rooftop solar subsidies and eligibility checks.`);
            }
            reasons.push(`Households with annual income ${familyIncomeLabel} that meet state criteria may receive subsidy support.`);
            reasons.push(`Your household location and income satisfy ${selectedScheme.name} subsidy guidelines.`);
            break;
          case 15: // Pradhan Mantri Suraksha Bima Yojana
            if (hasValidAge && age >= 18 && age <= 70) {
              reasons.push(`Your age (${age}) falls within PMSBY's eligible range (18–70).`);
            }
            reasons.push("PMSBY targets savings account holders who can authorize annual premium auto-debit for accidental cover.");
            reasons.push(`Your age and bank account status satisfy ${selectedScheme.name} enrollment guidelines.`);
            break;
          default:
            // fallback to category-level messages if scheme-specific not defined
            switch (selectedScheme.category) {
              case "Agriculture":
                if (occupation.includes("farmer") || occupation.includes("cultivator")) {
                  reasons.push(`Your occupation "${userDetails.occupation}" matches the scheme requirement for farmers/cultivators.`);
                }
                if (income >= 0 && income <= 500000) {
                  reasons.push(`Your declared annual income of ${familyIncomeLabel} is below the scheme cutoff of ₹500,000, so you are eligible for this scheme.`);
                }
                break;
              default:
                reasons.push(`Your provided details (age: ${age}, income: ${familyIncomeLabel}) match usual beneficiary criteria for ${selectedScheme.name}.`);
                break;
            }
            break;
        }

        // Ensure at least 3 concise reasons for eligibility by adding fallback facts
        const dedup = (arr) => [...new Set(arr)];
        let finalReasons = dedup(reasons);

        // Add explicit income cutoff reason for this category if not already present
        const cutoff = incomeCutoffs[selectedScheme.category];
        const containsKey = (arr, key) => {
          return arr.some((r) => r.toLowerCase().includes(key.toLowerCase()));
        };
        if (cutoff !== undefined && hasValidIncome) {
          if (income <= cutoff) {
            const incomeEligibleText = `Your declared annual income of ${familyIncomeLabel} is below the scheme cutoff of ₹${cutoff.toLocaleString('en-IN')}, so you are eligible for this scheme.`;
            if (!containsKey(finalReasons, 'below') && !finalReasons.includes(incomeEligibleText)) {
              finalReasons.push(incomeEligibleText);
            }
          } else {
            const incomeNotEligibleText = `Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹${cutoff.toLocaleString('en-IN')}, you are not eligible for this scheme.`;
            if (!containsKey(finalReasons, 'exceed') && !finalReasons.includes(incomeNotEligibleText)) {
              finalReasons.push(incomeNotEligibleText);
            }
          }
        }

        // Fallback candidates with simple keys to avoid adding repeated facts
        const fallbackCandidates = [];
        if (hasValidAge) fallbackCandidates.push({ key: "age", text: `Your age is ${age}, which fits the scheme's target age range.` });
        if (income >= 0) fallbackCandidates.push({ key: "income", text: `Your declared annual income is ${familyIncomeLabel}, which meets the income criteria for this scheme.` });
        if (userDetails.candidateCategory) fallbackCandidates.push({ key: "category", text: `You belong to the ${userDetails.candidateCategory} category, which is considered in beneficiary prioritization.` });
        if (userDetails.occupation) fallbackCandidates.push({ key: "occupation", text: `Your occupation is ${userDetails.occupation}, which aligns with this scheme's intended beneficiary profile.` });
        if (userDetails.existingBenefits) fallbackCandidates.push({ key: "existingBenefits", text: `Existing benefits: ${userDetails.existingBenefits === 'yes' ? 'You already receive a similar benefit' : 'You do not currently receive a similar benefit'}.` });

        // containsKey already defined above for eligible branch fallback

        for (const cand of fallbackCandidates) {
          if (finalReasons.length >= 3) break;
          // only add if no existing reason already mentions this key
          if (!containsKey(finalReasons, cand.key) && !finalReasons.includes(cand.text)) {
            finalReasons.push(cand.text);
          }
        }

        return finalReasons.slice(0, 5);
      } else {
        if (!userDetails.fullName.trim()) {
          reasons.push("You did not provide your full name, which is required for eligibility verification.");
        }
        if (!hasValidAge) {
          reasons.push("You provided an invalid age; please enter a numeric age between 1 and 119 so we can check age-based criteria.");
        }
        if (!userDetails.gender) {
          reasons.push("Gender is missing; some schemes have gender-specific eligibility requirements.");
        }
        if (!userDetails.candidateCategory) {
          reasons.push("Beneficiary category is not selected; many schemes use category (General/OBC/SC/ST/EWS) for reservation and prioritization.");
        }
        if (!hasValidIncome) {
          reasons.push("Annual family income is missing or invalid; income is used to compare against scheme-specific cutoffs.");
        }

        switch (selectedScheme.category) {
          case "Agriculture":
            if (!occupation.includes("farmer") && !occupation.includes("cultivator")) {
              reasons.push(`${selectedScheme.name} targets farmers/cultivators, but your occupation is "${userDetails.occupation || 'not provided'}".`);
            }
            if (income > 500000) {
              reasons.push(`Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹500,000, you are not eligible for this scheme.`);
            }
            if (userDetails.candidateCategory === "General") {
              reasons.push("This scheme may prioritize reserved categories (SC/ST/OBC/EWS); you selected General.");
            }
            break;
          case "Housing":
            if (income > 750000) {
              reasons.push(`Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹750,000, you are not eligible for this scheme.`);
            }
            if (!isSpecialCategory) {
              reasons.push("Reserved categories (SC/ST/OBC/EWS) are often given priority for housing assistance; you selected General/Other.");
            }
            break;
          case "Healthcare":
            if (userDetails.existingBenefits === "yes") {
              reasons.push(`You already indicated receiving similar benefits; duplicate coverage is commonly disallowed for ${selectedScheme.name}.`);
            }
            if (income > 500000) {
              reasons.push(`Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds common means-test cutoffs (for example ₹500,000), you are less likely to qualify for this health scheme.`);
            }
            break;
          case "Finance":
            if (age < 18 || age > 70) {
              reasons.push(`${selectedScheme.name} usually serves applicants aged 18–70; your age (${age}) falls outside that range.`);
            }
            if (!isSpecialCategory) {
              reasons.push("Reserved beneficiary categories may be prioritized for finance-linked support; you selected General/Other.");
            }
            break;
          case "Education":
            if (age > 28) {
              reasons.push(`This education support typically targets students under 28; your age (${age}) exceeds that limit.`);
            }
            if (!isSpecialCategory) {
              reasons.push("Some scholarship programs prioritize reserved categories; you selected General/Other.");
            }
            break;
          case "Skill Development":
            if (age < 15 || age > 45) {
              reasons.push(`This skill-development program usually targets applicants aged 15–45; your age (${age}) is outside that range.`);
            }
            if (occupation && !occupation.includes("artisan") && !occupation.includes("craft") && !occupation.includes("student")) {
              reasons.push(`The program focuses on artisans, craftsmen, or trainees; your occupation is "${userDetails.occupation || 'not provided'}".`);
            }
            break;
          case "Energy":
            if (income > 1000000) {
              reasons.push(`Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹1,000,000, you are not eligible for this scheme.`);
            }
            if (!isSpecialCategory) {
              reasons.push("Reserved categories may receive priority for energy-related subsidies; you selected General/Other.");
            }
            break;
          case "Women & Child":
            if (!isFemale) {
              reasons.push(`This program is intended for women and girls; you selected gender "${userDetails.gender}".`);
            }
            if (income > 750000) {
              reasons.push(`Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹750,000, you are not eligible for this scheme.`);
            }
            break;
          case "Insurance":
            if (age < 18 || age > 70) {
              reasons.push(`Insurance under ${selectedScheme.name} generally covers ages 18–70; your age (${age}) is outside that range.`);
            }
            if (!hasValidIncome) {
              reasons.push("Valid annual income is required to assess premium subsidy or means-tested eligibility.");
            }
            break;
          case "Employment":
            if (age < 18 || age > 25) {
              reasons.push(`This internship/employment program targets applicants aged 18–25; your age (${age}) is outside that range.`);
            }
            if (!isSpecialCategory) {
              reasons.push("Reserved categories are sometimes given preference in employment support programs; you selected General/Other.");
            }
            break;
          default:
            reasons.push(`Your details do not match the expected profile for ${selectedScheme.name}.`);
            break;
        }
      }

      // Add income-based ineligible reason if a cutoff exists and it's not already present
      const cutoff = incomeCutoffs[selectedScheme.category];
      if (cutoff !== undefined && hasValidIncome && income > cutoff) {
        const incomeNotEligibleText = `Since your declared annual income of ₹${income.toLocaleString('en-IN')} exceeds the scheme cutoff of ₹${cutoff.toLocaleString('en-IN')}, you are not eligible for this scheme.`;
        if (!reasons.includes(incomeNotEligibleText)) {
          reasons.push(incomeNotEligibleText);
        }
      }

      const uniqueReasons = [...new Set(reasons)];
      return uniqueReasons.slice(0, 5).length > 0 ? uniqueReasons.slice(0, 5) : ["Please update your details and try again."];
    };

    const schemeReasons = buildReasons();

    if (eligible) {
      return {
        eligible: true,
        title: `You are eligible for ${selectedScheme.name}`,
        summary: `Your profile matches the key requirements for this scheme. Review the official process and documents before applying.`,
        reasons: schemeReasons,
      };
    }

    return {
      eligible: false,
      title: `You are not eligible for ${selectedScheme.name}`,
      summary: `Some details do not match the typical eligibility requirements for this scheme. Please review the scheme criteria carefully.`,
      reasons: schemeReasons.length > 0 ? schemeReasons : ["Please update your details and try again."],
    };
  };

  const handleCheckEligibility = async (event) => {
    event.preventDefault();
    const evaluation = evaluateEligibility();

    const payload = {
      schemeId: Number(selectedSchemeId),
      schemeName: selectedScheme?.name || "",
      userDetails,
      evaluation,
    };

    try {
      await fetch("http://localhost:5000/api/eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to save eligibility data", error);
    }

    navigate("/eligibility/result", {
      state: {
        selectedSchemeId,
        evaluation,
        userDetails,
      },
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
          <div className="bg-linear-to-r from-sky-600 to-indigo-700 px-8 py-10 text-white">
            <h2 className="text-3xl font-bold">Eligibility Checker</h2>
            <p className="mt-3 text-sky-100 max-w-2xl">
              Select a scheme first, then provide your details to see a result for that program.
            </p>
          </div>

          <div className="p-8">
            <div className="space-y-7">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-semibold mb-4">Step 1: Select a scheme</h3>
                <div className="grid gap-4 md:grid-cols-[1fr_auto] items-end">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Scheme</span>
                    <select
                      value={selectedSchemeId}
                      onChange={(event) => setSelectedSchemeId(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                    >
                      <option value="">Select scheme</option>
                      {schemes.map((scheme) => (
                        <option key={scheme.id} value={scheme.id}>
                          {scheme.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedSchemeId}
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-white font-semibold shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    Next
                  </button>
                </div>

                {selectedScheme && (
                  <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{selectedScheme.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{selectedScheme.name}</h4>
                          <p className="text-sm text-slate-600">{selectedScheme.desc}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">Category: {selectedScheme.category}</p>
                    </div>
                  </div>
                )}
              </div>

              {step === 2 && selectedScheme && (
                <form onSubmit={handleCheckEligibility} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-5">Step 2: Enter your details</h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Full name</span>
                      <input
                        name="fullName"
                        value={userDetails.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Age</span>
                      <input
                        name="age"
                        type="number"
                        value={userDetails.age}
                        onChange={handleChange}
                        placeholder="e.g. 32"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Gender</span>
                      <select
                        name="gender"
                        value={userDetails.gender}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      >
                        <option value="">Select gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Category</span>
                      <select
                        name="candidateCategory"
                        value={userDetails.candidateCategory}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      >
                        <option value="">Select category</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="EWS">EWS</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Annual Family Income (₹)</span>
                      <input
                        name="annualIncome"
                        type="number"
                        value={userDetails.annualIncome}
                        onChange={handleChange}
                        placeholder="Amount in INR"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Marital status</span>
                      <select
                        name="maritalStatus"
                        value={userDetails.maritalStatus}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      >
                        <option value="">Select status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-sm font-medium text-slate-700">Occupation</span>
                      <input
                        name="occupation"
                        value={userDetails.occupation}
                        onChange={handleChange}
                        placeholder="e.g. Farmer, Student, Homemaker"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">State</span>
                      <input
                        name="state"
                        value={userDetails.state}
                        onChange={handleChange}
                        placeholder="State / UT"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Family members</span>
                      <input
                        name="familyMembers"
                        type="number"
                        value={userDetails.familyMembers}
                        onChange={handleChange}
                        placeholder="Number of members"
                        className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="text-sm font-medium text-slate-700">Do you already receive a similar scheme benefit?</span>
                      <select
                        name="existingBenefits"
                        value={userDetails.existingBenefits}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-slate-700 font-semibold shadow-sm hover:bg-slate-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-sky-700"
                    >
                      Check Eligibility
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eligibility;
