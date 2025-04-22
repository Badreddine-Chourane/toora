import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api';

const VilleEdit = () => {
  const [nom, setNom] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/villes/${id}`).then(response => setNom(response.data.nom));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/villes/${id}`, { nom }).then(() => navigate('/villes'));
  };

  return (
    <div>
      <h2>Modifier la ville</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default VilleEdit;
