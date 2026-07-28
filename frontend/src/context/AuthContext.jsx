import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
  });

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({ token, user });
  };

  const updateUser = (updates) => {
    const nextUser = { ...auth.user, ...updates };
    localStorage.setItem("user", JSON.stringify(nextUser));
    setAuth((prev) => ({ ...prev, user: nextUser }));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
  };

  useEffect(() => {
    const handleStorage = () => {
      setAuth({
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user") || "null"),
      });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, isAuthenticated: !!auth.token, login, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
