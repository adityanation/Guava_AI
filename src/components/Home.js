import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, Zap, Shield, Hexagon, Apple } from "lucide-react";
import "./Home.css";
import ChatBot from "./Chatbot";

const HomePage = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <div className="futuristic-container">
      {/* Animated background elements */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Floating hexagons */}
      <div className="hexagon-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`floating-hexagon hex-${i}`}></div>
        ))}
      </div>

      {/* Header Section */}
      <header className="neo-header">
        <div className="header-content">
          <div className="logo-container">
            <Hexagon className="logo-icon" />
            <h2 className="header-title">GuavaVision <span className="highlight">AI</span></h2>
          </div>
          <nav className="nav-links">
            <Link to="/game" className="nav-link">wanna play ?</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/article" className="nav-link">Articles</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Next-Gen <span className="highlight">Guava Disease</span> Detection
          </h1>
          <div className="glowing-line"></div>
          <p className="hero-description">
            Advanced AI technology to identify and analyze guava diseases with precision and speed.
            Simply upload an image for instant detection results.
          </p>
          <div className="button-container">
            <button 
              onClick={handleUploadClick}
              className="upload-button"
            >
              <Upload size={18} />
              <span>Upload Image</span>
              <div className="button-glow"></div>
            </button>
            <a href="#features" className="learn-more-button">
              <span>Explore Features</span>
              <Zap size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="tech-circle">
            <div className="circle-content">
              <Apple size={40} className="atom-icon" />
            </div>
            <div className="orbit orbit1"></div>
            <div className="orbit orbit2"></div>
            <div className="orbit orbit3"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Elite <span className="highlight">Features</span></h2>
          <div className="features-grid">
            {[
              { 
                icon: <Zap className="feature-icon" size={28} />, 
                title: "Ultra-Fast Analysis", 
                description: "Neural network processing delivers results in seconds with 99.8% accuracy." 
              },
              { 
                icon: <Shield className="feature-icon" size={28} />, 
                title: "Advanced Detection", 
                description: "Identifies multiple disease variants including anthracnose and bacterial wilt." 
              },
              { 
                icon: <Hexagon className="feature-icon" size={28} />, 
                title: "Treatment Matrix", 
                description: "AI-generated treatment protocols specific to the detected condition." 
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="neo-footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>GuavaVision <span className="highlight">AI</span></h3>
            <p>Revolutionizing agricultural technology with advanced computer vision.</p>
          </div>
          <div className="footer-divider"></div>
          <p className="copyright">© 2025 GuavaVision AI. All rights reserved.</p>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default HomePage;
