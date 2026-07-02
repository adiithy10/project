import React, { useState } from 'react';
import { Button, TextField, MenuItem, Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const valueUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitInfo = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/api/auth/register', form)
      .then((res) => {
        alert("Registration Successful ");
        navigate('/Login');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Registration Failed ");
      });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Register
          </Typography>
          <Box component="form" onSubmit={submitInfo} sx={{ width: '100%', mt: 2 }}>
            <TextField fullWidth label="Name" name="name" variant='outlined' margin="normal" value={form.name} onChange={valueUpdate} required />
            <TextField fullWidth label="Email" name="email" variant='outlined' margin="normal" value={form.email} onChange={valueUpdate} required />
            <TextField fullWidth label="Password" name="password" type="password" variant='outlined' margin="normal" value={form.password} onChange={valueUpdate} required />
            <TextField select fullWidth label="Role" name="role" variant='outlined' margin="normal" value={form.role} onChange={valueUpdate}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, py: 1.2, textTransform: 'none', fontWeight: 'bold' }}>
              Register
            </Button>
            <Button fullWidth variant="text" onClick={() => navigate('/Login')} sx={{ textTransform: 'none' }}>
              Already have an account? Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
