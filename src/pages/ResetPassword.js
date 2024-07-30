import React from 'react';
import { useParams } from 'react-router-dom';

export const ResetPassword = () => {
  const { token } = useParams();

  React.useEffect(() => {
    
  }, [token]);

  return (
    <div>
      <h1>Reset Password</h1>
      <input type="password" placeholder='Enter your new password'></input>
      <button>Change Password</button>
    </div>
  );
};
