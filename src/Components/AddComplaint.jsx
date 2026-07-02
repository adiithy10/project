import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField, Button, Paper, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AddComplaint() {
  const navigate = useNavigate();
  const location = useLocation();


  const editData = location.state && location.state.editComplaint ? location.state.editComplaint : null;
  const isEditMode = editData !== null; 

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaintLocation, setComplaintLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false); 

  useEffect(() => {
    if (isEditMode && editData) {
      setTitle(editData.title || "");
      setCategory(editData.category || "");
      setDescription(editData.description || "");
      setComplaintLocation(editData.location || "");
      setIsAnonymous(editData.isAnonymous || false);
    }
  }, [editData, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    
    const complaintData = { 
      title, 
      category, 
      description, 
      location: complaintLocation,
      isAnonymous // 
    };

    if (isEditMode) {
      axios.put(`http://localhost:4000/api/complaints/${editData._id}`, complaintData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Complaint updated successfully");
        navigate('/MyComplaints');
      })
      .catch(err => console.error(err));
    } else {
      axios.post("http://localhost:4000/api/complaints", complaintData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Complaint filed successfully");
        navigate('/MyComplaints');
      })
      .catch(err => console.error(err));
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", display: "flex", alignItems: "center", py: 5 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3 }} align="center">
            {isEditMode ? "Edit Complaint" : " File a Complaint"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField label="Complaint Title" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 3 }} />
            
            <TextField select label="Category" fullWidth required value={category} onChange={(e) => setCategory(e.target.value)} sx={{ mb: 3 }}>
              <MenuItem value="Academic">Academic</MenuItem>
              <MenuItem value="Hostel">Hostel</MenuItem>
              <MenuItem value="Infrastructure">Infrastructure</MenuItem>
              <MenuItem value="Canteen">Canteen</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>
            
            <TextField label="Location / Department" fullWidth required value={complaintLocation} onChange={(e) => setComplaintLocation(e.target.value)} sx={{ mb: 3 }} />
            
            <TextField label="Detailed Description" fullWidth required multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: 2 }} />

            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={isAnonymous} 
                  onChange={(e) => setIsAnonymous(e.target.checked)} 
                  color="primary" 
                />
              }
              label="Submit Anonymously (Hide your identity)"
              sx={{ mb: 4, display: 'block', textAlign: 'left' }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="outlined" fullWidth onClick={() => navigate(isEditMode ? "/MyComplaints" : "/StudentDashboard")} sx={{ textTransform: "none", fontWeight: "bold", borderRadius: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ textTransform: "none", fontWeight: "bold", borderRadius: 2, bgcolor: "#3b82f6" }}>
                {isEditMode ? "Save Changes" : "Submit"}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default AddComplaint;
