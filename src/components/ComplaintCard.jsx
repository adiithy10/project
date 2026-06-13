import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

function ComplaintCard({ complaint }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {complaint.title}
        </Typography>

        <Typography color="text.secondary">
          {complaint.category}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          📍 {complaint.location}
        </Typography>

        <Chip
          sx={{ mt: 2 }}
          label={complaint.status}
          color={
            complaint.status === "Resolved"
              ? "success"
              : complaint.status === "In Progress"
              ? "info"
              : "warning"
          }
        />

       <Button
       component={Link}
       to={`/complaintdetails/${complaint.id}`}
       variant="contained"
       fullWidth
       sx={{ mt: 2 }}
>
       View Details
      </Button>
      </CardContent>
    </Card>
  );
}

export default ComplaintCard;