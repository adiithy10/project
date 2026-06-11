import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import AddComplaint from './Components/AddComplaint'
import ComplainList from './Components/ComplainList'
import StudentDashboard from './Components/StudentDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path = "/" element={<h1>Welcome to the Campus Complaint Management System</h1>} />
        <Route path = "/addcomplaint" element={<AddComplaint />} />
        <Route path = "/complaintlist" element={<ComplainList />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />     

      </Routes>
    </>
  )
}

export default App
