import React from 'react';
import { Leaf, Zap, Clock, Shield } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      title: "Écologique",
      description: "Zéro émission, 100% électrique. Contribuez à réduire l'empreinte carbone urbaine.",
      icon: <Leaf className="text-emerald-500" size={24} />,
      color: "bg-emerald-100"
    },
    {
      title: "Économique",
      description: "Des tarifs compétitifs adaptés à tous les budgets et besoins de déplacement.",
      icon: <Zap className="text-amber-500" size={24} />,
      color: "bg-amber-100"
    },
    {
      title: "Pratique",
      description: "Disponible 24/7, facile à utiliser et à localiser via notre application mobile.",
      icon: <Clock className="text-blue-500" size={24} />,
      color: "bg-blue-100"
    },
    {
      title: "Sécurisé",
      description: "Toutes nos trottinettes sont régulièrement entretenues pour assurer votre sécurité.",
      icon: <Shield className="text-indigo-500" size={24} />,
      color: "bg-indigo-100"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Zap className="text-emerald-500 mb-4" size={36} />
          <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">Pourquoi choisir Toora.ma ?</h2>
          <p className="text-lg text-center text-slate-600 max-w-2xl">
            Découvrez les avantages qui font de notre service le choix préféré des urbains modernes
          </p>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100"
            >
              <div className="p-6 h-full flex flex-col">
                <div className={`${benefit.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 flex-grow">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;