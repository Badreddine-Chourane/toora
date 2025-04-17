import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import VilleList from './pages/villes/VillesList';
import VilleCreate from './pages/villes/VilleCreate';
import VilleEdit from './pages/villes/VilleEdit';
import VilleShow from './pages/villes/VilleShow';
import ScooterList from "./pages/scooter/ScooterList";
import ScooterCreate from "./pages/scooter/ScooterCreate";
import ScooterEdit from "./pages/scooter/ScooterEdit";
import ScooterShow from "./pages/scooter/ScooterShow";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/villes" element={<PrivateRoute role="admin"><VilleList /></PrivateRoute>} />
          <Route path="/villes/create" element={<PrivateRoute role="admin"><VilleCreate /></PrivateRoute>} />
          <Route path="/villes/:id/edit" element={<PrivateRoute role="admin"><VilleEdit /></PrivateRoute>} />
          <Route path="/villes/:id" element={<PrivateRoute><VilleShow /></PrivateRoute>} />

          <Route path="/scooters" element={<PrivateRoute><ScooterList /></PrivateRoute>} />
          <Route path="/scooters/create" element={<PrivateRoute><ScooterCreate /></PrivateRoute>} />
          <Route path="/scooters/:id/edit" element={<PrivateRoute><ScooterEdit /></PrivateRoute>} />
          <Route path="/scooters/:id" element={<PrivateRoute><ScooterShow /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
