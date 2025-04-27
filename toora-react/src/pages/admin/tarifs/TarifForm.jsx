import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tarifAPI from '../../../api/tarifs';
import villeAPI from '../../../api/villes';

const TarifForm = () => {
  const [form, setForm] = useState({
    ville_id: '',
    prix_de_depart: '',
    prix_par_heure: ''
  });
  const [villes, setVilles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    villeAPI.list().then(res => setVilles(res.data));
    if (id) {
      tarifAPI.get(id).then(res => setForm(res.data));
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (id) {
      tarifAPI.update(id, form).then(() => navigate('/tarifs'));
    } else {
      tarifAPI.create(form).then(() => navigate('/tarifs'));
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Modifier' : 'Ajouter'} un tarif</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="ville_id"
          value={form.ville_id}
          onChange={handleChange}
          className="form-control mb-2"
          required
          disabled={!!id}
        >
          <option value="">Sélectionner une ville</option>
          {villes.map(v => (
            <option key={v.id} value={v.id}>{v.nom}</option>
          ))}
        </select>
        <input
          name="prix_de_depart"
          value={form.prix_de_depart}
          onChange={handleChange}
          placeholder="Prix de départ"
          className="form-control mb-2"
          required
          type="number"
          step="0.01"
        />
        <input
          name="prix_par_heure"
          value={form.prix_par_heure}
          onChange={handleChange}
          placeholder="Prix par heure"
          className="form-control mb-2"
          required
          type="number"
          step="0.01"
        />
        <button className="btn btn-success" type="submit">
          {id ? 'Mettre à jour' : 'Créer'}
        </button>
      </form>
    </div>
  );
};

export default TarifForm;