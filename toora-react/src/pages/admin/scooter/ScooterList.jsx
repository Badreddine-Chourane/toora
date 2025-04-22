import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import scooterAPI from '../../../../api/scooters';

const ScooterList = () => {
  const [scooters, setScooters] = useState([]);

  useEffect(() => {
    scooterAPI.list().then(response => setScooters(response.data));
  }, []);

  const deleteScooter = (id) => {
    scooterAPI.delete(id).then(() => {
      setScooters(scooters.filter(s => s.id !== id));
    });
  };

  return (
    <div>
      <h2>Liste des scooters</h2>
      <Link to="/scooters/create">➕ Ajouter un scooter</Link>
      <ul>
        {scooters.map(s => (
          <li key={s.id}>
            {s.code} - {s.modele} ({s.etat}) | 🔋 {s.batterie}% |
            <Link to={`/scooters/${s.id}`}> Voir </Link> |
            <Link to={`/scooters/${s.id}/edit`}> Modifier </Link> |
            <button onClick={() => deleteScooter(s.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScooterList;
