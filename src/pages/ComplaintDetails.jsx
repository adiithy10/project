import {
  Container,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

import { useParams } from "react-router-dom";
import dummyComplaints from "../data/dummyComplaints";

function ComplaintDetails() {
  const { id } = useParams();

  const complaint = dummyComplaints.find(
    (c) => c.id === Number(id)
  );

  if (!complaint) {
    return <h2>Complaint Not Found</h2>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">
          Complaint Details
        </Typography>

        <Typography sx={{ mt: 2 }}>
          <strong>Title:</strong> {complaint.title}
        </Typography>

        <Typography>
          <strong>Category:</strong> {complaint.category}
        </Typography>

        <Typography>
          <strong>Location:</strong> {complaint.location}
        </Typography>

        <Typography>
          <strong>Description:</strong> {complaint.description}
        </Typography>

        <Chip
          label={complaint.status}
          color={
            complaint.status === "Resolved"
              ? "success"
              : complaint.status === "In Progress"
              ? "info"
              : "warning"
          }
          sx={{ mt: 2 }}
        />
      </Paper>
    </Container>
  );
}

export default ComplaintDetails;