import Profile from './assets/Components/Profile/Profile';
import Dashboard from './assets/Components/Dashboard/Dashboard';
import './App.css';

import BrowseStudents from './assets/Components/Dashboard/BrowseStudents/BrowseStudents';
import NotificationsPage from './assets/Components/Dashboard/Notifications/NotificationsPage';
import Login from './assets/Components/Authentication/Login/Login';
import Signup from './assets/Components/Authentication/Signup/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import DashboardLayout from './assets/Components/Dashboard/DashboardLayout/DashboardLayout';

import { NotificationProvider } from './context/NotificationContext';
import { ApplicationProvider } from './context/ApplicationContext';

import SearchPage from './assets/Components/Dashboard/Search/SearchPage';
import Saved from './assets/Components/Saved/Saved';

import { UserProvider, useUser } from './context/UserContext';
import { MessageProvider } from './context/MessageContext';


function ProtectedRoute({ children }) {

  const { currentUser, loading } = useUser();

  // If authentication is still loading,
  // show a loading screen instead of redirecting.
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            fontSize: "1.2rem",
            color: "#4f46e5"
          }}
        >
          Loading TalentForge...
        </div>
      </div>
    );
  }

  // If a user exists, allow access to the protected page.
  if (currentUser) {
    return children;
  }

  // If no user is logged in, redirect to login.
  return <Navigate to="/login" replace />;
}


function AppRoutes() {

  return (
    <BrowserRouter>

      <ApplicationProvider>

        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Browse Students */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <BrowseStudents />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Saved */}
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Saved />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <NotificationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Search */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SearchPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

        </Routes>

      </ApplicationProvider>

    </BrowserRouter>
  );
}


function App() {

  return (
    <UserProvider>

      <NotificationProvider>

        <MessageProvider>

          <AppRoutes />

        </MessageProvider>

      </NotificationProvider>

    </UserProvider>
  );
}


export default App;