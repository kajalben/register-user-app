import React, { useState, useEffect } from "react";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { setAuthHeaders, logout } from "./utils/auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/auth");
  };

  useEffect(() => {
    setAuthHeaders() && history.push("/dashboard");
  }, [history]);

  return (
    <div className="app">
      
      <UserProvider>
        <Main>
          <Switch>
            <Route path="/auth">
              <Login />
            </Route>
            <ProtectedRoute
              path="/dashboard"
              component={UserDashboard}
              onLogout={handleLogout}
            />
            <Route exact path="/registration/:id">
              <Signup />
            </Route>
            <Route exact path="/registration">
              <Signup />
            </Route>
            <Route path="/">
              <Redirect to="/auth" />
            </Route>
          </Switch>
        </Main>
      </UserProvider>
    </div>
  );
}

export default App;
