// src/pages/Login.js
import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', mot_de_passe: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      setUser(res.data.user);
      navigate('/scooters');
    } catch (err) {
      console.error(err.response?.data);
      setError(err.response?.data?.error || 'Erreur lors de la connexion');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="mot_de_passe" type="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
