import React, { useState } from 'react';
import axios from 'axios';
import './Diabetes.css';

const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: '',
  });

  const [prediction, setPrediction] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    for (let key in formData) {
      if (formData[key] === '') {
        setMessage(`Please enter a value for ${key}.`);
        setStatus('error');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/predict-diabetes-disease', formData);
      setPrediction(response.data.prediction);
      setMessage(response.data.message);
      setStatus(response.data.prediction === 1 ? 'error' : 'success');
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('There was an error with the prediction. Please try again.');
      setStatus('error');
    }
  };

  // Redirect to Google Maps with a Diabetes specialist search query
  const findDoctors = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Construct Google Maps URL with search keyword and current location
        const googleMapsUrl = `https://www.google.com/maps/search/Endocrinologist+near+me/@${latitude},${longitude},14z`;
        window.open(googleMapsUrl, '_blank');  // Open the URL in a new tab
      }, () => {
        alert("Unable to retrieve your location. Please enable location access and try again.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };



  return (
    <div className="diabetes-container">
      <div className="diabetes-card">
        <h2 className="title">Diabetes Prediction💉</h2>
        <p className="subtitle">Enter your details:</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Pregnancies:</label>
            <input
              type="number"
              name="Pregnancies"
              value={formData.Pregnancies}
              onChange={handleChange}
              placeholder="Pregnancies"
            />
          </div>
          <div className="form-group">
            <label>Glucose:</label>
            <input
              type="number"
              name="Glucose"
              value={formData.Glucose}
              onChange={handleChange}
              placeholder="Glucose"
            />
          </div>
          <div className="form-group">
            <label>Blood Pressure:</label>
            <input
              type="number"
              name="BloodPressure"
              value={formData.BloodPressure}
              onChange={handleChange}
              placeholder="Blood Pressure"
            />
          </div>
          <div className="form-group">
            <label>Skin Thickness:</label>
            <input
              type="number"
              name="SkinThickness"
              value={formData.SkinThickness}
              onChange={handleChange}
              placeholder="Skin Thickness"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Insulin:</label>
          <input
            type="number"
            name="Insulin"
            value={formData.Insulin}
            onChange={handleChange}
            placeholder="Insulin"
          />
        </div>

        <div className="form-group full-width">
          <label>BMI:</label>
          <input
            type="number"
            name="BMI"
            value={formData.BMI}
            onChange={handleChange}
            placeholder="BMI"
          />
        </div>

        <div className="form-group full-width">
          <label>Diabetes Pedigree Function:</label>
          <input
            type="number"
            name="DiabetesPedigreeFunction"
            value={formData.DiabetesPedigreeFunction}
            onChange={handleChange}
            placeholder="Pedigree Function"
          />
        </div>

        <div className="form-group full-width">
          <label>Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            placeholder="Age"
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {message && (
          <div className={`prediction-result ${status}`}>
            <p>{message}</p>
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

export default DiabetesPrediction;
