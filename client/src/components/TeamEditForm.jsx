import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, TextField, Typography, Button, Box, Paper } from '@mui/material'

const TeamEditForm = ({ currentUser, loggedIn, userLoading, updateTeam }) => {
  const [error, setError] = useState({})
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedIn && !userLoading) {
      navigate("/login")
    } else {
      fetch('/api/teams/' + id)
        .then(resp => resp.json())
        .then(data => {
          if (data.user.id !== currentUser.id) {
            navigate("/teams")
          }
          setTeam(data)
          setLoading(false)
          formik.setFieldValue('name', data.name)
        })
    }
  }, [loggedIn, currentUser])

  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3, "Name should be at least 3 characters").max(50, "Name should be at most 50 characters").required("Name is required")
  })

  const handleSubmit = async values => {
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/teams/" + id, options)
    const data = await resp.json()
    if (resp.status !== 200) {
      setError(data)
    } else {
      updateTeam(data)
      navigate("/teams")
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    validateOnChange: false
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4">Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Team
            </Typography>
          </Box>
          {error.error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error.error}
            </Typography>
          )}
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
                sx={{ backgroundColor: '#2e4a31', '&:hover': { backgroundColor: '#243a26' } }}
                variant="contained"
                type="submit"
              >
                Update Team
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  )
}

export default TeamEditForm