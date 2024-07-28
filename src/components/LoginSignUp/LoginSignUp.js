import React , {useState,useEffect} from "react";
import './LoginSignUp.css'; 
import signIn from '../../assets/signIn.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const LoginSignUp = () => {
  const [addclass, setaddclass] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = async (event) => {
    event.preventDefault(); 
    await login(email, password, event);
    // No need to navigate again here, as the `useEffect` will handle it
  };

  const handleSignUp = async (event) => {
    event.preventDefault(); 
    try {
      const response = await fetch('https://softies-backend-production.up.railway.app/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          username,
          first_name: firstName,
          last_name: lastName,
          contact
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setaddclass("");
      // Optionally, you can navigate to the login page or show a success message
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <div className={`container ${addclass}`} id="loginSignup">
        
        <div className="form-container  sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className = "paragraph2">
                Enter your complete details to register
            </div>
            <input type="fName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
            <input type="lName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
            <input type="contact" placeholder="Contact" onChange={(e) => setContact(e.target.value)}/>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={handleSignUp}>SIGN UP</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginClick}>
            <h1>Login</h1>
            <div className = "paragraph2">
                Enter your complete details
            </div>
            <input type="text" placeholder="Username or Email Address" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">LOGIN</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
          <img src = {signIn} alt = "g1_bg" className='overlay'/>
            <div className="overlay-panel overlay-left ">
              <div className = "glass-morph-container">
                <h1>Welcome Back!</h1>
                <div className = "paragraph">
                  To keep connected with us, please login 
                  with your personal info
                </div>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => setaddclass("")}
                >
                  LOGIN
                </button>
              </div>
            </div>

            <div className="overlay-panel overlay-right">
              <div className = "glass-morph-container">
                <h1>Hello Friend!</h1>
                <div className = "paragraph">
                  Enter your personal details and let's start your 
                  rice stress scanning
                </div>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => setaddclass("right-panel-active")}>
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  };

export default LoginSignUp;