import React from 'react';

const Benefits = () => {
  const benefits = [
    {
      title: "Écologique",
      description: "Zéro émission, 100% électrique. Contribuez à réduire l'empreinte carbone urbaine."
    },
    {
      title: "Économique",
      description: "Des tarifs compétitifs adaptés à tous les budgets et besoins de déplacement."
    },
    {
      title: "Pratique",
      description: "Disponible 24/7, facile à utiliser et à localiser via notre application mobile."
    },
    {
      title: "Sécurisé",
      description: "Toutes nos trottinettes sont régulièrement entretenues pour assurer votre sécurité."
    }
  ];

  return (
    <section className="homepage_section bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 display-5">Pourquoi choisir Toora.ma ?</h2>
        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h3 className="h5 fw-semibold mb-3 text-success">{benefit.title}</h3>
                <p className="text-muted">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;