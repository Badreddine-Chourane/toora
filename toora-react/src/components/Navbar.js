import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">🏠 Accueil</Link>
      {user && (
        <>
          <Link to="/scooters" style={{ marginLeft: '1rem' }}>🛴 Scooters</Link>
          {user.role === 'admin' && (
            <Link to="/villes" style={{ marginLeft: '1rem' }}>🏙️ Villes</Link>
          )}
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>🚪 Logout</button>
          <span style={{ marginLeft: '1rem' }}>👤 {user.nom} ({user.role})</span>
        </>
      )}
      {!user && (
        <>
          <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
          <Link to="/register" style={{ marginLeft: '1rem' }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
