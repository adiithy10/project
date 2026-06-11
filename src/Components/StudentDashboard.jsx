import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import NavBar from './NavBar';

const StudentDashboard = () => {
  return (
    <div>
      <NavBar/>
        <h1>Dashboard</h1>
           <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Total Complaints</TableCell>
              <TableCell>Resolved Complaints</TableCell>
              <TableCell>Pending Complaints</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>26</TableCell>
              <TableCell>10</TableCell>
              <TableCell>16</TableCell>
            </TableRow>
                       
          </TableBody>
        </Table>
      </TableContainer>
      
     
    </Paper>
    <br /> <br /> <br /> <br /> 
   
    <Button variant='contained' color='error'>Sign Out</Button>
    </div>
  )
}

export default StudentDashboard