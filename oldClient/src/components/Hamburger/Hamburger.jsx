import React from "react";
import "./Hamburger.css";

const Hamburger = ({ isSidebarOpen, handleSidebarToggle }) => {
  return (
    <aside className={isSidebarOpen ? "sidebar-open" : "sidebar"}>
      <div className="sidebar__header">
        <span>Menu</span>
      </div>
      <ul className="sidebar__menu">
        <li>
          <i className="fas fa-home"></i>
          {isSidebarOpen && <span>Home</span>}
        </li>
        <li>
          <i className="fas fa-users"></i>
          {isSidebarOpen && <span>About</span>}
        </li>
        <li>
          <i className="fas fa-envelope"></i>
          {isSidebarOpen && <span>Contact</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Hamburger;
