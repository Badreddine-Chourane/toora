// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import scooterAPI from '../../api/scooters';
// import { QRCodeCanvas } from "qrcode.react";
// import { ArrowLeft, Battery, MapPin, Calendar } from "lucide-react";
// import AuthModals from "../../components/AuthModals";
// import L from 'leaflet';

// // Fix for default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

// // Default coordinates for Casablanca
// const CASABLANCA_CENTER = {
//     lat: 33.5731104,
//     lng: -7.5898434
// };

// const ScooterShow = () => {
//   const { id } = useParams();
//   const [scooter, setScooter] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [showSignupForm, setShowSignupForm] = useState(false);
//   const [pendingReservation, setPendingReservation] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     scooterAPI.get(id).then(res => {
//       const data = res.data;
//       // Ensure coordinates are parsed as floats and validated
//       data.latitude = parseFloat(data.latitude) || CASABLANCA_CENTER.lat;
//       data.longitude = parseFloat(data.longitude) || CASABLANCA_CENTER.lng;
      
//       // Validate coordinates are within Morocco/Casablanca region
//       if (data.latitude < 20 || data.latitude > 40 || data.longitude < -13 || data.longitude > 0) {
//         data.latitude = CASABLANCA_CENTER.lat;
//         data.longitude = CASABLANCA_CENTER.lng;
//       }
      
//       setScooter(data);
//     });
//     setIsLoggedIn(!!localStorage.getItem('authToken'));
//   }, [id]);

//   useEffect(() => {
//     if (isLoggedIn && pendingReservation) {
//       setShowLoginForm(false);
//       setPendingReservation(false);
//       navigate(`/trottinettes/${id}/reserver`);
//     }
//   }, [isLoggedIn, pendingReservation, id, navigate]);

//   const handleReserve = () => {
//     // Don't allow reservation if scooter is in maintenance
//     if (scooter?.etat !== "available") {
//       return;
//     }
    
//     if (!isLoggedIn) {
//       setPendingReservation(true);
//       setShowLoginForm(true);
//     } else {
//       navigate(`/trottinettes/${id}/reserver`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <Link 
//           to="/trottinettes" 
//           className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
//         >
//           <ArrowLeft className="mr-2" size={18} />
//           Retour à la liste
//         </Link>

//         {/* Side-by-Side Container */}
//         <div className="flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Image Section (50% width) */}
//           <div className="sm:w-1/2 h-96 sm:h-auto">
//             <img
//               src={scooter?.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
//               className="w-full h-full object-contain object-center"
//               alt={scooter?.modele}
//             />
//           </div>

//           {/* Details Section (50% width) */}
//           <div className="sm:w-1/2 p-6 sm:p-8">            <div className="flex justify-between items-start mb-4">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{scooter?.modele}</h1>
//               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                 scooter?.etat !== "available"
//                   ? 'bg-amber-100 text-amber-800'
//                   : scooter?.en_location
//                     ? 'bg-red-100 text-red-800'
//                     : 'bg-emerald-100 text-emerald-800'
//               }`}>
//                 {scooter?.etat !== "available" 
//                   ? 'En maintenance'
//                   : scooter?.en_location 
//                     ? 'Indisponible' 
//                     : 'Disponible'}
//               </span>
//             </div>

//             {/* Stats */}
//             <div className="flex flex-wrap gap-3 mb-6">
//               <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
//                 <Battery className="text-emerald-500 mr-2" size={16} />
//                 <span>{scooter?.batterie}%</span>
//               </div>
//               <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
//                 <MapPin className="text-emerald-500 mr-2" size={16} />
//                 <span>{scooter?.ville?.nom || "Ville inconnue"}</span>
//               </div>
//             </div>

//             {/* Location with Map */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Localisation</h3>
//               {scooter?.latitude && scooter?.longitude ? (
//                 <div className="h-[300px] rounded-lg overflow-hidden">
//                   <MapContainer 
//                     center={[scooter.latitude, scooter.longitude]} 
//                     zoom={14} 
//                     className="h-full w-full"
//                     zoomControl={false}
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <ZoomControl position="topright" />
//                     <Marker 
//                       position={[scooter.latitude, scooter.longitude]}
//                     >
//                       <Popup>
//                         <div className="text-center">
//                           <strong>{scooter.modele}</strong><br />
//                           <span className="text-sm text-gray-600">{scooter.ville?.nom || "Casablanca"}</span>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   </MapContainer>
//                 </div>
//               ) : (
//                 <p className="text-gray-500">Localisation non disponible</p>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               onClick={handleReserve}
//               disabled={scooter?.en_location || scooter?.etat !== "available"}
//               className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
//                 scooter?.en_location || scooter?.etat !== "available"
//                   ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                   : 'bg-emerald-600 hover:bg-emerald-700 text-white'
//               } transition-colors`}
//             >
//               <Calendar className="mr-2" size={16} />
//               {scooter?.en_location ? 'Déjà réservée' : 
//                scooter?.etat !== "available" ? 'En maintenance' : 
//                'Réserver'}
//             </button>

//             {/* Display maintenance status if applicable */}
//             {scooter?.etat !== "available" && (
//               <div className="mt-2 text-center text-amber-600 text-sm">
//                 Cette trottinette est actuellement en maintenance
//               </div>
//             )}

