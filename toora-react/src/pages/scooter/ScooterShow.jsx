import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import scooterAPI from '../../api/scooters';
import { QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, Battery, MapPin, Calendar } from "lucide-react";
import AuthModals from "../../components/AuthModals";

const ScooterShow = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [pendingReservation, setPendingReservation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    scooterAPI.get(id).then(res => setScooter(res.data));
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && pendingReservation) {
      setShowLoginForm(false);
      setPendingReservation(false);
      navigate(`/trottinettes/${id}/reserver`);
    }
  }, [isLoggedIn, pendingReservation, id, navigate]);

  const handleReserve = () => {
    if (!isLoggedIn) {
      setPendingReservation(true);
      setShowLoginForm(true);
      navigate(`/login`);
    } else {
      navigate(`/trottinettes/${id}/reserver`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/trottinettes" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={18} />
          Retour à la liste
        </Link>

        {/* Side-by-Side Container */}
        <div className="flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Section (50% width) */}
          <div className="sm:w-1/2 h-96 sm:h-auto">
            <img
              src={scooter?.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
              className="w-full h-full object-contain object-center"
              alt={scooter?.modele}
            />
          </div>

          {/* Details Section (50% width) */}
          <div className="sm:w-1/2 p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{scooter?.modele}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                scooter?.en_location 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {scooter?.en_location ? 'Indisponible' : 'Disponible'}
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <Battery className="text-emerald-500 mr-2" size={16} />
                <span>{scooter?.batterie}%</span>
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <MapPin className="text-emerald-500 mr-2" size={16} />
                <span>{scooter?.ville?.nom || "Ville inconnue"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Localisation</h3>
              <p className="text-gray-600">
                📍 Latitude: {scooter?.latitude}, Longitude: {scooter?.longitude}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={handleReserve}
              disabled={scooter?.en_location}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
                scooter?.en_location
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              } transition-colors`}
            >
              <Calendar className="mr-2" size={16} />
              {scooter?.en_location ? 'Déjà réservée' : 'Réserver'}
            </button>

            {/* QR Code */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">QR Code de réservation</h3>
              <div className="flex justify-center mb-2">
                <QRCodeCanvas 
                  value={`http://localhost:3000/trottinettes/${scooter?.id}/reserver`} 
                  size={140}
                />
              </div>
              <p className="text-gray-500 text-xs">Scannez pour réserver</p>
            </div>
          </div>
        </div>
      </main>

      <AuthModals
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        showSignupForm={showSignupForm}
        setShowSignupForm={setShowSignupForm}
      />
    </div>
  );
};

export default ScooterShow;
