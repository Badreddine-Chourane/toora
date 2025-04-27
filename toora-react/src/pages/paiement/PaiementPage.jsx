import React, { useState } from "react";
import paiementAPI from "../../api/paiements";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PaiementPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const montantFromState = location.state?.montant;
  const [montant] = useState(montantFromState || "");
  const [methode, setMethode] = useState("carte");
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const handlePaiement = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await paiementAPI.create({
        location_id: locationId,
        montant,
        methode,
        statut: "effectue",
        card_number: methode === "carte" ? cardNumber : undefined,
        card_expiry: methode === "carte" ? cardExpiry : undefined,
        card_cvc: methode === "carte" ? cardCVC : undefined,
      });
      alert("Paiement effectué !");
      navigate("/mes-reservations");
    } catch (e) {
      alert("Erreur lors du paiement");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Paiement de la réservation</h2>
      <form onSubmit={handlePaiement} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label className="form-label">Montant à payer</label>
          <input
            type="number"
            className="form-control"
            value={montant}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Méthode de paiement</label>
          <select
            className="form-control"
            value={methode}
            onChange={e => setMethode(e.target.value)}
          >
            <option value="carte">Carte</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        {methode === "carte" && (
          <>
            <div className="mb-3">
              <label className="form-label">Numéro de carte</label>
              <input
                type="text"
                className="form-control"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                required
                maxLength={19}
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-3 d-flex gap-2">
              <div>
                <label className="form-label">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  value={cardExpiry}
                  onChange={e => setCardExpiry(e.target.value)}
                  required
                  maxLength={5}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="form-label">CVC</label>
                <input
                  type="text"
                  className="form-control"
                  value={cardCVC}
                  onChange={e => setCardCVC(e.target.value)}
                  required
                  maxLength={4}
                  placeholder="CVC"
                />
              </div>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Paiement..." : "Payer"}
        </button>
      </form>
    </div>
  );
};

export default PaiementPage;