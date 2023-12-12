import { createContext, useContext, useState ,useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('isAuthenticated') === 'true';
    });
  
    useEffect(() => {
      localStorage.setItem('isAuthenticated', isAuthenticated);
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
            setIsAuthenticated(true);
            
            localStorage.setItem('isAuthenticated', true);
    
            return isAuthenticated;
          } else {
            // setError('Login failed. Please check your credentials.');
          }
        } catch (error) {
        console.error('Error during login:', error.message);
        // setError('An error occurred. Please try again.');
        } 
    };
            

    const logout = async () => {
        const response = await fetch('https://softies-backend-production.up.railway.app/api/users/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
       
            setIsAuthenticated(false);
        
       
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };
