import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'

const TeamCard = ({ team }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component={Link} to={`/teams/${team.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
          {team.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TeamCard