import { Button, MenuItem, TextField } from '@mui/material'
import React, {useState} from 'react'
import NavBar from './NavBar'

const AddComplaint = () => {

    const [form, setForm] = useState({
        title: '',
        category: '',
        description: '',
        location: ''
    })

    const valueUpdate = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submitForm = () => {
        console.log(form)
    }
  return (
    <div>
        <NavBar />
        <br /><br /><br /><br />
        <h3>Complaint Form</h3>
        <TextField label="Complaint Title" variant="outlined"  /><br /><br />
        <TextField select label="Complaint Category" variant="outlined"  sx={{width: '222px'}}>
        <MenuItem value="Classroom">Classroom</MenuItem>
        <MenuItem value="Laboratory">Laboratory</MenuItem>
        <MenuItem value="Hostel">Hostel</MenuItem>
        <MenuItem value="Internet/Wifi">Internet/Wifi</MenuItem>
        <MenuItem value="Electrical">Electrical</MenuItem>
        <MenuItem value="Water Supply">Water Supply</MenuItem>
        <MenuItem value="Cleanliness">Cleanliness</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
        </TextField><br /><br />
        <TextField label="Complaint Description" variant="outlined"   /><br /><br />
        <TextField label="Location" variant="outlined"  /><br /><br />
        <Button variant="contained" color="primary" onClick={submitForm}>Submit Complaint</Button>
    </div>
  )
}

export default AddComplaint