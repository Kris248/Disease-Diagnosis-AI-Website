import React, { useState } from 'react';
import axios from 'axios';
import './Kidney.css';

const PredictKidneyDisease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Generate preview for uploaded image
      setError('');
    }
  };

  // Handle prediction
  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await axios.post('http://localhost:5000/predict-kidney-disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        setResponse(res.data);
      } else {
        setError('Failed to get a valid response.');
      }
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to Google Maps with a kidney specialist search query
  const findDoctors = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Construct Google Maps URL with search keyword and current location
        const googleMapsUrl = `https://www.google.com/maps/search/Nephrologist+near+me/@${latitude},${longitude},14z`;
        window.open(googleMapsUrl, '_blank');  // Open the URL in a new tab
      }, () => {
        alert("Unable to retrieve your location. Please enable location access and try again.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="kidney-page">
      <div className="kidney-container">
        <h2 className="title">Kidney Disease Prediction💧</h2>

        <div className="upload-section">
          <label htmlFor="file-upload" className="upload-button">
            Upload Image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Uploaded" />
            </div>
          )}
        </div>

        <button className="predict-button" onClick={handlePredict}>
          Predict
        </button>

        {loading && <p className="loading-message">Analyzing the scanned image...</p>}
        {error && <p className="error-message">{error}</p>}
        {response && (
          <div className="result-section">
            <h3>Prediction Outcome:</h3>
            <p>{response.message}</p>
          </div>
        )}

        {/* Find Doctors Button */}
        <div className='doctor-section'>
        <button className="find-doctor-button" onClick={findDoctors}>
        Finding Doctors? Click here to <u>Explore your nearest Specialist</u>🔎
        </button>
        </div>
      </div>
    </div>
  );
};

export default PredictKidneyDisease;
