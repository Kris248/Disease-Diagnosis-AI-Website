import React from "react";
import "./Documentation.css";

const Documentation = () => {
  const libraries = [
    {
      name: "os",
      description:
        "Provides functions to interact with the operating system, such as file and directory manipulation.",
      link: "https://docs.python.org/3/library/os.html",
    },
    {
      name: "pickle",
      description:
        "Used for serializing and deserializing Python objects, useful for saving machine learning models.",
      link: "https://docs.python.org/3/library/pickle.html",
    },
    {
      name: "numpy",
      description:
        "A powerful library for numerical operations and handling large, multi-dimensional arrays and matrices.",
      link: "https://numpy.org/doc/",
    },
    {
      name: "tensorflow",
      description:
        "An open-source framework for machine learning and deep learning, supporting various neural network architectures.",
      link: "https://www.tensorflow.org/",
    },
    {
      name: "Flask",
      description:
        "A lightweight Python framework for building web applications and APIs.",
      link: "https://flask.palletsprojects.com/",
    },
    {
      name: "Flask-CORS",
      description:
        "Enables Cross-Origin Resource Sharing (CORS) for Flask applications, allowing secure communication between different domains.",
      link: "https://flask-cors.readthedocs.io/en/latest/",
    },
    {
      name: "scikit-learn",
      description:
        "A popular machine learning library providing tools for data analysis, classification, regression, and clustering.",
      link: "https://scikit-learn.org/stable/",
    },
    {
      name: "Streamlit",
      description:
        "A framework for creating interactive web applications to visualize and share machine learning models and data.",
      link: "https://streamlit.io/",
    },
    {
      name: "Streamlit-Option-Menu",
      description:
        "An extension to Streamlit, providing customizable menu navigation options for Streamlit apps.",
      link: "https://pypi.org/project/streamlit-option-menu/",
    },
    {
      name: "pandas",
      description:
        "A data analysis and manipulation library that provides data structures like DataFrames for handling structured data.",
      link: "https://pandas.pydata.org/docs/",
    },
    {
      name: "joblib",
      description:
        "Efficiently saves and loads large data structures, often used for saving machine learning models.",
      link: "https://joblib.readthedocs.io/en/latest/",
    },
    {
      name: "React",
      description:
        "A JavaScript library for building user interfaces, particularly single-page applications (SPAs).",
      link: "https://reactjs.org/docs/getting-started.html",
    },
  ];

  return (
    <div className="documentation-page">
      <h1>Project Documentation</h1>
      <p>
        This project leverages various technologies and libraries to build a
        robust system. Here is a comprehensive list:
      </p>
      <ul className="library-list">
        {libraries.map((lib, index) => (
          <li key={index} className="library-item">
            <h2>{lib.name}</h2>
            <p>{lib.description}</p>
            <a href={lib.link} target="_blank" rel="noopener noreferrer">
              Official Documentation ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documentation;
