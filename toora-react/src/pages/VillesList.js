import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VillesList = () => {
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    // Replace with your actual API URL
    axios.get('http://127.0.0.1:8000/api/villes')
      .then(response => {
        setVilles(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the villes!", error);
      });
  }, []);

  return (
    <div>
      <h1>Villes List</h1>
      <ul>
        {villes.map(ville => (
          <li key={ville.id}>{ville.nom}</li>
        ))}
      </ul>
    </div>
  );
};

export default VillesList;