//             {/* QR Code */}
//             <div className="mt-8 pt-6 border-t border-gray-200 text-center">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">QR Code de réservation</h3>
//               <div className="flex justify-center mb-2">
//                 <QRCodeCanvas 
//                   value={`http://localhost:3000/trottinettes/${scooter?.id}/reserver`} 
//                   size={140}
//                 />
//               </div>
//               <p className="text-gray-500 text-xs">Scannez pour réserver</p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <AuthModals
//         isLoggedIn={isLoggedIn}
//         setIsLoggedIn={setIsLoggedIn}
//         showLoginForm={showLoginForm}
//         setShowLoginForm={setShowLoginForm}
//         showSignupForm={showSignupForm}
//         setShowSignupForm={setShowSignupForm}
//       />
//     </div>
//   );
// };

// export default ScooterShow;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import scooterAPI from '../../api/scooters';
import { QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, Battery, MapPin, Calendar } from "lucide-react";
import AuthModals from "../../components/AuthModals";
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Default coordinates for Casablanca
const CASABLANCA_CENTER = {
    lat: 33.5731104,
    lng: -7.5898434
};

const ScooterShow = () => {
  const { id } = useParams();
  const [scooter, setScooter] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [pendingReservation, setPendingReservation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    scooterAPI.get(id).then(res => {
      const data = res.data;
      // Ensure coordinates are parsed as floats and validated
      data.latitude = parseFloat(data.latitude) || CASABLANCA_CENTER.lat;
      data.longitude = parseFloat(data.longitude) || CASABLANCA_CENTER.lng;
      
      // Validate coordinates are within Morocco/Casablanca region
      if (data.latitude < 20 || data.latitude > 40 || data.longitude < -13 || data.longitude > 0) {
        data.latitude = CASABLANCA_CENTER.lat;
        data.longitude = CASABLANCA_CENTER.lng;
      }
      
      setScooter(data);
    });
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && pendingReservation) {
      setShowLoginForm(false);
      setPendingReservation(false);
      navigate(`/trottinettes/${id}/reserver`);
    }
  }, [isLoggedIn, pendingReservation, id, navigate]);

  const handleReserve = () => {
    // Don't allow reservation if scooter is in maintenance
    if (scooter?.etat !== "available") {
      return;
    }
    
    if (!isLoggedIn) {
      setPendingReservation(true);
      setShowLoginForm(true);
    } else {
      navigate(`/trottinettes/${id}/reserver`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/trottinettes" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2" size={18} />
          Retour à la liste
        </Link>

        {/* Side-by-Side Container */}
        <div className="flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Section (50% width) */}
          <div className="sm:w-1/2 h-96 sm:h-auto">
            <img
              src={scooter?.photo ? `http://localhost:8000/storage/${scooter.photo}` : '/images/photo.jpeg'}
              className="w-full h-full object-contain object-center"
              alt={scooter?.modele}
            />
          </div>

          {/* Details Section (50% width) */}
          <div className="sm:w-1/2 p-6 sm:p-8">            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{scooter?.modele}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                scooter?.etat !== "available"
                  ? 'bg-amber-100 text-amber-800'
                  : scooter?.en_location
                    ? 'bg-red-100 text-red-800'
                    : 'bg-emerald-100 text-emerald-800'
              }`}>
                {scooter?.etat !== "available" 
                  ? 'En maintenance'
                  : scooter?.en_location 
                    ? 'Indisponible' 
                    : 'Disponible'}
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <Battery className="text-emerald-500 mr-2" size={16} />
                <span>{scooter?.batterie}%</span>
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <MapPin className="text-emerald-500 mr-2" size={16} />
                <span>{scooter?.ville?.nom || "Ville inconnue"}</span>
              </div>
            </div>

            {/* Location with Map */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Localisation</h3>
              {scooter?.latitude && scooter?.longitude ? (
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <MapContainer 
                    center={[scooter.latitude, scooter.longitude]} 
                    zoom={14} 
                    className="h-full w-full"
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl position="topright" />
                    <Marker 
                      position={[scooter.latitude, scooter.longitude]}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>{scooter.modele}</strong><br />
                          <span className="text-sm text-gray-600">{scooter.ville?.nom || "Casablanca"}</span>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <p className="text-gray-500">Localisation non disponible</p>
              )}
            </div>

            {/* Button */}
            <button
              onClick={handleReserve}
              disabled={scooter?.en_location || scooter?.etat !== "available"}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium ${
                scooter?.en_location || scooter?.etat !== "available"
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              } transition-colors`}
            >
              <Calendar className="mr-2" size={16} />
              {scooter?.en_location ? 'Déjà réservée' : 
               scooter?.etat !== "available" ? 'En maintenance' : 
               'Réserver'}
            </button>

            {/* Display maintenance status if applicable */}
            {scooter?.etat !== "available" && (
              <div className="mt-2 text-center text-amber-600 text-sm">
                Cette trottinette est actuellement en maintenance
              </div>
            )}

            {/* QR Code */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">QR Code de réservation</h3>
              <div className="flex justify-center mb-2">
                <QRCodeCanvas 
                  value={`http://localhost:3000/trottinettes/${scooter?.id}/reserver`} 
                  size={140}
                />
              </div>
              <p className="text-gray-500 text-xs">Scannez pour réserver</p>
            </div>
          </div>
        </div>
      </main>

      <AuthModals
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        showSignupForm={showSignupForm}
        setShowSignupForm={setShowSignupForm}
      />
    </div>
  );
};

export default ScooterShow;