
import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Grid, Chip, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ComplainList() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get("http://localhost:4000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setComplaints(res.data);
    })
    .catch((err) => {
      console.log("Fetch complaints error:", err);
    });
  }, []);

  return (
     <Box sx={{ minHeight: "100vh", bgcolor: '#f1f5f9', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Complaints Feed
          </Typography>
          <Button variant="outlined" onClick={() => navigate('/StudentDashboard')} sx={{ textTransform: 'none', borderRadius: 2 }}>
            Back to Dashboard
          </Button>
        </Box>

        <Grid container spacing={3}>
          {complaints.length === 0 ? (
            <Typography variant="h6" sx={{ ml: 3, color: 'text.secondary' }}>No complaints found.</Typography>
          ) : (
            complaints.map((complaint) => (
              <Grid item xs={12} sm={6} md={4} key={complaint._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' }}>
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                        {complaint.title}
                      </Typography>
                      <Chip
                        size="small"
                        label={complaint.status}
                        color={complaint.status === "Resolved" ? "success" : complaint.status === "In Progress" ? "warning" : "error"}
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Category:</strong> {complaint.category}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                       <strong>Location:</strong> {complaint.location}
                    </Typography>

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate(`/ComplaintDetails/${complaint._id}`)} 
                        sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}
                      >
                        View Full Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default ComplainList;
