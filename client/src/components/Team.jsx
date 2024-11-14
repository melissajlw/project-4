import React, {useEffect} from 'react'
import TeamCard from './TeamCard'
import { useNavigate } from 'react-router-dom'

const Team = ({ teams, loggedIn, loading }) => {

  const navigate = useNavigate()

  useEffect(() => {
    console.log('loggedIn', loggedIn)
    if(!loading) {
      if(!loggedIn) {
        navigate("/login")
      }
    }

  }, [loggedIn, loading])
  
  if (loading || !teams) {
    return <h1></h1>
  }

  const teamCards = teams.map(team => <TeamCard key={ team.id } team={ team } />)

  return (
    <ul>
      { teamCards }
    </ul>
  )
}

export default Team