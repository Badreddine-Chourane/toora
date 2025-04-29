import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import scooterAPI from '../../api/scooters';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthModals from "../../components/AuthModals";
import { QRCodeCanvas } from "qrcode.react";

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

  // When login state changes, if login just succeeded and reservation was pending, redirect
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

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) return false;
      const data = await response.json();
      // DEBUG: log the response
      console.log('LOGIN RESPONSE:', data);
      // Try both token and access_token
      const token = data.token || data.access_token;
      if (!token) return false;
      localStorage.setItem('authToken', token);
      setIsLoggedIn(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1 py-5 bg-light">
        <div className="container">
          <h1 className="mb-4">Détails du Scooter</h1>
          <div className="card shadow-sm">
            {scooter?.photo && (
              <img
                src={`http://localhost:8000/storage/${scooter.photo}`}
                className="card-img-top"
                alt={scooter.modele}
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{scooter?.modele}</h5>
              <div className="mb-3">
                <span className="badge bg-success me-2">
                  🔋 {scooter?.batterie}%
                </span>
                <span className="text-muted">
                  {scooter?.ville && scooter.ville.nom
                    ? scooter.ville.nom
                    : "Ville inconnue"}
                </span>
              </div>
              <p className="text-muted small mb-2">
                📍 Latitude: {scooter?.latitude}, Longitude: {scooter?.longitude}
              </p>
              <div className="mb-3">
                <p><strong>État:</strong> {scooter?.etat}</p>
                <p><strong>En location:</strong> {scooter?.en_location ? 'Oui' : 'Non'}</p>
              </div>
              <button
                className={`btn btn-success ${scooter?.en_location ? 'disabled' : ''}`}
                disabled={scooter?.en_location}
                onClick={handleReserve}
              >
                {scooter?.en_location ? "Déjà louée" : "Réserver"}
              </button>
            </div>
          </div>
          {/* QR Code for reservation */}
          {scooter && (
            <div className="mt-4 text-center">
              <h5>QR Code pour réserver ce scooter :</h5>
              <QRCodeCanvas value={`http://localhost:3000/trottinettes/${scooter.id}/reserver`} size={180} />
              <div className="mt-2">
                <small>Scannez pour réserver ce scooter</small>
              </div>
            </div>
          )}
          <div className="mt-4">
            <Link to="/trottinettes" className="btn btn-primary">
              🔙 Retour à la liste
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <AuthModals
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        showSignupForm={showSignupForm}
        setShowSignupForm={setShowSignupForm}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default ScooterShow;
