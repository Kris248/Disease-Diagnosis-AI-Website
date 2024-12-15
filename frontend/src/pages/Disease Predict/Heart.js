import React, { useState } from 'react';
import axios from 'axios';
import './Heart.css';

const PredictHeartDisease = () => {
  // Define state for each input field
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/predict-heart-disease', formData);
      setResult(response.data);
    } catch (err) {
      setError('Error making prediction. Please try again.');
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
        const googleMapsUrl = `https://www.google.com/maps/search/Cardiologist+near+me/@${latitude},${longitude},14z`;
        window.open(googleMapsUrl, '_blank');  // Open the URL in a new tab
      }, () => {
        alert("Unable to retrieve your location. Please enable location access and try again.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };


  return (
    <div className="heart-container">
      <header className="heart-header">
        <h1>Heart Disease Risk Prediction❤️</h1>
        <p>Enter your details to assess the risk of heart disease.</p>
      </header>

      <form className="heart-form" onSubmit={handleSubmit}>
        <div className="heart-form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="sex">Sex (1 = Male, 0 = Female)</label>
          <input
            type="number"
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="cp">Chest Pain Types</label>
          <input
            type="number"
            id="cp"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="trestbps">Resting Blood Pressure</label>
          <input
            type="number"
            id="trestbps"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="chol">Serum Cholesterol (mg/dl)</label>
          <input
            type="number"
            id="chol"
            name="chol"
            value={formData.chol}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="fbs">Fasting Blood Sugar &gt; 120 mg/dl (1 = True, 0 = False)</label>
          <input
            type="number"
            id="fbs"
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="restecg">Resting Electrocardiographic Results</label>
          <input
            type="number"
            id="restecg"
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="thalach">Maximum Heart Rate Achieved</label>
          <input
            type="number"
            id="thalach"
            name="thalach"
            value={formData.thalach}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="exang">Exercise Induced Angina (1 = Yes, 0 = No)</label>
          <input
            type="number"
            id="exang"
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="oldpeak">ST Depression Induced by Exercise</label>
          <input
            type="number"
            id="oldpeak"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="slope">Slope of the Peak Exercise ST Segment</label>
          <input
            type="number"
            id="slope"
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="ca">Major Vessels Colored by Fluoroscopy</label>
          <input
            type="number"
            id="ca"
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="heart-form-group">
          <label htmlFor="thal">Thal: 0 = Normal, 1 = Fixed Defect, 2 = Reversible Defect</label>
          <input
            type="number"
            id="thal"
            name="thal"
            value={formData.thal}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="heart-submit-btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <p>{result.message}</p>
        </div>
      )}

 {/* Find Doctors Button */}
 <div className='doctor-section'>
        <button className="find-doctor-button" onClick={findDoctors}>
        Finding Doctors? Click here to <u>Explore your nearest Specialist</u>🔎
        </button>
        </div>

      </div>

  );
};

export default PredictHeartDisease;

