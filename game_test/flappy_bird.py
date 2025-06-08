import streamlit as st
import time
import random

# --- Constants ---
GRAVITY = 0.5
JUMP_STRENGTH = -8
PIPE_WIDTH = 50
PIPE_GAP = 150
PIPE_SPEED = 3
BIRD_WIDTH = 30
BIRD_HEIGHT = 30
SCREEN_HEIGHT = 500
BIRD_X = 50

# --- Game Functions ---

def initialize_game():
    """Initializes the game state."""
    if 'bird_y' not in st.session_state:
        st.session_state.bird_y = 250
        st.session_state.velocity = 0
        st.session_state.score = 0
        st.session_state.game_over = False
        st.session_state.pipes = [[400, random.randint(100, 400 - PIPE_GAP), False]]

def restart_game():
    """Resets the game to its initial state."""
    st.session_state.bird_y = 250
    st.session_state.velocity = 0
    st.session_state.score = 0
    st.session_state.game_over = False
    st.session_state.pipes = [[400, random.randint(100, 400 - PIPE_GAP), False]]
    st.rerun()

def handle_input():
    """Handles user input."""
    col1, col2, col3 = st.columns([1, 1, 1])
    with col2:
        if st.button("🔼 Jump", key="jump", use_container_width=True):
            if not st.session_state.game_over:
                st.session_state.velocity = JUMP_STRENGTH

def update_game_logic():
    """Updates the game state for each frame."""
    if st.session_state.game_over:
        return

    # Update bird physics
    st.session_state.velocity += GRAVITY
    st.session_state.bird_y += st.session_state.velocity

    # Update pipes
    for pipe in st.session_state.pipes:
        pipe[0] -= PIPE_SPEED

    # Remove off-screen pipes
    st.session_state.pipes = [p for p in st.session_state.pipes if p[0] > -PIPE_WIDTH]

    # Add new pipes
    if len(st.session_state.pipes) == 0 or st.session_state.pipes[-1][0] < 250:
        st.session_state.pipes.append([400, random.randint(100, 400 - PIPE_GAP), False])

    # Check for collisions and update score
    for pipe in st.session_state.pipes:
        pipe_x, pipe_y, passed = pipe

        # Collision detection
        if BIRD_X + BIRD_WIDTH > pipe_x and BIRD_X < pipe_x + PIPE_WIDTH:
            if st.session_state.bird_y < pipe_y or st.session_state.bird_y + BIRD_HEIGHT > pipe_y + PIPE_GAP:
                st.session_state.game_over = True
                return

        # Score update
        if not passed and pipe_x + PIPE_WIDTH < BIRD_X:
            st.session_state.score += 1
            pipe[2] = True

    # Check boundaries
    if not (0 < st.session_state.bird_y < SCREEN_HEIGHT - BIRD_HEIGHT):
        st.session_state.game_over = True

def render_game():
    """Renders the game on the screen."""
    game_container = st.container()
    with game_container:
        st.markdown(f"### Score: {st.session_state.score}")

        game_html = f"""
        <div style="position: relative; width: 400px; height: {SCREEN_HEIGHT}px; border: 2px solid black; background: skyblue; overflow: hidden;">
            <div style="position: absolute; left: {BIRD_X}px; top: {st.session_state.bird_y}px;
                        width: {BIRD_WIDTH}px; height: {BIRD_HEIGHT}px; background: yellow; border-radius: 50%;
                        border: 2px solid orange;"></div>
            {"".join([f'''
            <div style="position: absolute; left: {p[0]}px; top: 0px;
                        width: {PIPE_WIDTH}px; height: {p[1]}px; background: green;"></div>
            <div style="position: absolute; left: {p[0]}px; top: {p[1] + PIPE_GAP}px;
                        width: {PIPE_WIDTH}px; height: {SCREEN_HEIGHT - p[1] - PIPE_GAP}px; background: green;"></div>
            ''' for p in st.session_state.pipes])}
        </div>
        """
        st.markdown(game_html, unsafe_allow_html=True)

        if st.session_state.game_over:
            st.error(f"Game Over! Final Score: {st.session_state.score}")
            if st.button("Restart Game"):
                restart_game()

# --- Main Game Loop ---

initialize_game()
handle_input()
update_game_logic()
render_game()

if not st.session_state.game_over:
    time.sleep(0.05)
    st.rerun()
