import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const storedName = localStorage.getItem('name');
  const adminName = (storedName && storedName !== "undefined") ? storedName : "Admin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setComplaints(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    });
  }, []);

  
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;
  const inProgressComplaints = complaints.filter(c => c.status === "In Progress").length;
  const resolvedComplaints = complaints.filter(c => c.status === "Resolved").length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9" }}>
      
      
      <Box sx={{ bgcolor: "#0f172a", color: "#ffffff75", px: 4, py: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" fontWeight="bold">
         | Welcome, {adminName} 
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate("/AdminComplaintList")} 
            sx={{ textTransform: "none", bgcolor: "#3b82f6", fontWeight: "bold", '&:hover': { bgcolor: '#2563eb' } }}
          >
            Complaint Management Grid
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout} 
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box sx={{ p: 4 }}>
        
        {/* 📊 STATS CARDS */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: "6px solid #3b82f6", textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">Total Complaints</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{totalComplaints}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: "6px solid #ef4444", textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">Pending</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{pendingComplaints}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: "6px solid #f59e0b", textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">In Progress</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{inProgressComplaints}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, borderLeft: "6px solid #10b981", textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight="bold">Resolved Tasks</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{resolvedComplaints}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 📋 DATA TABLE */}
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#fff" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Complaints</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Pending Complaints</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Resolved</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">Loading dashboard data...</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{totalComplaints}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{pendingComplaints}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{inProgressComplaints}</TableCell>
                  <TableCell sx={{ fontSize: '1.1rem' }}>{resolvedComplaints}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
}

export default AdminDashboard;
