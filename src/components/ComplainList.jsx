import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React , {useState} from 'react'


const ComplainList = () => {
    const [complaints] = useState([
        {
            Id: "CMP001",
            Title: "Complaint 1",
            Category: "Category 1",
            Description: "Description 1",
            Location: "Location 1",
            DateSubmitted: "2023-01-01",
            Status: "Pending"
        },
        {
            Id: "CMP002",
            Title: "Complaint 2",
            Category: "Category 2",
            Description: "Description 2",
            Location: "Location 2",
            DateSubmitted: "2023-01-02",
            Status: "Resolved"
        }
    ])

    return (
        <div>
            <h3>Complaint List</h3>
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Complaint ID</TableCell>
                        <TableCell>Complainant Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Date Submitted</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>                                           
                </TableHead>
                <TableBody>
                    {complaints.map((complaint) => (
                        
                    <TableRow>
                        <TableCell>{complaint.Id}</TableCell>
                        <TableCell>{complaint.Title}</TableCell>
                        <TableCell>{complaint.Category}</TableCell>
                        <TableCell>{complaint.Description}</TableCell>
                        <TableCell>{complaint.Location}</TableCell>
                        <TableCell>{complaint.DateSubmitted}</TableCell>
                        <TableCell>{complaint.Status}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default ComplainList