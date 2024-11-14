import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate } from 'react-router-dom'

const PlayerForm = ({ addPlayer, loggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])

  const initialValues = {
    title: ""
  }

  const validationSchema = yup.object({
    title: yup.string().required()
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
    <div>
      <h3>Create Player</h3>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="name" id="name" value={formik.values.title} onChange={formik.handleChange} />
          <p style={{color: "red"}}>{ formik.errors.title }</p>
        </div><br />

        <input type="submit" value="Create Player" />
      </form>
    </div>
  )
}

export default PlayerForm