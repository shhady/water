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

  const hamburgerDirection =
    document.getElementsByTagName("html")[0].getAttribute("dir") === "rtl"
      ? "right"
      : "left";

  return (
    <div className="container">
      <Alert />
      <Navbar handleSidebarToggle={handleSidebarToggle} />

      <Hamburger
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
        endpoints={[
          { name: "Home", icon: "fas fa-home", path: "/" },
          { name: "Statistics", icon: "fas fa-users", path: "/statistics" },
        ]}
        direction={hamburgerDirection}
      />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
