import React, { useEffect, useState } from "react";
import locationAPI from "../../api/locations";

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
      // Refresh reservations
      locationAPI.list().then(res => {
        setReservations(res.data.filter(r => r.utilisateur_id == userId));
      });
    } catch (e) {
      alert(e.response?.data?.error || "Erreur lors du retour");
    }
  };

  const current = reservations.filter(r => r.statut === "en_cours");
  const old = reservations.filter(r => r.statut === "terminee");

  return (
    <div className="container mt-4">
      <h2>Mes Réservations</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Réservations en cours</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Scooter</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Statut</th>
                <th>Prix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {current.map(r => (
                <tr key={r.id}>
                  <td>{r.scooter?.modele || r.scooter_id}</td>
                  <td>{r.debut ? new Date(r.debut).toLocaleString() : ''}</td>
                  <td>{r.fin ? new Date(r.fin).toLocaleString() : ''}</td>
                  <td>{r.statut}</td>
                  <td>
                    {typeof r.prix === "number"
                      ? `${r.prix.toFixed(2)} MAD`
                      : r.prix
                      ? `${Number(r.prix).toFixed(2)} MAD`
                      : '-'}
                  </td>
                  <td>
                    {r.statut === 'en_cours' && (
                      <button className="btn btn-warning btn-sm" onClick={() => handleReturn(r.id)}>
                        Terminer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">Aucune réservation en cours</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h4>Réservations terminées</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Scooter</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Statut</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {old.map(r => (
                <tr key={r.id}>
                  <td>{r.scooter?.modele || r.scooter_id}</td>
                  <td>{r.debut ? new Date(r.debut).toLocaleString() : ''}</td>
                  <td>{r.fin ? new Date(r.fin).toLocaleString() : ''}</td>
                  <td>{r.statut}</td>
                  <td>
                    {typeof r.prix === "number"
                      ? `${r.prix.toFixed(2)} MAD`
                      : r.prix
                      ? `${Number(r.prix).toFixed(2)} MAD`
                      : '-'}
                  </td>
                </tr>
              ))}
              {old.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">Aucune réservation terminée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserReservations;