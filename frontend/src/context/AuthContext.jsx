import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
  });

  const login = ({ token, user }) => {
    const preservedSaved = auth.user?.savedSchemes ?? [];
    const nextUser = {
      ...user,
      savedSchemes: user.savedSchemes ?? preservedSaved,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(nextUser));
    setAuth({ token, user: nextUser });
  };

  const updateUser = (updates) => {
    const existingSavedSchemes = auth.user?.savedSchemes ?? [];
    const nextUser = { ...auth.user, ...updates };

    if (updates.savedSchemes === undefined) {
      nextUser.savedSchemes = existingSavedSchemes;
    }

    localStorage.setItem("user", JSON.stringify(nextUser));
    setAuth((prev) => ({ ...prev, user: nextUser }));
  };

  const saveScheme = async (scheme) => {
    if (!auth.token) return;

    const existingSavedSchemes = auth.user?.savedSchemes ?? [];
    const schemeAlreadySaved = existingSavedSchemes.some(
      (item) => item.id === scheme.id
    );

    const nextSavedSchemes = schemeAlreadySaved
      ? existingSavedSchemes.filter((item) => item.id !== scheme.id)
      : [...existingSavedSchemes, scheme];

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ savedSchemes: nextSavedSchemes }),
        }
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      updateUser(data.user);
    } catch (error) {
      console.error("Failed to save scheme:", error);
    }
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
      value={{
        auth,
        isAuthenticated: !!auth.token,
        login,
        updateUser,
        logout,
        saveScheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
