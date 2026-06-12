import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComplaintList from "./components/AdminComplaintList";
import StatusUpdateScreen from "./components/StatusUpdateScreen";

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './Components/NavBar'


import Login from './components/Login'
import Register from './components/Register'



import AddComplaint from './Components/AddComplaint'
import ComplainList from './Components/ComplainList'
import StudentDashboard from './Components/StudentDashboard'
import AdminDashboard from './Components/AdminDashboard'


import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

function App() {

  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminComplaintList />} />
        <Route path="/status-update" element={<StatusUpdateScreen />} />

    
    
        <Route path='/'element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path = "/" element={<h1>Welcome to the Campus Complaint Management System</h1>} />
        <Route path = "/addcomplaint" element={<AddComplaint />} />
        <Route path = "/complaintlist" element={<ComplainList />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />     
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path='/' element={<MyComplaints />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<h1>Welcome to the Campus Complaint Management System</h1>} />
        <Route path="/addcomplaint" element={<AddComplaint />} />
        <Route path="/complaintlist" element={<ComplainList />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />     
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        <Route path="/mycomplaints" element={<MyComplaints />} />
        <Route path="/complaintdetails" element={<ComplaintDetails />} />
       
       </Routes>
    </BrowserRouter>
  );
}

export default App;