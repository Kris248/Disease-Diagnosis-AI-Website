import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect } from "react";

const Navbar = () => {
  useEffect(() => {
    const cursorLine = document.createElement("div");
    cursorLine.classList.add("cursor-line");
    document.body.appendChild(cursorLine);

    const handleMouseMove = (e) => {
      cursorLine.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    };

    // Add event listener for mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(cursorLine);
    };
  }, []);

  return (
    <div className="navbar-card">
      <div className="nav-links">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/doctalk" className="nav-button">
          DocTalk
        </Link>
        <Link to="/predict" className="nav-button">
          Ai Disease Prediction
        </Link>
        <Link to="/documentation" className="nav-button">
          Documentation
        </Link>
        <Link to="/about" className="nav-button">
          About Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
