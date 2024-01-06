import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setValidFrom] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  function usernameOnChange(e) {
    setUserName(e.target.value);
  }

  function passwordOnChange(e) {
    setPassword(e.target.value);
  }

  function submitForm(e) {
    e.preventDefault();
    if (authContext.login(username, password)) {
      navigate("/todos");
    } else {
      setValidFrom(true);
    }
  }

  return (
    // prettier-ignore
    <form id="LoginForm" onSubmit={submitForm}>
            {validForm && <div className="alert alert-warning">Invalid Username / password</div>}
            <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input autoFocus type="text" className="form-control" id="username" onChange={usernameOnChange} value={username} />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={passwordOnChange} value={password}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  );
}
