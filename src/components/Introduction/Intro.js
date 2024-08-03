import React from 'react';
import './Intro.css';
import g1_bg from '../../assets/Group 1.png';
import { Link } from 'react-scroll';
import arrow from '../../assets/arrow.png';

function Intro() {
  // useEffect(() => {
  //   const handleScroll = () => {
  //     let value = window.scrollY;

  //     // Update the position of the background images
  //   document.querySelector('.bgThree').style.left = value * 1.5 + 'px';
  //   document.querySelector('.bgOne').style.top = value * -0.5 + 'px';
  //   document.querySelector('.bgTwo').style.left = value * -1.5 + 'px';
  //   };

  //   // Add the scroll event listener when the component mounts
  //   window.addEventListener('scroll', handleScroll);

  //   // Remove the scroll event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  return (
    <section className='intro' id="intro-section">
      <div className='introContent'>
        <span className='introLine1'>Worry Less, Grow More:<br /></span>
        <span className='introLine2'>Your Rice Stress Classifier</span>
        <p className='introParagraph'>Introducing our Rice Stress Classifier, your key to healthy rice crops. Say goodbye to field worries with spot-on stress analysis, for confident  and flourishing fields</p>
        <Link to='scan-section' smooth={true} duration={500} offset={-80}>
            <button className='introBtn'>
                <span className="arrowContainer"><img src={arrow} alt='Get' className='arrowBtn'/></span> Get Started 
            </button>
        </Link>
      </div>
        <div className="imageContainer">
            <img src = {g1_bg} alt = "g1_bg" className='g1_bg'/>
        </div>

      
    </section>
  );
}

export default Intro;
