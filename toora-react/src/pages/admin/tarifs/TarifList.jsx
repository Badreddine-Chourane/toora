import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, RefreshCw, MapPin } from 'lucide-react';
import tarifAPI from '../../../api/tarifs';

const TarifList = () => {
  const [tarifs, setTarifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    tarifAPI.list()
      .then(res => {
        setTarifs(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setTarifs([]);
        setIsLoading(false);
      });
  }, [refresh]);

  const handleDelete = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce tarif ?')) {
      setIsDeleting(id);
      tarifAPI.delete(id)
        .then(() => setTarifs(tarifs.filter(t => t.id !== id)))
        .finally(() => setIsDeleting(null));
    }
  };

  const refreshList = () => {
    setRefresh(r => !r);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MapPin className="mr-2 text-blue-500" size={24} />
            Tarifs par ville
          </h2>
          <div className="flex space-x-3">
            <button 
              onClick={refreshList}
              className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
            <Link
              to="/tarifs/create"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Ajouter un tarif
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500">Chargement des tarifs...</p>
              </div>
            </div>
          ) : tarifs.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <MapPin size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">Aucun tarif trouvé</p>
              <Link
                to="/tarifs/create"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Ajouter un tarif
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix de départ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix par heure</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tarifs.map(tarif => (
                    <tr key={tarif.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {tarif.ville && tarif.ville.nom
                            ? tarif.ville.nom
                            : (tarif.ville_id || 'N/A')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tarif.prix_de_depart} MAD</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tarif.prix_par_heure} MAD</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/tarifs/${tarif.id}/edit`}
                            className="no-underline px-3 py-1.5 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors flex items-center"
                            title="Modifier"
                          >
                            <Edit size={16} className="mr-1.5" />
                            <span className="text-xs font-medium">Modifier</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(tarif.id)}
                            className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
                            disabled={isDeleting === tarif.id}
                            title="Supprimer"
                          >
                            {isDeleting === tarif.id ? (
                              <>
                                <svg className="animate-spin h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="text-xs font-medium">Suppression...</span>
                              </>
                            ) : (
                              <>
                                <Trash2 size={16} className="mr-1.5" />
                                <span className="text-xs font-medium">Supprimer</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TarifList;