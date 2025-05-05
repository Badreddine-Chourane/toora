import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const { user } = response.data;
      setIsLoggedIn(true); // Update login state
      console.log('Registered user:', user);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-page">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="video-background"
      >
        <source src="/videos/video_register.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Registration Form */}
      <div className="register-form-container">
        <h2 className="text-white">Sign Up</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email</label>
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
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirmation" className="form-label text-white">Confirm Password</label>
            <input 
              type="password" 
              id="passwordConfirmation" 
              className="form-control" 
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;