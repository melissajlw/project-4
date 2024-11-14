import React from 'react'
import PlayerCard from './PlayerCard'
import { Container, Typography, Box } from '@mui/material'

const PlayerList = ({ players }) => {

  const playerCards = players.map(player => <PlayerCard key={player.id} player={player} />)

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8, textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Player List
        </Typography>
      </Box>
      <Box>
        { playerCards }
      </Box>
    </Container>
  )
}

export default PlayerList