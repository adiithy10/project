
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComplaintList from "./Components/AdminComplaintList";
import StatusUpdateScreen from "./Components/StatusUpdateScreen";
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AddComplaint from './Components/AddComplaint'
import ComplainList from './Components/ComplainList'
import StudentDashboard from './Components/StudentDashboard'
import AdminDashboard from './Components/AdminDashboard'


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminComplaintList />} />
        <Route path="/status-update" element={<StatusUpdateScreen />} />

    <>
     
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path = "/" element={<h1>Welcome to the Campus Complaint Management System</h1>} />
        <Route path = "/addcomplaint" element={<AddComplaint />} />
        <Route path = "/complaintlist" element={<ComplainList />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />     
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
