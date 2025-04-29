// src/pages/scooters/ScooterCreate.js
import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from "qrcode.react";

const ScooterCreate = () => {
  const [form, setForm] = useState({
    code: '',
    modele: '',
    etat: '',
    batterie: '',
    latitude: '',
    longitude: '',
    ville_id: '',
    en_location: false,
    photo: null
  });
  
  const [villes, setVilles] = useState([]);
  const [createdId, setCreatedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/villes').then(response => setVilles(response.data));
  }, []);

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
    formData.append('en_location', form.en_location ? '1' : '0'); // ✅ boolean to string
    if (form.photo) {
      formData.append('photo', form.photo);
    }
  
    try {
      const res = await api.post('/scooters', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setCreatedId(res.data.id); // or res.data.scooter.id depending on your API
      alert('Scooter créé avec succès !');
      navigate('/scooters');
    } catch (error) {
      if (error.response?.data?.errors) {
        console.error('Validation Errors:', error.response.data.errors);
        alert('Erreur: ' + JSON.stringify(error.response.data.errors));
      } else {
        console.error(error);
        alert('Erreur lors de la création du scooter.');
      }
    }
  };
  
 
  

  return (
    <div>
      <h2>Ajouter un scooter</h2>
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="Code" onChange={handleChange} />
        <input name="modele" placeholder="Modèle" onChange={handleChange} />
        <input name="etat" placeholder="État" onChange={handleChange} />
        <input name="batterie" type="number" placeholder="Batterie" onChange={handleChange} />
        <input name="latitude" placeholder="Latitude" onChange={handleChange} />
        <input name="longitude" placeholder="Longitude" onChange={handleChange} />
        <select name="ville_id" onChange={handleChange}>
          <option value="">-- Sélectionner une ville --</option>
          {villes.map(v => (
            <option key={v.id} value={v.id}>{v.nom}</option>
          ))}
        </select>
        <label>
          En location:
          <input
            type="checkbox"
            checked={form.en_location}
            onChange={(e) =>
              setForm({ ...form, en_location: e.target.checked })
            }
          />
        </label>
        <input type="file" name="photo" onChange={handleChange} />
        <button type="submit">Créer</button>
      </form>
      {createdId && (
  <div className="mt-4 text-center">
    <h5>QR Code pour réserver ce scooter :</h5>
    <QRCodeCanvas value={`http://localhost:3000/trottinettes/${createdId}/reserver`} size={180} />
    <div className="mt-2">
      <small>Scannez pour réserver ce scooter</small>
    </div>
  </div>
)}
    </div>
  );
};

export default ScooterCreate;
