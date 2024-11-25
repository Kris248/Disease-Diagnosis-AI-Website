import React, { useState } from 'react';
import axios from 'axios';
import './Parkinson.css';

const PredictParkinsonDisease = () => {
  const [formData, setFormData] = useState({
    fo: '',
    fhi: '',
    flo: '',
    Jitter_percent: '',
    Jitter_Abs: '',
    RAP: '',
    PPQ: '',
    DDP: '',
    Shimmer: '',
    Shimmer_dB: '',
    APQ3: '',
    APQ5: '',
    APQ: '',
    DDA: '',
    NHR: '',
    HNR: '',
    RPDE: '',
    DFA: '',
    spread1: '',
    spread2: '',
    D2: '',
    PPE: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/predict-parkinson-disease', formData);
      setResult(response.data);
    } catch (err) {
      setError('Error making prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to Google Maps with a parkinson specialist search query
  const findDoctors = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Construct Google Maps URL with search keyword and current location
        const googleMapsUrl = `https://www.google.com/maps/search/Neurologist+near+me/@${latitude},${longitude},14z`;
        window.open(googleMapsUrl, '_blank');  // Open the URL in a new tab
      }, () => {
        alert("Unable to retrieve your location. Please enable location access and try again.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };



  return (
    <div className="parkinson-container">
      <header className="parkinson-header">
        <h1>Parkinson's Disease Prediction🧠🦵</h1>
        <p>Provide your vocal parameters below to predict the likelihood of Parkinson's disease.</p>
      </header>

      <form className="parkinson-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fo">Fundamental Frequency (Fo)</label>
            <input
              type="number"
              id="fo"
              name="fo"
              placeholder="e.g., 150"
              value={formData.fo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fhi">Highest Frequency (Fhi)</label>
            <input
              type="number"
              id="fhi"
              name="fhi"
              placeholder="e.g., 200"
              value={formData.fhi}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="flo">Lowest Frequency (Flo)</label>
            <input
              type="number"
              id="flo"
              name="flo"
              placeholder="e.g., 80"
              value={formData.flo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Jitter_percent">
              Jitter (%) <span title="Variation in fundamental frequency">ℹ️</span>
            </label>
            <input
              type="number"
              id="Jitter_percent"
              name="Jitter_percent"
              placeholder="e.g., 0.005"
              value={formData.Jitter_percent}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Jitter_Abs">Absolute Jitter (Abs)</label>
            <input
              type="number"
              id="Jitter_Abs"
              name="Jitter_Abs"
              placeholder="e.g., 0.00005"
              value={formData.Jitter_Abs}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="RAP">Relative Average Perturbation (RAP)</label>
            <input
              type="number"
              id="RAP"
              name="RAP"
              placeholder="e.g., 0.001"
              value={formData.RAP}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="PPQ">Pitch Period Perturbation Quotient (PPQ)</label>
            <input
              type="number"
              id="PPQ"
              name="PPQ"
              placeholder="e.g., 0.002"
              value={formData.PPQ}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="DDA">Degree of Jitter (DDA)</label>
            <input
              type="number"
              id="DDA"
              name="DDA"
              placeholder="e.g., 0.005"
              value={formData.DDA}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Shimmer">Shimmer (Amplitude Variation)</label>
            <input
              type="number"
              id="Shimmer"
              name="Shimmer"
              placeholder="e.g., 0.01"
              value={formData.Shimmer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="HNR">Harmonics-to-Noise Ratio (HNR)</label>
            <input
              type="number"
              id="HNR"
              name="HNR"
              placeholder="e.g., 20"
              value={formData.HNR}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="spread1">Vocal Spread 1</label>
            <input
              type="number"
              id="spread1"
              name="spread1"
              placeholder="e.g., -5"
              value={formData.spread1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="spread2">Vocal Spread 2</label>
            <input
              type="number"
              id="spread2"
              name="spread2"
              placeholder="e.g., 3"
              value={formData.spread2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="PPE">Pitch Period Entropy (PPE)</label>
            <input
              type="number"
              id="PPE"
              name="PPE"
              placeholder="e.g., 0.5"
              value={formData.PPE}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="parkinson-submit-btn" disabled={loading}>
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

export default PredictParkinsonDisease;
