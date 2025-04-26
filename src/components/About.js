
import React from "react";
import { Link } from "react-router-dom";
import { Hexagon, Atom } from "lucide-react";
import "./About.css";

const AboutPage = () => {
  // Sample team member data - replace with actual images when available
  const teamMembers = [
    {
      name: "Muhriz Khan",
      role: "ML and Backend Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQE2n6NluYKPdA/profile-displayphoto-shrink_800_800/B56ZZEly8.GcAc-/0/1744907482751?e=1750896000&v=beta&t=h4nzl8ZsK6Bg1N5V51ph3jkUNUTZkxtXvsA01qCp8AU"
    },
    {
      name: "Hari Balaji",
      role: "ML and React Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEmgn1cLDHB_w/profile-displayphoto-shrink_800_800/B56ZZEqCKEHQAc-/0/1744908593018?e=1750896000&v=beta&t=cpckf19saRV3SRArs1RBI4a3eiB1RwFRBeXTaGQ2tks"
    }
  ];

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
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/upload" className="nav-link">Upload</Link>
          </nav>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-header">
            <h1 className="about-title">About <span className="highlight">GuavaVision AI</span></h1>
            <div className="glowing-line"></div>
          </div>
          
          <div className="about-card">
            <div className="mission-vision">
              <div className="mission-container">
                <h2 className="section-subtitle">Our Mission</h2>
                <p className="about-text">
                  GuavaVision AI is dedicated to revolutionizing agricultural disease detection through cutting-edge artificial intelligence. 
                  Our advanced neural networks can identify guava diseases like <span className="highlight">Anthracnose</span> and 
                  <span className="highlight"> Fruit Fly</span> infestations with unprecedented accuracy and speed.
                </p>
              </div>
              
              <div className="tech-circle about-visual">
                <div className="circle-content">
                  <Atom size={40} className="atom-icon" />
                </div>
                <div className="orbit orbit1"></div>
                <div className="orbit orbit2"></div>
                <div className="orbit orbit3"></div>
              </div>
            </div>
            
            <div className="about-detail">
              <p className="about-text">
                Our AI model is trained on thousands of high-resolution images across diverse environmental conditions,
                enabling it to achieve 99.8% accuracy in disease identification. We aim to make disease detection
                <span className="highlight"> easy, fast, and accessible</span> for farmers, researchers, and agricultural specialists worldwide.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2 className="section-subtitle">The <span className="highlight">Team</span></h2>
            <div className="glowing-line small"></div>
            
            <div className="team-container">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-image-container">
                    <img src={member.image} alt={member.name} className="team-image" />
                    <div className="image-glow"></div>
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="card-glow"></div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default AboutPage;
