import React from 'react';
import LanguageSelector from '../Language/Language';

const Navbar = ({ handleSidebarToggle }) => {
  const toggleSidebar = () => {
    handleSidebarToggle();
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span>Logo</span>
      </div>
      <div className="navbar__right-section">
        <LanguageSelector />
        <div className="navbar__toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
