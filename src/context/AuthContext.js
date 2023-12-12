import { createContext, useContext, useState ,useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('isAuthenticated') === 'true';
    });

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('userData'))|| {}
      });
  
    useEffect(() => {
      localStorage.setItem('isAuthenticated', isAuthenticated);
      console.log(user)
    }, [isAuthenticated]);

    const login = async (email, password,event) => {
        event.preventDefault();
        try {
        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
            email: email,
            password: password,
            }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            const userData = await response.json();
            setIsAuthenticated(true);
            setUser(userData);
          
            // Store in localStorage
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify({user_id: userData.user_id, username: userData.username}));
          } else {
            // setError('Login failed. Please check your credentials.');
          }
        } catch (error) {
            console.error('Error during login:', error.message);
            // setError('An error occurred. Please try again.');
        } 
    };
            

    const logout = async () => {
        await fetch('https://softies-backend-production.up.railway.app/api/users/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        
       
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
