import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('userData')) || {};
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('userData', user);
    localStorage.setItem('token', token);
  }, [isAuthenticated, user, token]);

  const login = async (email, password, event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://softies-backend-production.up.railway.app/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          user: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData.data._id);
        setToken(userData.data.token);

        // Store in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', userData.data._id);
        localStorage.setItem('token', userData.data.token);
      } else {
        // Handle login failure
        // setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // setError('An error occurred. Please try again.');
    }
  console.log(user, token)
};

  const logout = async () => {
    try {
      await fetch('https://softies-backend-production.up.railway.app/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error during logout:', error.message);
    }

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser({});
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
