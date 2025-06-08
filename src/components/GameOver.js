import React from 'react';
import './GameOver.css';

const GameOver = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h2 className="game-over-title">Game Over!</h2>

        {isNewHighScore && (
          <div className="new-high-score">
            🏆 NEW HIGH SCORE! 🏆
          </div>
        )}

        <div className="final-scores">
          <div className="score-display">
            <span className="score-label">Score</span>
            <span className="score-number">{score}</span>
          </div>
          <div className="score-display">
            <span className="score-label">Best</span>
            <span className="score-number best">{highScore}</span>
          </div>
        </div>

        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>

        <p className="restart-hint">
          or press <span className="key-hint">SPACE</span>
        </p>
      </div>
    </div>
  );
};

export default GameOver;