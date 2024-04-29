"use client"
import Section from '../reusableComponents/sectionsAndElements/Section';
import SmallScreenSection from '../reusableComponents/sectionsAndElements/SmallScreenSection';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import TypewriterEffect from '../reusableComponents/TypewriterEffect';

export default function Game() {
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [gameActive, setGameActive] = useState(false); // State to track if the game is active
  const canvasRef = useRef(null); // Reference to the canvas element
  const requestRef = useRef(); // Reference to the requestAnimationFrame
  const isJumpingRef = useRef(false); // Reference to check if the player is jumping
  const squareYRef = useRef(); // Reference to the player's Y position
  const obstaclesRef = useRef([]); // Reference to store obstacles
  const rotationRef = useRef(0); // Reference to store rotation angle
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false }); // Hook to detect if the canvas is in view
  const playerSize = 40; // Increase the player size
  
  useEffect(() => {
    // Reset game state and timer when the game comes into view
    if (inView) {
      setGameActive(true); // Start the game
      setTimer(0); // Reset timer
      obstaclesRef.current = []; // Clear obstacles
    } else {
      setGameActive(false); // Pause the game
    }
  }, [inView]);
  
  useEffect(() => {
    // Update the timer every second if the game is active
    if (!gameActive) return;
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1); // Increment the timer every second
    }, 1000);
    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [gameActive]);

  useEffect(() => {
    // Initialize canvas and game logic when the game is active
    if (!gameActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // Get the 2D rendering context

    function resizeCanvas() {
      const parentWidth = canvas.parentElement.clientWidth;
      const parentHeight = canvas.parentElement.clientHeight;
    
      // Calculate aspect ratio
      const aspectRatio = canvas.width / canvas.height;
    
      // Adjust canvas height while maintaining aspect ratio
      canvas.height = parentWidth / aspectRatio;
    
      // Ensure canvas width matches parent width
      canvas.width = parentWidth;
    }    
  
    // Call the resizeCanvas() function whenever the window is resized
    window.addEventListener('resize', resizeCanvas);
    
    // Initial call to set canvas size
    resizeCanvas();

    const groundY = canvas.height - 20; // Y position of the ground
    squareYRef.current = groundY; // Set the initial Y position of the player
    let velocity = 0; // Initial velocity of the player

    const spawnObstacle = () => {
      // Function to spawn obstacles
      const minHeight = 40; // Minimum height of the obstacle
      const maxHeight = 100; // Maximum height of the obstacle
      const height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight); // Random height within the range

      obstaclesRef.current.push({
        x: canvas.width,
        y: canvas.height - height, // Adjust y so the obstacle is grounded
        width: 20,
        height: height,
      });
    };

    const jump = () => {
      // Function to handle player jumping
      if (isJumpingRef.current) return; // If already jumping, return
      isJumpingRef.current = true; // Set jumping flag
      velocity = -10; // Set initial jump velocity
    };

    const updateObstacles = () => {
      // Function to update obstacle positions
      obstaclesRef.current.forEach(obstacle => obstacle.x -= 3); // Move obstacles to the left
      obstaclesRef.current = obstaclesRef.current.filter(obstacle => obstacle.x + obstacle.width > 0); // Remove obstacles that are out of view
    };

    const update = () => {
      // Function to update game state and draw elements on the canvas
      if (!gameActive) return; // If game is not active, return
      if (isJumpingRef.current) {
        squareYRef.current += velocity; // Update player's Y position based on velocity
        velocity += 0.5; // Apply gravity
        rotationRef.current += 10; // Increment rotation angle when jumping
        if (squareYRef.current > groundY) {
          // If player lands on the ground
          squareYRef.current = groundY; // Set player's Y position to ground level
          isJumpingRef.current = false; // Reset jumping flag
          rotationRef.current = 0; // Reset rotation when landing
        }
      }
    
      updateObstacles(); // Update obstacle positions
    
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
      // Set the rotation point to the center of the square and rotate
      ctx.save(); // Save the current state
      ctx.translate(50 + 10, squareYRef.current + 10); // Translate to the center of the square
      ctx.rotate((Math.PI / 180) * rotationRef.current); // Rotate
      ctx.fillStyle = '#407dbf';
      ctx.fillRect(-playerSize / 2, -playerSize / 2, playerSize, playerSize); // Draw the square centered on the origin
      ctx.restore(); // Restore the state
    
      obstaclesRef.current.forEach(obstacle => {
        // Draw obstacles
        ctx.fillStyle = '#c15564';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    
      requestRef.current = requestAnimationFrame(update); // Request next frame
    };

    const handleKeyDown = (event) => {
       // Function to handle keydown events
      if (event.code === 'Space') { 
        event.preventDefault(); // Prevent the default space bar action
        jump(); // Call jump function
      }
    };

    document.addEventListener('keydown', handleKeyDown); // Add keydown event listener
    requestRef.current = requestAnimationFrame(update); // Start the game loop

    if (inView) {
      obstaclesRef.current = []; // Clear obstacles when canvas comes into view
    }
    
    const obstacleInterval = setInterval(spawnObstacle, 2000); // Start spawning obstacles every 2 seconds

    return () => {
      // Cleanup function
      cancelAnimationFrame(requestRef.current); // Cancel animation frame
      clearInterval(obstacleInterval); // Clear obstacle spawning interval
      document.removeEventListener('keydown', handleKeyDown); // Remove keydown event listener
      window.removeEventListener('resize', resizeCanvas); // Remove resize event listener
    };
  }, [gameActive]);

  // Function to format the timer into MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  
  return (
    <Section id="game">
      
      <SmallScreenSection id="canvas-container" xlHidden={false} spaceY='space-y-4'>
        <h2 className="color-blue font-gopher-mono-semi opacity-40 leading-none text-8xl">myGame</h2>
        <p ref={ref} className="font-gopher-mono color-dark-blue underline text-decoration-color tracking-largep text-2xl">{inView && <TypewriterEffect text="Press space to jump" />}</p>
        <canvas ref={canvasRef} id="my-canvas" className="h-3/6 w-full md:w-5/6 xl:w-4/6 border-b-3 border-thick-border-gray"></canvas>
        <p id="timer" className="font-gopher-mono color-dark-blue underline text-decoration-color tracking-largep text-xl py-4">{formatTime(timer)}</p>
      </SmallScreenSection>
      
    </Section>
  );
}