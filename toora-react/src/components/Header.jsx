import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ isLoggedIn, isAdmin, handleLogout }) => {
  const userName = localStorage.getItem('userName');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-success text-white p-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h2 mb-0 fw-bold">Toora.ma</h1>
        </Link>
        <div className="d-flex align-items-center gap-3 position-relative">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-light text-success px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-success bg-success-emphasis text-white px-4 py-2">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link to="/admin" className="btn btn-warning px-4 py-2">
                  Admin Dashboard
                </Link>
              )}
              <div
                className="position-relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button
                  className="btn btn-light text-success px-4 py-2"
                  type="button"
                >
                  Bonjour{userName ? `, ${userName}` : ''} ▼
                </button>
                {showDropdown && (
                  <div
                    className="position-absolute bg-white text-dark rounded shadow"
                    style={{ right: 0, top: '100%', minWidth: 180, zIndex: 1000 }}
                  >
                    <Link
                      to="/changer-info"
                      className="dropdown-item px-3 py-2 text-dark text-decoration-none"
                      onClick={() => setShowDropdown(false)}
                    >
                      Changer mes infos
                    </Link>
                    <Link
                      to="/mes-reservations"
                      className="dropdown-item px-3 py-2 text-dark text-decoration-none"
                      onClick={() => setShowDropdown(false)}
                    >
                      Mes Réservations
                    </Link>
                    <button
                      className="dropdown-item px-3 py-2 text-danger w-100 text-start border-0 bg-transparent"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;