import Dashboard from './assets/Components/Dashboard/Dashboard'
import './App.css'
import BrowseStudents from './assets/Components/Dashboard/BrowseStudents/BrowseStudents'
import Login from './assets/Components/Authentication/Login/Login'
import Signup from './assets/Components/Authentication/Signup/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './assets/Components/Dashboard/DashboardLayout/DashboardLayout'
function ProtectedRoute({ children }) {
    const localLogin = localStorage.getItem("isLoggedIn");
    const sessionLogin = sessionStorage.getItem("isLoggedIn");

    if (localLogin === "true" || sessionLogin === "true") {
        return children;
    }

    return <Navigate to="/login" replace />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>}/>
        <Route path="/students" element={
        <ProtectedRoute>
            <DashboardLayout>
                <BrowseStudents />
            </DashboardLayout>
        </ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
