import React from "react";
import { Card, CardContent, Typography, Box, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ComplaintCard({ complaint }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/AddComplaint", { state: { editComplaint: complaint } });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:4000/api/complaints/${complaint._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        alert("Complaint deleted successfully");
        window.location.reload();
      })
      .catch(err => console.error("Delete error:", err));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "warning";
      case "In Progress": return "info";
      case "Resolved": return "success";
      default: return "default";
    }
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 345, borderRadius: 3, boxShadow: 2, p: 1, bgcolor: '#fff' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            {complaint.title}
          </Typography>
          <Chip label={complaint.status} color={getStatusColor(complaint.status)} size="small" sx={{ fontWeight: 'bold' }} />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Category:</strong> {complaint.category}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Location:</strong> {complaint.location}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Submitted By:</strong> {complaint.isAnonymous ? "Anonymous Student" : (complaint.createdBy?.name || "Student")}
        </Typography>

        <Button 
          variant="contained" 
          fullWidth 
          sx={{ bgcolor: "#1e293b", textTransform: 'none', mb: 1, fontWeight: 'bold', '&:hover': { bgcolor: '#334155' } }} 
          onClick={() => navigate(`/ComplaintDetails/${complaint._id}`)} 
        >
          View Full Details
        </Button>

       
        {complaint.status === "Pending" ? (
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button 
              variant="outlined" 
              fullWidth 
              size="small" 
              onClick={handleEdit} 
              sx={{ textTransform: 'none', fontWeight: 'bold', color: '#3b82f6', borderColor: '#3b82f6' }}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              fullWidth 
              size="small" 
              onClick={handleDelete} 
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Delete
            </Button>
          </Box>
        ) : (
          
          <Box sx={{ 
            mt: 1.5, 
            p: 1, 
            bgcolor: complaint.status === "Resolved" ? '#f0fdf4' : '#f0f9ff', 
            borderRadius: 2, 
            border: '1px dashed',
            borderColor: complaint.status === "Resolved" ? '#bbf7d0' : '#bae6fd',
            textAlign: 'center' 
          }}>
            <Typography variant="caption" sx={{ 
              fontWeight: '600', 
              color: complaint.status === "Resolved" ? '#16a34a' : '#0284c7',
              display: 'block'
            }}>
              Action locked due to status: {complaint.status}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ComplaintCard;
