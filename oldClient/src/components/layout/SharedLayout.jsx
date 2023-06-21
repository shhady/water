import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Alert } from "../";

import Navbar from "../Navbar/Navbar";
import Hamburger from "../hamburger/Hamburger";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="container">
      <Alert />
      <Navbar handleSidebarToggle={handleSidebarToggle} />

      <Hamburger
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
        endpoints={[
          { name: "Home", icon: "fas fa-home", path: "/" },
          { name: "About", icon: "fas fa-users", path: "/about" },
          { name: "Contact", icon: "fas fa-envelope", path: "/contact" },
        ]}
      />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
