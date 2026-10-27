import ManagePlan from './assets/Components/Dashboard/Subscription/ManagePlan';
import PaymentUpgradeModal from './assets/Components/Dashboard/Subscription/PaymentUpgradeModal';
import Profile from './assets/Components/Profile/Profile';
import Dashboard from './assets/Components/Dashboard/Dashboard';
import './App.css';
import LandingPage from './pages/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
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
import CollaborationPlanner from './assets/Components/Dashboard/CollaborationPlanner/CollaborationPlanner';
import ResumeBuilder from './assets/Components/Dashboard/ResumeBuilder/ResumeBuilder';

import { UserProvider, useUser } from './context/UserContext';
import { MessageProvider } from './context/MessageContext';
import ThemeProvider from './context/ThemeContext';
import { useTranslation } from 'react-i18next';


function ProtectedRoute({ children }) {

  const { t } = useTranslation();
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
          {t('common.loading', 'Loading TalentForge...')}
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

        <PaymentUpgradeModal />

        <Routes>
          {/* Manage Plan */}
          <Route
            path="/manage-plan"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ManagePlan />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Login */}
          <Route
  path="/"
  element={
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  }
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

          {/* Collaboration Planner */}
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CollaborationPlanner />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Resume Builder */}
          <Route
            path="/resume-builder"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ResumeBuilder />
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
    <ThemeProvider>
      <UserProvider>

        <NotificationProvider>

          <MessageProvider>

            <AppRoutes />

          </MessageProvider>

        </NotificationProvider>

      </UserProvider>
    </ThemeProvider>
  );
}


export default App;