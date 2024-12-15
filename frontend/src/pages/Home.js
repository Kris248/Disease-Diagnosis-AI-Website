import React, { useEffect, useState } from 'react';
import { playNarration } from './Narrator';  // Import the function
import './Home.css';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Play narration every time the page reloads or mounts
    playNarration(
     "Welcome to VitalCare AI! At VitalCare, we combine the power of advanced artificial intelligence with healthcare expertise to provide you with accurate health predictions and personalized insights. Discover our innovative tools for disease detection, connect with AI-powered doctors, and take control of your well-being. Together, let's embark on a journey towards a healthier future!",
      0.9,  // Speech speed
      1     // Pitch
    );

    return () => window.speechSynthesis.cancel(); // Cleanup on unmount
  }, []); // Empty dependency array ensures it runs only when component mounts

  return (
    <div className="home">
      {/* Video Background */}
      <video
        className="background-video"
        src="/video/video2.mp4"
        autoPlay
        loop
        muted
      />

      {/* Content Overlay */}
      <div className="content">
        <h1
          className={`home-title ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Welcome to <span>VitalCare!</span>
        </h1>
        <p className="home-description">
          Your one-stop platform for health predictions and AI-powered assistance.
        </p>
        <button className="home-button">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
