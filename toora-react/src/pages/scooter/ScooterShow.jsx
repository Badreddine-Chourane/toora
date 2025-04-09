import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import scooterAPI from '../../api/scooters';

const ScooterShow = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);

  useEffect(() => {
    scooterAPI.get(id).then(res => setScooter(res.data));
  }, [id]);

  if (!scooter) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails du scooter</h2>
      <p><strong>Code:</strong> {scooter.code}</p>
      <p><strong>Modèle:</strong> {scooter.modele}</p>
      <p><strong>État:</strong> {scooter.etat}</p>
      <p><strong>Batterie:</strong> {scooter.batterie}%</p>
      <p><strong>Latitude:</strong> {scooter.latitude}</p>
      <p><strong>Longitude:</strong> {scooter.longitude}</p>
      <p><strong>Ville:</strong> {scooter.ville ? scooter.ville.nom : 'N/A'}</p>

      <p><strong>En location:</strong> {scooter.en_location ? 'Oui' : 'Non'}</p>
      {scooter.photo && <img src={`http://localhost:8000/storage/${scooter.photo}`} alt="Scooter" width="200" />}
      <br />
      <Link to="/scooters">🔙 Retour à la liste</Link>
    </div>
  );
};

export default ScooterShow;
