import React, { useState, useEffect } from "react";
import usersAPI from "../../api/users";
import { useNavigate } from "react-router-dom";

const ChangeInfoPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user info
    const fetchUser = async () => {
      try {
        const res = await usersAPI.get(userId);
        setName(res.data.name || "");
        setEmail(res.data.email || "");
      } catch (e) {
        // Optionally handle error
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await usersAPI.update(userId, { name, email, password });
      alert("Informations mises à jour !");
      navigate("/");
    } catch (e) {
      alert("Erreur lors de la mise à jour");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>Changer mes informations</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Votre nom"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouvel email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Nouveau email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default ChangeInfoPage;