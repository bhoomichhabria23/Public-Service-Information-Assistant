import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import Eligibility from "./pages/Eligibility";
import EligibilityResult from "./pages/EligibilityResult";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import SchemeDetails from "./pages/SchemeDetails";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/scheme-details" element={<SchemeDetails />} />
          

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes/:schemeId" element={<SchemeDetails />} />

          <Route
            path="/eligibility"
            element={
              <ProtectedRoute>
                <Eligibility />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eligibility/result"
            element={
              <ProtectedRoute>
                <EligibilityResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
