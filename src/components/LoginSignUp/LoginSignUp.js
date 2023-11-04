import React , {useState} from "react";
import './LoginSignUp.css'; 
import signIn from '../../assets/signIn.png';

const LoginSignUp = () => {
    const [addclass, setaddclass] = useState("");
    return (
      <div className={`container ${addclass}`} id="container">
        <div className="form-container  sign-up-container">
          <form>
            <h1>Create Account</h1>
            <div className = "paragraph2">
                Enter your complete details to register
            </div>
            <input type="fName" placeholder="First Name" />
            <input type="lName" placeholder="Last Name" />
            <input type="contact" placeholder="Contact" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">SIGN UP</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form>
            <h1>Login</h1>
            <div className = "paragraph2">
                Enter your complete details
            </div>
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
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
                  Enter your personal detais and let's start your 
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