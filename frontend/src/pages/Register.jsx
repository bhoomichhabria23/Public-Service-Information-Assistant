import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          state: formData.state,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess("You have successfully registered. Redirecting you to login...");
      setLoading(false);

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (err) {
      setError("Unable to reach the server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-[35px] shadow-2xl overflow-hidden grid lg:grid-cols-2 items-stretch">
        <div className="hidden lg:flex relative h-full bg-linear-to-br from-orange-300 via-orange-200 to-blue-300 items-center justify-center p-10">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 text-center text-white">
            <h2 className="text-4xl font-bold mt-8">Join Our Platform</h2>

            <p className="mt-5 text-lg leading-8 text-white/90">
              Register to discover government schemes, check eligibility, and
              receive AI-powered guidance.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-14 py-12">
          <h1 className="text-4xl text-center font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Register to access government services.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {success && (
              <div className="rounded-3xl border border-green-200 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm">
                <strong className="block font-semibold">Registration successful.</strong>
                <span>{success}</span>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-900"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-900"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-blue-900"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-blue-900"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-900 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
