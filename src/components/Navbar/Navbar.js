import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

function Navbar() {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className='navbar'>
      <img src={logo} alt="Logo" className='logo' onClick={() => window.location.href = ' / '} />
      <div className='menu'>
        <Link to="intro-section" className='menuItem' smooth={true} duration={500} offset={-80}>
          Home
        </Link>
        <Link to="about-section" className='menuItem' smooth={true} duration={500} offset={-80}>
          About
        </Link>
        <Link to="scan-section" className='menuItem' smooth={true} duration={500} offset={-80}>
          Scan
        </Link>
        <Link to="history-section" className='menuItem' smooth={true} duration={500} offset={-80}>
          History
        </Link>
        <div
          className="profile-menu"
          onMouseEnter={toggleProfileDropdown}
          onMouseLeave={toggleProfileDropdown}
        >
          <span className="menuItem">
            <FontAwesomeIcon icon={faUser} size="lg" className="profile-icon" />
            Profile
          </span>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <Link className="dropdown-item profile-text">Login</Link>
              <Link className="dropdown-item profile-text">Edit Profile</Link>
              <Link className="dropdown-item profile-text">Logout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
