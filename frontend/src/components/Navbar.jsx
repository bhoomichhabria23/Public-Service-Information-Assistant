import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    ...(isAuthenticated
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
          },
          {
            name: "Schemes",
            path: "/schemes",
          },
          {
            name: "Eligibility",
            path: "/eligibility",
          },
          {
            name: "AI Assistant",
            path: "/chatbot",
          },
          {
            name: "Contact",
            path: "/contact",
          },
          {
            name: "Profile",
            path: "/profile",
          },
        ]
      : [
          {
            name: "Contact",
            path: "/contact",
          },
        ]),
  ];

  return (
    <header
      className="
      sticky
      top-0
      z-50
      bg-white
      shadow-md
      "
    >
      <nav
        className="
        w-full
        px-4
        sm:px-10
        xl:px-20
        py-3
        sm:py-4
        flex
        items-center
        justify-between
        "
      >
        <Link
          to="/"
          className="
          flex
          items-center
          gap-2
          sm:gap-3
          flex-shrink-0
          "
        >
          <div
            className="
            w-10
            sm:w-14
            h-10
            sm:h-14
            rounded-full
            bg-linear-to-br
            from-orange-500
            to-orange-600
            flex
            items-center
            justify-center
            text-white
            font-extrabold
            shadow-md
            text-xs
            sm:text-base
            "
          >
            PSIA
          </div>

          <div className="hidden sm:block">
            <h1
              className="
              text-base
              sm:text-lg
              font-bold
              text-blue-950
              leading-tight
              "
            >
              Public Service
              <br />
              Information Assistant
            </h1>

            <p
              className="
              text-xs
              text-gray-500
              "
            >
              Government Scheme Information Portal
            </p>
          </div>
        </Link>

        <ul
          className="
          hidden
          lg:flex
          items-center
          gap-8
          "
        >
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `
                    font-medium
                    transition
                    duration-300

                    ${
                      isActive
                        ? "text-orange-600 border-b-2 border-orange-500 pb-2 font-semibold"
                        : "text-gray-700 hover:text-orange-500"
                    }

                    `
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div
          className="
          flex
          gap-3
          items-center
          "
        >
          {/* Hamburger Menu Button - Mobile Only */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="
            lg:hidden
            flex
            flex-col
            gap-1.5
            p-2
            "
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-blue-900 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-blue-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-blue-900 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-3 sm:px-5 py-2 text-sm sm:text-base rounded-lg border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 sm:px-5 py-2 text-sm sm:text-base rounded-lg border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 sm:px-5 py-2 text-sm sm:text-base rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `
                    block
                    font-medium
                    transition
                    duration-300
                    py-2
                    ${
                      isActive
                        ? "text-orange-600 font-semibold border-l-4 border-orange-500 pl-2"
                        : "text-gray-700 hover:text-orange-500"
                    }
                    `
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className="
        h-1
        flex
        "
      >
        <div className="w-1/3 bg-orange-500"></div>

        <div className="w-1/3 bg-white"></div>

        <div className="w-1/3 bg-green-600"></div>
      </div>
    </header>
  );
}

export default Navbar;
