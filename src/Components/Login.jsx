import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  let valueUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  let submitInfo = () => {
    console.log('Login form data:', form)
    if(form.email==='admin@gmail.com')
      {
      navigate('/AdminDashboard')
    }
      else{
        navigate('/StudentDashboard')
      }
      
  
  }

  return (
    <div>
      <br /><br /><br /><br />
      <h3>Login</h3>
      <br />

      <TextField label="Email" variant='outlined'  value={form.email} onChange={valueUpdate} /><br /><br />
      <TextField label="Password" type="password" variant='outlined'  value={form.password} onChange={valueUpdate} /><br /><br />

      <Button variant="contained" onClick={submitInfo}>Login</Button>
      <br /><br />
      <Button variant="text" onClick={() => navigate('/register')}>Don't have an account? Register</Button>
    </div>
  )
}

export default Login
