import { useContext, createContext, useState } from "react";
// 1. create context
// export the context so other component can use it
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// 2. Share the context with other components
export default function AuthProvider({ children }) {
  // 3. put some state in the context
  //    const [number, setNumber] = useState(10);

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  function login(username, password) {
    if (username == "Charles" && password == "1234") {
      setAuthenticated(true);
      setUsername(username);
      return true;
    } else {
      setAuthenticated(false);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
