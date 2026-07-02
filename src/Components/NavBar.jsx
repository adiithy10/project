import { AppBar, Button, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <AppBar>
            <Toolbar>
                <h3>CCMS</h3>&nbsp;&nbsp;
                <Link to="/addcomplaint">
                <Button variant="contained" color="secondary" >Add Complaint</Button>
                </Link>&nbsp;&nbsp;

                <Link to="/complaintlist">
                <Button variant="contained" color="primary" >View Complaints</Button>
                </Link>&nbsp;&nbsp;

                <Link to="/mycomplaints">
                <Button variant="contained" color="info" >My Complaints</Button>
                </Link>&nbsp;&nbsp;
            </Toolbar>
        </AppBar>
        <br /><br /><br /><br />
    </div>
  )
}

export default NavBar
