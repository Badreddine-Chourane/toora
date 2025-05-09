import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Battery, MapPin, Zap, Clock, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      <main className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos Trottinettes Disponibles</h1>
            <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : scooters.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune trottinette disponible</h3>
              <p className="mt-2 text-gray-500">Revenez plus tard pour découvrir nos nouvelles arrivées</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scooters.map((scooter) => (
                <div key={scooter.id} className="group h-full">
                  <Link 
                    to={`/trottinettes/${scooter.id}`} 
                    className="block h-full no-underline hover:no-underline"
                  >
                    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
                      {/* Enhanced image container with viewport height */}
                      <div className="h-[40vh] min-h-[300px] w-full overflow-hidden relative">
                        <img
                          src={scooter.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
                          className="absolute inset-0 w-full h-full object-cover object-center brightness-100 hover:brightness-105 transition-all duration-300"
                          style={{ objectPosition: "center 30%" }}
                          alt={scooter.modele || 'Trottinette électrique'}
                        />
                      </div>

                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{scooter.modele}</h3>
                        
                        <div className="flex items-center mb-3">
                          <span className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                            <Battery className="mr-1" size={16} />
                            {scooter.batterie}%
                          </span>
                          <span className="text-gray-600 flex items-center">
                            <MapPin className="mr-1 text-emerald-500" size={16} />
                            {scooter.ville?.nom || "Ville inconnue"}
                          </span>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            scooter.etat === "Available" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {scooter.etat === "Available" ? "Excellent état" : "En maintenance"}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (!isLoggedIn) {
                                setShowLoginForm(true);
                              } else {
                                navigate(`/trottinettes/${scooter.id}/reserver`);
                              }
                            }}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                              scooter.en_location
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            } transition-colors`}
                            disabled={scooter.en_location}
                          >
                            {scooter.en_location ? (
                              <>
                                <Clock className="mr-1" size={16} />
                                Indisponible
                              </>
                            ) : (
                              "Réserver"
                            )}
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