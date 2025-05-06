import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapSection = () => {
  const scooters = [
    { id: 1, latitude: 33.5731, longitude: -7.5898, ville: "Casablanca" },
    { id: 2, latitude: 34.0209, longitude: -6.8416, ville: "Rabat" },
    { id: 3, latitude: 31.6295, longitude: -7.9811, ville: "Marrakech" },
  ];

  return (
    <section className="homepage_section bg-white">
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
              <MapContainer
                center={[33.5731, -7.5898]} // Default center (Casablanca)
                zoom={8}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {scooters.map((scooter) => (
                  <Marker
                    key={scooter.id}
                    position={[scooter.latitude, scooter.longitude]}
                  >
                    <Popup>
                      Scooter disponible à {scooter.ville}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;