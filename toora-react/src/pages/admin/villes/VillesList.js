import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api';

const VilleList = () => {
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    api.get('/villes').then(response => setVilles(response.data));
  }, []);

  const deleteVille = (id) => {
    api.delete(`/villes/${id}`).then(() => {
      setVilles(villes.filter(v => v.id !== id));
    });
  };

  return (
    <div>
      <h2>Liste des villes</h2>
      <Link to="/villes/create">➕ Ajouter une ville</Link>
      <ul>
        {villes.map(ville => (
          <li key={ville.id}>
            {ville.nom} | 
            <Link to={`/villes/${ville.id}`}> Voir </Link> |
            <Link to={`/villes/${ville.id}/edit`}> Modifier </Link> |
            <button onClick={() => deleteVille(ville.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VilleList;
