import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tarifAPI from '../../../api/tarifs';

const TarifList = () => {
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    tarifAPI.list().then(res => setTarifs(res.data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Supprimer ce tarif ?')) {
      tarifAPI.delete(id).then(() => setTarifs(tarifs.filter(t => t.id !== id)));
    }
  };

  return (
    <div>
      <h2>Tarifs par ville</h2>
      <Link to="/tarifs/create" className="btn btn-success mb-3">➕ Ajouter un tarif</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Ville</th>
            <th>Prix de départ</th>
            <th>Prix par heure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tarifs.map(tarif => (
            <tr key={tarif.id}>
              <td>
                {tarif.ville && tarif.ville.nom
                  ? tarif.ville.nom
                  : (tarif.ville_id || 'N/A')}
              </td>
              <td>{tarif.prix_de_depart} MAD</td>
              <td>{tarif.prix_par_heure} MAD</td>
              <td>
                <Link to={`/tarifs/${tarif.id}/edit`} className="btn btn-warning btn-sm me-1">Modifier</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(tarif.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TarifList;