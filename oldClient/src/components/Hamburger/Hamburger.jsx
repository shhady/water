import React from "react";

const Hamburger = ({ isSidebarOpen, handleSidebarToggle }) => {
  return (
    <aside className={isSidebarOpen ? "sidebar open" : "sidebar"}>
      <div className="sidebar__header">
        <span>Menu</span>
      </div>
      <ul className="sidebar__menu">
        <li>
          {isSidebarOpen ? (
            <>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </>
          ) : (
            <i className="fas fa-home"></i>
          )}
        </li>
        <li>
          {isSidebarOpen ? (
            <>
              <i className="fas fa-users"></i>
              <span>About</span>
            </>
          ) : (
            <i className="fas fa-users"></i>
          )}
        </li>
        <li>
          {isSidebarOpen ? (
            <>
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </>
          ) : (
            <i className="fas fa-envelope"></i>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Hamburger;
