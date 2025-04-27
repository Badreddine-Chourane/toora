import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import scooterAPI from "../../api/scooters";
import locationAPI from "../../api/locations";
import dayjs from "dayjs";

const ReserveScooter = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startHour, setStartHour] = useState(dayjs().format("HH:00"));
  const [endHour, setEndHour] = useState(dayjs().add(1, "hour").format("HH:00"));
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    scooterAPI.get(id).then(res => {
      setScooter(res.data);
      setLoading(false);
    });
  }, [id]);

  // Calculate price whenever start/end changes
  useEffect(() => {
    if (!scooter || !scooter.ville || !scooter.ville.tarif) {
      setPrice(0);
      return;
    }
    const today = dayjs().format("YYYY-MM-DD");
    const startTime = dayjs(`${today}T${startHour}`);
    const endTime = dayjs(`${today}T${endHour}`);
    const duration = endTime.diff(startTime, "hour", true); // duration in hours (can be decimal)
    if (duration > 0) {
      const prixDepart = scooter.ville.tarif.prix_de_depart || 0;
      const prixHeure = scooter.ville.tarif.prix_par_heure || 0;
      setPrice(prixDepart + Math.ceil(duration) * prixHeure);
    } else {
      setPrice(0);
    }
  }, [startHour, endHour, scooter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const today = dayjs().format("YYYY-MM-DD");
      const debut = `${today}T${startHour}`;
      const fin = `${today}T${endHour}`;
      const res = await locationAPI.reserve({
        scooter_id: scooter.id,
        utilisateur_id: userId,
        debut,
        fin,
      });
      navigate(`/paiement/${res.data.id}`, { state: { montant: price } });
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la réservation");
    }
  };

  if (loading) return <div className="container mt-5">Chargement...</div>;
  if (!scooter) return <div className="container mt-5">Scooter introuvable.</div>;

  return (
    <div className="container mt-5">
      <h2>Réserver {scooter.modele}</h2>
      <div className="card mb-4" style={{maxWidth: 400}}>
        {scooter.photo && (
          <img
            src={`http://localhost:8000/storage/${scooter.photo}`}
            className="card-img-top"
            alt={scooter.modele}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{scooter.modele}</h5>
          <p className="mb-1"><strong>Ville:</strong> {scooter.ville?.nom || "Ville inconnue"}</p>
          <p className="mb-1"><strong>Batterie:</strong> {scooter.batterie}%</p>
          <p className="mb-1"><strong>État:</strong> {scooter.etat}</p>
          <p className="mb-1"><strong>Localisation:</strong> {scooter.latitude}, {scooter.longitude}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} style={{maxWidth: 400}}>
        <div className="mb-3">
          <label className="form-label">Heure de début</label>
          <input
            type="time"
            className="form-control"
            value={startHour}
            onChange={e => setStartHour(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Heure de fin</label>
          <input
            type="time"
            className="form-control"
            value={endHour}
            min={startHour}
            onChange={e => setEndHour(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <strong>Prix estimé : </strong>
          <span>{price > 0 ? `${price} MAD` : "Veuillez choisir une période valide"}</span>
        </div>
        <button type="submit" className="btn btn-success me-2" disabled={price <= 0}>Confirmer la réservation</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Annuler</button>
      </form>
    </div>
  );
};

export default ReserveScooter;