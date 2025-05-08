import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrottinettesPage from './pages/scooter/TrottinettesPage';
import ScooterShow from './pages/scooter/ScooterShow';
import ReserveScooter from './pages/scooter/ReserveScooter';
import PaiementPage from './pages/paiement/PaiementPage';

import VilleList from './pages/admin/villes/VillesList';
import VilleCreate from './pages/admin/villes/VilleCreate';
import VilleEdit from './pages/admin/villes/VilleEdit';
import VilleShow from './pages/admin/villes/VilleShow';
import ScooterCreate from './pages/admin/scooter/ScooterCreate';
import ScooterEdit from './pages/admin/scooter/ScooterEdit';
import ScooterList from './pages/admin/scooter/ScooterList';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersList from './pages/admin/users/UsersList';
// import EditUser from './pages/admin/users/EditUser';
import TarifList from './pages/admin/tarifs/TarifList';
import TarifForm from './pages/admin/tarifs/TarifForm';
import AllLocations from './pages/admin/locations/AllLocations';
import UserReservations from './pages/user/UserReservations';
import ChangeInfoPage from './pages/user/ChangeInfoPage';

import './App.css';

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
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        handleLogout={() => {
          localStorage.clear();
          setIsLoggedIn(false);
          setIsAdmin(false);
        }}
      />

      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute element={<HomePage />} />} />
          <Route path="/login" element={<PublicRoute element={<LoginPage setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />} />
          <Route path="/register" element={<PublicRoute element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />} />
          <Route path="/trottinettes" element={<PublicRoute element={<TrottinettesPage />} />} />
          <Route path="/trottinettes/:id" element={<PublicRoute element={<ScooterShow />} />} />
          <Route path="/trottinettes/:id/reserver" element={<ReserveScooter />} />
          <Route path="/paiement/:locationId" element={<PaiementPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/admin/users" element={<AdminRoute element={<UsersList />} />} />
          {/* <Route path="/admin/users/:id/edit" element={<AdminRoute element={<EditUser />} />} /> */}
          <Route path="/villes" element={<AdminRoute element={<VilleList />} />} />
          <Route path="/villes/create" element={<AdminRoute element={<VilleCreate />} />} />
          <Route path="/villes/:id/edit" element={<AdminRoute element={<VilleEdit />} />} />
          <Route path="/villes/:id" element={<AdminRoute element={<VilleShow />} />} />
          <Route path="/scooters" element={<AdminRoute element={<ScooterList />} />} />
          <Route path="/scooters/create" element={<AdminRoute element={<ScooterCreate />} />} />
          <Route path="/scooters/:id/edit" element={<AdminRoute element={<ScooterEdit />} />} />
          <Route path="/tarifs" element={<AdminRoute element={<TarifList />} />} />
          <Route path="/tarifs/create" element={<AdminRoute element={<TarifForm />} />} />
          <Route path="/tarifs/:id/edit" element={<AdminRoute element={<TarifForm />} />} />
          <Route path="/admin/locations" element={<AdminRoute element={<AllLocations />} />} />
          <Route path="/mes-reservations" element={<UserReservations />} />
          <Route path="/changer-info" element={<ProtectedRoute element={<ChangeInfoPage />} />} />

          {/* Catch-all: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;