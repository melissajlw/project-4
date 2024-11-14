import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Team from './components/Team'
import TeamForm from './components/TeamForm'
import TeamDetails from './components/TeamDetails'
import Signup from './components/Signup'
import Login from './components/Login'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import TeamEditForm from './components/TeamEditForm'
import PlayerList from './components/PlayerList'
import PlayerForm from './components/PlayerForm'
import TeamPlayerForm from './components/TeamPlayerForm'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [players, setPlayers] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/check-current-user')
      .then(resp => {
        if (resp.status == 200) {
          resp.json().then(data => {
            loginUser(data)
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    fetch('/api/players')
      .then(resp => resp.json())
      .then(data => setPlayers(data))
  }, [])
    
    const loginUser = (user) => {
      setCurrentUser(user)
      setLoggedIn(true)
  }
  
  const logoutUser = () => {
    setCurrentUser({})
    setLoggedIn(false)
  }

  const addPlayer = player => {
    setPlayers([...players, player])
  }

  const addTeam = team => {
    const t = [...currentUser.teams, team]
    const updatedCurrentUser = {
      ...currentUser,
      teams: t
    }
    setCurrentUser(updatedCurrentUser)
  }

  const updateTeam = updatedTeam => {
    const updatedTeams = currentUser.teams.map(team => {
      if(team.id === updatedTeam.id) {
        return updatedTeam
      } else {
        return team
      }
    })
    // update currentUser
    const updatedCurrentUser = {
      ...currentUser,
      teams: updatedTeams
    }

    // set currentUser state
    setCurrentUser(updatedCurrentUser)
  }

  const deleteTeam = (id) => {
    const updatedTeams = currentUser.teams.filter(team => team.id !== parseInt(id))
    const updatedCurrentUser = {
      ...currentUser,
      teams: updatedTeams
    }
    setCurrentUser(updatedCurrentUser)
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/teams" element={<Team teams={ currentUser.teams } loggedIn={loggedIn} loading={loading} />} />
        <Route path="/teams/new" element={<TeamForm addTeam={ addTeam } />} />
        <Route path="/teams/:id/edit" element={<TeamEditForm currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} updateTeam={updateTeam} />} />
        <Route path="/teams/:id" element={<TeamDetails currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} deleteTeam={deleteTeam} />} />
        <Route path="/teams/:team_id/team_players/new" element={<TeamPlayerForm teams={currentUser.teams} players={players} />} />
        <Route path="/players" element={<PlayerList players={players} />} />
        <Route path="/players/new" element={<PlayerForm addPlayer={ addPlayer } loggedIn={loggedIn} /> } />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </Router>
  )
}

export default App
