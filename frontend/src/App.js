import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Layout/Navbar';
import Home from './pages/Home';
import PredictKidney from './pages/Disease Predict/Kidney'
import PredictHeart from './pages/Disease Predict/Heart'
import PredictDiabetes from './pages/Disease Predict/Diabetes'
import PredictPneumonia from './pages/Disease Predict/Pneumonia'
import PredictParkinson from './pages/Disease Predict/Parkinson'
import PredictBrainTumor from './pages/Disease Predict/BrainTumor'
import Documentation from './pages/Documentation'
import DocTalk from './pages/DocTalk';
import About from './pages/About';
import Footer from './Layout/Footer';
import PredictionSelector from './pages/PredictionSelector';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictionSelector />} />
        <Route path="/predict/heart" element={<PredictHeart />} />
        <Route path="/predict/diabetes" element={<PredictDiabetes />} />
        <Route path="/predict/parkinson" element={<PredictParkinson />} />
        <Route path="/predict/braintumor" element={<PredictBrainTumor />} />
        <Route path="/predict/kidney" element={<PredictKidney />} />
        <Route path="/predict/pneumonia" element={<PredictPneumonia />} />
        <Route path="/doctalk" element={<DocTalk />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
