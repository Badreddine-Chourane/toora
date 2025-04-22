import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';

const VilleCreate = () => {
  const [nom, setNom] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/villes', { nom }).then(() => navigate('/villes'));
  };

  return (
    <div>
      <h2>Ajouter une ville</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de la ville"
          required
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default VilleCreate;
