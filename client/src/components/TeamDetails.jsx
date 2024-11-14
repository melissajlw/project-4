import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'

const TeamDetails = ({ currentUser, loggedIn, userLoading, deleteTeam }) => {
  const [ team, setTeam ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null);
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(!userLoading && !currentUser.id) {
      navigate("/login")
    }
    fetch("/api/teams/" + id)
      .then(resp => resp.json())
      .then(data => {
        setTeam(data)
        setLoading(false)
      })
  }, [loggedIn, currentUser])

  const handleDelete = event => {
    event.preventDefault()

    fetch('/api/teams/' + id, {
      method: "DELETE"
    })

    deleteTeam(id)
    navigate("/teams")
  }

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetItem) => {
    e.preventDefault();

    const targetIndex = team.team_players.indexOf(targetItem)
    const draggedItemIndex = team.team_players.indexOf(draggedItem)
    let updatedTeamPlayers = team.team_players.filter(tp => tp.id !== draggedItem.id)
    let firstHalf = updatedTeamPlayers.slice(0, targetIndex)
    let lastHalf = updatedTeamPlayers.slice(targetIndex, updatedTeamPlayers.length)

    firstHalf.push(draggedItem)
    updatedTeamPlayers = firstHalf.concat(lastHalf)

    for(let i = 0; i < updatedTeamPlayers.length; i++) {
      updatedTeamPlayers[i].order_number = i + 1
      await fetch('/api/team_players/' + updatedTeamPlayers[i].id, {
        method: "PATCH",
        headers,
        body: JSON.stringify({order_number: i + 1})
      })
    }

    setTeam({
      ...team,
      team_players: updatedTeamPlayers
    })
  };

  if(loading || userLoading ) {
    return <h1>Loading...</h1>
  }

  const orderedTeamPlayers = team.team_players.sort((a, b) => a.order_number - b.order_number)
  const players = orderedTeamPlayers.map(tp => (
    <li 
      key={tp.id}
      draggable
      onDragStart={(e) => handleDragStart(e, ps)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, ps)}
    >
      {tp.player.name}
    </li>
  ))

  return (
    <div>
      <h3>{team.name}</h3>
      <p>{team.user.username}'s Team</p>
      {team.user.id === currentUser.id ? <><Link to={`/teams/${team.id}/team_players/new`} style={{marginRight: "5px"}}>Add Player</Link><Link to={`/teams/${team.id}/edit`} style={{marginRight: "5px"}}>Edit</Link>
      <Link to="#" onClick={handleDelete}>Delete</Link></> : null}
      <p>Note: You can re-order your players by dragging the player to the position you want it to be.</p>
      <ul>
        {players}
      </ul>
    </div>
  )
}

export default TeamDetails