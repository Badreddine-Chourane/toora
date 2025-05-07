import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User, LogIn, UserPlus, Settings, Calendar, LogOut } from 'lucide-react';

const Header = ({ isLoggedIn, isAdmin, handleLogout }) => {
  const userName = localStorage.getItem('userName');
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-emerald-600'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className={`text-2xl font-bold transition-colors duration-300 ${scrolled ? 'text-emerald-600' : 'text-white'}`}
          >
            Toora.ma
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${scrolled ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  <LogIn className="mr-2" size={18} />
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${scrolled ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-white text-emerald-600 hover:bg-emerald-50'}`}
                >
                  <UserPlus className="mr-2" size={18} />
                  Inscription
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${scrolled ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-amber-500 text-white hover:bg-amber-600'}`}
                  >
                    Dashboard Admin
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors duration-300 ${scrolled ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    <User className="mr-2" size={18} />
                    {userName || 'Mon compte'}
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Link
                          to="/changer-info"
                          className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Settings className="mr-3" size={16} />
                          Changer mes infos
                        </Link>
                        <Link
                          to="/mes-reservations"
                          className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Calendar className="mr-3" size={16} />
                          Mes Réservations
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowDropdown(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                        >
                          <LogOut className="mr-3" size={16} />
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;