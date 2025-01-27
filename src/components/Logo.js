import React from "react";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../store/slices/dashboardSlice";
function Logo() {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50px", cursor: "pointer" }}
      onClick={() => dispatch(setActiveTab("dashboard"))}
    >
      <img
        src="/assets/Logo.png"
        alt="Logo"
        loading="lazy"
        style={{ marginRight: "10px" }}
      />
      <h5 className="fw-bold mb-0">SIMS PPOB</h5>
    </div>
  );
}

export default Logo;
