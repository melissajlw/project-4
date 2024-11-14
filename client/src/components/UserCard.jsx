import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'

const UserCard = ({ user }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {user.username}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard