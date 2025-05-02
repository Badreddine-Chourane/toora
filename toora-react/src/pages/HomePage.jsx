import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import MapSection from '../components/MapSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import AuthModals from '../components/AuthModals';

const HomePage = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        handleLogout={handleLogout}
      />
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
      <Footer />
    </div>
  );
};

export default HomePage;