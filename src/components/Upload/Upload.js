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
      console.log("LOADING LOADING LOADING...")
      // console.log(base64Image)
      const response = await fetch('https://softies-backend-production.up.railway.app/api/recommendation/skan', { 
      method: 'POST',
      body: JSON.stringify({
          "image":base64Image,
        }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      const result = await response.json();
      // result assign to state
      console.log(result)
      setClassification({stress_name : result.stress_name, stress_desc: result.description});
      setRecommendation(result.recommendations);
      setFireRating(result.stress_level);
      setResults(result)
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
            <section className='fireCon'>
              {Array.from({ length: 5 }).map((_, index) => (
                <FaFire
                  key={index}
                  color={index < fireRating ? 'red' : 'gray'}
                  size={24}
                  className="fire-icon"
                />
              ))}
            </section>
          </div>
          <br /><br />
          <span className='headerStyle'>Recommendation</span><br />
          <span className='paragraphStyle'>{recommendation}</span><br /><br/>

          <span className='headerStyle'>References</span><br />
          <span className='paragraphStyle'>{results.description_src}</span><br /><br/>
          <span className='paragraphStyle'>{results.recommendation_src}</span><br />
          
        </div>
      </main>
    </section>
  );
}
