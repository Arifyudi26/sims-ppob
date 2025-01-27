/* eslint-disable no-unsafe-optional-chaining */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InputWithIcon from "../components/input/InputWithIcon";
import { useNavigate } from "react-router";
import { CiLock } from "react-icons/ci";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setLoading,
  setError,
  resetForm,
} from "../store/slices/authSlice";
import Swal from "sweetalert2";
import AuthAPIs from "../services/AuthApis";
import { setActiveTab } from "../store/slices/dashboardSlice";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, loading, error } = useSelector(
    (state) => state.auth
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      const signIn = await AuthAPIs.SignIn({ email, password });

      const { token } = signIn?.data?.data;
      const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000;

      sessionStorage.setItem("auth_token", token);
      sessionStorage.setItem("expiration_time", expirationTime);

      dispatch(setLoading(false));

      Swal.fire({
        icon: "success",
        title: "Sign In Successfully",
        text: signIn?.data?.message,
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
        dispatch(resetForm());
        dispatch(setActiveTab("dashboard"));
      });
    } catch (error) {
      dispatch(setLoading(false));
      const errorMessage = error?.response?.data?.message;
      dispatch(setError(errorMessage));

      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: errorMessage || "An error occurred while signing in.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container-fluid h-100">
        <div className="row h-100 g-0">
          {/* Form Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-white p-5">
            <div className="text-center w-75">
              <div
                style={{ width: "85%", maxWidth: "500px", margin: "0 auto" }}
              >
                <Logo />
                <h2 className="fw-bold mb-4">
                  Masuk atau buat akun untuk memulai
                </h2>
              </div>
              <form
                style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
                onSubmit={onSubmit}
              >
                <div className="mb-4">
                  <InputWithIcon
                    icon="@"
                    required
                    type="email"
                    placeholder="Masukkan email anda"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <InputWithIcon
                    icon={<CiLock />}
                    required
                    type="password"
                    placeholder="Masukkan password anda"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger w-100 text-white mb-3"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Masuk"}
                </button>
              </form>
              <p className="text-secondary">
                Belum punya akun ? Registrasi{" "}
                <a
                  href="/auth/sign-up"
                  className="text-danger fw-bold"
                  style={{ textDecoration: "none" }}
                >
                  di sini
                </a>
              </p>

              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show text-danger mt-5"
                  role="alert"
                  style={{
                    fontSize: 12,
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "30px",
                    display: "flex",
                    padding: "5px 10px",
                    top: "50%",
                  }}
                >
                  <span>{error}</span>
                  <button
                    type="button"
                    className="close"
                    onClick={() => dispatch(setError(null))}
                    aria-label="Close"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#dc3545",
                      fontSize: "25px",
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light vh-100">
            <img
              src="/assets/Illustrasi-login.png"
              alt="Illustrasi Login"
              className="img-fluid w-100 h-100"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
