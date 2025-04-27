import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthModals from "../../components/AuthModals";
import scooterAPI from "../../api/scooters";

const TrottinettesPage = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [scooters, setScooters] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScooters();
  }, []);

  const fetchScooters = () => {
    setLoading(true);
    scooterAPI.list()
      .then(response => {
        setScooters(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des trottinettes :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">


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
                            onClick={e => {
                              e.preventDefault();
                              if (!isLoggedIn) {
                                setShowLoginForm(true);
                                navigate(`/login`);

                              } else {
                                navigate(`/trottinettes/${scooter.id}/reserver`);
                              }
                            }}
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