import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Select, MenuItem, Button, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function StatusUpdateScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:4000/api/complaints/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setStatus(res.data.status);
    })
    .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = () => {
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:4000/api/complaints/${id}`, { status: status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("Status Updated Successfully!");
      navigate('/AdminComplaintList');
    })
    .catch(err => console.log(err));
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" }}>
      <Container maxWidth="xs">
        <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
              Update Complaint Status
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }} align="center">
              Complaint ID Token: #{id}
            </Typography>
            <Select fullWidth value={status} onChange={(e) => setStatus(e.target.value)} sx={{ borderRadius: 2, mb: 3 }}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button fullWidth variant="outlined" onClick={() => navigate(-1)} sx={{ textTransform: 'none', borderRadius: 2 }}>
                Cancel
              </Button>
              <Button fullWidth variant="contained" color="primary" onClick={handleUpdate} sx={{ textTransform: 'none', borderRadius: 2 }}>
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default StatusUpdateScreen;
