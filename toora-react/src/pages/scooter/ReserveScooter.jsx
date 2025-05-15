import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Battery, MapPin, Calendar, Zap } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import scooterAPI from "../../api/scooters";
import locationAPI from "../../api/locations";
import dayjs from "dayjs";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Default coordinates for Casablanca
const CASABLANCA_CENTER = {
  lat: 33.5731104,
  lng: -7.5898434
};

const ReserveScooter = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startHour, setStartHour] = useState(dayjs().format("HH:00"));
  const [endHour, setEndHour] = useState(dayjs().add(1, "hour").format("HH:00"));
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    scooterAPI.get(id).then(res => {
      // Check if scooter is in maintenance mode
      if (res.data.etat !== "available") {
        navigate('/trottinettes', { 
          state: { 
            error: "Cette trottinette est actuellement en maintenance et ne peut pas être réservée."
          }
        });
        return;
      }      const data = res.data;
      // Ensure coordinates are parsed as floats and validated
      data.latitude = parseFloat(data.latitude) || CASABLANCA_CENTER.lat;
      data.longitude = parseFloat(data.longitude) || CASABLANCA_CENTER.lng;
      
      // Validate coordinates are within Morocco/Casablanca region
      if (data.latitude < 20 || data.latitude > 40 || data.longitude < -13 || data.longitude > 0) {
        data.latitude = CASABLANCA_CENTER.lat;
        data.longitude = CASABLANCA_CENTER.lng;
      }
      
      setScooter(data);
      setLoading(false);
    });
  }, [id, navigate]);

  useEffect(() => {
    if (!scooter || !scooter.ville || !scooter.ville.tarif) {
      setPrice(0);
      return;
    }
    // Only calculate price if scooter is available
    if (scooter.etat !== "available") {
      setPrice(0);
      return;
    }
    const today = dayjs().format("YYYY-MM-DD");
    const startTime = dayjs(`${today}T${startHour}`);
    const endTime = dayjs(`${today}T${endHour}`);
    const duration = endTime.diff(startTime, "hour", true);
    if (duration > 0) {
      const prixDepart = scooter.ville.tarif.prix_de_depart || 0;
      const prixHeure = scooter.ville.tarif.prix_par_heure || 0;
      setPrice(prixDepart + Math.ceil(duration) * prixHeure);
    } else {
      setPrice(0);
    }
  }, [startHour, endHour, scooter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const today = dayjs().format("YYYY-MM-DD");
      const debut = `${today}T${startHour}`;
      const fin = `${today}T${endHour}`;
      const res = await locationAPI.reserve({
        scooter_id: scooter.id,
        utilisateur_id: userId,
        debut,
        fin,
      });
      navigate(`/paiement/${res.data.id}`, { state: { montant: price } });
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la réservation");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (!scooter) return (
    <div className="text-center py-20 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
      <div className="mx-auto h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
        <Zap className="text-gray-400" size={24} />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">Scooter introuvable</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Réserver {scooter.modele}</h1>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scooter Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="h-[400px] w-full overflow-hidden flex items-center justify-center bg-white">
              <img
                src={scooter.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
                className="max-h-full max-w-full object-contain"
                alt={scooter.modele}
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{scooter.modele}</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="text-emerald-500 mr-2" size={18} />
                  <span className="text-gray-700">
                    <strong>Ville:</strong> {scooter.ville?.nom || "Ville inconnue"}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Battery className="text-emerald-500 mr-2" size={18} />
                  <span className="text-gray-700">
                    <strong>Batterie:</strong> {scooter.batterie}%
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Zap className="text-emerald-500 mr-2" size={18} />
                  <span className="text-gray-700">
                    <strong>État:</strong> {scooter.etat}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-emerald-500 mr-2" size={18} />
                  <span className="text-gray-700">
                    <strong>Localisation:</strong> {scooter.latitude}, {scooter.longitude}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Détails de réservation</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Calendar className="text-emerald-500 mr-2" size={18} />
                      Heure de début
                    </div>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    value={startHour}
                    onChange={e => setStartHour(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Calendar className="text-emerald-500 mr-2" size={18} />
                      Heure de fin
                    </div>
                  </label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                    value={endHour}
                    min={startHour}
                    onChange={e => setEndHour(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Prix estimé :</span>
                    <span className="text-xl font-bold text-emerald-600">
                      {price > 0 ? `${price} MAD` : "Sélectionnez une période"}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={price <= 0}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium ${
                      price <= 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    } transition-colors`}
                  >
                    Confirmer la réservation
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>        {/* Map Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="text-emerald-500 mr-2" size={20} />
            Localisation de la trottinette
          </h2>
          
          <div className="relative">
            <div className="h-[300px] w-full rounded-lg overflow-hidden shadow-inner">
              <MapContainer
                center={[scooter.latitude, scooter.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                className="z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControl position="topright" />
                <Marker position={[scooter.latitude, scooter.longitude]}>
                  <Popup>
                    <div className="text-center p-2">
                      <strong className="text-emerald-600 block mb-1">{scooter.modele}</strong>
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-1" />
                        {scooter.ville?.nom || "Ville inconnue"}
                      </div>
                      <div className="mt-1 text-sm">
                        <strong>Batterie:</strong> {scooter.batterie}%
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin size={14} className="text-emerald-500 mr-1" />
                {scooter.latitude.toFixed(6)}, {scooter.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveScooter;