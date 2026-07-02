import React, { useState } from 'react';
import { Button, TextField, Container, Paper, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  
  
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const valueUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitInfo = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/auth/login', form)
      .then((res) => {
        const token = res.data.token;
        const role = res.data.role ? res.data.role.toLowerCase() : 'student';
        const name = res.data.name || form.email.split('@')[0]; 
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('name', name); 
        
        if (role === "admin" || form.email.toLowerCase() === 'admin@gmail.com') {
          navigate('/AdminDashboard');
        } else {
          navigate('/StudentDashboard');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Invalid Credentials");
      });
  };

  
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/auth/forgot-password', { email: forgotEmail })
      .then((res) => {
        alert(res.data.message);
        setForgotOpen(false);
        setForgotEmail('');
      })
      .catch((err) => {
        console.error("Forgot Password Frontend Error:", err);
        
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Connection error: Cannot reach the backend server!");
        }
      });
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
     
      <Grid item xs={false} sm={5} md={6} sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
        color: 'white', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        p: 4 
      }}>
       <Typography variant="h2" fontWeight="bold" sx={{ mb: 2, fontSize: '2.5rem', letterSpacing: '-2px' }}>
          Campus Grievance Portal
        </Typography>
        
      </Grid>

      
      <Grid item xs={12} sm={7} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="xs">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please enter your credentials to access the portal.
            </Typography>

            <Box component="form" onSubmit={submitInfo} sx={{ mt: 2 }}>
              <TextField 
                fullWidth 
                label="Email" 
                name="email" 
                variant="outlined" 
                margin="normal" 
                value={form.email} 
                onChange={valueUpdate} 
                required 
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} 
              />
              <TextField 
                fullWidth 
                label="Password" 
                name="password" 
                type="password" 
                variant="outlined" 
                margin="normal" 
                value={form.password} 
                onChange={valueUpdate} 
                required 
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} 
              />
              
             
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                <Button 
                  onClick={() => setForgotOpen(true)} 
                  sx={{ textTransform: 'none', fontSize: '0.82rem', fontWeight: 'bold', color: '#3b82f6' }}
                >
                  Forgot Password?
                </Button>
              </Box>
              
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2, mb: 2, py: 1.4, textTransform: 'none', fontWeight: 'bold', borderRadius: 2, fontSize: '0.95rem', boxShadow: '0px 4px 12px rgba(59, 130, 246, 0.3)' }}
              >
                Login
              </Button>
              
              <Button 
                fullWidth 
                variant="text" 
                onClick={() => navigate('/Register')} 
                sx={{ textTransform: 'none', color: '#64748b', fontSize: '0.85rem', mt: 1 }}
              >
                Don't have an account? <span style={{ color: '#3b82f6', marginLeft: '4px', fontWeight: 'bold' }}>Register</span>
              </Button>
            </Box>
          </Paper>
        </Container>
      </Grid>

      
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}>
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Reset Password</DialogTitle>
        <Box component="form" onSubmit={handleForgotSubmit}>
          <DialogContent sx={{ pt: 0 }}>
            <DialogContentText variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Enter your registered email address below, and we will guide you to recover your account password.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setForgotOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 'bold' }}>Reset Password</Button>
          </DialogActions>
        </Box>
      </Dialog>

    </Grid>
  );
};

export default Login;
