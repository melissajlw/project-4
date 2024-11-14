import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const PlayerCard = ({ player }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {player.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PlayerCard