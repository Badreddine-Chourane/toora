import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import scooterAPI from '../../api/scooters';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthModals from "../../components/AuthModals";

const ScooterShow = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    scooterAPI.get(id).then(res => setScooter(res.data));
  }, [id]);

  if (!scooter) return <p>Chargement...</p>;

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setShowLoginForm={setShowLoginForm}
        setShowSignupForm={setShowSignupForm}
      />

      <main className="flex-grow-1 py-5 bg-light">
        <div className="container">
          <h1 className="mb-4">Détails du Scooter</h1>

          <div className="card shadow-sm">
            {scooter.photo && (
              <img
                src={`http://localhost:8000/storage/${scooter.photo}`}
                className="card-img-top"
                alt={scooter.modele}
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{scooter.modele}</h5>
              <div className="mb-3">
                <span className="badge bg-success me-2">
                  🔋 {scooter.batterie}%
                </span>
                <span className="text-muted">
                {scooter.ville && scooter.ville.nom
                              ? scooter.ville.nom
                              : "Ville inconnue"}
                </span>
              </div>
              <p className="text-muted small mb-2">
                📍 Latitude: {scooter.latitude}, Longitude: {scooter.longitude}
              </p>
              <div className="mb-3">
                <p><strong>État:</strong> {scooter.etat}</p>
                <p><strong>En location:</strong> {scooter.en_location ? 'Oui' : 'Non'}</p>
              </div>
            </div>
          </div>

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
      />
    </div>
  );
};

export default ScooterShow;
