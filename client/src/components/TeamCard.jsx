import React from 'react'
import { Link } from 'react-router-dom'

const TeamCard = ({ team }) => {
  return (
    <div>
      <h3><Link to={`/teams/${ team.id }`}>{team.name}</Link></h3>
    </div>
  )
}

export default TeamCard