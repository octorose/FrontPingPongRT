import React, { useRef, useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";

const GameCanvas = ({ playerPaddlePos, opponentPaddlePos }) => {
  const canvasRef = useRef(null);
  const ballRadius = 10;
  const constantSpeed = 0.0409; // Maintain constant speed for the ball

  //initialize the players' scores
  const [playerScore, setPlayerScore] = useState(0);
  const [start, setStart] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);
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
  function drawTable(ctx) {
    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

    // Draw the table background
    ctx.fillStyle = "purple"; // Traditional Ping Pong table color
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the center line (net)
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 15]); // Creates a dashed line for the net
    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.stroke();
    ctx.setLineDash([]); // Reset the dash pattern for future drawings

    // Draw the boundaries
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeRect(5, 5, canvasWidth - 10, canvasHeight - 10); // Leave a small margin
  }
  const undroweverything = (ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  const checkifWinner = (ctx) => {
    if (playerScore === 10) {
      alert("Player 1 wins!");
      //clean up the game the canva
      undroweverything(ctx);
      setPlayerScore(0);
      setOpponentScore(0);
    } else if (opponentScore === 10) {
      alert("Player 2 wins!");
      setPlayerScore(0);
      setOpponentScore(0);
    }
  };

  const scoring = (ballPosition, ballVelocity, ctx) => {
            if (ballPosition.x + ballVelocity.x > canvasRef.current.width - ballRadius){
          setPlayerScore(playerScore + 1);
          checkifWinner(ctx);
        } else {
          setOpponentScore(opponentScore + 1);
        }
      }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    let animationFrameId;


    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

      drawTable(ctx); // Draw the decorated Ping Pong table
      drawBall(ctx, ballPosition); // Draw the ball

      drawPaddles(ctx); // Draw the paddles
      // Collision detection and update ball position
      const newVelocity = { ...ballVelocity };
      if (
        ballPosition.x + ballVelocity.x >
          canvasRef.current.width - ballRadius ||
        ballPosition.x + ballVelocity.x < ballRadius
      ) {
        newVelocity.x = -ballVelocity.x;

        scoring(ballPosition, ballVelocity,ctx);


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

  return (
<div>
    <Scoreboard playerScore={playerScore} opponentScore={opponentScore}/>
    <canvas ref={canvasRef} width="800" height="600" />
</div>


  );
};

export default GameCanvas;
