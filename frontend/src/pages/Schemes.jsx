import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRobot,
} from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import AuthContext from "../context/AuthContext";
import schemes from "../data/schemesData";

function Schemes() {
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const location = useLocation();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("q") || "";
    setSearch(q);
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const navigate = useNavigate();
  const { auth, saveScheme } = useContext(AuthContext);
  const savedSchemeIds = new Set(
    auth?.user?.savedSchemes?.map((scheme) => scheme.id) || []
  );

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookmark = async (scheme) => {
    if (!auth?.token) {
      setNotice("Please log in to save schemes.");
      return;
    }

    const result = await saveScheme(scheme);

    if (result?.ok) {
      setNotice(
        savedSchemeIds.has(scheme.id)
          ? `${scheme.name} removed from saved schemes.`
          : `${scheme.name} saved!`
      );
    } else {
      setNotice(result?.message || "Unable to save this scheme.");
    }

    window.setTimeout(() => setNotice(""), 2500);
  };

  return (
  <div className="min-h-screen bg-[#f8fbff] py-10 px-6">
    {notice && (
      <div className="fixed top-6 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 px-5 py-4 text-center text-blue-900 shadow-sm">
          {notice}
        </div>
      </div>
    )}

    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#0b2a69]">
          Government Schemes
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Explore government schemes across different categories
        </p>

        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mt-10">

        <div className="relative flex-1">
          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border rounded-xl py-4 pl-14 pr-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

      </div>

      {/* Cards */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">

        {filteredSchemes.map((scheme) => (

          <div
            key={scheme.id}
            className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 p-6"
          >
            <button
              onClick={() => handleBookmark(scheme)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-blue-50 transition"
              title={savedSchemeIds.has(scheme.id) ? "Remove from saved" : "Save scheme"}
            >
              {savedSchemeIds.has(scheme.id) ? (
                <BsBookmarkFill className="text-xl text-blue-700" />
              ) : (
                <BsBookmark className="text-xl text-gray-500 hover:text-blue-700" />
              )}
            </button>

            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-5xl">
                {scheme.icon}
              </div>
            </div>

            <h2 className="text-xl font-bold text-center mt-5 min-h-[80px] flex items-center justify-center">
              {scheme.name}
            </h2>

            <p className="text-center text-blue-600 font-medium mt-2">
              {scheme.category}
            </p>

            <p className="text-gray-500 text-center text-sm leading-6 mt-4 min-h-[72px]">
              {scheme.desc}
            </p>

            <div className="flex justify-center items-center gap-2 text-gray-500 mt-5">
              <FaMapMarkerAlt />
              {scheme.location}
            </div>

            <button
              onClick={() => navigate(`/schemes/${scheme.id}`)}
              className="w-full mt-6 bg-[#0b2a69] hover:bg-blue-800 text-white py-3 rounded-xl font-semibold"
            >
              View Details
            </button>

          </div>

        ))}

      </div>
            {/* AI Assistant Section */}
      <div className="mt-12 bg-white border border-blue-100 rounded-2xl shadow-sm p-8 flex flex-col md:flex-row justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <FaRobot className="text-3xl text-blue-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0b2a69]">
              Can't find what you're looking for?
            </h2>

            <p className="text-gray-500 mt-2">
              Use our AI Assistant to get personalized scheme recommendations based on your profile and needs.
            </p>
          </div>

        </div>

        <button
          onClick={() => navigate('/chatbot', { state: { autoStart: true } })}
          className="mt-6 md:mt-0 bg-[#0b2a69] hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Chat with AI Assistant
        </button>

      </div>

    </div>
  </div>
);
}

export default Schemes;
