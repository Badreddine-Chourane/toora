import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Register = () => {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
    mot_de_passe_confirmation: '',
    ville_id: '',
    role: 'utilisateur',
  });

  const [villes, setVilles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/villes').then(res => setVilles(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/register', form);
      alert('Inscription réussie ! Vous êtes maintenant connecté(e).');
      navigate('/'); // Redirect to homepage or dashboard
    } catch (error) {
      console.error(error);
      const err = error.response?.data?.errors || error.response?.data?.message;
      alert('Erreur: ' + JSON.stringify(err));
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input name="nom" placeholder="Nom" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="mot_de_passe" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <input name="mot_de_passe_confirmation" type="password" placeholder="Confirmer le mot de passe" onChange={handleChange} required />

        <select name="ville_id" onChange={handleChange}>
          <option value="">-- Ville (optionnel) --</option>
          {villes.map(v => (
            <option key={v.id} value={v.id}>{v.nom}</option>
          ))}
        </select>

        <select name="role" onChange={handleChange}>
          <option value="utilisateur">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">S’inscrire</button>
      </form>
    </div>
  );
};

export default Register;
