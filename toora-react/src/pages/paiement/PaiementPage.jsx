import React, { useState } from "react";
import paiementAPI from "../../api/paiements";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Wallet, Loader2, CheckCircle } from "lucide-react";

const PaiementPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const montantFromState = location.state?.montant;
  const [montant] = useState(montantFromState || "");
  const [methode, setMethode] = useState("carte");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/[^0-9]/g, "");
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

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
      setSuccess(true);
      setTimeout(() => navigate("/mes-reservations"), 1500);
    } catch (e) {
      alert("Erreur lors du paiement");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-emerald-500 animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Paiement Réussi!</h2>
          <p className="text-gray-600 mb-6">
            Votre paiement de <span className="font-semibold">{montant} MAD</span> a été effectué avec succès.
          </p>
          <button
            onClick={() => navigate("/mes-reservations")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Voir mes réservations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paiement Sécurisé</h1>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Payment Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Montant à payer</h2>
                <p className="text-2xl font-bold mt-1">{montant} MAD</p>
              </div>
              <Wallet className="h-8 w-8" />
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePaiement} className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethode("carte")}
                  className={`py-3 rounded-lg border flex items-center justify-center transition-colors ${
                    methode === "carte"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Carte</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethode("paypal")}
                  className={`py-3 rounded-lg border flex items-center justify-center transition-colors ${
                    methode === "paypal"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img 
                    src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" 
                    alt="PayPal" 
                    className="h-5 w-auto" 
                  />
                </button>
              </div>
            </div>

            {methode === "carte" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de carte
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
                      required
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      value={formatExpiry(cardExpiry)}
                      onChange={(e) => setCardExpiry(e.target.value.replace(/[^0-9]/g, ""))}
                      required
                      maxLength={5}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/g, ""))}
                      required
                      maxLength={4}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {methode === "paypal" && (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600 mb-4">
                  Vous serez redirigé vers PayPal pour compléter votre paiement
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
                loading
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } transition-colors`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>Payer {montant} MAD</>
              )}
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>Paiement sécurisé avec chiffrement SSL</p>
              <div className="flex justify-center mt-2 space-x-4">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/visa-1.svg" 
                  alt="Visa" 
                  className="h-6"
                />
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/mastercard-2.svg" 
                  alt="Mastercard" 
                  className="h-6"
                />
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/paypal-2.svg" 
                  alt="PayPal" 
                  className="h-6"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaiementPage;