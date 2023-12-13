import React, { useEffect, useState } from 'react';
import './History.css';
import riceCropImage from '../../assets/ricecrop.jpg';
import BG from '../../assets/background.png';
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('userData'))|| {}
  });
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Assuming you have a way to get the user ID from your authentication system
        const userId = user.user_id; 

        const response = await fetch('https://softies-backend-production.up.railway.app/api/history/get_history_with_images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': userId, // Include the user ID in the headers
          },
        });
        const result = await response.json();

        // Convert the object into an array
        const historyArray = result.history_with_images; // Ensure the correct property name
        console.log(result);

        // Assuming the server returns history entries with an "image" field
        // and the image field is a base64-encoded image data
        const historyWithImages = historyArray.map(entry => {
          const imageSrc = `data:image/jpeg;base64,${entry.image}`;
          console.log(imageSrc)
          return { ...entry, imageSrc };
        });

        setHistory(historyWithImages);
        setLoading(false);
        console.log(history)
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = async (entry) => {
    console.log(entry.history_id)
    navigate('/detailed',{state:{"history_id":entry.history_id,"user_id":user.user_id,"scan_num":entry.scan_num,"stress_id":entry.stress_id,"status":entry.status}})
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
        {loading ? (
          <p>Loading history...</p>
        ) : (
          history.map((entry, index) => (
            <div className="card" key={index}>
              <div className="image-container">
                <img src={entry.imageSrc} alt={`Scan No.${entry.scan_num}`} style={{height:"24vw",width:"24vw"}}/>
                <button className="results-btn" onClick={() => handleHistoryClick(entry)}>
                  Show Results
                </button>
              </div>
              <p className="scan-title">SCAN NO. {entry.scan_num}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
