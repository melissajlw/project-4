import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'

const TeamPlayerForm = ({teams, players}) => {
  const [player_id, setPlayerId] = useState(players[0].id)
  const { team_id } = useParams()

  const navigate = useNavigate()

  const team = teams.find(t => t.id === parseInt(team_id))

  const playerOptions = players.map(player => <option key={player.id} value={player.id}>{player.name}</option>)

  const handleSubmit = async e => {
    e.preventDefault()

    const resp = fetch('/api/team_players', {
      method: "POST",
      headers,
      body: JSON.stringify({ team_id: team.id, player_id })
    })
      .then(resp => resp.json())
      .then(data => {
        navigate(`/teams/${team_id}`)
      })
  }

  return (
    <div>
      <h3>Add Player to {team.name}</h3>
      <form onSubmit={ handleSubmit }>
        <select style={{marginRight: "5px"}} value={player_id} onChange={e => setPlayerId(parseInt(e.target.value))}>
          {playerOptions}
        </select>
        <input type="submit" value="Add Player" />
      </form>
    </div>
  )
}

export default TeamPlayerForm