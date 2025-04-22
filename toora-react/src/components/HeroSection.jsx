import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-success text-white py-5">
      <div className="container text-center px-4">
        <h2 className="display-4 fw-bold mb-4">Mobilité Urbaine Écologique</h2>
        <p className="lead mb-5 mx-auto" style={{ maxWidth: "600px" }}>
          Découvrez une nouvelle façon de vous déplacer en ville. Économique,
          écologique et pratique.
        </p>
        {/* <button className="btn btn-light text-success px-5 py-3 fw-semibold shadow-lg">
            Trouver une trottinette
          </button> */}
        <Link
          to="/trottinettes"
          className="btn btn-light text-success px-4 py-2"
        >
          Trouver une trottinette
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
