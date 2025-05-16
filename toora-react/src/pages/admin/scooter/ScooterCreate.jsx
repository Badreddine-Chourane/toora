import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, QrCode, CheckCircle, MapPin } from 'lucide-react';
import api from '../../../api';
import { QRCodeCanvas } from "qrcode.react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Correction pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ScooterCreate = () => {
  const [form, setForm] = useState({
    code: '',
    modele: '',
    etat: 'disponible',
    batterie: 100,
    latitude: '',
    longitude: '',
    ville_id: '',
    en_location: false,
    photo: null
  });
  
  const [villes, setVilles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger la liste des villes
    const fetchVilles = async () => {
      try {
        const response = await api.get('/villes');
        setVilles(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des villes:", err);
        setError("Échec du chargement des villes. Veuillez rafraîchir la page.");
      }
    };
    
    fetchVilles();
  }, []);

  useEffect(() => {
    if (showMapModal && !map) {
      const initialLat = form.latitude || 48.8566; // Paris par défaut
      const initialLng = form.longitude || 2.3522;
      
      const mapInstance = L.map('map-container').setView([initialLat, initialLng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
      }).addTo(mapInstance);
      
      // Ajouter un marqueur si des coordonnées existent
      if (form.latitude && form.longitude) {
        const newMarker = L.marker([form.latitude, form.longitude]).addTo(mapInstance);
        setMarker(newMarker);
      }
      
      // Gestion du clic sur la carte
      mapInstance.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        if (marker) {
          mapInstance.removeLayer(marker);
        }
        
        const newMarker = L.marker([lat, lng]).addTo(mapInstance);
        setMarker(newMarker);
        
        setForm(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString()
        }));
      });
      
      setMap(mapInstance);
      
      return () => {
        mapInstance.remove();
      };
    }
  }, [showMapModal]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    
    Object.keys(form).forEach(key => {
      if (key === 'photo') {
        if (form.photo) {
          formData.append('photo', form.photo);
        }
      } else if (key === 'en_location') {
        formData.append('en_location', form.en_location ? '1' : '0');
      } else {
        formData.append(key, form[key]);
      }
    });
  
    try {
      const res = await api.post('/scooters', formData, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });
      
      setCreatedId(res.data.id);
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/scooters');
      }, 3000);
    } catch (error) {
      console.error("Erreur API:", error);
      
      if (error.response) {
        if (error.response.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
            .join('\n');
          setError(`Erreurs de validation:\n${errorMessages}`);
        } else if (error.response.data?.message) {
          setError(`Erreur serveur: ${error.response.data.message}`);
        } else {
          setError(`Erreur serveur (${error.response.status})`);
        }
      } else if (error.request) {
        setError("Pas de réponse du serveur. Vérifiez votre connexion.");
      } else {
        setError(`Erreur de requête: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm({
            ...form,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          setError("Impossible d'obtenir votre position. Entrez les coordonnées manuellement.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  const handleMapClick = () => {
    setShowMapModal(true);
  };

  const confirmMapSelection = () => {
    setShowMapModal(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/scooters')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux scooters
          </button>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Plus className="mr-2 text-blue-500" size={24} />
            Ajouter un nouveau scooter
          </h2>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            <h3 className="font-medium mb-1">Erreur</h3>
            <pre className="text-sm whitespace-pre-wrap">{error}</pre>
          </div>
        )}

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={20} />
            <div>
              <h3 className="font-medium">Succès !</h3>
              <p className="text-sm">Scooter créé avec succès. Redirection vers la liste...</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                    placeholder="Code unique du scooter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modèle *</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="modele"
                    value={form.modele}
                    onChange={handleChange}
                    required
                    placeholder="ex: Xiaomi Pro 2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut *</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="etat"
                    value={form.etat}
                    onChange={handleChange}
                    required
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                    {/* <option value="reserved">Reserved</option> */}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batterie (%) *</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="batterie"
                    type="number"
                    min="0"
                    max="100"
                    value={form.batterie}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coordonnées *
                    <div className="flex gap-2 mt-1">
                      <button 
                        type="button" 
                        onClick={getCurrentLocation}
                        className="flex-1 text-xs py-1 px-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        Position actuelle
                      </button>
                      <button 
                        type="button" 
                        onClick={handleMapClick}
                        className="flex-1 text-xs py-1 px-2 bg-green-50 text-green-600 rounded hover:bg-green-100 flex items-center justify-center"
                      >
                        <MapPin size={14} className="mr-1" />
                        Choisir sur la carte
                      </button>
                    </div>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        name="latitude"
                        value={form.latitude}
                        onChange={handleChange}
                        required
                        placeholder="Latitude"
                      />
                    </div>
                    <div>
                      <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        name="longitude"
                        value={form.longitude}
                        onChange={handleChange}
                        required
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="ville_id"
                    value={form.ville_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez une ville</option>
                    {villes.map(v => (
                      <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                  </select>
                </div>
                
                {/* <div className="flex items-center">
                  <input
                    id="en_location"
                    name="en_location"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={form.en_location}
                    onChange={handleChange}
                  />
                  <label className="ml-2 block text-sm text-gray-700">Available for rent</label>
                </div> */}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-2" />
                    Créer le scooter
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {createdId && (
          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-center">
                <QrCode className="mr-2 text-blue-500" size={20} />
                QR Code du scooter
              </h3>
              <div className="flex justify-center mb-4">
                <QRCodeCanvas
                  value={`http://localhost:3000/trottinettes/${createdId}/reserver`}
                  size={180}
                />
              </div>
              <p className="text-sm text-gray-500">Scannez ce QR code pour réserver le scooter</p>
            </div>
          </div>
        )}

        {/* Modal de sélection de carte */}
        {showMapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
              <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Sélectionnez l'emplacement</h3>
                <p className="text-sm text-gray-500">Cliquez sur la carte pour positionner le scooter</p>
              </div>
              <div className="p-4">
                <div id="map-container" className="h-96 w-full rounded-md"></div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={form.latitude}
                      onChange={(e) => setForm({...form, latitude: e.target.value})}
                      placeholder="Latitude"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      value={form.longitude}
                      onChange={(e) => setForm({...form, longitude: e.target.value})}
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMapModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={confirmMapSelection}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Confirmer l'emplacement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScooterCreate;