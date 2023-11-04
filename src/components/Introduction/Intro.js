import React from 'react';
import './Intro.css';
import g1_bg from '../../assets/Group 1.png';

function Intro() {
  return (
    <div className='intro'>
      <img src = {g1_bg} alt = "g1_bg" className='g1_bg'/>
      <h1>Hi, We are SKANIN!</h1>
      <h2>Make your stress go away</h2>
    </div>
  );
}

export default Intro;
