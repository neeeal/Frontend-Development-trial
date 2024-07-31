import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Import the CSS file

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // For redirection
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [error, setError] = useState(""); // Added error state
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Added success state

  const fetchVerifyToken = async () => {
    let flag;
    try {
      // Make an API call to your server to verify the token
      const response = await fetch(`https://softies-backend-production.up.railway.app/api/blacklist/verify_token/${token}`, { // TODO: Change link
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        setIsValid(true);
        flag = true;
      } else {
        setError(result.msg || "Invalid token");
        setIsValid(false);
        flag = false;
      }
    } catch (error) {
      console.error(error);
      setError("Error verifying token.");
      setIsValid(false);
      flag = false;
    } finally {
      setIsLoading(false);
      return flag;
    }
  };

  useEffect(() => {
    fetchVerifyToken();
  }, [token]);

  const passwordChangeLogic = async () => {
    try {
      // Make an API call to your server to reset the password
      const response = await fetch(`https://softies-backend-production.up.railway.app/api/email/reset_password/${token}`, { // TODO: Change link
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true); // Set success state
        setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
      } else {
        console.error(data);
        setError("Error resetting password.");
      }
    } catch (error) {
      console.error(error);
      setError("Error resetting password.");
    }
  };

  const handleButtonPress = async () => {
    const valid = await fetchVerifyToken(); // Wait for token verification

    if (valid) {
      await passwordChangeLogic(); // Wait for password change logic
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2 className="monsteratt">Loading...</h2>
        </div>
      </div>
    );
  }

  // Error or invalid token state
  if (!isValid) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h1 className="monsteratt">Invalid Token</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Success modal
  if (isSuccess) {
    return (
      <div className="modal">
        <div className="modal-content success-modal">
          <h1 className="monsteratt">Password Reset Successful</h1>
          <p className="monsteratt">Your password has been reset successfully. You will be redirected to the login page shortly.</p>
        </div>
      </div>
    );
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1 className="monsteratt">Reset Password</h1>
        <div style={{ minWidth: "100%", display: "flex" }}>
          <input
            style={{ flex: 9 }}
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
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
              togglePasswordVisibility();
            }}
          >
            <span style={{ color: "black" }}>{isPasswordVisible ? 'Hide' : 'Show'}</span>
          </button>
        </div>
        <button
          className="submit-button"
          onClick={handleButtonPress}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};
