import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Typography, Button, Box, Paper } from '@mui/material'

const TeamForm = ({ addTeam }) => {
  const [error, setError] = useState({})

  const navigate = useNavigate()

  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3, "Name should be at least 3 characters").max(50, "Name should be at most 50 characters").required("Name is required")
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/teams", options)
    const data = await resp.json()
    if(resp.status !== 201) {
      setError(data)
    } else {
      addTeam(data)
      navigate("/teams")
    }
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
            Create Team
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
          {error.error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error.error}
            </Typography>
          )}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              sx={{ backgroundColor: '#2e4a31', '&:hover': { backgroundColor: '#243a26' } }}
              variant="contained"
              type="submit"
            >
              Create Team
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default TeamForm