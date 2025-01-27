import React from "react";
import Logo from "../components/Logo";
import InputWithIcon from "../components/input/InputWithIcon";
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setConfirmPassword,
  setLoading,
} from "../store/slices/authSlice";
import AuthAPIs from "../services/AuthApis";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, firstName, lastName, password, confirmPassword, loading } =
    useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password dan konfirmasi password tidak sama!",
        confirmButtonText: "Ok",
      });
      dispatch(setLoading(false));
      return;
    }

    try {
      const signUp = await AuthAPIs.SignUp({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });

      await Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: signUp?.data?.message,
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/auth/sign-in");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
        confirmButtonText: "Ok",
      });
    } finally {
      dispatch(setLoading(false));
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
                  Lengkapi data untuk membuat akun
                </h2>
              </div>
              <form
                onSubmit={onSubmit}
                style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}
              >
                <div className="mb-4">
                  <InputWithIcon
                    icon="@"
                    type="email"
                    required
                    placeholder="Masukkan email anda"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <InputWithIcon
                    icon={<FaRegUser />}
                    type="text"
                    required
                    placeholder="Nama depan"
                    value={firstName}
                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <InputWithIcon
                    icon={<FaRegUser />}
                    type="text"
                    placeholder="Nama belakang"
                    value={lastName}
                    onChange={(e) => dispatch(setLastName(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <InputWithIcon
                    icon={<CiLock />}
                    type="password"
                    required
                    placeholder="Buat password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                  />
                </div>
                <div className="mb-4">
                  <InputWithIcon
                    icon={<CiLock />}
                    type="password"
                    required
                    placeholder="Konfirmasi password"
                    value={confirmPassword}
                    onChange={(e) =>
                      dispatch(setConfirmPassword(e.target.value))
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-danger w-100 text-white mb-3"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Registrasi"}
                </button>
              </form>
              <p className="text-secondary">
                Sudah punya akun? login{" "}
                <a
                  href="/auth/sign-in"
                  className="text-danger fw-bold"
                  style={{ textDecoration: "none" }}
                >
                  di sini
                </a>
              </p>
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

export default SignUp;
