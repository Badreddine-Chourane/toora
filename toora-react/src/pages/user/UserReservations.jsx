import React, { useEffect, useState } from "react";
import locationAPI from "../../api/locations";
import { Clock, CalendarCheck, Zap, CheckCircle, XCircle } from "lucide-react";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    locationAPI.list().then(res => {
      setReservations(res.data.filter(r => r.utilisateur_id == userId));
    });
  }, [userId]);

  const handleReturn = async (locationId) => {
    try {
      await locationAPI.return(locationId, {});
      alert('Location terminée !');
      locationAPI.list().then(res => {
        setReservations(res.data.filter(r => r.utilisateur_id == userId));
      });
    } catch (e) {
      alert(e.response?.data?.error || "Erreur lors du retour");
    }
  };

  const current = reservations.filter(r => r.statut === "en_cours");
  const old = reservations.filter(r => r.statut === "terminee");

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Réservations</h1>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Reservations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <Zap className="h-5 w-5 mr-2 animate-pulse" />
                  Réservations en cours
                </h2>
                <span className="bg-white text-emerald-600 px-2 py-1 rounded-full text-xs font-bold">
                  {current.length}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {current.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scooter
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Début
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fin
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {current.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Zap className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {r.scooter?.modele || `Scooter #${r.scooter_id}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(r.debut)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(r.fin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            En cours
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {r.prix ? `${Number(r.prix).toFixed(2)} MAD` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleReturn(r.id)}
                            className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                          >
                            Terminer
                          </button>
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
                  <h3 className="text-lg font-medium text-gray-900">Aucune réservation en cours</h3>
                  <p className="mt-1 text-sm text-gray-500">Vos réservations actives apparaîtront ici</p>
                </div>
              )}
            </div>
          </div>

          {/* Past Reservations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center">
                  <CalendarCheck className="h-5 w-5 mr-2" />
                  Historique des réservations
                </h2>
                <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
                  {old.length}
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {old.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scooter
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Début
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fin
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {old.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Zap className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {r.scooter?.modele || `Scooter #${r.scooter_id}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(r.debut)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(r.fin)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {r.prix ? `${Number(r.prix).toFixed(2)} MAD` : '-'}
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
                  <h3 className="text-lg font-medium text-gray-900">Aucune réservation terminée</h3>
                  <p className="mt-1 text-sm text-gray-500">Votre historique de réservations apparaîtra ici</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReservations;