import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const HeroSection = () => {
  // Using your original image path
  const heroImagePath = require('../assets/images/foot_scooter.jpg');

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroImagePath})` }}
      >
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Title with highlight */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Mobilité Urbaine <span className="text-emerald-400">Écologique</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Découvrez une nouvelle façon de vous déplacer en ville. Économique,
            écologique et pratique.
          </p>
          
          {/* CTA Button */}
          <Link
            to="/trottinettes"
            className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-lg rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <MapPin size={20} className="mr-2" />
            Trouver une trottinette
          </Link>

          {/* Decorative elements - REMOVED */}
        </div>
      </div>

      {/* Bottom wave decoration - More pronounced wave */}
      <div className="absolute -bottom-1 left-0 right-0 z-10 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path 
            fill="#f8fafc" 
            d="M0,64L60,53.3C120,43,240,21,360,16C480,11,600,21,720,37.3C840,53,960,75,1080,74.7C1200,75,1320,53,1380,42.7L1440,32L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;