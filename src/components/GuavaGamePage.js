
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Zap, Gamepad, ArrowLeft, RotateCcw } from "lucide-react";
import "./GuavaGamePage.css";

const GuavaGamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [guavas, setGuavas] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Generate a random position within the game bounds
  const generateRandomPosition = () => {
    const gameArea = document.querySelector(".game-area");
    if (!gameArea) return { top: 0, left: 0 };
    
    const maxWidth = gameArea.clientWidth - 60;
    const maxHeight = gameArea.clientHeight - 60;
    
    return {
      top: Math.floor(Math.random() * maxHeight),
      left: Math.floor(Math.random() * maxWidth),
    };
  };

  // Add a new guava to the game
  const addNewGuava = () => {
    if (guavas.length >= 5) return; // Limit number of guavas on screen
    
    const position = generateRandomPosition();
    const newGuava = {
      id: Date.now(),
      position,
      type: Math.random() > 0.3 ? "healthy" : "diseased", // 70% chance of healthy guava
    };
    
    setGuavas(prevGuavas => [...prevGuavas, newGuava]);
    
    // Remove guava after some time if not clicked
    setTimeout(() => {
      setGuavas(prevGuavas => prevGuavas.filter(g => g.id !== newGuava.id));
    }, 3000);
  };

  // Handle clicking on a guava
  const handleGuavaClick = (id, type) => {
    // Remove the clicked guava
    setGuavas(prevGuavas => prevGuavas.filter(g => g.id !== id));
    
    // Update score based on type
    if (type === "healthy") {
      setScore(prevScore => prevScore + 10);
    } else {
      setScore(prevScore => Math.max(0, prevScore - 5));
    }
  };

  // Start a new game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGuavas([]);
    setGameOver(false);
  };

  // Reset the game
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setGuavas([]);
  };

  // Game timer and guava generation
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Add new guavas periodically
    const guavaInterval = setInterval(() => {
      addNewGuava();
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(guavaInterval);
    };
  }, [gameStarted, gameOver]);

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
            <Link to="/" className="back-button">
              <ArrowLeft className="back-icon" />
              <span>Back to Home</span>
            </Link>
          </div>
          <h2 className="header-title">GuavaVision <span className="highlight">Game</span></h2>
        </div>
      </header>

      <div className="game-section">
        <div className="game-content">
          <h1 className="game-title">
            <Gamepad className="icon-inline" /> Guava <span className="highlight">Collector</span>
          </h1>
          <div className="glowing-line"></div>
          <p className="game-description">
            Click on healthy guavas to score points! Avoid diseased ones. You have 30 seconds!
          </p>
          
          {!gameStarted && !gameOver && (
            <div className="game-intro">
              <div className="game-rules">
                <h3>How to Play:</h3>
                <ul>
                  <li>✅ Click on <span className="healthy-text">healthy guavas</span> to earn 10 points</li>
                  <li>❌ Avoid <span className="diseased-text">diseased guavas</span> or lose 5 points</li>
                  <li>⏱️ You have 30 seconds to collect as many as possible</li>
                </ul>
              </div>
              <button className="start-button" onClick={startGame}>
                <Zap size={18} />
                <span>Start Game</span>
                <div className="button-glow"></div>
              </button>
            </div>
          )}
          
          {gameStarted && !gameOver && (
            <div className="game-container">
              <div className="game-stats">
                <div className="stat-item">
                  <Trophy /> Score: <span className="highlight">{score}</span>
                </div>
                <div className="stat-item">
                  <Zap /> Time: <span className={timeLeft <= 10 ? "time-warning" : ""}>{timeLeft}s</span>
                </div>
              </div>
              
              <div className="game-area">
                {guavas.map(guava => (
                  <div
                    key={guava.id}
                    className={`guava ${guava.type}`}
                    style={{
                      top: `${guava.position.top}px`,
                      left: `${guava.position.left}px`
                    }}
                    onClick={() => handleGuavaClick(guava.id, guava.type)}
                  />
                ))}
              </div>
            </div>
          )}
          
          {gameOver && (
            <div className="game-over">
              <h2>Game Over!</h2>
              <p>Your final score: <span className="highlight">{score}</span></p>
              
              <div className="game-over-actions">
                <button className="play-again-button" onClick={startGame}>
                  <RotateCcw size={18} />
                  <span>Play Again</span>
                </button>
                <button className="home-button" onClick={resetGame}>
                  <Gamepad size={18} />
                  <span>Main Menu</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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

export default GuavaGamePage;
