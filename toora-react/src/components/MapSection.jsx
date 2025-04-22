import React from 'react';

const MapSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold mb-4 display-5">Trouvez des trottinettes près de chez vous</h2>
            <p className="text-muted mb-4">
              Notre application vous permet de localiser facilement les trottinettes disponibles dans votre quartier.
              Reservez-les à l'avance ou prenez-les instantanément.
            </p>
            <button className="btn btn-success px-4 py-3">
              Ouvrir la carte
            </button>
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <div className="bg-light rounded d-flex align-items-center justify-content-center">
                <div className="text-center p-4">
                  <i className="bi bi-map text-muted display-4 mb-3"></i>
                  {/* <p className="text-muted">Carte interactive des trottinettes disponibles</p> */}
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;