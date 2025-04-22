import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthModals from "../../components/AuthModals";
import scooterAPI from "../../api/scooters"; // Import the scooterAPI

const TrottinettesPage = () => {
  const [scooters, setScooters] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    scooterAPI.list()
      .then(response => {
        setScooters(response.data); // Set scooters data from the API response
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des trottinettes :", error); // Handle errors
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is completed
      });
  }, []); // Empty dependency array to run the effect once on component mount

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
          <h1 className="mb-4">Nos Trottinettes Disponibles</h1>

          {loading ? (
            <p>Chargement en cours...</p>
          ) : scooters.length === 0 ? (
            <p>Aucune trottinette disponible pour le moment.</p>
          ) : (
            <div className="row g-4">
              {scooters.map((scooter) => (
                <div key={scooter.id} className="col-md-6 col-lg-4">
                  <Link to={`/trottinettes/${scooter.id}`} className="text-decoration-none">
                    <div className="card h-100 shadow-sm">
                      {scooter.photo && (
                        <img
                          src={`http://localhost:8000/storage/${scooter.photo}`}
                          className="card-img-top"
                          alt={scooter.modele}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      )}
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{scooter.modele}</h5>
                        <div className="mb-2">
                          <span className="badge bg-success me-2">
                            🔋 {scooter.batterie}%
                          </span>
                          <span className="text-muted">
                            {/* Check if ville is defined before accessing its properties */}
                            {scooter.ville && scooter.ville.nom
                              ? scooter.ville.nom
                              : "Ville inconnue"}
                          </span>
                        </div>
                        <p className="text-muted small mb-2">
                          📍 {scooter.latitude}, {scooter.longitude}
                        </p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <span
                            className={`badge ${
                              scooter.etat === "bon"
                                ? "bg-primary"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {scooter.etat}
                          </span>
                          <button
                            className={`btn btn-sm ${
                              scooter.en_location
                                ? "btn-secondary"
                                : "btn-success"
                            }`}
                            disabled={scooter.en_location}
                          >
                            {scooter.en_location
                              ? "Déjà louée"
                              : "Réserver"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
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

export default TrottinettesPage;
