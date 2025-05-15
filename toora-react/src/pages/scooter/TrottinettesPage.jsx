import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Battery, MapPin, Clock, AlertCircle } from "lucide-react";
import AuthModals from "../../components/AuthModals";
import scooterAPI from "../../api/scooters";
import axios from "axios";

const TrottinettesPage = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [scooters, setScooters] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state for modal
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

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token, role } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.id);
        setIsLoggedIn(true);
        setIsAdmin && setIsAdmin(role === 'admin');
        setShowLoginForm(false);
        setErrorMessage("");
        setIsLoading(false);
        window.location.reload(); // <--- Add this line
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Identifiants invalides. Veuillez réessayer.');
      } else {
        // setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
          window.location.reload(); // <--- Add this line
      }
      setIsLoading(false);
      return false;
    }
    setIsLoading(false);
    return false;
  };

  const handleRegister = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.status === 200) {
        setShowSignupForm(false);
        setShowLoginForm(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de l'inscription.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription.");
    }
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
                      <div className="h-[40vh] min-h-[300px] w-full overflow-hidden relative">
                        <img
                          src={scooter.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
                          className={`absolute inset-0 w-full h-full object-cover object-center brightness-100 hover:brightness-105 transition-all duration-300 ${
                            scooter.etat !== "available" || scooter.en_location ? "opacity-70" : ""
                          }`}
                          style={{ objectPosition: "center 30%" }}
                          alt={scooter.modele || 'Trottinette électrique'}
                        />
                        {(scooter.etat !== "available" || scooter.en_location) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              scooter.etat !== "available" 
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                              {scooter.etat !== "available" ? "En maintenance" : "Déjà réservée"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{scooter.modele}</h3>
                        
                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
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
                            scooter.etat !== "available"
                              ? "bg-amber-100 text-amber-800"
                              : scooter.en_location
                                ? "bg-red-100 text-red-800"
                                : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {scooter.etat !== "available" 
                              ? "En maintenance" 
                              : scooter.en_location
                                ? "Réservée"
                                : "Disponible"}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              if (!scooter || scooter.etat !== "available" || scooter.en_location) {
                                return;
                              }
                              if (typeof setIsLoggedIn === "function") {
                                setIsLoggedIn(!!localStorage.getItem('authToken'));
                              }
                              if (!localStorage.getItem('authToken')) {
                                setShowLoginForm(true);
                              } else {
                                navigate(`/trottinettes/${scooter.id}/reserver`);
                              }
                            }}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                              scooter.etat !== "available" || scooter.en_location
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 text-white"
                            } transition-colors`}
                            disabled={scooter.etat !== "available" || scooter.en_location}
                          >
                            {scooter.etat !== "available" ? (
                              <>
                                <Clock className="mr-1" size={16} />
                                En maintenance
                              </>
                            ) : scooter.en_location ? (
                              <>
                                <Clock className="mr-1" size={16} />
                                Réservée
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
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        errorMessage={errorMessage}
        isLoading={isLoading} // Pass loading state to modal
      />
    </div>
  );
};

export default TrottinettesPage;