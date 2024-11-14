import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)', // Adjust height to account for the navbar
          textAlign: 'center',
          backgroundImage: 'url(https://sc-b.digikeyassets.com/-/media/Images/Blogs/2017/September/Applying%20The%20Lessons%20of%20Fantasy%20Football%20to%20Circuit%20Board%20Design/applying-the-lessons-of-fantasy-football-img1.jpg?ts=d567c55b-9c40-4a32-9c5c-b62af00cdc0c&la=pt-BR)', // Replace with the path to your sporty background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          border: '5px solid #2e4a31', // Add border with the same color as the navbar
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }}
        >
          Welcome!
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)', mb: 4 }}
        >
          Create and manage your fantasy football teams with ease.
        </Typography>
        <Button
          component={Link}
          to="/teams"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: '#2e4a31', color: 'white', '&:hover': { backgroundColor: '#243a26' } }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  )
}

export default Home