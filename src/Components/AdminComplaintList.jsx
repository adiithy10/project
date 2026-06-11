import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";

function AdminComplaintList() {
 const complaints = [
  {
    id: 1,
    title: "WiFi Issue",
    category: "Internet",
    status: "Pending",
  },
  {
    id: 2,
    title: "Broken Fan",
    category: "Classroom",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Water Leakage",
    category: "Hostel",
    status: "Resolved",
  },
  {
    id: 4,
    title: "Computer Not Working",
    category: "Laboratory",
    status: "Pending",
  },
  {
    id: 5,
    title: "Library AC Problem",
    category: "Library",
    status: "Resolved",
  },
  {
    id: 6,
    title: "Electrical Failure",
    category: "Electrical",
    status: "In Progress",
  },
  {
    id: 7,
    title: "Water Supply Issue",
    category: "Water Supply",
    status: "Pending",
  },
  {
    id: 8,
    title: "Classroom Lights Not Working",
    category: "Classroom",
    status: "Resolved",
  },
  {
    id: 9,
    title: "Dirty Washroom",
    category: "Cleanliness",
    status: "Pending",
  },
  {
    id: 10,
    title: "Projector Malfunction",
    category: "Classroom",
    status: "In Progress",
  },
];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        color="white"
        gutterBottom
      >
        Admin Complaint List
      </Typography>

      <Grid container spacing={3}>
        {complaints.map((complaint) => (
          <Grid item xs={12} md={4} key={complaint.id}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.9)",
                boxShadow: 8,
              }}
            >
              <CardContent>
                <Typography variant="h5">
                  {complaint.title}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Category : {complaint.category}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={complaint.status}
                    color={
                      complaint.status === "Resolved"
                        ? "success"
                        : complaint.status === "In Progress"
                        ? "warning"
                        : "error"
                    }
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AdminComplaintList;