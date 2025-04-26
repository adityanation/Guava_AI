
import React from 'react';
import { BookOpen, Bug, Microscope } from "lucide-react";
import "./ArticlesPage.css";

const ArticlesPage = () => {
  return (
    <div className="futuristic-container">
      {/* Wave animations */}
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Hexagon particles */}
      <div className="hexagon-container">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={`floating-hexagon hex-${index}`}></div>
        ))}
      </div>

      {/* Header Section */}
      <header className="neo-header">
        <div className="header-content">
          <div className="logo-container">
            <BookOpen className="logo-icon" />
            <h2 className="header-title">Articles <span className="highlight">Hub</span></h2>
          </div>
          <nav className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/game" className="nav-link">Game</a>
            <a href="/about" className="nav-link">About</a>
          </nav>
        </div>
      </header>

      <section className="articles-section">
        <div className="articles-content">
          <h1 className="articles-title">Guava Disease Guide</h1>
          <div className="glowing-line"></div>
          
          {/* Anthracnose Article */}
          <div className="article-card">
            <div className="article-header">
              <Microscope className="article-icon" />
              <h2>Anthracnose Disease</h2>
            </div>
            <div className="article-content">
              <p>
                Anthracnose is a serious fungal disease that affects guava fruits and leaves.
                The disease is caused by Colletotrichum gloeosporioides and can lead to significant crop losses.
              </p>
              <h3>Symptoms</h3>
              <ul>
                <li>Dark, sunken lesions on fruits</li>
                <li>Brown spots on leaves</li>
                <li>Premature fruit drop</li>
                <li>Blackening of young shoots</li>
              </ul>
              <h3>Prevention & Control</h3>
              <ul>
                <li>Regular pruning to improve air circulation</li>
                <li>Proper spacing between trees</li>
                <li>Fungicide application during flowering</li>
                <li>Remove infected plant parts</li>
              </ul>
            </div>
          </div>

          {/* Fruit Fly Article */}
          <div className="article-card">
            <div className="article-header">
              <Bug className="article-icon" />
              <h2>Fruit Fly Infestation</h2>
            </div>
            <div className="article-content">
              <p>
                Fruit flies are one of the most destructive pests affecting guava production.
                They lay eggs in ripening fruits, leading to maggot infestation and fruit rot.
              </p>
              <h3>Symptoms</h3>
              <ul>
                <li>Tiny puncture marks on fruit surface</li>
                <li>Premature fruit ripening</li>
                <li>Fruit decay and dropping</li>
                <li>Presence of maggots inside fruits</li>
              </ul>
              <h3>Prevention & Control</h3>
              <ul>
                <li>Use of fruit fly traps</li>
                <li>Regular orchard sanitation</li>
                <li>Bagging of fruits</li>
                <li>Chemical control when necessary</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="neo-footer">
        <div className="footer-content">
          <div className="footer-text">
            <h3>Stay Informed</h3>
            <p>Learn more about guava diseases and their management techniques.</p>
          </div>
          <div className="footer-divider"></div>
          <p className="copyright">© 2025 GuavaVision AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticlesPage;
