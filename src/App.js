import React, { useEffect, useState } from "react";
import GameCanvas from "./components/Game/GameCanvas";
import NavBar from "./components/Navbar/NavBar";

const App = () => {
  // Example positions
  // start game button
  
  const [playerPaddlePos, setPlayerPaddlePos] = useState({ x: 10, y: 250 });
  const [opponentPaddlePos, setOpponentPaddlePos] = useState({
    x: 780,
    y: 250,
  });
  const movePaddle = (direction) => {
    //make it smooth
    setPlayerPaddlePos((prev) => {
      return { ...prev, y: prev.y + direction * 10 };
    });

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
      <NavBar />
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
