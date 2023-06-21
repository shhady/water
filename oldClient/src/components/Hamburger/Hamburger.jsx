import React from "react";
import { Link } from "react-router-dom";
import "./Hamburger.css";

const Hamburger = ({
  isSidebarOpen,
  handleSidebarToggle,
  endpoints,
  direction,
}) => {
  const sidebarClass = isSidebarOpen ? "sidebar-open" : "sidebar";
  const sidebarStyle = {
    left: direction === "left" && isSidebarOpen ? "0" : "-300px",
    right: direction === "right" && isSidebarOpen ? "0" : "-300px",
  };

  return (
    <aside className={sidebarClass} style={sidebarStyle}>
      <div className="sidebar__header">
        <span>Menu</span>
      </div>
      <ul className="sidebar__menu">
        {endpoints.map((endpoint, index) => (
          <li key={index}>
            <Link to={endpoint.path}>
              <i className={endpoint.icon}></i>
              {isSidebarOpen && <span>{endpoint.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Hamburger;
