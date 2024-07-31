import React, { useEffect, useState } from 'react';
import './History.css';
import riceCropImage from '../../assets/ricecrop.jpg';
import BG from '../../assets/background.png';
import { useNavigate } from "react-router-dom";

function History({ history }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  const numHistory = history.length;

  const handleHistoryClick = (entry) => {
    console.log(entry.history_id)
    navigate('/detailed',{state:entry})
    // event.preventDefault();
    // Add your logic for handling click events
  };
  
  return (
    <div className="container" id="history-section">
      <section>
        <img src={BG} alt='BG' className='BG' />
      </section>
      <span className="history-title">HISTORY</span>
      <div className="card-container">
          {history.map((entry, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={entry.rice_image} alt={`Scan No.${numHistory - index}`} style={{height:"24vw",width:"24vw"}}/>
                <button className="results-btn" onClick={() => handleHistoryClick({...entry, scan_num: numHistory - index})}>
                  Show Results
                </button>
              </div>
              <p className="scan-title">SCAN NO. {numHistory - index}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default History;
