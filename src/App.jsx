import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddComplaint from './components/AddComplaint'
import ComplainList from './components/ComplainList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path = "/" element={<h1>Welcome to the Campus Complaint Management System</h1>} />
        <Route path = "/addcomplaint" element={<AddComplaint />} />
        <Route path = "/complaintlist" element={<ComplainList />} />     
      </Routes>
    </>
  )
}

export default App
