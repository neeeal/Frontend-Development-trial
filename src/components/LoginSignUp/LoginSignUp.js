import React, { useState, useEffect } from "react";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    if (isAuthenticated) {
      navigate('/');
    }

    // Add the resize event listener
    window.addEventListener('resize', handleResize);


    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = async (event) => {
    event.preventDefault(); 
    await login(email, password, event);
  };

  const showAlert = (errorMessage) => {
    alert(`Error! ${errorMessage}`);
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
      if (result.msg.includes("Client Error") || result.msg.includes("Internal Server Error")){
        showAlert(result.msg)
        return;
      }
      setaddclass("");
    } catch (error) {
      console.error(error);
      showAlert(error)
    }
  };

  const handleForgotPassword = async (event) => {

    if (!forgotEmail.trim()) {
      alert("Email is required");
      console.error("Email is required")
      return;
    }

    event.preventDefault();
    try {
      // Make an API call to your server to handle the forgot password logic
      const response = await fetch('https://softies-backend-production.up.railway.app/api/email/forgot_password', { // TODO: Change link
        method: 'POST',
        body: JSON.stringify({ email: forgotEmail }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      alert(result.msg);

      if (!response.ok){
        console.error(result.msg);
        return
      }

      // Handle the response (e.g., show a success message, redirect, etc.)
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error(error);
      alert("Error sending forgot password email.");
    }
  };

  return (
    <div className={`container ${addclass}`} id="loginSignup">
      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div 
          className="modal" 
          onClick={() => setIsModalOpen(false)}  // Close the modal when background is clicked
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}  // Prevent closing when clicking inside modal content
          >
            <span 
              className="close" 
              style={{"font-size": "32px"}}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
              <h2 style={{ color: "black" }}>Forgot Password</h2>
              <p style={{color:"black"}}>Enter your email address to receive a reset link:</p>
              <div style={{display:"flex", flexDirection:"row"}}>
                <input
                  style={{flex: 10}}
                  type="email"
                  placeholder="Email Address"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button 
                  style={{
                    flex: 4,
                    color: "black",
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    outline: "none",
                  }}
                onClick={handleForgotPassword}
                >Send Email</button>
              </div>
          </div>
        </div>
      )}
    {!isPortrait ? (
      <>
      {/* Main Content */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <div className="paragraph2">
            Enter your complete details to register
          </div>
          <input type="fName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
          <input type="lName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
          <input type="contact" placeholder="Contact" onChange={(e) => setContact(e.target.value)}/>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
          <div style={{minWidth:"100%", display: "flex"}}>
            <input style={{flex: 10}} type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
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
              <span style={{color: "black"}}>{isPasswordVisible ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <button onClick={handleSignUp}>SIGN UP</button>
          {isPortrait ? <p>Portrait mode</p> : <p>Landscape mode</p>}
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleLoginClick}>
          <h1>Login</h1>
          <div className="paragraph2">
            Enter your complete details
          </div>
          <input type="text" placeholder="Username or Email Address" onChange={(e) => setEmail(e.target.value)}/>
          <div style={{minWidth:"100%", display: "flex"}}>
            <input style={{flex: 10}} type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
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
              <span style={{color: "black"}}>{isPasswordVisible ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <button type="submit">LOGIN</button>
          <button type="button" 
            style={{
              // flex: 1,
              color: "black",
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              outline: "none",
            }}
          onClick={() => setIsModalOpen(true)}>Forgot Password?</button>
          {isPortrait ? <p>Portrait mode</p> : <p>Landscape mode</p>}
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <img src={signIn} alt="g1_bg" className='overlay'/>
          <div className="overlay-panel overlay-left ">
            <div className="glass-morph-container">
              <h1>Welcome Back!</h1>
              <div className="paragraph">
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
            <div className="glass-morph-container">
              <h1>Hello Friend!</h1>
              <div className="paragraph">
                Enter your personal details and let's start your 
                rice stress scanning
              </div>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setaddclass("right-panel-active")}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    ) : (
      <>
      <div className="form-container sign-up-container" style={{transform: addclass ? 'translateX(0%)' : 'translateX(-100%)'}}>
        <form>
          <h1>Create Account</h1>
          <div className="paragraph2">
            Enter your complete details to register
          </div>
          <input type="fName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
          <input type="lName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
          <input type="contact" placeholder="Contact" onChange={(e) => setContact(e.target.value)}/>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
          <div style={{minWidth:"100%", display: "flex"}}>
            <input style={{flex: 10}} type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
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
              <span style={{color: "black"}}>{isPasswordVisible ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <button onClick={handleSignUp}>SIGN UP</button>
          <button type="button" 
            style={{
              // flex: 1,
              color: "black",
              background: "none",
              border: "none",
              padding: '10px 0px',
              margin: 0,
              cursor: "pointer",
              outline: "none",
            }}
          onClick={() => setaddclass("")}>Login?</button>
        </form>
      </div>

      <div className="form-container sign-in-container" >
        <form onSubmit={handleLoginClick}>
          <h1>Login</h1>
          <div className="paragraph2">
            Enter your complete details
          </div>
          <input type="text" placeholder="Username or Email Address" onChange={(e) => setEmail(e.target.value)}/>
          <div style={{minWidth:"100%", display: "flex"}}>
            <input style={{flex: 10}} type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
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
              <span style={{color: "black"}}>{isPasswordVisible ? 'Hide' : 'Show'}</span>
            </button>
          </div>
          <button type="submit">LOGIN</button>
          <button type="button" 
            style={{
              // flex: 1,
              color: "black",
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              outline: "none",
            }}
          onClick={() => setIsModalOpen(true)}>Forgot Password?</button>
          <button type="button" 
            style={{
              // flex: 1,
              color: "black",
              background: "none",
              border: "none",
              padding: '10px 0px',
              margin: 0,
              cursor: "pointer",
              outline: "none",
            }}
          onClick={() => setaddclass("right-panel-active")}>Sign up?</button>
          {isPortrait ? <p>Portrait mode</p> : <p>Landscape mode</p>}
        </form>
      </div>
      </>
    )}



    </div>
  );
};

export default LoginSignUp;
