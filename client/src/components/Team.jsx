import React, { useEffect } from 'react'
import TeamCard from './TeamCard'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Typography, Box } from '@mui/material'

const Team = ({ teams, loggedIn, loading }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate("/login")
    }
  }, [loggedIn, loading])

  if (loading || !teams) {
    return <Typography variant="h4" align="center">Loading...</Typography>
  }

  const teamCards = teams.map(team => (
    <Grid item xs={12} sm={6} md={4} key={team.id}>
      <TeamCard team={team} />
    </Grid>
  ))

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 8, textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Teams
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {teamCards}
      </Grid>
    </Container>
  )
}

export default Team