import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material'

const Login = ({ loginUser }) => {
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = yup.object({
    username: yup.string().min(3).max(25).required(),
    password: yup.string().min(3).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch('/api/login', options)
    const data = await resp.json()

    if (resp.status !== 200) {
      console.log(data.error)
    } else {
      loginUser(data)
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
            Login
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              sx={{ backgroundColor: '#2e4a31', '&:hover': { backgroundColor: '#243a26' } }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
