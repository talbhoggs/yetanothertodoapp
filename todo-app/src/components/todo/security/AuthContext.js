import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // short circuit operator
  // null && [] => []
  // appState && [] => appState
  const [appState, setAppState] = useState(
    JSON.parse(localStorage.getItem("appState")) || {
      isAuthenticated: false,
      username: null,
    },
  );

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  function login(username, password) {
    if (username == "Charles" && password == "1234") {
      setAppState((prev) => ({
        ...prev,
        isAuthenticated: true,
        username: username,
      }));
      return true;
    }
    return false;
  }

  function logout() {
    setAppState((prev) => ({
      ...prev,
      isAuthenticated: false,
      username: null,
    }));
  }

  //isAuthenticated, login, logout, username,
  return (
    <AuthContext.Provider value={{ login, logout, ...appState }}>
      {children}
    </AuthContext.Provider>
  );
}
