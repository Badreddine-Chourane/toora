import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';

const VilleShow = () => {
  const [ville, setVille] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api.get(`/villes/${id}`).then(response => setVille(response.data));
  }, [id]);

  if (!ville) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Détails de la ville</h2>
      <p><strong>ID:</strong> {ville.id}</p>
      <p><strong>Nom:</strong> {ville.nom}</p>
      <Link to="/villes">⬅ Retour</Link>
    </div>
  );
};

export default VilleShow;
