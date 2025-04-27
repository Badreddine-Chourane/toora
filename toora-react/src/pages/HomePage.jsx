import { useEffect, useState } from 'react';
import axios from 'axios';

import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import MapSection from '../components/MapSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AuthModals from '../components/AuthModals';
import Header from '../components/Header';

const HomePage = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { user, token, role } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', user.name);
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');
      setShowLoginForm(false);
      setErrorMessage('');
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

      const { user, token, role } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', user.name);
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');
      setShowSignupForm(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div className="min-vh-100 bg-light">

      <HeroSection />
      <HowItWorks />
      <Benefits />
      <MapSection />
      <Testimonials />

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