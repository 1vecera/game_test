import React from 'react';
import './Score.css';

const Score = ({ score, highScore }) => {
  return (
    <div className="score-container">
      <div className="score-item">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Best</span>
        <span className="score-value">{highScore}</span>
      </div>
    </div>
  );
};

export default Score;