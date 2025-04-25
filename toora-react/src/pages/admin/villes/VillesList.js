import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import villeAPI from '../../../api/villes';

const VilleList = () => {
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    villeAPI.list().then(response => setVilles(response.data));
  }, []);

  const deleteVille = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette ville ?')) {
      villeAPI.delete(id).then(() => {
        setVilles(villes.filter(v => v.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Liste des villes</h2>
      <Link to="/villes/create" className="btn btn-success mb-3">➕ Ajouter une ville</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villes.map(ville => (
            <tr key={ville.id}>
              <td>{ville.nom}</td>
              <td>
                <Link to={`/villes/${ville.id}`} className="btn btn-info btn-sm me-1">Voir</Link>
                <Link to={`/villes/${ville.id}/edit`} className="btn btn-warning btn-sm me-1">Modifier</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteVille(ville.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VilleList;