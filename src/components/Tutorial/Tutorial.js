import React from 'react'
import './Tutorial.css'
import first from '../../assets/tutsIcons/arrow1.png'
import second from '../../assets/tutsIcons/arrow2.png'
import third from '../../assets/tutsIcons/arrow3.png'
// import imgPlaceholder from '../../assets/gif2.gif'
import tutsBG from '../../assets/tutsBG3.png'

function Tutorial() {
  return (
    <section className='tuts'>
        <section>
            <img src={tutsBG} alt='tutsBG' className='tutsBG'/>
        </section>


        <div className='boxInside'>
            <span className='tutsTitle'>TUTORIAL</span>
            <div className='tutsContent'>
            <div className='allSteps'>
                <div className='step'>
                    <img src={first} alt='First' className='stepIcon'/>
                    <div className='stepDivContent'>
                        <span className='stepOneTitle'>
                            <span className='stepOneClick'>Click</span> upload image<br/>
                            <span className='stepOneCaption'>Click to upload a crop image and determine its stress.</span>
                        </span>
                                        
                    </div>
                </div>

                <div className='step'>
                    <img src={second} alt='Second' className='stepIcon'/>
                    <div className='stepDivContent'>
                        <span className='stepTwoTitle'>
                            <span className='stepTwoSelect'>Select</span> an image<br/>
                            <span className='stepTwoCaption'>Select an image to upload.</span>
                        </span>
                    </div>
                </div>

                <div className='step'>
                    <img src={third} alt='Third' className='stepIcon'/>
                    <div className='stepDivContent'>
                        <span className='stepThreeTitle'>
                            <span className='stepThreeClick'>Click</span> classify <br/>
                            <span className='stepThreeCaption'>Click classify to show results.</span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        
                
        {/* <div className='imgContainer'>
            <img src={imgPlaceholder} alt='imgPlaceholder' className='imgPlaceholder'/>
        </div> */}
        </div>

        
        
    </section>
  )
}

export default Tutorial;