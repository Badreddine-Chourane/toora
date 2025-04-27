import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h3 className="h5 fw-semibold mb-3">Toora.ma</h3>
            <p className="text-secondary">
              Service de trottinettes électriques en libre-service. Économique, écologique et pratique.
            </p>
          </div>
          <div className="col-md-4">
            <h3 className="h5 fw-semibold mb-3">Liens utiles</h3>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#" className="text-decoration-none link-light">À propos</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none link-light">Tarifs</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none link-light">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-decoration-none link-light">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="h5 fw-semibold mb-3">Contact</h3>
            <p className="text-secondary mb-2">
              <i className="bi bi-envelope me-2"></i> info@toora.ma
            </p>
            <p className="text-secondary mb-2">
              <i className="bi bi-telephone me-2"></i> +212 522 123 456
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary link-light"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-secondary link-light"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-secondary link-light"><i className="bi bi-twitter fs-5"></i></a>
            </div>
          </div>
        </div>
        <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
          <p>© 2025 Toora.ma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;