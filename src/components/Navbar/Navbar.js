import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileModal from '../ProfileModal/ProfileModal';

function Navbar({ scrollToSection }) {
  const [userData, setUserData] = useState({});
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return { userId: localStorage.getItem('userData'), token: localStorage.getItem('token') } || {};
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
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
        console.error("ERROR HERE", error);
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
        <div className={`menu ${isNavOpen ? 'active' : ''}`}>
          <span className='menuItem' onClick={() => { scrollToSection('intro-section'); closeNav(); }}>
            Home
          </span>
          <span className='menuItem' onClick={() => { scrollToSection('about-section'); closeNav(); }}>
            About
          </span>
          <span className='menuItem' onClick={() => { scrollToSection('scan-section'); closeNav(); }}>
            Scan
          </span>
          <span className='menuItem' onClick={() => { scrollToSection('history-section'); closeNav(); }}>
            History
          </span>
          <div
            className="profile-menu"
            onMouseEnter={toggleProfileDropdown}
            onMouseLeave={toggleProfileDropdown}
          >
            <span className="menuItem">
              <FontAwesomeIcon icon={faUser} size="lg" className="profile-icon" />
              {loading ? "Loading..." : `Hi ${userData.username}`}
            </span>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                {!isAuthenticated ? (
                  <RouterLink to="/login" className="dropdown-item profile-text" onClick={closeNav}>Login</RouterLink>
                ) : (
                  <>
                    <span
                      className="dropdown-item profile-text"
                      onClick={() => { setIsModalOpen(true); closeNav(); }}
                    >
                      Edit Profile
                    </span>
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
