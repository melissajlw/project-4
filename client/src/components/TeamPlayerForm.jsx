import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { headers } from '../Globals'
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, Box, Paper } from '@mui/material'

const TeamPlayerForm = ({ teams, players }) => {
  const [player_id, setPlayerId] = useState(players[0].id)
  const { team_id } = useParams()

  const navigate = useNavigate()

  const team = teams.find(t => t.id === parseInt(team_id))

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
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Add Player to {team.name}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="player-select-label">Player</InputLabel>
              <Select
                labelId="player-select-label"
                id="player-select"
                value={player_id}
                label="Player"
                onChange={e => setPlayerId(parseInt(e.target.value))}
              >
                {players.map(player => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                sx={{ backgroundColor: '#2e4a31', '&:hover': { backgroundColor: '#243a26' } }}
                variant="contained"
                type="submit"
              >
                Add Player
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default TeamPlayerForm