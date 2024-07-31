import React, { useEffect, useState } from 'react';
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Introduction/Intro";
import Tutorial from './components/Tutorial/Tutorial';
import Upload from "./components/Upload/Upload";
import History from "./components/History/History"; 
// import DetailedHistory from "./components/History/DetailedHistory";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(() => {
    return {userId:localStorage.getItem('userData'),token:localStorage.getItem('token')}|| {}
  });

  const showAlertHistory= () => { // TODO: Remove
    alert('Development... History fetched');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    const fetchHistory = async () => {
      try {
        // Assuming you have a way to get the user ID from your authentication system
        // const userId = user.user_id; 

        const response = await fetch('https://softies-backend-production.up.railway.app/api/history/get_history_with_images', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'User-Id': user.userId, // Include the user ID in the headers
            'Authorization': "Bearer " + user.token, // Include the user ID in the headers
          },
        });
        const result = await response.json();

        // Convert the object into an array
        const historyArray = result.data.history; // Ensure the correct property name
        console.log(result);

        // Assuming the server returns history entries with an "image" field
        // and the image field is a base64-encoded image data
        const historyWithImages = historyArray
        // .slice(0, 6)
        .map((entry, idx) => {
          const rice_image = `data:image/jpeg;base64,${entry.rice_image}`;
          console.log(result.data.history[idx]._id)
          return { ...entry, rice_image:rice_image };
        });

        setHistory(historyWithImages);
        showAlertHistory()
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [isAuthenticated, navigate]);

  const addToHistory = (newScan) => {
    newScan.rice_image = `data:image/jpeg;base64,${newScan.rice_image}`;
    setHistory(prevHistory => [newScan, ...prevHistory]);
  };

  return (
    <div className="App">
      <Navbar/>
      <Intro/>
      <Tutorial/>
      <Upload addToHistory={addToHistory} />
      <History history={history} />
      {/* <DetailedHistory/> */}
      {/* <LoginSignUp/> */}
    </div>
  );
}

export default App;
