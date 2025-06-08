import React from 'react';
import './StartScreen.css';

const StartScreen = () => {
  return (
    <div className="start-screen">
      <h1 className="game-title">Flappy Bird</h1>
      <div className="start-instructions">
        <p>Press <span className="key">SPACE</span> or <span className="key">CLICK</span> to start</p>
        <div className="controls">
          <div className="control-item">
            <span className="icon">🖱️</span>
            <span>Click to jump</span>
          </div>
          <div className="control-item">
            <span className="icon">⌨️</span>
            <span>Space to jump</span>
          </div>
        </div>
      </div>
      <div className="bird-preview">
        <div className="preview-bird">
          <div className="preview-eye"></div>
          <div className="preview-beak"></div>
          <div className="preview-wing"></div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;