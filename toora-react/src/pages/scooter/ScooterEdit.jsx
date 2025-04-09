// src/pages/scooters/ScooterEdit.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import scooterAPI from '../../api/scooters';
import api from '../../api';

const ScooterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    scooterAPI.get(id).then(res => setForm(res.data));
    api.get('/villes').then(res => setVilles(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('code', form.code);
    formData.append('modele', form.modele);
    formData.append('etat', form.etat);
    formData.append('batterie', form.batterie);
    formData.append('latitude', form.latitude);
    formData.append('longitude', form.longitude);
    formData.append('ville_id', form.ville_id);
    formData.append('en_location', form.en_location ? '1' : '0');

    if (form.photo instanceof File) {
      formData.append('photo', form.photo);
    }

    try {
      await scooterAPI.update(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Scooter modifié avec succès !');
      navigate('/scooters');
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error('Validation Errors:', error.response.data.errors);
        alert('Erreur: ' + JSON.stringify(error.response.data.errors));
      } else {
        console.error(error);
        alert('Erreur lors de la modification du scooter.');
      }
    }
  };

  if (!form) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier le scooter</h2>
      <form onSubmit={handleSubmit}>
        <input name="code" value={form.code} onChange={handleChange} required />
        <input name="modele" value={form.modele} onChange={handleChange} required />
        <input name="etat" value={form.etat} onChange={handleChange} required />
        <input
          name="batterie"
          type="number"
          value={form.batterie}
          onChange={handleChange}
          required
        />
        <input name="latitude" value={form.latitude} onChange={handleChange} required />
        <input name="longitude" value={form.longitude} onChange={handleChange} required />
        
        <select name="ville_id" value={form.ville_id} onChange={handleChange} required>
          <option value="">-- Sélectionner une ville --</option>
          {villes.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nom}
            </option>
          ))}
        </select>

        <label>
          En location:
          <input
            name="en_location"
            type="checkbox"
            checked={form.en_location}
            onChange={handleChange}
          />
        </label>

        <input name="photo" type="file" onChange={handleChange} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default ScooterEdit;
