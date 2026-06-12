import {
  Container,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

function ComplaintDetails() {
  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">
          Complaint Details
        </Typography>

        <Typography sx={{ mt: 2 }}>
          WiFi Not Working
        </Typography>

        <Typography>
          Internet/Wi-Fi
        </Typography>

        <Typography>
          Hostel Block A
        </Typography>

        <Typography>
          Internet is unavailable in hostel.
        </Typography>

        <Chip
          label="Pending"
          color="warning"
          sx={{ mt: 2 }}
        />
      </Paper>
    </Container>
  );
}

export default ComplaintDetails;