import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Introduction/Intro";
import Tutorial from './components/Tutorial/Tutorial';
// import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import Upload from "./components/Upload/Upload";

function App() {
  return (
    <div className="App">
      <Navbar/> 
      <Intro/> 
      <Tutorial/>
      <Upload/>  
      {/* <LoginSignUp/> */}
    </div>
  );
}

export default App;
