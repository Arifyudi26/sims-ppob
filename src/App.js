/* eslint-disable react/prop-types */
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, Suspense } from "react";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { Provider } from "react-redux";
import store from "./store/store";

const Dashboard = React.lazy(() => import("./Dashboard/Dashboard"));

// PrivateRoute: For pages that should be accessible only when logged in
const PrivateRoute = ({ children }) => {
  const isLoggedIn = sessionStorage.getItem("auth_token");
  return isLoggedIn ? children : <Navigate to="/auth/sign-in" />;
};

// PublicRoute: For pages that should be accessible only when not logged in
const PublicRoute = ({ children, restricted }) => {
  const isLoggedIn = sessionStorage.getItem("auth_token");
  return isLoggedIn && restricted ? <Navigate to="/dashboard" /> : children;
};

function App() {
  useEffect(() => {
    document.title = "SIMS PPOB-Arif Yudi Suryo Utomo";
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Root route */}
          <Route
            path="/"
            element={
              sessionStorage.getItem("auth_token") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/auth/sign-in" />
              )
            }
          />

          {/* Authentication routes */}
          <Route
            path="/auth/sign-in"
            element={
              <PublicRoute restricted={true}>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/sign-up"
            element={
              <PublicRoute restricted={true}>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
