import React from 'react'
import PlayerCard from './PlayerCard'

const PlayerList = ({ players }) => {

  const playerCards = players.map(player => <PlayerCard key={player.id} player={player} />)

  return (
    <div>
      <h3>Player List</h3>
      { playerCards }
    </div>
  )
}

export default PlayerList