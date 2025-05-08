import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Edit, Trash2, MapPinned } from 'lucide-react';
import villeAPI from '../../../api/villes';

const VilleShow = () => {
  const [ville, setVille] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    villeAPI.get(id)
      .then(response => {
        setVille(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm(`Voulez-vous vraiment supprimer la ville ${ville?.nom}?`)) {
      villeAPI.delete(id)
        .then(() => {
          // In a real app, you would likely redirect after deletion
          alert(`Ville ${id} supprimée avec succès`);
        });
    }
  };

  if (isLoading) {
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

  if (!ville) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin size={24} className="text-gray-500" />
          </div>
          <p className="text-gray-600">Ville non trouvée</p>
          <Link 
            to="/villes" 
            className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/villes"
            className="no-underline flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Retour à la liste</span>
          </Link>
        </div>

        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              to={`/villes/${id}/edit`}
              className="p-2 bg-amber-100 rounded-full text-amber-600 hover:bg-amber-200 transition-colors"
              title="Modifier"
            >
              <Edit size={18} />
            </Link>
            <button 
              onClick={handleDelete}
              className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
              title="Supprimer"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-start">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <MapPinned size={28} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">
                  {ville.nom}
                </h2>
                <div className="text-sm text-gray-500">
                  Ville ID: <span className="font-mono">{ville.id}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Créée le</h3>
                <p className="text-gray-800">{formatDate(ville.created_at)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Scooters disponibles</h3>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-2">{ville.scooters_count || 0}</span>
                  <span className="text-gray-600 text-sm">scooters</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/villes/${id}/edit`}
                  className="no-underline flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <Edit size={18} className="mr-2" />
                  Modifier
                </Link>
                <button 
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} className="mr-2" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VilleShow;