import { Link } from 'react-router-dom';
const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="bg-success text-white p-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-white text-decoration-none">
          <h1 className="h2 mb-0 fw-bold">Toora.ma</h1>
        </Link>
        <div className="d-flex align-items-center gap-3">
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
              <span className="text-white">Welcome, User!</span>
              <button 
                className="btn btn-light text-success px-4 py-2"
                onClick={handleLogout} // Call handleLogout on click
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;