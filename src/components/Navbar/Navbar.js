import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [userData, setUserData] = useState({});
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {isAuthenticated,logout, setIsAuthenticated} = useAuth();
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return {userId:localStorage.getItem('userData'),token:localStorage.getItem('token')}|| {}
  });
  const handleLogout = async (event) => {
    event.preventDefault(); 
    await logout()
    if (await isAuthenticated===false){
      navigate('/login');
    }
  };

  const showAlert = () => { // TODO: Remove
    alert('This is still under development. To edit your profile, please use the mobile app');
  };

  useEffect(() => {
    const fetchUserData= async () => {
      try {

        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/get_user/'+user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.token, // Include the user ID in the headers
          },
        });
        const result = await response.json();

        if (!response.ok){
          setIsAuthenticated(false)
        }

        // Convert the object into an array
        setUserData(result.data)
        console.log(userData);

        console.log()
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

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
            Hi {userData.username}
          </span>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              { isAuthenticated===false ? <RouterLink to="/login" className="dropdown-item profile-text">Login</RouterLink>:
              <>
              <Link className="dropdown-item profile-text" onClick={showAlert}>Edit Profile</Link>
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
