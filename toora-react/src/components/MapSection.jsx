import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';
import axios from 'axios'; // For API requests

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapSection = () => {
  const [scooters, setScooters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch scooters from the backend
  useEffect(() => {
    const fetchScooters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/scooters'); // Replace with your API endpoint
        setScooters(response.data); // Assuming the API returns an array of scooters
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching scooters:', error);
        setIsLoading(false);
      }
    };

    fetchScooters();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Navigation className="text-emerald-500 mb-4" size={36} />
          <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">Trouvez des trottinettes près de chez vous</h2>
          <p className="text-lg text-center text-slate-600 max-w-2xl">
            Localisez facilement les trottinettes disponibles dans votre quartier.
            Réservez à l'avance ou prenez-les instantanément.
          </p>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full mr-4">
                  <Navigation className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Couverture nationale</h3>
                  <p className="text-slate-600">Disponible dans les principales villes du Maroc</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full mr-4">
                  <Navigation className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Localisation en temps réel</h3>
                  <p className="text-slate-600">Trouvez les trottinettes disponibles près de vous</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full mr-4">
                  <Navigation className="text-emerald-600" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Simple et rapide</h3>
                  <p className="text-slate-600">Réservation en quelques clics seulement</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-96 rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">Chargement des trottinettes...</p>
              </div>
            ) : (
              <MapContainer
                center={[33.5731, -7.5898]} // Default center (Casablanca)
                zoom={8}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
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
                    <Popup className="font-medium text-slate-700">
                      <div className="flex items-center">
                        <Navigation className="text-emerald-500 mr-2" size={16} />
                        Scooter disponible à <span className="font-semibold ml-1">{scooter.ville}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;