import { useState } from 'react';

const AuthModals = ({ 
  showLoginForm, 
  setShowLoginForm, 
  handleLogin, 
  showSignupForm, 
  setShowSignupForm, 
  handleRegister, 
  errorMessage 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegister(name, email, password, passwordConfirmation);
  };

  return (
    <>
      {showLoginForm && (
        <div className="modal">
          <form onSubmit={onLoginSubmit}>
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowLoginForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {showSignupForm && (
        <div className="modal">
          <form onSubmit={onRegisterSubmit}>
            <h2>Register</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
              required 
            />
            <button type="submit">Register</button>
            <button type="button" onClick={() => setShowSignupForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuthModals;