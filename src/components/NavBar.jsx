import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography, Box, Dialog, DialogContent,TextField, Divider, MenuItem, Avatar, Grid, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

  const NavBar = ({ userName }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', role: '', _id: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  
  const handleOpenProfile = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setProfileForm(res.data); 
      setProfileOpen(true);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to fetch profile data");
    });
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put('http://localhost:4000/api/auth/update-profile', { 
      name: profileForm.name, 
      email: profileForm.email,
      role: profileForm.role 
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', profileForm.role);
      localStorage.setItem('name', profileForm.name);
      
      setProfileOpen(false);
      window.location.reload(); 
    })
    .catch((err) => {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    });
  };

  
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert("Please fill in both fields");
      return;
    }

    axios.put('http://localhost:4000/api/auth/update-password', passwordForm, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      alert(res.data.message);
      setPasswordForm({ currentPassword: '', newPassword: '' });
    })
    .catch((err) => {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update password");
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  };

  return (
    <>
      
      <AppBar position="sticky" sx={{ background: '#1e293b', px: 1, boxShadow: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Left Side: Welcome Text */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ color: '#94a3b8', borderLeft: '1px solid #475569', pl: 2, textTransform: 'capitalize', fontWeight: 500 }}>
              Welcome, {userName}
            </Typography>
          </Box>

          {/* Right Side Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            {localStorage.getItem('role') === 'admin' ? (
              <Button component={Link} to="/AdminDashboard" variant="contained" sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, borderRadius: 2, px: 2 }}>
                Admin Dashboard
              </Button>
            ) : (
              <>
                <Button component={Link} to="/StudentDashboard" variant="contained" sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, borderRadius: 2, px: 2 }}>
                  Dashboard
                </Button>
                <Button component={Link} to="/AddComplaint" variant="contained" sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, borderRadius: 2, px: 2 }}>
                  Add Complaint
                </Button>
                <Button component={Link} to="/MyComplaints" variant="contained" sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, borderRadius: 2, px: 2 }}>
                  My Complaints
                </Button>
              </>
            )}
            
            {/* Student Profile Button */}
            <Button onClick={handleOpenProfile} variant="outlined" sx={{ textTransform: 'none', fontWeight: 'bold', color: '#ffffff', borderColor: '#ffffff', '&:hover': { borderColor: '#e2e8f0', bgcolor: 'rgba(255,255,255,0.1)' }, borderRadius: 2, px: 2 }}>
             Student Profile
            </Button>

            {/* Logout Button */}
            <Button onClick={handleLogout} color="error" variant="contained" sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2, px: 2 }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

     
      <Dialog 
        open={profileOpen} 
        onClose={() => setProfileOpen(false)} 
        maxWidth="sm" 
        fullWidth 
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', boxShadow: '0px 20px 40px rgba(0,0,0,0.15)' } }}
      >
        {profileForm._id ? (
          <>
            
            <Box sx={{ backgroundImage: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)', position: 'relative', pt: 5, pb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Close Icon Button */}
              <IconButton 
                onClick={() => setProfileOpen(false)} 
                sx={{ position: 'absolute', top: 12, right: 12, color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <CloseIcon />
              </IconButton>

              {/* Dynamic Profile Avatar */}
              <Avatar 
                sx={{ 
                  width: 85, 
                  height: 85, 
                  bgcolor: '#fff', 
                  color: '#3b82f6',
                  boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  mb: 1.5,
                  border: '3px solid rgba(255,255,255,0.8)'
                }}
              >
                {profileForm.name ? profileForm.name.charAt(0).toUpperCase() : "S"}
              </Avatar>

              <Typography variant="h5" fontWeight="bold" color="#fff">
                {profileForm.name}
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.75)" sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem', fontWeight: 'bold', mt: 0.5 }}>
                {profileForm.role} Account
              </Typography>
            </Box>

            {/* Modal Body Forms */}
            <DialogContent sx={{ p: 4, bgcolor: '#f8fafc' }}>
              
              {/* Section 1: Personal Info */}
              <Box component="form" onSubmit={handleUpdateProfile} sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="subtitle1" fontWeight="bold" color="#1e293b">
                    Personal Information
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      size="small"
                      variant="outlined"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                      sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      size="small"
                      variant="outlined"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                      sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Role Account"
                      name="role"
                      size="small"
                      variant="outlined"
                      value={profileForm.role}
                      onChange={handleProfileChange}
                      required
                      sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    >
                      <MenuItem value="student">Student</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#10b981', py: 1, borderRadius: 2, boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)', '&:hover': { bgcolor: '#059669' } }}>
                      Update Personal Info
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider sx={{ my: 3.5, borderColor: '#e2e8f0' }} />
              
              {/* Section 2: Update Password */}
              <Box component="form" onSubmit={handleUpdatePassword}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                  <LockIcon sx={{ color: '#f59e0b' }} />
                  <Typography variant="subtitle1" fontWeight="bold" color="#1e293b">
                    Update Password
                  </Typography>
                </Box>

                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      size="small"
                      variant="outlined"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      size="small"
                      variant="outlined"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      sx={{ bgcolor: '#fff', '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth sx={{ textTransform: 'none', fontWeight: 'bold', bgcolor: '#3b82f6', py: 1, borderRadius: 2, boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)', '&:hover': { bgcolor: '#2563eb' } }}>
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>

            </DialogContent>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">Loading details...</Typography>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default NavBar;
