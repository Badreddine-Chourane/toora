import React from 'react';

const Testimonials = () => {
  return (
    <section className="homepage_section bg-light">
      <div className="container px-4">
        <h2 className="text-center fw-bold mb-5 display-5">Ce que disent nos utilisateurs</h2>
        <div className="row g-4">
          {/* Testimonial 1 */}
          <div className="col-md-4">
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <div className="mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>
              <p className="text-muted mb-4">
                "J'utilise Toora.ma tous les jours pour me rendre au travail. C'est rapide, économique et je me sens bien de contribuer à un environnement plus propre."
              </p>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-3" style={{width: '50px', height: '50px'}}></div>
                <div>
                  <p className="fw-semibold mb-0">Karim</p>
                  <p className="text-muted small mb-0">Casablanca</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="col-md-4">
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <div className="mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>
              <p className="text-muted mb-4">
                "L'application est super intuitive et les trottinettes sont toujours en bon état. Je recommande vivement!"
              </p>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-3" style={{width: '50px', height: '50px'}}></div>
                <div>
                  <p className="fw-semibold mb-0">Fatima</p>
                  <p className="text-muted small mb-0">Rabat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="col-md-4">
            <div className="bg-white p-4 rounded shadow-sm h-100">
              <div className="mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>
              <p className="text-muted mb-4">
                "Fini les problèmes de stationnement et les embouteillages! Toora.ma a changé ma façon de me déplacer en ville."
              </p>
              <div className="d-flex align-items-center">
                <div className="bg-success rounded-circle me-3" style={{width: '50px', height: '50px'}}></div>
                <div>
                  <p className="fw-semibold mb-0">Ahmed</p>
                  <p className="text-muted small mb-0">Marrakech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;