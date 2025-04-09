import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VilleList from './pages/villes/VillesList';
import VilleCreate from './pages/villes/VilleCreate';
import VilleEdit from './pages/villes/VilleEdit';
import VilleShow from './pages/villes/VilleShow';
import ScooterList from "./pages/scooter/ScooterList";
import ScooterCreate from "./pages/scooter/ScooterCreate";
import ScooterEdit from "./pages/scooter/ScooterEdit";
import ScooterShow from "./pages/scooter/ScooterShow";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/villes" element={<VilleList />} />
        <Route path="/villes/create" element={<VilleCreate />} />
        <Route path="/villes/:id/edit" element={<VilleEdit />} />
        <Route path="/villes/:id" element={<VilleShow />} />
        <Route path="/scooters" element={<ScooterList />} />
        <Route path="/scooters/create" element={<ScooterCreate />} />
        <Route path="/scooters/:id/edit" element={<ScooterEdit />} />
        <Route path="/scooters/:id" element={<ScooterShow />} />
      </Routes>
    </Router>
  );
}

export default App;
