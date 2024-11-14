import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../Globals'
import { useNavigate, useParams } from 'react-router-dom'

const TeamEditForm = ({ currentUser, loggedIn, userLoading, updateTeam }) => {
  const [error, setError] = useState({})
  const [team, setTeam] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if(!loggedIn && !userLoading) {
      navigate("/login")
    } else {
      fetch('/api/teams/' + id)
      .then(resp => resp.json())
      .then(data => {
        if(data.user.id !== currentUser.id) {
          navigate("/teams")
        }
        setTeam(data)
        setLoading(false)
        formik.values.name = data.name
      })
    }
  }, [loggedIn, currentUser])
  

  
  const initialValues = {
    name: ""
  }

  const validationSchema = yup.object({
    name: yup.string().min(3).max(50).required()
  })

  const handleSubmit = async values => {
    const options = {
      method: "PATCH",
      headers,
      body: JSON.stringify(values)
    }
    const resp = await fetch("/api/teams/" + id, options)
    const data = await resp.json()
    if(resp.status !== 200) {
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

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h3>Update Team</h3>
      <p style={{color: "red"}}>{error.error}</p>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="name" value={ formik.values.name } onChange={ formik.handleChange } />
          <p style={{color: "red"}}>{formik.errors.name}</p>
        </div><br />

        <input type="submit" value="Update Team" />
      </form>
    </div>
  )
}

export default TeamEditForm