import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AddComplaint from "./components/AddComplaint";
import ComplainList from "./components/ComplainList";
import AdminComplaintList from "./components/AdminComplaintList";
import StatusUpdateScreen from "./components/StatusUpdateScreen";
import MyComplaints from "./components/MyComplaints";
import ComplaintDetails from "./components/ComplaintDetails";
import Home from './Components/Home';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/AddComplaint" element={<AddComplaint />} />
      <Route path="/ComplainList" element={<ComplainList />} />
      <Route path="/AdminComplaintList" element={<AdminComplaintList />} />
      <Route path="/StatusUpdateScreen/:id" element={<StatusUpdateScreen />} />
      <Route path="/MyComplaints" element={<MyComplaints />} />
      <Route path="/ComplaintDetails/:id" element={<ComplaintDetails />} />
      
    </Routes>
  );
}

export default App;
