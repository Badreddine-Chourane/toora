import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Inscrivez-vous",
      description: "Créez un compte en quelques étapes simples pour commencer votre expérience avec Toora.ma."
    },
    {
      number: 2,
      title: "Trouvez une trottinette",
      description: "Localisez une trottinette disponible près de vous grâce à notre application."
    },
    {
      number: 3,
      title: "Roulez & Profitez",
      description: "Déverrouillez la trottinette avec l'application et commencez votre trajet."
    }
  ];

  return (
    <section className="homepage_section bg-white">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 display-5">Comment ça marche ?</h2>
        <div className="row g-4">
          {steps.map((step) => (
            <div key={step.number} className="col-md-4">
              <div className="text-center p-4 bg-light rounded shadow-sm h-100">
                <div 
                  className="bg-success-subtle rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="fs-4 text-success fw-bold">{step.number}</span>
                </div>
                <h3 className="h4 fw-semibold mb-3">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;