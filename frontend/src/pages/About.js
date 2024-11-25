import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About Us</h1>
        <p>
          Welcome to our healthcare prediction platform! We provide AI-powered solutions 
          to predict the following diseases:<br/> 
          <strong> Heart Disease, Diabetes, Kidney Disease, Parkinson's Disease, Brain Tumor,</strong> and <strong>Pneumonia</strong>.
        </p>
        <p>
          Our platform also features an inbuilt chatbot, <strong>DocTalk</strong>, to help clients 
          with their queries and provide instant assistance.
        </p>
      </header>

      {/* Team Section */}
      <section className="team-section">
      <h2>Meet Our Developers</h2>
<div className="team-cards">
  <div className="team-card">
    <img src="/images/kris.jpg" alt="Kris Gautam" />
    <h3>Kris Gautam</h3>
    <p>Full-Stack Developer</p>
    <p>
      Kris spearheaded the development of the application, handling everything from core programming to frontend and backend architecture. His dedication and expertise ensured seamless functionality and an excellent user experience.
    </p>
  </div>
  <div className="team-card">
    <img src="/images/Ayesha.jpeg" alt="Ayesha Yadav" />
    <h3>Ayesha Yadav</h3>
    <p>AI Specialist</p>
    <p>
      Ayesha contributed innovative ideas and insights for integrating AI-powered features into the application, enriching its capabilities and enhancing its modern appeal.
    </p>
  </div>
  <div className="team-card">
    <img src="/images/Pawan.jpeg" alt="Pawan Yadav" />
    <h3>Pawan Yadav</h3>
    <p>Backend Developer</p>
    <p>
      Pawan provided support in backend architecture, contributing to the stability and scalability of the application with their problem-solving approach.
    </p>
  </div>
</div>

      </section>
    </div>
  );
};

export default About;
