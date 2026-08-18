import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const schemes = [
    { id: 2, title: "Pradhan Mantri Awas Yojana", category: "Housing", desc: "Affordable housing support for eligible families.", icon: "🏠" },
    { id: 3, title: "Ayushman Bharat Yojana", category: "Health", desc: "Offers cashless health insurance up to ₹5 lakh per family.", icon: "🏥" },
    { id: 1, title: "PM Kisan Samman Nidhi", category: "Agriculture", desc: "Income support of ₹6,000 per year to farmers.", icon: "🌾" },
    { id: 6, title: "National Scholarship Portal", category: "Education", desc: "Scholarships for eligible students across India.", icon: "🎓" },
    { id: 11, title: "Pradhan Mantri Ujjwala Yojana", category: "Energy", desc: "Provides free LPG connections to eligible households.", icon: "🔥" },
    { id: 9, title: "PM Internship Scheme", category: "Employment", desc: "Offers internship opportunities to youth.", icon: "💼" },
  ];

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const q = query.trim();
    if (q) navigate(`/schemes?q=${encodeURIComponent(q)}`);
    else navigate("/schemes");
  };

  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=1920&auto=format&fit=crop&q=80"
          alt="Digital Government"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <span className="inline-block bg-orange-500/20 border border-orange-400 text-orange-300 px-5 py-2 rounded-full text-sm font-semibold">Digital Public Service Platform</span>

          <h1 className="mt-8 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            <span className="text-blue-400"> Public Service </span>Information Assistant
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-8">
            Discover government schemes, check eligibility, understand required documents, and receive instant AI-powered guidance.
          </p>

          <div className="mt-10 max-w-2xl mx-auto flex bg-white rounded-xl overflow-hidden shadow-2xl">
            <input
              type="text"
              placeholder="Search government schemes..."
              className="flex-1 px-6 py-4 text-gray-700 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="bg-blue-900 text-white px-10 font-semibold">Search</button>
          </div>

          <div className="flex justify-center gap-5 mt-10">
            <button onClick={() => navigate('/schemes')} className="bg-blue-900 text-white px-10 py-3 rounded-lg font-semibold hover:bg-blue-800">Explore Schemes</button>

            <button onClick={() => navigate('/chatbot', { state: { autoStart: true } })} className="border-2 border-white text-white px-10 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900">Chat With AI</button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-200">
        <h2 className="text-center text-4xl font-bold text-gray-900">Smart Features For Citizens</h2>
        <p className="text-center text-gray-600 mt-3">Making government services simple and accessible</p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-24 mt-12 px-6 text-center">
          <Feature icon="🔍" title="Smart Scheme Search" desc="Find suitable government schemes based on your needs." />

          <div onClick={() => navigate('/chatbot', { state: { autoStart: true } })} className="cursor-pointer">
            <Feature icon="🤖" title="AI Assistant" desc="Get instant answers about schemes and eligibility." />
          </div>

          <Feature icon="📄" title="Document Guidance" desc="Know required documents before applying." />
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-center text-white">
        <h2 className="text-4xl font-bold">How It Works</h2>
        <p className="mt-3 text-blue-100">Get personalized government scheme guidance in simple steps</p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-24 mt-14 px-6">
          <Step number="1" title="Enter Details" desc="Provide your basic information and requirements." />
          <Step number="2" title="AI Analysis" desc="AI matches your profile with suitable schemes." />
          <Step number="3" title="Check Eligibility" desc="Understand eligibility and required documents." />
        </div>
      </section>

      <section className="py-20 bg-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Popular Government Schemes</h2>
              <p className="mt-3 text-gray-600">Explore major government schemes and benefits available for citizens</p>
            </div>

            <button onClick={() => navigate('/schemes')} className="text-blue-900 font-semibold hover:underline">View All Schemes →</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {schemes.map((scheme, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center min-h-[320px] flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-5xl h-16">{scheme.icon}</div>
                <h3 className="mt-4 font-bold text-blue-900 text-base leading-snug min-h-[50px] flex items-center">{scheme.title}</h3>
                <p className="mt-2 text-blue-600 text-sm font-medium">{scheme.category}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed min-h-[60px]">{scheme.desc}</p>
                <button onClick={() => navigate(`/schemes/${scheme.id}`)} className="mt-auto border border-blue-900 text-blue-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 hover:text-white transition">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-center text-white">
        <h2 className="text-4xl font-bold">Need Help Finding Government Schemes?</h2>
        <p className="mt-4 text-lg text-gray-200">Ask our AI assistant and get personalized guidance instantly.</p>
        <button onClick={() => navigate('/chatbot', { state: { autoStart: true } })} className="mt-8 bg-orange-500 px-10 py-3 rounded-lg font-semibold">Start Chat With AI</button>
      </section>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold mt-5 text-blue-900">{title}</h3>
      <p className="mt-3 text-gray-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-white text-blue-900 flex items-center justify-center text-2xl font-bold">{number}</div>
      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-blue-100">{desc}</p>
    </div>
  );
}

export default Home;
