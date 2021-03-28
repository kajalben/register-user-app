import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Link, useHistory } from "react-router-dom";
import { client } from "../../utils/auth";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialValues);
  const [error, setError] = useState({});
  const history = useHistory();

  // Get token from server after successfull login
  const onLogin = async (credentials) => {
    try {
      const response = await client.post("/auth/login", {
        ...credentials,
      });
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, token);
        return true;
      } else {
        throw new Error(`Login failed`);
      }
    } catch (e) {
      e.response
        ? setError(e.response.data.message)
        : setError({ network: e.message });
      return false;
    }
  };

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  };

  // authorized user redirect to dashboard
  const handleAuthentication = async (e) => {
    e.preventDefault();
    const isAuthenticated = await onLogin(credentials);
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  };

  return (
    <>
      <div className="form_container">
        <h2>Login</h2>
        <LoginForm
          onAuth={handleAuthentication}
          onSetCredentials={handleSetCredentials}
          error={error}
        />

        <Link to="/registration">Don't have an account? Register</Link>
      </div>
    </>
  );
};

export default Login;
