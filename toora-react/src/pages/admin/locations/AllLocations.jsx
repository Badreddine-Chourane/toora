import React, { useEffect, useState } from "react";
import locationAPI from "../../../api/locations";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    locationAPI.list().then(res => setLocations(res.data));
  }, []);

  const ongoing = locations.filter(l => l.statut === "en_cours");
  const finished = locations.filter(l => l.statut === "terminee");

  return (
    <div className="container mt-5">
      <h2>Toutes les locations</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Locations en cours</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Scooter</th>
                <th>Utilisateur</th>
                <th>Début</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {ongoing.map(l => (
                <tr key={l.id}>
                  <td>{l.scooter?.modele || l.scooter_id}</td>
                  <td>{l.utilisateur?.name || l.utilisateur_id}</td>
                  <td>{l.debut ? new Date(l.debut).toLocaleString() : ""}</td>
                  <td>{l.statut}</td>
                </tr>
              ))}
              {ongoing.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">Aucune location en cours</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h4>Locations terminées</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Scooter</th>
                <th>Utilisateur</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {finished.map(l => (
                <tr key={l.id}>
                  <td>{l.scooter?.modele || l.scooter_id}</td>
                  <td>{l.utilisateur?.name || l.utilisateur_id}</td>
                  <td>{l.debut ? new Date(l.debut).toLocaleString() : ""}</td>
                  <td>{l.fin ? new Date(l.fin).toLocaleString() : ""}</td>
                  <td>
                    {typeof l.prix === "number"
                      ? `${l.prix.toFixed(2)} MAD`
                      : l.prix
                      ? `${Number(l.prix).toFixed(2)} MAD`
                      : '-'}
                  </td>
                </tr>
              ))}
              {finished.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">Aucune location terminée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllLocations;