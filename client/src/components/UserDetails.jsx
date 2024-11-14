import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Typography, List, ListItem, ListItemText, Box } from '@mui/material'

const UserDetails = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    fetch('/api/users/' + id)
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    )
  }

  const teams = user.teams.map(t => (
    <ListItem key={t.id}>
      <ListItemText primary={t.name} />
    </ListItem>
  ))

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        {user.username}'s Teams
      </Typography>
      <List>
        {teams}
      </List>
    </Box>
  )
}

export default UserDetails