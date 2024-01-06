import { createContext, useState } from "react";
// 1. create context
// export the context so other component can use it
export const AuthContext = createContext();

// 2. Share the context with other components
export default function AuthProvider({ children }) {
  // 3. put some state in the context
  const [number, setNumber] = useState(10);
  return (
    <AuthContext.Provider value={{ number }}>{children}</AuthContext.Provider>
  );
}
