import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, Grid, Card, CardContent,Button, MenuItem, TextField, FormControl, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar"; 

function AdminComplaintList() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchComplaints = () => {
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
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  
  const handleStatusChange = (id, newStatus) => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:4000/api/complaints/${id}`, 
      { status: newStatus }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(() => {
      alert(`Status updated to ${newStatus} `);
      fetchComplaints(); 
    })
    .catch(err => console.error("Status update error:", err));
  };

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this complaint permanently?")) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:4000/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Complaint deleted by Admin");
        fetchComplaints(); 
      })
      .catch(err => console.error("Delete error:", err));
    }
  };

  
  const getStatusBorder = (status) => {
    switch (status) {
      case "Pending": return "4px solid #f59e0b";
      case "In Progress": return "4px solid #06b6d4";
      case "Resolved": return "4px solid #10b981";
      default: return "1px solid #cbd5e1";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: '#f1f5f9', pb: 5 }}>
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
           Admin Complaint Management
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/AdminDashboard')} 
            sx={{ textTransform: 'none', bgcolor: '#1e293b', fontWeight: 'bold' }}
          >
            Back to Dashboard
          </Button>
        </Box>

        {loading ? (
          <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center', mt: 4 }}>
            Loading all complaints...
          </Typography>
        ) : complaints.length === 0 ? (
          <Paper sx={{ textAlign: 'center', p: 5, borderRadius: 3, bgcolor: '#fff' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No complaints registered in the system yet!
            </Typography>
          </Paper>
        ) : (
          
          <Grid container spacing={3}>
            {complaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={complaint._id}>
                <Card sx={{ 
                  width: '100%', 
                  minHeight: 340, 
                  borderRadius: 3, 
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.05)', 
                  bgcolor: '#fff', 
                  borderTop: getStatusBorder(complaint.status),
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}>
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1.5 }}>
                      {complaint.title}
                    </Typography>
                   
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Category:</strong> {complaint.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      <strong>Location:</strong> {complaint.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Submitted By:</strong> {complaint.isAnonymous ? "Anonymous Student" : (complaint.createdBy?.name || "Unknown Student")}
                    </Typography>
                  </CardContent>

                  <Box sx={{ p: 3, pt: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="small" 
                      onClick={() => navigate(`/ComplaintDetails/${complaint._id}`)} 
                      sx={{ bgcolor: "#1e293b", textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#334155' } }}
                    >
                      View Full Details
                    </Button>

                    {/*Status Update Dropdown */}
                    <FormControl size="small" fullWidth>
                      <InputLabel>Change Status</InputLabel>
                      <Select
                        value={complaint.status || "Pending"}
                        label="Change Status"
                        onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Resolved">Resolved </MenuItem>
                      </Select>
                    </FormControl>

                    {/* Delete Button */}
                    <Button 
                      variant="outlined" 
                      color="error" 
                      fullWidth 
                      size="small" 
                      onClick={() => handleDelete(complaint._id)} 
                      sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 2 }}
                    >
                      Delete Complaint
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default AdminComplaintList;
