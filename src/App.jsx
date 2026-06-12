import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AddComplaint from './Components/AddComplaint'
import ComplainList from './Components/ComplainList'
import StudentDashboard from './Components/StudentDashboard'
import AdminDashboard from './Components/AdminDashboard'
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

function App() {
  return (
    <>
      <Routes>
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
    </>
  )
}

export default App
