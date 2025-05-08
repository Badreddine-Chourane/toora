import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, CreditCard, Users, Calendar, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const cards = [
    {
      id: 'scooters',
      title: 'Scooters',
      icon: <Activity size={24} />,
      color: 'from-emerald-500 to-teal-300',
      hoverColor: 'hover:bg-emerald-50',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      borderColor: 'border-emerald-500',
      textColor: 'text-emerald-600',
      links: [
        { path: '/scooters', label: 'Liste des scooters', primary: true },
        { path: '/scooters/create', label: 'Ajouter un scooter', primary: false }
      ]
    },
    {
      id: 'villes',
      title: 'Villes',
      icon: <MapPin size={24} />,
      color: 'from-blue-500 to-indigo-400',
      hoverColor: 'hover:bg-blue-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600',
      links: [
        { path: '/villes', label: 'Liste des villes', primary: true },
        { path: '/villes/create', label: 'Ajouter une ville', primary: false }
      ]
    },
    {
      id: 'tarifs',
      title: 'Tarifs',
      icon: <CreditCard size={24} />,
      color: 'from-violet-500 to-purple-400',
      hoverColor: 'hover:bg-violet-50',
      buttonColor: 'bg-violet-600 hover:bg-violet-700',
      borderColor: 'border-violet-500',
      textColor: 'text-violet-600',
      links: [
        { path: '/tarifs', label: 'Gérer les tarifs', primary: true },
        { path: '/tarifs/create', label: 'Ajouter un tarif', primary: false }
      ]
    },
    {
      id: 'users',
      title: 'Utilisateurs',
      icon: <Users size={24} />,
      color: 'from-amber-500 to-orange-400',
      hoverColor: 'hover:bg-amber-50',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-500',
      links: [
        { path: '/admin/users', label: 'Gérer les utilisateurs', primary: true }
      ]
    },
    {
      id: 'locations',
      title: 'Locations',
      icon: <Calendar size={24} />,
      color: 'from-cyan-500 to-sky-400',
      hoverColor: 'hover:bg-cyan-50',
      buttonColor: 'bg-sky-600 hover:bg-sky-700',
      borderColor: 'border-sky-500',
      textColor: 'text-sky-600',
      links: [
        { path: '/admin/locations', label: 'Toutes les locations', primary: true }
      ]
    }
  ];

  return (
    <div className={`min-h-screen bg-white p-6 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <h2 className="text-4xl font-bold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600">
                Admin Dashboard
              </span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full border border-gray-700"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              <div className={`bg-gradient-to-r ${card.color} p-5 flex items-center justify-between`}>
                <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                  {card.icon}
                  {card.title}
                </h3>
                <div className="p-2 bg-white bg-opacity-20 rounded-full">
                  <Plus size={16} className="text-white" />
                </div>
              </div>
              <div className="p-5 space-y-3 bg-white">
                {card.links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className={`block w-full py-3 px-4 ${
                      link.primary
                        ? `${card.buttonColor} text-white`
                        : `bg-transparent ${card.textColor} border-2 ${card.borderColor} ${card.hoverColor}`
                    } font-medium rounded-lg transition-all duration-200 text-center flex items-center justify-center gap-2`}
                  >
                    {link.primary ? card.icon : <Plus size={18} />}
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;