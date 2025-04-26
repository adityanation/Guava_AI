import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import "./Upload.css";
import ChatBot from "./Chatbot";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [solution, setSolution] = useState(""); 
  const [preview, setPreview] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const predictedDisease = data.disease; 

      setPrediction(predictedDisease);
      setMessage(getDiseaseMessage(predictedDisease));
      setSolution(getDiseaseSolution(predictedDisease));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error processing the image. Try again.");
    }

    setLoading(false);
  };

  // Function to return messages based on the predicted disease
  const getDiseaseMessage = (disease) => {
    switch (disease) {
      case "Anthracnose":
        return "Your guava plant is affected by Anthracnose!";
      case "Fruit Fly":
        return "Your guava has a Fruit Fly infestation!";
      case "Healthy":
        return "✅ Your guava plant is healthy! Keep up the good care.";
      default:
        return "❌ Unable to determine the disease. Please try again with a clearer image.";
    }
  };

  const getDiseaseInfo = (disease) => {
    switch (disease) {
      case "Anthracnose":
        return {
          cause: "Fungal infection caused by Colletotrichum gloeosporioides",
          conditions: [
            "High humidity levels",
            "Warm temperatures (20-30°C)",
            "Poor air circulation",
            "Extended periods of leaf wetness"
          ],
          symptoms: [
            "Dark, sunken lesions on fruits",
            "Brown to black spots on leaves",
            "Stem cankers",
            "Fruit rot with pinkish spore masses"
          ]
        };
      case "Fruit Fly":
        return {
          cause: "Infestation by fruit fly species (Bactrocera species)",
          conditions: [
            "Presence of ripe or ripening fruits",
            "Warm temperatures (25-30°C)",
            "High humidity",
            "Proximity to infested areas"
          ],
          symptoms: [
            "Small puncture marks on fruit surface",
            "Premature fruit ripening",
            "Fruit decay and dropping",
            "Presence of maggots inside fruits"
          ]
        };
      case "Healthy":
        return {
          cause: "Plant is in good health",
          conditions: [
            "Proper watering schedule",
            "Good nutrient management",
            "Adequate sunlight",
            "proper air circulation"
          ],
          symptoms: [
            "Vibrant green leaves",
            "Normal fruit development",
            "Good overall growth",
            "No visible signs of disease"
          ]
        };
      default:
        return {
          cause: "Unable to determine",
          conditions: [],
          symptoms: []
        };
    }
  };

  // Function to return solutions for the predicted disease
  const getDiseaseSolution = (disease) => {
    switch (disease) {
      case "Anthracnose":
        return "   Solution for Anthracnose: \n" +
               "1. Use copper-based fungicides (like Bordeaux mixture)\n" +
               "2. Prune and remove infected parts of the plant\n" +
               "3. Avoid overhead watering to reduce humidity\n" +
               "4. Ensure proper air circulation around the plant";
      case "Fruit Fly":
        return "  Solution for Fruit Fly Infestation: \n" +
               "1. Use pheromone traps to attract and catch flies\n" +
               "2. Apply neem oil or organic insecticides\n" +
               "3. Destroy infested fruits immediately to prevent spreading\n" +
               "4. Cover fruits with net bags to prevent flies from laying eggs";
      case "Healthy":
        return "1. Keep monitoring your plant for early signs of disease.\n" +
               "2. Maintain good watering and pruning habits to keep it healthy!";
      default:
        return "⚠️ No solution available. Try uploading a clearer image.";
    }
  };

  return (
    <div className="futuristic-container">
      {/* Animated background elements */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Floating hexagons */}
      <div className="hexagon-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`floating-hexagon hex-${i}`}></div>
        ))}
      </div>

      {/* Header Section */}
      <header className="neo-header">
        <div className="header-content">
          <div className="logo-container">
            <Link to="/" className="back-button">
              <ArrowLeft className="back-icon" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h2 className="header-title">GuavaVision <span className="highlight">AI</span></h2>
        </div>
      </header>

      <div className="upload-section">
        <div className="upload-content">
          <h1 className="upload-title">
            <span className="highlight">Upload</span> & Analyze
          </h1>
          <div className="glowing-line"></div>
          <p className="upload-description">
            Upload your guava image for instant disease detection using our advanced AI technology.
          </p>
          
          <div className="upload-area">
            <label className="file-input-label">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="file-input"
              />
              <div className="upload-icon-container">
                <Upload size={24} className="upload-icon" />
                <span>Select Image</span>
              </div>
            </label>
            
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
            
            <button 
              onClick={handleUpload} 
              disabled={loading} 
              className="analyze-button"
            >
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <>
                  <span>Analyze Image</span>
                  <div className="button-glow"></div>
                </>
              )}
            </button>
          </div>
          
          {prediction && (
            <div className="result-container">
              <div className="result-header">
                {prediction === "Healthy" ? (
                  <CheckCircle size={32} className="result-icon healthy" />
                ) : (
                  <AlertCircle size={32} className="result-icon disease" />
                )}
                <h2 className="result-title">{message}</h2>
              </div>

              <div className="disease-info">
                <div className="info-section">
                  <h3 className="info-header">Cause:</h3>
                  <p className="info-text">{getDiseaseInfo(prediction).cause}</p>
                </div>

                <div className="info-section">
                  <h3 className="info-header">Favorable Conditions:</h3>
                  <ul className="info-list">
                    {getDiseaseInfo(prediction).conditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-section">
                  <h3 className="info-header">Symptoms:</h3>
                  <ul className="info-list">
                    {getDiseaseInfo(prediction).symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-section">
                  <h3 className="info-header">Treatment Protocol:</h3>
                  <p className="info-text">{solution}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="neo-footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>GuavaVision <span className="highlight">AI</span></h3>
            <p>Revolutionizing agricultural technology with advanced computer vision.</p>
          </div>
          <div className="footer-divider"></div>
          <p className="copyright">© 2025 GuavaVision AI. All rights reserved.</p>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default UploadPage;
