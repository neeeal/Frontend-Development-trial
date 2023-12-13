import React, { useEffect, useState } from 'react';
import './History.css';
import riceCropImage from '../../assets/ricecrop.jpg';
import BG from '../../assets/background.png';

function History() {
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
          return { ...entry, imageSrc };
        });

        setHistory(historyWithImages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = async (event) => {
    event.preventDefault();
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
                <img src={entry.imageSrc} alt={`Scan No.${entry.scanNumber}`} />
                <button className="results-btn" onClick={() => handleHistoryClick(entry)}>
                  Show Results
                </button>
              </div>
              <p className="scan-title">SCAN NO. {entry.scanNumber}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
