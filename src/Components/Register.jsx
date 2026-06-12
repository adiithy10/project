
import { Button, TextField, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  })

  let valueUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  let submitInfo = () => {
    console.log('Register form data:', form)
    navigate('/login')
  }

  return (
    <div>
      <br /><br /><br /><br />
      <h3>Register</h3>
      <br />

      <TextField label="Name" variant='outlined'  value={form.name} onChange={valueUpdate} /><br /><br />
      <TextField label="Email" variant='outlined'  value={form.email} onChange={valueUpdate} /><br /><br />
      <TextField label="Password" type="password" variant='outlined'  value={form.password} onChange={valueUpdate} /><br /><br />

      <TextField
        select
        label="Role"
        variant='outlined'
        value={form.role}
        onChange={valueUpdate}
        style={{ width: 227 }}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <br /><br />

      <Button variant="contained" onClick={submitInfo}>Register</Button>
      <br /><br />
      <Button variant="text" onClick={() => navigate('/login')}>Already have an account? Login</Button>
    </div>
  )
}


import { Button, TextField, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  })

  let valueUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  let submitInfo = () => {
    console.log('Register form data:', form)
    navigate('/login')
  }

  return (
    <div>
      <br /><br /><br /><br />
      <h3>Register</h3>
      <br />

      <TextField label="Name" variant='outlined'  value={form.name} onChange={valueUpdate} /><br /><br />
      <TextField label="Email" variant='outlined'  value={form.email} onChange={valueUpdate} /><br /><br />
      <TextField label="Password" type="password" variant='outlined'  value={form.password} onChange={valueUpdate} /><br /><br />

      <TextField
        select
        label="Role"
        variant='outlined'
        value={form.role}
        onChange={valueUpdate}
        style={{ width: 227 }}
      >
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <br /><br />

      <Button variant="contained" onClick={submitInfo}>Register</Button>
      <br /><br />
      <Button variant="text" onClick={() => navigate('/login')}>Already have an account? Login</Button>
    </div>
  )
}


export default Register