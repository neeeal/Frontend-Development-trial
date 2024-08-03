import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import ProfileModal from '../ProfileModal/ProfileModal';

function Navbar() {
  const [userData, setUserData] = useState({});
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return { userId: localStorage.getItem('userData'), token: localStorage.getItem('token') } || {};
  });
  const [isNavOpen, setIsNavOpen] = useState(false); // State for burger menu

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    await logout();
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const showAlert = () => {
    alert('This is still under development. To edit your profile, please use the mobile app');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/get_user/' + user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.token,
          },
        });
        if (response.status !== 200) {
          await logout();
          if (!isAuthenticated) {
            navigate('/login');
          }
        } else {
          const result = await response.json();
          setUserData(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user.userId, user.token, isAuthenticated]);

  return (
    <>
      <nav className='navbar'>
        <img src={logo} alt="Logo" className='logo' onClick={() => window.location.href = '/'} />
        <div className='burger-menu' onClick={toggleNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <span><Link to="intro-section" className='menuItem' smooth={true} duration={500} offset={-80} onClick={toggleNav}>
            Home
          </Link></span>
          <span><Link to="about-section" className='menuItem' smooth={true} duration={500} offset={-80} onClick={toggleNav}>
            About
          </Link></span>
          <span><Link to="scan-section" className='menuItem' smooth={true} duration={500} offset={-80} onClick={toggleNav}>
            Scan
          </Link></span>
          <span><Link to="history-section" className='menuItem' smooth={true} duration={500} offset={-80} onClick={toggleNav}>
            History
          </Link></span>
          <div className="profile-menu" onMouseEnter={toggleProfileDropdown} onMouseLeave={toggleProfileDropdown}>
            <span className="menuItem">
              <FontAwesomeIcon icon={faUser} size="base" className="profile-icon" />
              {loading ? "Loading..." : `Hi ${userData.username}`}
            </span>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                {!isAuthenticated ? (
                  <RouterLink to="/login" className="dropdown-item profile-text">Login</RouterLink>
                ) : (
                  <>
                    <Link className="dropdown-item profile-text" onClick={() => setIsModalOpen(true)}>
                      Edit Profile
                    </Link>
                    <span onClick={handleLogout} className="dropdown-item profile-text">Logout</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userData={userData} auth={user} />
    </>
  );
}

export default Navbar;
