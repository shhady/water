import React from "react";
import { Link } from "react-router-dom";
import "./Hamburger.css";

const Hamburger = ({ isSidebarOpen, handleSidebarToggle, endpoints }) => {
  return (
    <aside className={isSidebarOpen ? "sidebar-open" : "sidebar"}>
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
