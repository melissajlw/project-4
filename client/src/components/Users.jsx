import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'
import { Typography, List, Box } from '@mui/material'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(resp => resp.json())
      .then(data => setUsers(data))
  }, [])

  const userCards = users.map(user => <UserCard key={user.id} user={user} />)

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <List>
        {userCards}
      </List>
    </Box>
  )
}

export default Users