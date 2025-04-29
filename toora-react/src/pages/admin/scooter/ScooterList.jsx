import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import scooterAPI from '../../../api/scooters';
import { QRCodeCanvas } from "qrcode.react";

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
      <Link to="/scooters/create" className="btn btn-success mb-3">➕ Ajouter un scooter</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Modèle</th>
            <th>État</th>
            <th>Batterie (%)</th>
            <th>QR Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scooters.map(s => (
            <tr key={s.id}>
              <td>{s.code}</td>
              <td>{s.modele}</td>
              <td>{s.etat}</td>
              <td>{s.batterie}</td>
              <td>
                <QRCodeCanvas
                  value={`http://localhost:3000/trottinettes/${s.id}/reserver`}
                  size={64}
                />
              </td>
              <td>
                <Link to={`/trottinettes/${s.id}`} className="btn btn-info btn-sm me-1">Voir</Link>
                <Link to={`/scooters/${s.id}/edit`} className="btn btn-warning btn-sm me-1">Modifier</Link>
                <button className="btn btn-danger btn-sm" onClick={() => deleteScooter(s.id)}>🗑️ Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScooterList;