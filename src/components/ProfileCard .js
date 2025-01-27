/* eslint-disable react/prop-types */
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { formatRupiah } from "./formatRupiah ";
import Skeleton from "react-loading-skeleton";
import { setShowSaldo } from "../store/slices/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";

const ProfileCard = ({
  profileImage,
  firstName,
  lastName,
  balance,
  loading,
}) => {
  const dispatch = useDispatch();
  const { showSaldo } = useSelector((state) => state.dashboard);

  return (
    <div
      style={{ marginTop: "7%" }}
      className="row d-flex flex-column-reverse flex-md-row"
    >
      {/* column information user */}
      <div className="col-12 col-md-5 d-flex flex-column align-items-center align-items-md-start text-center text-md-start">
        {!loading ? (
          <img
            src={profileImage}
            alt="Avatar"
            className="img-profile rounded-circle"
            loading="lazy"
            style={{ width: "80px", height: "80px" }}
          />
        ) : (
          <Skeleton circle height={80} width={80} />
        )}
        <label className="mt-3">Selamat Datang,</label>
        <h3 className="mt-1">
          {!loading ? (
            `${firstName} ${lastName}`
          ) : (
            <Skeleton width={300} height={25} />
          )}
        </h3>
      </div>

      {/* column Saldo */}
      <div className="col-12 col-md-7 mb-4 mb-md-0">
        {!loading ? (
          <div
            className="saldo-section"
            style={{
              backgroundImage: "url('/assets/Background-Saldo.png')",
              backgroundSize: "cover",
              height: "179px",
              position: "relative",
            }}
          >
            <div className="p-4 saldo-content">
              <span
                className="position-absolute fw-bold saldo-text"
                style={{
                  top: "10px",
                  left: "25px",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                Saldo anda
              </span>
              <h1
                className="fw-bold position-absolute saldo-balance"
                style={{ top: "65px", left: "25px", color: "#fff" }}
              >
                Rp {!showSaldo ? "••••••••" : formatRupiah(balance?.balance)}
              </h1>
              <span
                className="position-absolute saldo-button"
                style={{
                  top: "130px",
                  left: "25px",
                  fontSize: "12px",
                  color: "#fff",
                  backgroundColor: "rgb(244 45 45 / 95%)",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              >
                Lihat Saldo{" "}
                {showSaldo ? (
                  <FaRegEye
                    style={{
                      marginLeft: 5,
                      marginBottom: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(setShowSaldo(!showSaldo))}
                  />
                ) : (
                  <FaRegEyeSlash
                    style={{
                      marginLeft: 5,
                      marginBottom: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(setShowSaldo(!showSaldo))}
                  />
                )}
              </span>
            </div>
          </div>
        ) : (
          <Skeleton width="100%" height={200} />
        )}
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
