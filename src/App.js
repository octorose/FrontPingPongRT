import React, { useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";

const App = () => {
  // Example positions
  const [playerPaddlePos, setPlayerPaddlePos] = useState({ x: 10, y: 250 });
  const [opponentPaddlePos, setOpponentPaddlePos] = useState({ x: 780, y: 250 });
  const movePaddle = (direction) => {
  setPlayerPaddlePos((prevPos) => ({
    x: prevPos.x, // Paddle's x-position remains constant
    y: Math.max(0, Math.min(prevPos.y + direction * 15, 500)), // Example boundary check, assuming canvas height is 600
  }));
};

 
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          movePaddle(-1); 
          break;
        case "ArrowDown":
          movePaddle(1); 
          break;
        default:
          break; 
      }
    };

    // Add event listener for key down
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center mt-8">PingPongRT</h1>
      <div className="flex justify-center">
        <GameCanvas
          playerPaddlePos={playerPaddlePos}
          opponentPaddlePos={opponentPaddlePos}
        />
      </div>
    </div>
  );
};

export default App;
