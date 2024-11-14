import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  }, [])

  if(loading) {
    return <h1>loading...</h1>
  }

  const teams = user.teams.map(t => <li key={t.id}>{t.name}</li>)
  
  return (
    <div>
      <h3>{user.username}'s Team</h3>
      <ul>
        {teams}
      </ul>
    </div>
  )
}

export default UserDetails