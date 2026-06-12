import {
  Container,
  Typography,
  Grid,
} from "@mui/material";

import ComplaintCard from "../components/ComplaintCard";
import dummyComplaints from "../data/dummyComplaints";

function MyComplaints() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        My Complaints
      </Typography>

      <Grid container spacing={3}>
        {dummyComplaints.map((complaint) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={complaint.id}
          >
            <ComplaintCard complaint={complaint} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyComplaints;