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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setFileName("No selected file");
    setImage(null);
    setClassification("Not yet classified");
    setRecommendation("No recommendation yet");
    setFireRating(0);
  };

  const handleClassify = () => {
    setClassification("Some classification result");
    setRecommendation("Some recommendation result");
    setFireRating(3);
  };

  useEffect(() => {
    setClassification("Not yet classified");
    setRecommendation("No recommendation yet");
    setFireRating(0);
  }, []);

  return (
    <section className='scan'>
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
              {classification}
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
          <span className='paragraphStyle'>{recommendation}</span><br />
        </div>
      </main>
    </section>
  );
}
