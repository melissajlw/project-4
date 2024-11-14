import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Navbar = ({ currentUser, loggedIn, logoutUser }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    fetch('/api/logout', {
      method: "DELETE"
    })

    logoutUser()
    navigate("/signup")
    handleClose()
  }

  const loggedInLinks = (
    <>
      <MenuItem onClick={handleClose}><Link to="/users" style={{ color: 'inherit', textDecoration: 'none' }}>View Users</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/teams" style={{ color: 'inherit', textDecoration: 'none' }}>View Teams</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/teams/new" style={{ color: 'inherit', textDecoration: 'none' }}>Create Teams</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/players" style={{ color: 'inherit', textDecoration: 'none' }}>View Players</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/players/new" style={{ color: 'inherit', textDecoration: 'none' }}>Create Players</Link></MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <MenuItem onClick={handleClose}>{currentUser.username}</MenuItem>
    </>
  )

  const loggedOutLinks = (
    <>
      <MenuItem onClick={handleClose}><Link to="/signup">Signup</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to="/login">Login</Link></MenuItem>
    </>
  )

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e4a31' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        </Typography>
        {loggedIn ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {loggedInLinks}
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit"><Link to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>Signup</Link></Button>
            <Button color="inherit"><Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link></Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar