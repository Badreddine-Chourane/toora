import React, { useState, useEffect } from "react";
import usersAPI from "../../api/users";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Loader2, CheckCircle } from "lucide-react";

const ChangeInfoPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await usersAPI.get(userId);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await usersAPI.update(userId, { name, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      alert(e.response?.data?.message || "Erreur lors de la mise à jour");
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mise à jour réussie!</h2>
          <p className="text-gray-600 mb-6">
            Vos informations ont été mises à jour avec succès.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Modifier mon profil</h1>
          <div className="w-20 h-1 bg-emerald-500 rounded-full mx-auto"></div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Informations personnelles</h2>
                <p className="text-sm opacity-90 mt-1">Mettez à jour vos détails</p>
              </div>
              <User className="h-8 w-8" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="flex items-center relative border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <div className="flex items-center justify-center w-12 h-12">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="flex-grow px-2 py-3 outline-none border-0 rounded-r-lg bg-white"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Votre nom complet"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="flex items-center relative border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <div className="flex items-center justify-center w-12 h-12">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="flex-grow px-2 py-3 outline-none border-0 rounded-r-lg bg-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <div className="flex items-center relative border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
                <div className="flex items-center justify-center w-12 h-12">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="flex-grow px-2 py-3 outline-none border-0 rounded-r-lg bg-white"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Laissez vide pour ne pas changer"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 caractères avec chiffres et lettres
              </p>
            </div>

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
                  Enregistrement...
                </>
              ) : (
                "Mettre à jour"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeInfoPage;