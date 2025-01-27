/* eslint-disable react/prop-types */
import React from "react";
import Logo from "./Logo";

function Navigation({ setActiveTab, tabs, activeTab }) {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top border-bottom"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            {tabs.map((tab) => (
              <li className="nav-item mx-3" key={tab.value}>
                <button
                  className={`nav-link ${
                    activeTab === tab.value ? "text-danger" : ""
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                  style={{
                    borderBottom:
                      activeTab === tab.value
                        ? "2px solid rgb(244 45 45 / 95%)"
                        : "none",
                    color: activeTab === tab.value ? "red" : "inherit",
                  }}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default React.memo(Navigation);
