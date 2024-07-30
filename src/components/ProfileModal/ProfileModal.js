import { useState, useEffect } from 'react';
import './ProfileModal.css'; // Make sure to create and style this CSS file

const ProfileModal = ({ isOpen, onClose, userData, auth }) => {
  console.log("modal",userData)
  const [selectedTab, setSelectedTab] = useState('profile'); // State for tab selection
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewPasswordConfirmationVisible, setIsNewPasswordConfirmationVisible] = useState(false);

  useEffect(() => {
    setUsername(userData.username);
    setFirstname(userData.first_name);
    setLastname(userData.last_name);
    setContact(userData.contact);
    setEmail(userData.email);
  },[userData])

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleNewPasswordConfirmationVisibility = () => {
    setIsNewPasswordConfirmationVisible(!isNewPasswordConfirmationVisible);
  };

  const handleSaveProfile = async () => {
    try {
      const payload = JSON.stringify({
        _id: auth.userId,
        field: [
          'username',
          'firstname',
          'lastname',
          'contact',
          'email'
        ],
        value: [
          username,
          firstname,
          lastname,
          contact,
          email
        ],
      })
      const response = await fetch('https://grubworm-full-dory.ngrok-free.app/api/users/update_user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        },
        body: payload,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        onClose(); // Close the modal after successful update
      } else {
        alert(result.msg || 'Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };

  const handleChangePassword = async () => {
    try {
      const payload = JSON.stringify({
        _id: auth.userId,
        field: ['password'],
        value: [newPassword],
        old_password: password,
        new_password_conformation: newPasswordConfirmation

      })
      const response = await fetch('https://grubworm-full-dory.ngrok-free.app/api/users/update_user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        },
        body: payload,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        onClose(); // Close the modal after successful update
      } else {
        alert(result.msg || 'Failed to update profile.');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'profile':
        return (
          <>
            <h2>Edit Profile</h2>
            <div className= "editable-container">
              <label className= "item-name">Username:</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className= "editable-container">
              <label className= "item-name">Firstname:</label>
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              </div>
            <div className= "editable-container">
              <label className= "item-name">Lastname:</label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              </div>
            <div className= "editable-container">
              <label className= "item-name">Contact:</label>
            <input
              type="text"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
              </div>
            <div className= "editable-container">
              <label className= "item-name">Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
              </div>
            <div className="button-container">
              <button className="cancel-button" onClick={onClose}>Cancel</button>
              <button className="save-button" onClick={handleSaveProfile}>Save</button>
            </div>
            </>
        );
      case 'password':
        return (
          <>
            <h2>Change Password</h2>
              <div className= "editable-container">
                <label className= "item-name">Old Pass:</label>
            <div style={{ minWidth: "70%", display: "flex" }}>
            <input
                  style={{ flex: 7 }}
                  type={isOldPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the form submission
                    toggleOldPasswordVisibility();
                  }}
                >
                  <span style={{ color: "black", "font-size": "smaller" }}>{isOldPasswordVisible ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>
              <div className= "editable-container">
              <label className= "item-name">New Pass:</label>
            <div style={{ minWidth: "70%", display: "flex" }}>
            <input
                  style={{ flex: 7 }}
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <button
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the form submission
                    toggleNewPasswordVisibility();
                  }}
                >
                  <span style={{ color: "black", "font-size": "smaller" }}>{isNewPasswordVisible ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>
            <div className= "editable-container">
              <label className= "item-name">Confirmation:</label>
            <div style={{ minWidth: "70%", display: "flex" }}>
            <input
                  style={{ flex: 7 }}
                  type={isNewPasswordConfirmationVisible ? 'text' : 'password'}
                  placeholder="Enter new password confirmation"
                  onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                  value={newPasswordConfirmation}
                />
                <button
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    outline: "none",
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the form submission
                    toggleNewPasswordConfirmationVisibility();
                  }}
                >
                  <span style={{ color: "black", "font-size": "smaller" }}>{isNewPasswordConfirmationVisible ? 'Hide' : 'Show'}</span>
                </button>
              </div>
            </div>
            <div className="button-container">
              <button className="cancel-button" onClick={onClose}>Cancel</button>
              <button className="save-button" onClick={handleChangePassword}>Change Password</button>
            </div>
            </>
        );
      default:
        return null;
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="modal-content">
          
          <div className="modal-body">
            <div className="modal-tabs">
              <button
                className={`tab-button ${selectedTab === 'profile' ? 'active' : ''}`}
                onClick={() => setSelectedTab('profile')}
              >
                Edit Profile
              </button>
              <button
                className={`tab-button ${selectedTab === 'password' ? 'active' : ''}`}
                onClick={() => setSelectedTab('password')}
              >
                Change Password
              </button>
            </div>
            <div className="modal-form">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default ProfileModal;
