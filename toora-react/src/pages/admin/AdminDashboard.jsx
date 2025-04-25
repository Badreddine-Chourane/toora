import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="container mt-5">
    <h2>Admin Dashboard</h2>
    <div className="row mt-4">
      {/* Scooters CRUD */}
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Scooters</h5>
            <Link to="/scooters" className="btn btn-success mb-2 w-100">List Scooters</Link>
            <Link to="/scooters/create" className="btn btn-outline-success w-100">Add Scooter</Link>
          </div>
        </div>
      </div>
      {/* Villes CRUD */}
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Villes</h5>
            <Link to="/villes" className="btn btn-primary mb-2 w-100">List Villes</Link>
            <Link to="/villes/create" className="btn btn-outline-primary w-100">Add Ville</Link>
          </div>
        </div>
      </div>
      {/* Users Management */}
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <Link to="/admin/users" className="btn btn-warning w-100">Manage Users</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;