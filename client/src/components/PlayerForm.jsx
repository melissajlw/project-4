import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Typography, Button, Box, Paper } from '@mui/material'

const PlayerForm = ({ addPlayer, loggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().required("Name is required")
  })

  const handleSubmit = values => {
    fetch('/api/players', {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    })
      .then(resp => resp.json())
      .then(data => {
        addPlayer(data)
        navigate("/players")
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
  })

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Player
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              sx={{ backgroundColor: '#2e4a31', color: 'white', '&:hover': { backgroundColor: '#243a26' } }}
              variant="contained"
              type="submit"
            >
              Create Player
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default PlayerForm