import { useState } from 'react';
import axios from 'axios';

import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import MapSection from '../components/MapSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AuthModals from '../components/AuthModals';
import { useEffect } from 'react';
import Header from '../components/Header';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Set user as logged in if token exists
    }
  }, []); // Run only once when the component mounts

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      localStorage.setItem('authToken', token); // Save token to localStorage
      setIsLoggedIn(true);
      setShowLoginForm(false);
      console.log('Logged in user:', user);
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const { user, token } = response.data;
      localStorage.setItem('authToken', token); // Save token to localStorage
      setIsLoggedIn(true);
      setShowSignupForm(false);
      console.log('Registered user:', user);
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsLoggedIn(false);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <MapSection />
      <Testimonials />
      <Footer />
      <AuthModals 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        showSignupForm={showSignupForm}
        setShowSignupForm={setShowSignupForm}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default HomePage;