import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrottinettesPage from './pages/scooter/TrottinettesPage';
import ScooterShow from './pages/scooter/ScooterShow';

import VilleList from './pages/admin/villes/VillesList';
import VilleCreate from './pages/admin/villes/VilleCreate';
import VilleEdit from './pages/admin/villes/VilleEdit';
import VilleShow from './pages/admin/villes/VilleShow';
import ScooterCreate from './pages/admin/scooter/ScooterCreate';
import ScooterEdit from './pages/admin/scooter/ScooterEdit';
import ScooterList from './pages/admin/scooter/ScooterList';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/users/UsersList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('userRole') === 'admin');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setIsAdmin(userRole === 'admin');
  }, []);

  // Public Route Component
  const PublicRoute = ({ element }) => element;

  // Protected Route Component (requires login)
  const ProtectedRoute = ({ element }) => (
    isLoggedIn ? element : <Navigate to="/login" />
  );

  // Admin Route Component (requires admin access)
  const AdminRoute = ({ element }) => {
    if (!isLoggedIn) return <Navigate to="/login" />;
    return isAdmin ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute element={
          <HomePage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        } />} />
        <Route path="/login" element={<PublicRoute element={
          <LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
        } />} />
        <Route path="/register" element={<PublicRoute element={
          <RegisterPage setIsLoggedIn={setIsLoggedIn} />
        } />} />
        <Route path="/trottinettes" element={<PublicRoute element={
          <TrottinettesPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        } />} />
        <Route path="/trottinettes/:id" element={<PublicRoute element={
          <ScooterShow
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        } />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/admin/users" element={<AdminRoute element={<UsersList />} />} />

        <Route path="/villes" element={<AdminRoute element={<VilleList />} />} />
        <Route path="/villes/create" element={<AdminRoute element={<VilleCreate />} />} />
        <Route path="/villes/:id/edit" element={<AdminRoute element={<VilleEdit />} />} />
        <Route path="/villes/:id" element={<AdminRoute element={<VilleShow />} />} />

        <Route path="/scooters" element={<AdminRoute element={<ScooterList />} />} />
        <Route path="/scooters/create" element={<AdminRoute element={<ScooterCreate />} />} />
        <Route path="/scooters/:id/edit" element={<AdminRoute element={<ScooterEdit />} />} />

        {/* Catch-all: redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;