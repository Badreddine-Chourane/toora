import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Check, Save } from 'lucide-react';
import villeAPI from '../../../api/villes';

const VilleEdit = () => {
  const [nom, setNom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);
    villeAPI.get(id)
      .then(response => {
        setNom(response.data.nom);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    villeAPI.update(id, { nom })
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/villes');
        }, 1500);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg className="animate-spin w-full h-full text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/villes"
            className="no-underline flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Retour</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
              <MapPin size={24} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Modifier la ville
            </h2>
          </div>

          <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">ID: <span className="font-mono text-gray-800">{id}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="cityName"
                className="block text-sm font-medium text-gray-700"
              >
                Nom de la ville
              </label>
              <input
                id="cityName"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isLoading || showSuccess}
                className={`
                  w-full relative overflow-hidden py-3 px-4 rounded-lg font-medium text-white 
                  ${isLoading ? 'bg-gray-400' : showSuccess ? 'bg-green-500' : 'bg-amber-600 hover:bg-amber-700'}
                  transition-all duration-300 flex items-center justify-center
                `}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mise à jour...
                  </span>
                ) : showSuccess ? (
                  <span className="flex items-center">
                    <Check size={18} className="mr-2" />
                    Ville modifiée avec succès
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save size={18} className="mr-2" />
                    Enregistrer les modifications
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VilleEdit;