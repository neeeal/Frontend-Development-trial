import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true); // State for loading indicator
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return { userId: localStorage.getItem('userData'), token: localStorage.getItem('token') } || {}
  });

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Set loading to true before fetch
        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/get_user/' + user.userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.token,
          },
        });
        console.log("RESPONSE STATUS:", response.status); // Log the status code
        if (response.status !== 200) {
          console.log("AUTH HERE");
          await logout();
          if (!isAuthenticated) {
            navigate('/login');
          }
          // Handle the error or invalid response
        } else {
          const result = await response.json();
          setUserData(result.data);
        }
      } catch (error) {
        console.error("ERROR HERE", error);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    
    fetchUserData();
    
    
  }, [user.userId, user.token, isAuthenticated]);

  return (
    <>
      <nav className='navbar'>
        <img src={logo} alt="Logo" className='logo' onClick={() => window.location.href = '/'} />
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
              {loading ? "Loading..." : `Hi ${userData.username}`} {/* Display loading text or username */}
            </span>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                {!isAuthenticated ? (
                  <RouterLink to="/login" className="dropdown-item profile-text">Login</RouterLink>
                ) : (
                  <>
                    <Link
                      className="dropdown-item profile-text"
                      onClick={() => setIsModalOpen(true)}
                    >
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
