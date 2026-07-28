import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
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
        px-10
        xl:px-20
        py-4
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
          gap-3
          "
        >
          <div
            className="
            w-14
            h-14
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
            "
          >
            PSIA
          </div>

          <div>
            <h1
              className="
              text-lg
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
          "
        >
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-lg border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border-2 border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

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
