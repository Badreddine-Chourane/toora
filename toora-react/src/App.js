// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import VilleList from './pages/admin/villes/VillesList';
// import VilleCreate from './pages/admin/villes/VilleCreate';
// import VilleEdit from './pages/admin/villes/VilleEdit';
// import VilleShow from './pages/admin/villes/VilleShow';
// import TrottinettesPage from "./pages/scooter/TrottinettesPage";
// import ScooterCreate from "./pages/admin/scooter/ScooterCreate";
// import ScooterEdit from "./pages/admin/scooter/ScooterEdit";
// import ScooterShow from "./pages/scooter/ScooterShow";
// import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';


// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<HomePage />} />

//         <Route path="/villes" element={<VilleList />} />
//         <Route path="/villes/create" element={<VilleCreate />} />
//         <Route path="/villes/:id/edit" element={<VilleEdit />} />
//         <Route path="/villes/:id" element={<VilleShow />} />
//         <Route path="/trottinettes" element={<TrottinettesPage />} />
//         <Route path="/trottinettes/create" element={<ScooterCreate />} />
//         <Route path="/trottinettes/:id/edit" element={<ScooterEdit />} />
//         <Route path="/trottinettes/:id" element={<ScooterShow />} />
//         <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
};

export default App;