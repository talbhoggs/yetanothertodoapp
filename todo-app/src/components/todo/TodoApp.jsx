import "./TodoApp.css";
import LoginComponent from "./LoginComponent";
import HeaderComponent from "./HeaderComponent";
import TodoComponent from "./TodoComponent";
import LogoutComponent from "./LogoutComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";

import { TodoComponentProvider } from "./context/TodoComponentContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/" />;
}

export default function TodoApp() {
  return (
    <AuthProvider>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route
            path="/welcome"
            element={
              <AuthenticatedRoute>
                <WelcomeComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>

              <TodoComponentProvider>
                <TodoComponent />

              </TodoComponentProvider>
              </AuthenticatedRoute>
            }
          />
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function ErrorComponent() {
  return (
    <div>
      <h1>Error 404: Sorry Page not found</h1>
    </div>
  );
}

function WelcomeComponent() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
