import React, { useState, useEffect, useRef, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import GameOver from './GameOver';
import Score from './Score';
import StartScreen from './StartScreen';
import './Game.css';

// Game constants
const GRAVITY = 0.6;
const JUMP_STRENGTH = -10;
const PIPE_WIDTH = 60;
const PIPE_GAP = 180;
const PIPE_SPEED = 3;
const BIRD_SIZE = 40;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_X = 80;
const PIPE_SPAWN_RATE = 1500; // milliseconds

const Game = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('flappyHighScore') || '0')
  );

  const gameLoopRef = useRef();
  const pipeGeneratorRef = useRef();
  const gameAreaRef = useRef();

  // Generate new pipe
  const generatePipe = useCallback(() => {
    const minHeight = 100;
    const maxHeight = GAME_HEIGHT - PIPE_GAP - 100;
    const height = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

    return {
      id: Date.now(),
      x: GAME_WIDTH,
      topHeight: height,
      bottomY: height + PIPE_GAP,
      passed: false
    };
  }, []);

  // Handle jump
  const handleJump = useCallback(() => {
    if (gameState === 'playing') {
      setVelocity(JUMP_STRENGTH);
    } else if (gameState === 'start') {
      startGame();
    } else if (gameState === 'gameOver') {
      resetGame();
    }
  }, [gameState]);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setBirdY(GAME_HEIGHT / 2);
    setVelocity(0);
    setPipes([generatePipe()]);
    setScore(0);
  };

  // Reset game
  const resetGame = () => {
    setGameState('start');
    setBirdY(GAME_HEIGHT / 2);
    setVelocity(0);
    setPipes([]);
    setScore(0);
  };

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(() => {
        // Update bird position
        setBirdY(prevY => {
          const newY = prevY + velocity;

          // Check boundaries
          if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
            setGameState('gameOver');
            return prevY;
          }

          return newY;
        });

        // Update velocity
        setVelocity(prev => prev + GRAVITY);

        // Update pipes
        setPipes(prevPipes => {
          return prevPipes
            .map(pipe => ({
              ...pipe,
              x: pipe.x - PIPE_SPEED
            }))
            .filter(pipe => pipe.x > -PIPE_WIDTH);
        });

        // Check collisions and update score
        setPipes(prevPipes => {
          return prevPipes.map(pipe => {
            // Check if bird passed the pipe
            if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
              setScore(prev => {
                const newScore = prev + 1;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  localStorage.setItem('flappyHighScore', newScore.toString());
                }
                return newScore;
              });
              return { ...pipe, passed: true };
            }

            // Check collision
            if (
              BIRD_X + BIRD_SIZE > pipe.x &&
              BIRD_X < pipe.x + PIPE_WIDTH &&
              (birdY < pipe.topHeight || birdY + BIRD_SIZE > pipe.bottomY)
            ) {
              setGameState('gameOver');
            }

            return pipe;
          });
        });
      }, 1000 / 60); // 60 FPS

      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameState, velocity, birdY, highScore]);

  // Pipe generator
  useEffect(() => {
    if (gameState === 'playing') {
      pipeGeneratorRef.current = setInterval(() => {
        setPipes(prev => [...prev, generatePipe()]);
      }, PIPE_SPAWN_RATE);

      return () => clearInterval(pipeGeneratorRef.current);
    }
  }, [gameState, generatePipe]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  // Handle mouse/touch input
  const handleGameClick = () => {
    handleJump();
  };

  return (
    <div className="game-container">
      <Score score={score} highScore={highScore} />

      <div
        ref={gameAreaRef}
        className="game-area"
        onClick={handleGameClick}
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* Background elements */}
        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
        </div>

        {/* Game elements */}
        {gameState !== 'start' && (
          <>
            <Bird
              y={birdY}
              x={BIRD_X}
              size={BIRD_SIZE}
              rotation={Math.min(Math.max(velocity * 3, -45), 45)}
            />

            {pipes.map(pipe => (
              <Pipe
                key={pipe.id}
                x={pipe.x}
                topHeight={pipe.topHeight}
                bottomY={pipe.bottomY}
                width={PIPE_WIDTH}
                gameHeight={GAME_HEIGHT}
              />
            ))}
          </>
        )}

        {/* UI Overlays */}
        {gameState === 'start' && <StartScreen />}
        {gameState === 'gameOver' && (
          <GameOver
            score={score}
            highScore={highScore}
            onRestart={resetGame}
          />
        )}
      </div>

      <div className="instructions">
        {gameState === 'playing' && "Press SPACE or Click to Jump"}
      </div>
    </div>
  );
};

export default Game;