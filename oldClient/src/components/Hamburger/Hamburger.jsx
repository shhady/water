import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Hamburger.css";

const Hamburger = ({ links }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-toggle" onClick={handleSidebarToggle}>
          <span className="sidebar-toggle-icon"></span>
        </button>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.endpoint} className="sidebar-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Hamburger;
