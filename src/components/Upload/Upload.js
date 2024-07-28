import React, { useState, useEffect } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { FaFire } from 'react-icons/fa';
import './Upload.css';
import BG from '../../assets/background.png';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [classification, setClassification] = useState("Not yet classified");
  const [recommendation, setRecommendation] = useState("No recommendation yet");
  const [fireRating, setFireRating] = useState(0);
  const [results, setResults] = useState({});
  const [user, setUser] = useState(() => {
    return {userId: localStorage.getItem('userData'), token: localStorage.getItem('token')}|| {}
  });

  const showAlertScan = () => { // TODO: Remove
    alert('Development... Scan Success');
  };

  const showAlertNoImage= () => { // TODO: Remove
    alert('Development... No image to scan');
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      console.log(image)
    }
  };
  useEffect(() => {
      console.log(image)
    }, [image]);
  const handleRemove = () => {
    setFileName("No selected file");
    setImage(null);
    setClassification("Not yet classified");
    setRecommendation("No recommendation yet");
    setResults({});
    setFireRating(0);
  };
  const fetchClassification = async (imageUri) => {
    try {
      const base64Image = await convertBlobToBase64(imageUri)

      if (base64Image === "PCFET0NUWVBFIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiI+DQogIDxoZWFkPg0KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPg0KICAgIDxsaW5rIHJlbD0iaWNvbiIgaHJlZj0iLi9za2FuaW4tbG9nby5pY28iIC8+DQogICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xIiAvPg0KICAgIDxtZXRhIG5hbWU9InRoZW1lLWNvbG9yIiBjb250ZW50PSIjMDAwMDAwIiAvPg0KICAgIDxtZXRhDQogICAgICBuYW1lPSJkZXNjcmlwdGlvbiINCiAgICAgIGNvbnRlbnQ9IlNLQU5JTiINCiAgICAvPg0KICAgIDxsaW5rIHJlbD0icHJlY29ubmVjdCIgaHJlZj0iaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbSI+DQogICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJzdHlsZXMuY3NzIj4NCiAgICA8bGluayBocmVmPSJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU1vbnRzZXJyYXQ6d2dodEAzMDA7NDAwOzUwMDs2MDA7NzAwJmRpc3BsYXk9c3dhcCIgcmVsPSJzdHlsZXNoZWV0Ij4NCiAgICA8dGl0bGU+U0tBTklOPC90aXRsZT4NCiAgPHNjcmlwdCBkZWZlciBzcmM9Ii9zdGF0aWMvanMvYnVuZGxlLmpzIj48L3NjcmlwdD48L2hlYWQ+DQogIDxib2R5Pg0KICAgIDxub3NjcmlwdD5Zb3UgbmVlZCB0byBlbmFibGUgSmF2YVNjcmlwdCB0byBydW4gdGhpcyBhcHAuPC9ub3NjcmlwdD4NCiAgICA8ZGl2IGlkPSJyb290Ij48L2Rpdj4NCiAgPC9ib2R5Pg0KPC9odG1sPg0K"){
        showAlertNoImage();
        return;
      }
      const body = JSON.stringify({
        image:base64Image,
        _id: user.userId
      })
      console.log(body)
      const response = await fetch('https://softies-backend-production.up.railway.app/api/recommendation/skan', { 
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
    });
      const result = await response.json();
      const data = result.data;
      // result assign to state
      console.log(data)
      setClassification({stress_name : data.stress_name, stress_desc: data.description});
      setRecommendation(data.recommendation);
      setFireRating(data.stress_level);
      setResults(data)
      showAlertScan()
    } catch (error) {
      console.log(error)
    }
  };

  
  const convertBlobToBase64 = async (blobUrl) => {
    // Fetch the Blob data from the URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();
  
    // Convert the Blob to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  
//       }, [selectedImage]);

  const handleClassify = async() => {
    await fetchClassification(image)

  };

  useEffect(() => {
    // setClassification({stress_name: "Not yet classified"});
    setRecommendation("No recommendation yet");
    setFireRating(0);
  }, []);

  return (
    <section className='scan' id='scan-section'>
      <section>
        <img src={BG} alt='BG' className='BG' />
      </section>
      <span className='scanTitle'>SCAN</span>
      <main className="scanContainer">
        <div className="uploadSection">
          <div className="image-form" onClick={() => document.querySelector(".input-field").click()}>
            <input type="file" accept="image/*" className="input-field" onChange={handleUpload} />
            {image ? (
              <img src={image} alt={fileName} />
            ) : (
              <div className="upload-placeholder">
                <MdCloudUpload color="#1475cf" size={60} /><br />
                <span className='formParagraph'>Upload an image</span>
              </div>
            )}
          </div>

          <div className="buttons">
            <button onClick={handleClassify}>Classify</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>

        <div className="resultsSection">
          <span className='headerStyle'>Classification</span><br />
          <div className="fire-icon-container">
            <span className='paragraphStyle'>
              <b>{classification.stress_name}</b> <br/>
              {classification.stress_desc}
            </span>
            {/* <section className='fireCon'>
              {Array.from({ length: 5 }).map((_, index) => (
                <FaFire
                  key={index}
                  color={index < fireRating ? 'red' : 'gray'}
                  size={24}
                  className="fire-icon"
                />
              ))}
            </section> */}
          </div>
          <br /><br />
          <span className='headerStyle'>Recommendation</span><br />
          {
            results.recommendation ? 
            results.recommendation.split("\n\n").map((line,idx)=>
              <div key={idx}>
                <span className='paragraphStyle'>{line}</span><br /><br/>
              </div>
            ):
            <></>
          }

          <span className='headerStyle'>References</span><br />
          {
            results.description_src === results.recommendation_src? 
            <>
              <span className='paragraphStyle'>{results.description_src}</span><br /><br/>
            </>
            : 
            <>
              <span className='paragraphStyle'>{results.description_src}</span><br /><br/>
              <span className='paragraphStyle'>{results.recommendation_src}</span><br />
            </>
          }
          
        </div>
      </main>
    </section>
  );
}
