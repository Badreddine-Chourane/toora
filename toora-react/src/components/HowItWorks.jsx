import React from 'react';
import { UserPlus, MapPin, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Inscrivez-vous",
      description: "Créez un compte en quelques étapes simples pour commencer votre expérience avec Toora.ma.",
      icon: <UserPlus className="text-emerald-500" size={24} />
    },
    {
      number: 2,
      title: "Trouvez une trottinette",
      description: "Localisez une trottinette disponible près de vous grâce à notre application.",
      icon: <MapPin className="text-emerald-500" size={24} />
    },
    {
      number: 3,
      title: "Roulez & Profitez",
      description: "Déverrouillez la trottinette avec l'application et commencez votre trajet.",
      icon: <Zap className="text-emerald-500" size={24} />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Zap className="text-emerald-500 mb-4" size={36} />
          <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">Comment ça marche ?</h2>
          <p className="text-lg text-center text-slate-600 max-w-2xl">
            Découvrez en 3 étapes simples comment commencer à utiliser nos trottinettes électriques
          </p>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="relative group"
            >
              <div className="absolute -inset-1 bg-emerald-100 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full p-6 border border-slate-100">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-emerald-500 font-bold text-xl">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center mt-12">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-inner">
                      {step.icon}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-1 bg-emerald-100 mx-1 relative">
                    <div className="absolute inset-0 bg-emerald-100 w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;