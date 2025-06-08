# Flappy Bird React

A modern, beautifully styled Flappy Bird game built with React. Features smooth animations, responsive controls, and persistent high score tracking.

## Features

- 🎮 Smooth 60 FPS gameplay
- 🎨 Beautiful modern UI with gradient backgrounds and animations
- 🏆 High score tracking with local storage persistence
- ⌨️ Keyboard controls (Space bar)
- 🖱️ Mouse/touch controls
- 📱 Responsive design
- ✨ Animated bird with flapping wings
- 🌤️ Animated cloud backgrounds
- 🎯 Collision detection
- 🔄 Instant restart functionality

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd game_test
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to play the game.

## How to Play

1. Press **SPACE** or **CLICK** to start the game
2. Press **SPACE** or **CLICK** to make the bird jump
3. Avoid hitting the pipes or the ground
4. Try to beat your high score!

## Game Controls

- **Space Bar**: Jump / Start / Restart
- **Mouse Click**: Jump / Start / Restart

## Technologies Used

- React 18
- CSS3 with animations
- Local Storage for high score persistence

## Project Structure

```
src/
├── components/
│   ├── Game.js          # Main game logic and state management
│   ├── Bird.js          # Bird component with animations
│   ├── Pipe.js          # Pipe obstacles
│   ├── Score.js         # Score display
│   ├── StartScreen.js   # Start screen overlay
│   └── GameOver.js      # Game over screen
├── App.js               # Main app component
└── index.js             # Entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## License

This project is open source and available under the MIT License.