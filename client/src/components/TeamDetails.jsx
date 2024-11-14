import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'
import { Container, Typography, Box, Button, List, ListItem, Card, CardContent } from '@mui/material'

const TeamDetails = ({ currentUser, loggedIn, userLoading, deleteTeam }) => {
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)
  const [draggedItem, setDraggedItem] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userLoading && !currentUser.id) {
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
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = async (e, targetItem) => {
    e.preventDefault()

    const targetIndex = team.team_players.indexOf(targetItem)
    const draggedItemIndex = team.team_players.indexOf(draggedItem)
    let updatedTeamPlayers = team.team_players.filter(tp => tp.id !== draggedItem.id)
    let firstHalf = updatedTeamPlayers.slice(0, targetIndex)
    let lastHalf = updatedTeamPlayers.slice(targetIndex, updatedTeamPlayers.length)

    firstHalf.push(draggedItem)
    updatedTeamPlayers = firstHalf.concat(lastHalf)

    for (let i = 0; i < updatedTeamPlayers.length; i++) {
      updatedTeamPlayers[i].order_number = i + 1
      await fetch('/api/team_players/' + updatedTeamPlayers[i].id, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ order_number: i + 1 })
      })
    }

    setTeam({
      ...team,
      team_players: updatedTeamPlayers
    })
  }

  if (loading || userLoading) {
    return <Typography variant="h4" align="center">Loading...</Typography>
  }

  const orderedTeamPlayers = team.team_players.sort((a, b) => a.order_number - b.order_number)
  const players = orderedTeamPlayers.map(tp => (
    <ListItem
      key={tp.id}
      draggable
      onDragStart={(e) => handleDragStart(e, tp)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, tp)}
    >
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent>
          <Typography variant="h6">
            {tp.player.name}
          </Typography>
        </CardContent>
      </Card>
    </ListItem>
  ))

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8, textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {team.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {team.user.username}'s Team
        </Typography>
        {team.user.id === currentUser.id && (
          <Box sx={{ marginBottom: 2 }}>
            <Button component={Link} to={`/teams/${team.id}/team_players/new`} variant="contained" color="primary" sx={{ marginRight: 1 }}>
              Add Player
            </Button>
            <Button component={Link} to={`/teams/${team.id}/edit`} variant="contained" color="secondary" sx={{ marginRight: 1 }}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <List>
        {players}
      </List>
    </Container>
  )
}

export default TeamDetails