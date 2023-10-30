import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Introduction/Intro"
import Upload from "./components/Upload/Upload"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Intro/>
      <Upload/>
    </div>
  );
}

export default App;
