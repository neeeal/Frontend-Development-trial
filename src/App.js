import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Introduction/Intro";
import Tutorial from './components/Tutorial/Tutorial';
// import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Upload from "./components/Upload/Upload";
import History from "./components/History/History"; 

function App() {
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
