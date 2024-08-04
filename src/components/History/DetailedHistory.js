import React, { useState, useEffect } from 'react';
import './DetailedHistory.css';
import placeholder_img from '../../../src/assets/sheat.png';
import goBack_button from '../../../src/assets/icon _arrow left.png';
import { useNavigate, useLocation } from "react-router-dom";
function DetailedHistory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleBackClick = async () => {
    navigate('/')
  };
  const [scanNum, setScanNum] = useState(0)
  const [image, setImage] = useState("")
  const [stressType, setstressType] = useState("")
  const [stressName, setstressName] = useState("")
  const [description, setDescription] = useState("")
  const [recommendation, setRecommendation] = useState("")
  const [references, setreferences] = useState([])

  // const showAlertHistory= () => { // TODO: Remove
  //   alert('Development... History fetched');
  // };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Assuming you have a way to get the user ID from your authentication system
        // const userId = state.user_id; 
        // const stressId = state.stress_id
        // const response = await fetch(`https://softies-backend-production.up.railway.app/api/history/get_history_entry/${state.history_id}`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'User-Id': userId, // Include the user ID in the headers
        //     'Stress-Id': stressId, // Include the user ID in the headers
        //   },
        // });
        const result = {}//await response.json();
        setScanNum(state.scan_num)
        setstressType(state.stress_type)
        setstressName(state.stress_name)
        setDescription(state.description)
        setRecommendation(state.recommendation)
        if (state.description_src !== state.recommendation_src){
          setreferences([state.description_src,state.recommendation_src])
        } else{
          setreferences([state.description_src,""])
          }
        setImage(state.rice_image)
        // Convert the object into an array
        // const historyArray = result.history_with_images; // Ensure the correct property name
        console.log(result);
        // console.log(history)
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
    // showAlertHistory();
  }, []);
  return (
    <div className='container'>
      <div className="header">
        <div className="title">
          <h1>HISTORY</h1>
        </div>
        <div className="goBack">
          <button onClick={() => { handleBackClick() }}>
            <img src={goBack_button} alt="Go Back" />
          </button>
        </div>
      </div>

      <div className="container_detailed">
        <div className="class">
          <h2>Scan #{scanNum}: </h2>
          <p>{stressType} Stress: {stressName}</p>
        </div>
        <div className="content">
          <div className="image">
            <img src={image} alt="Placeholder" />
          </div>
          <div className="classification">
            <h2>Description</h2>
            <p>{description}</p>
          </div>

          <div className="recommendation">
            <h2>Recommendation</h2>
            {
            recommendation ? 
            recommendation.split("\n\n").map((line,idx)=>
              <div key={idx}>
                <p>{line}</p>
              </div>
            ):
            <></>
          }
          </div>

          <div className="references">
            <h2>References</h2>
            {/* <p>{references[0]}<br/>{references[1]}</p> */}
            {
              references[0] === references[1] ? 
              <>
                <p>{references[0] }</p><br />
              </>
              : 
              <>
                <p>{references[0]}</p><br />
                <p>{references[1]}</p>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedHistory;
