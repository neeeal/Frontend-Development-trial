import React from 'react';
import './Intro.css';
import { Link } from 'react-scroll';
import arrow from '../../assets/arrow.png';
import bg1 from '../../assets/bg1.png';
import bg2 from '../../assets/bg2.png';
import bg3 from '../../assets/bg3.png';

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
    <section id="intro">
        <section className='parallax'>
            <img src={bg3} alt="Background 3" className='bgThree'></img>
            <img src={bg1} alt="Background 1" className='bgOne'></img>
            <img src={bg2} alt="Background 2" className='bgTwo'></img>

        </section>
      <div className='introContent'>
        <span className='introLine1'>Worry Less, Grow More:<br /></span>
        <span className='introLine2'>Your Rice Stress Classifier</span>
        <p className='introParagraph'>Introducing our Rice Stress Classifier, your key to healthy rice crops. <br/> Say goodbye to field worries with spot-on stress analysis, for confident <br/> and flourishing fields</p>
        <Link>
            <button className='introBtn'>
                <span className="arrowContainer"><img src={arrow} alt='Get' className='arrowBtn'/></span> Get Started 
            </button>
        </Link>
      </div>
      
    </section>
  );
}

export default Intro;
