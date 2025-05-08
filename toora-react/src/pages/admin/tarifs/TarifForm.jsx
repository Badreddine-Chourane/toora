import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, MapPin } from 'lucide-react';
import tarifAPI from '../../../api/tarifs';
import villeAPI from '../../../api/villes';

const TarifForm = () => {
  const [form, setForm] = useState({
    ville_id: '',
    prix_de_depart: '',
    prix_par_heure: ''
  });
  const [villes, setVilles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      villeAPI.list().then(res => setVilles(res.data)),
      id ? tarifAPI.get(id).then(res => setForm(res.data)) : Promise.resolve()
    ]).finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const apiCall = id 
      ? tarifAPI.update(id, form) 
      : tarifAPI.create(form);
    
    apiCall
      .then(() => navigate('/tarifs'))
      .catch(error => {
        console.error('Error:', error);
        alert(`Erreur: ${error.response?.data?.message || 'Une erreur est survenue'}`);
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto"> {/* Increased max-width from md to lg */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/tarifs')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux tarifs
          </button>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <MapPin className="mr-2 text-blue-500" size={24} />
            {id ? 'Modifier' : 'Ajouter'} un tarif
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8"> {/* Increased padding from p-6 to p-8 */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6"> {/* Increased spacing from space-y-4 to space-y-6 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> {/* Increased margin-bottom */}
                  Ville
                </label>
                <select
                  name="ville_id"
                  value={form.ville_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100" 
                  required
                  disabled={!!id}
                >
                  <option value="">Sélectionner une ville</option>
                  {villes.map(v => (
                    <option key={v.id} value={v.id}>{v.nom}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix de départ (MAD)
                </label>
                <input
                  name="prix_de_depart"
                  value={form.prix_de_depart}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  required
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix par heure (MAD)
                </label>
                <input
                  name="prix_par_heure"
                  value={form.prix_par_heure}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mt-10 flex justify-end"> {/* Increased margin-top */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {id ? 'Mise à jour...' : 'Création...'}
                  </>
                ) : (
                  <>
                    {id ? (
                      <>
                        <Save size={18} className="mr-3" /> {/* Increased icon size and margin */}
                        Mettre à jour
                      </>
                    ) : (
                      <>
                        <Plus size={18} className="mr-3" />
                        Créer
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TarifForm;