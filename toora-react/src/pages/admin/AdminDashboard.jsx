import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="container mt-5">
    <h2>Admin Dashboard</h2>
    <div className="row mt-4">
      {/* Scooters CRUD */}
      <div className="col-md-3 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Scooters</h5>
            <Link to="/scooters" className="btn btn-success mb-2 w-100">Liste des scooters</Link>
            <Link to="/scooters/create" className="btn btn-outline-success w-100">Ajouter un scooter</Link>
          </div>
        </div>
      </div>
      {/* Villes CRUD */}
      <div className="col-md-3 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Villes</h5>
            <Link to="/villes" className="btn btn-primary mb-2 w-100">Liste des villes</Link>
            <Link to="/villes/create" className="btn btn-outline-primary w-100">Ajouter une ville</Link>
          </div>
        </div>
      </div>
      {/* Tarifs CRUD */}
      <div className="col-md-3 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Tarifs</h5>
            <Link to="/tarifs" className="btn btn-secondary mb-2 w-100">Gérer les tarifs</Link>
            <Link to="/tarifs/create" className="btn btn-outline-secondary w-100">Ajouter un tarif</Link>
          </div>
        </div>
      </div>
      {/* Users Management */}
      <div className="col-md-3 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Utilisateurs</h5>
            <Link to="/admin/users" className="btn btn-warning w-100">Gérer les utilisateurs</Link>
          </div>
        </div>
      </div>
      {/* Locations Management */}
      <div className="col-md-3 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Locations</h5>
            <Link to="/admin/locations" className="btn btn-info w-100">Toutes les locations</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;