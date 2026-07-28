import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      login({ token: data.token, user: data.user });
      setSuccess("You have successfully login. Redirecting you to your dashboard now.");
      setLoading(false);

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 900);
    } catch (err) {
      setError("Unable to reach the server. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl min-h-166 bg-white rounded-[35px] shadow-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex relative bg-linear-to-br from-orange-300 via-orange-200 to-blue-300 items-center justify-center p-10">
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mt-10">
              Public Service Information Assistant
            </h2>

            <p className="text-white/90 mt-10 text-lg leading-8 max-w-md ">
              Find government schemes, check eligibility, generate document
              checklists and receive AI-powered assistance in one place.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-14 py-12">
          <h1 className="text-4xl text-center font-bold text-slate-800">
            Welcome Back!
          </h1>

          <p className="text-gray-500 mt-3 text-center">
            Sign in to access Government Schemes & AI Services.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {success && (
              <div className="rounded-3xl border border-green-200 bg-emerald-50 p-4 text-sm text-emerald-900 shadow-sm">
                <strong className="block font-semibold">Login successful.</strong>
                <span>{success}</span>
              </div>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-800"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 pr-14 outline-none focus:ring-2 focus:ring-blue-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-4 h-4 accent-blue-900"
                />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-900 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 hover:scale-[1.02] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-900 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
