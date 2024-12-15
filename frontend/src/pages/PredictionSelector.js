
import React from 'react';
import { Link } from 'react-router-dom';
import './PredictionSelector.css';

const diseases = [
  { name: 'Heart Disease', path: '/predict/heart', image: '/images/heart.jpg' },
  { name: 'Diabetes', path: '/predict/diabetes', image: '/images/diabetes.jpg' },
  { name: 'Parkinson', path: '/predict/parkinson', image: '/images/parkinson.jpg' },
  { name: 'Kidney Disease', path: '/predict/kidney', image: '/images/kidney.jpg' },
  { name: 'Brain Tumor', path: '/predict/braintumor', image: '/images/brain tumor.jpg' },
  { name: 'Pneumonia', path: '/predict/pneumonia', image: '/images/pneumonia.jpg' },
];

const PredictionSelector = () => {
  return (
    <div className="selector-container">
      <header className="about-header">
        <h1>Select a Disease Prediction</h1>
      </header>
      <div className="card-container">
        {diseases.map((disease) => (
          <div className="card" key={disease.name}>
            {/* Image Container */}
            <div className="card-image-container">
              <img src={disease.image} alt={disease.name} className="card-image" />
            </div>

            {/* Sliding Pop-up */}
            <div className="card-hover-info">
              <h2>{disease.name}</h2>
              <Link to={disease.path}>
                <button className="card-button">Predict</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionSelector;

