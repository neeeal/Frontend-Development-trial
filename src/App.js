import React, { useEffect } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Introduction/Intro";
import Tutorial from './components/Tutorial/Tutorial';
// import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Upload from "./components/Upload/Upload";
import History from "./components/History/History"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  // const navigate = useNavigate();
  // const { isAuthenticated } = useAuth();
  // useEffect(() => {
  //   // console.log(isAuthenticated,"fd")
  //   if (isAuthenticated===false){
  //     navigate('/login');
  //   }

  // });

  return (  
    <div className="App">
      <Navbar/> 
      <Intro/> 
      <Tutorial/>
      <Upload/>  
      <History/>
      {/* <LoginSignUp/> */}

    </div>
  );
}

export default App;
