import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token, role } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userId', user.id); // <-- This is important!
        setIsLoggedIn(true);
        setIsAdmin && setIsAdmin(role === 'admin');
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;