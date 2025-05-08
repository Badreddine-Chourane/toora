import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Search, Eye, Edit, Trash2, RefreshCw } from 'lucide-react';
import villeAPI from '../../../api/villes';

const VilleList = () => {
  const [villes, setVilles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    fetchVilles();
  }, []);

  const fetchVilles = () => {
    setIsLoading(true);
    villeAPI.list()
      .then(response => {
        setVilles(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const deleteVille = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette ville ?')) {
      setIsDeleting(id);
      villeAPI.delete(id)
        .then(() => {
          setVilles(villes.filter(v => v.id !== id));
        })
        .finally(() => {
          setIsDeleting(null);
        });
    }
  };

  // Filter villes based on search term
  const filteredVilles = villes.filter(ville => 
    ville.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MapPin className="mr-2 text-blue-500" size={24} />
            Liste des villes
          </h2>
          
          <Link 
            to="/villes/create"
            className="no-underline px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Ajouter une ville
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Rechercher une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={fetchVilles}
              className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500">Chargement des villes...</p>
              </div>
            </div>
          ) : filteredVilles.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <MapPin size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">Aucune ville trouvée</p>
              {searchTerm && (
                <p className="text-sm text-gray-400">
                  Essayez avec un autre terme de recherche ou{' '}
                  <button onClick={() => setSearchTerm('')} className="text-blue-500 hover:underline">
                    effacez la recherche
                  </button>
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVilles.map(ville => (
                    <tr key={ville.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-500">{ville.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ville.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link
                            to={`/villes/${ville.id}`}
                            className="no-underline px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center"
                            title="Voir"
                          >
                            <Eye size={16} className="mr-1.5" />
                            <span className="text-xs font-medium">Voir</span>
                          </Link>
                          <Link
                            to={`/villes/${ville.id}/edit`}
                            className="no-underline px-3 py-1.5 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors flex items-center"
                            title="Modifier"
                          >
                            <Edit size={16} className="mr-1.5" />
                            <span className="text-xs font-medium">Modifier</span>
                          </Link>
                          <button
                            onClick={() => deleteVille(ville.id)}
                            className="px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center"
                            disabled={isDeleting === ville.id}
                            title="Supprimer"
                          >
                            {isDeleting === ville.id ? (
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

export default VilleList;