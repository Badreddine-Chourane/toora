import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="text-white py-5"
      style={{
        backgroundImage: `url(${require('../assets/images/foot_scooter.jpg')})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container text-center px-4">
        <h1
          className="display-4 fw-bold mb-4"
          style={{
            textShadow: "1px 2px 3px black",
            transform: "scale(150%)",
          }}
        >
          Mobilité Urbaine Écologique
        </h1>
        <p
          className="lead mb-5 mx-auto"
          style={{
            maxWidth: "600px",
            fontSize: "1.8rem",
          }}
        >
          Découvrez une nouvelle façon de vous déplacer en ville. Économique,
          écologique et pratique.
        </p>
        <Link
          to="/trottinettes"
          className="btn btn-light text-success px-4 py-2"
          style={{
            height: "60px",
            fontSize: "1.4rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "30%",
            margin: "0 auto",
          }}
        >
          Trouver une trottinette
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
