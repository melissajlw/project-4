import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  return (
    <li><Link to={`/users/${user.id}`}>{user.username}</Link></li>
  )
}

export default UserCard