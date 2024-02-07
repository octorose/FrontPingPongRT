import React, { useRef, useEffect, useState } from "react";

const GameCanvas = ({ playerPaddlePos, opponentPaddlePos }) => {
  const canvasRef = useRef(null);
  const ballRadius = 10;
  const constantSpeed = 0.0099; // Maintain constant speed for the ball

  // Initialize ball position and velocity
  const [ballPosition, setBallPosition] = useState({ x: 400, y: 300 });
  const [ballVelocity, setBallVelocity] = useState(() =>
    getRandomVelocity(constantSpeed)
  );

  // Function to generate random velocity for the ball with a constant speed
  function getRandomVelocity(speed) {
    const angle = Math.random() * 2 * Math.PI; // Random angle
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
  }

  // Function to draw the ball
  function drawBall(ctx, position) {
    ctx.beginPath();
    ctx.arc(position.x, position.y, ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
  }

  // Function to update and draw the paddles
  function drawPaddles(ctx) {
    ctx.fillStyle = "#0095DD"; // Paddle color
    // Player's paddle
    ctx.fillRect(playerPaddlePos.x, playerPaddlePos.y, 10, 100);
    // Opponent's paddle
    ctx.fillRect(opponentPaddlePos.x, opponentPaddlePos.y, 10, 100);
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let animationFrameId;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

      // Draw background
      ctx.fillStyle = "purple";
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Draw ball and paddles
      drawBall(ctx, ballPosition);
      drawPaddles(ctx);

      // Collision detection and update ball position
      const newVelocity = { ...ballVelocity };
      if (
        ballPosition.x + ballVelocity.x >
          canvasRef.current.width - ballRadius ||
        ballPosition.x + ballVelocity.x < ballRadius
      ) {
        newVelocity.x = -ballVelocity.x;
      }
      if (
        ballPosition.y + ballVelocity.y >
          canvasRef.current.height - ballRadius ||
        ballPosition.y + ballVelocity.y < ballRadius
      ) {
        newVelocity.y = -ballVelocity.y;
      }
      if (
        ballPosition.x - ballRadius < playerPaddlePos.x + 10 &&
        ballPosition.x + ballRadius > playerPaddlePos.x &&
        ballPosition.y + ballRadius > playerPaddlePos.y &&
        ballPosition.y - ballRadius < playerPaddlePos.y + 100
      ) {
        newVelocity.x = Math.abs(newVelocity.x); // Ensure the ball moves right
      }

      // Check collision with opponent's paddle
      if (
        ballPosition.x + ballRadius > opponentPaddlePos.x &&
        ballPosition.x - ballRadius < opponentPaddlePos.x + 10 &&
        ballPosition.y + ballRadius > opponentPaddlePos.y &&
        ballPosition.y - ballRadius < opponentPaddlePos.y + 100
      ) {
        newVelocity.x = -Math.abs(newVelocity.x); // Ensure the ball moves left
      }
      setBallPosition((prev) => ({
        x: prev.x + newVelocity.x,
        y: prev.y + newVelocity.y,
      }));
      setBallVelocity(newVelocity);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => cancelAnimationFrame(animationFrameId);
  }, [ballPosition, ballVelocity]); // Removed dependencies to avoid re-triggering the effect unnecessarily

  return <canvas ref={canvasRef} width="800" height="600" />;
};

export default GameCanvas;
