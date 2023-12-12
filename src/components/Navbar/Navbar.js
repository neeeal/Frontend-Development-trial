import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {isAuthenticated,logout} = useAuth();

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault(); 
    await logout()
    if (await isAuthenticated===false){
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/get_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log(userData, "user");
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error during user data fetch:', error.message);
      }
    };
  
    fetchData(); // Call the async function inside useEffect
  }, [isAuthenticated]);

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
              { isAuthenticated===false ? <RouterLink to="/login" className="dropdown-item profile-text">Login</RouterLink>:
              <>
              <span  className="dropdown-item profile-text">HI</span>
              <Link className="dropdown-item profile-text">Edit Profile</Link>
              <span onClick={handleLogout} className="dropdown-item profile-text">Logout</span>
              </>
            }
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
