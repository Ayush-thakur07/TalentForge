import Dashboard from './assets/Components/Dashboard/Dashboard'
import './App.css'
import Login from './assets/Components/Authentication/Login/Login'
import Signup from './assets/Components/Authentication/Signup/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
