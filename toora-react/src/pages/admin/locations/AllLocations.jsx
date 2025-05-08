import React, { useEffect, useState } from "react";
import locationAPI from "../../../api/locations";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locationAPI.list().then(res => setLocations(res.data));
  }, []);

  const ongoing = locations.filter(l => l.statut === "en_cours");
  const finished = locations.filter(l => l.statut === "terminee");

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Toutes les Locations</h1>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ongoing Locations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Locations en cours
                </h2>
                <span className="bg-white text-emerald-600 px-2 py-1 rounded-full text-xs font-bold">
                  {ongoing.length}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {ongoing.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scooter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Début
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ongoing.map(l => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {l.scooter?.modele || `Scooter #${l.scooter_id}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{l.utilisateur?.name || l.utilisateur_id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(l.debut)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            En cours
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Clock className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Aucune location en cours</h3>
                  <p className="mt-1 text-sm text-gray-500">Les locations actives apparaîtront ici</p>
                </div>
              )}
            </div>
          </div>

          {/* Finished Locations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Locations terminées
                </h2>
                <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
                  {finished.length}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {finished.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scooter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Début
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {finished.map(l => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {l.scooter?.modele || `Scooter #${l.scooter_id}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{l.utilisateur?.name || l.utilisateur_id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(l.debut)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(l.fin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {l.prix ? `${Number(l.prix).toFixed(2)} MAD` : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center">
                  <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Aucune location terminée</h3>
                  <p className="mt-1 text-sm text-gray-500">Les locations terminées apparaîtront ici</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllLocations;