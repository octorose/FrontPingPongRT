import React from 'react'

function Scoreboard({playerScore, opponentScore}) {

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-400">
      <h1 className="text-4xl">Scoreboard</h1>
      <div className="flex">
        <h1 className="text-2xl">Player1</h1>
        <h1 className="text-2xl mx-2">VS</h1>
        <h1 className="text-2xl">Player2</h1>
      </div>
      <div className='flex flex-row'>
        <p className="text-2xl">{playerScore}</p>
        <p className="text-2xl mx-2">:</p>
        <p className="text-2xl">{opponentScore}</p>
      </div>
    </div>
  );
}

export default Scoreboard