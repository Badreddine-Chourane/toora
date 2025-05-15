import { useState } from 'react';
import { X, User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const AuthModals = ({ 
  showLoginForm, 
  setShowLoginForm, 
  handleLogin, 
  showSignupForm, 
  setShowSignupForm, 
  handleRegister, 
  errorMessage,
  setIsLoggedIn,
  isLoading // <-- add this prop
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password, passwordConfirmation);
  };

  const closeModal = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
  };

  return (
    <>
      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <LogIn className="text-emerald-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Connexion</h2>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={onLoginSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span>
                    <svg className="animate-spin inline-block mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-slate-600 text-sm">
              Pas encore de compte ?{' '}
              <button
                onClick={() => {
                  setShowLoginForm(false);
                  setShowSignupForm(true);
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                S'inscrire
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showSignupForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="text-emerald-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Inscription</h2>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={onRegisterSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                S'inscrire
              </button>
            </form>

            <p className="mt-4 text-center text-slate-600 text-sm">
              Déjà un compte ?{' '}
              <button
                onClick={() => {
                  setShowSignupForm(false);
                  setShowLoginForm(true);
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModals;