import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import NavBar from './NavBar';
import axios from 'axios';

const StudentDashboard = () => {
const [data, setData] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
const storedName = localStorage.getItem('name');
const userName = (storedName && storedName !== "undefined") ? storedName : "Student";

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      
      <NavBar userName={userName} />
      
      <Container maxWidth="lg" sx={{ mt: 5, pb: 5 }}>
        
        <Grid container spacing={3} sx={{ mb: 5 }} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#f59e0b', color: '#fff', borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(245,158,11,0.15)' }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="subtitle1" fontWeight="500">Pending Complaints</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{data.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#3b82f6', color: '#fff', borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(59,130,246,0.15)' }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="subtitle1" fontWeight="500">In Progress</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{data.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card sx={{ bgcolor: '#10b981', color: '#fff', borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.15)' }}>
              <CardContent sx={{ py: 3 }}>
                <Typography variant="subtitle1" fontWeight="500">Resolved Complaints</Typography>
                <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>{data.resolved}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        
        <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: 'md', mx: 'auto', boxShadow: '0px 2px 8px rgba(0,0,0,0.04)' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f1f5f9' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#475569', py: 2 }}>Total Overview Metric</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: '#475569', py: 2 }}>Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell sx={{ py: 2 }}>System Logged Actions (Total Complaints)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', py: 2 }}>{data.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

      </Container>
    </Box>
  );
};

export default StudentDashboard;
