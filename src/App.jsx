import { useState } from 'react'
import Dashboard from './assets/Components/Dashboard/Dashboard'
import './App.css'
import BrowseStudents from './assets/Components/Dashboard/BrowseStudents/BrowseStudents'
import NotificationsPage from './assets/Components/Dashboard/Notifications/NotificationsPage'
import Login from './assets/Components/Authentication/Login/Login'
import Signup from './assets/Components/Authentication/Signup/Signup'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './assets/Components/Dashboard/DashboardLayout/DashboardLayout'
import { NotificationProvider } from './context/NotificationContext'

function ProtectedRoute({ user, children }) {
    if (user) {
        return children;
    }

    return <Navigate to="/login" replace />;
}

function App() {
  const [user, setuser] = useState(null);
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} setuser={setuser} />} />
          <Route path="/login" element={<Login user={user} setuser={setuser} />} />
          <Route
          path="/signup"
          element={<Signup user={user} setuser={setuser} />}
          />

          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }/>

          <Route path="/students" element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <BrowseStudents />
              </DashboardLayout>
            </ProtectedRoute>
          }/>

          <Route path="/notifications" element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <NotificationsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App
