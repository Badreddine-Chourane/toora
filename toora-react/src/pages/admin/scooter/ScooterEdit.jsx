import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, QrCode } from 'lucide-react';
import scooterAPI from '../../../api/scooters';
import api from '../../../api';

const ScooterEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [villes, setVilles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      scooterAPI.get(id).then(res => setForm(res.data)),
      api.get('/villes').then(res => setVilles(res.data))
    ]).finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('code', form.code);
    formData.append('modele', form.modele);
    formData.append('etat', form.etat);
    formData.append('batterie', form.batterie);
    formData.append('latitude', form.latitude);
    formData.append('longitude', form.longitude);
    formData.append('ville_id', form.ville_id);
    formData.append('en_location', form.en_location ? '1' : '0');

    if (form.photo instanceof File) {
      formData.append('photo', form.photo);
    }

    try {
      await scooterAPI.update(id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/scooters');
    } catch (error) {
      setIsSubmitting(false);
      if (error.response?.data?.errors) {
        alert('Error: ' + JSON.stringify(error.response.data.errors));
      } else {
        alert('Error updating scooter.');
      }
    }
  };

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-white p-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-500">Loading scooter data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/scooters')}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Scooters
          </button>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <QrCode className="mr-2 text-blue-500" size={24} />
            Edit Scooter
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="modele"
                    value={form.modele}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="etat"
                    value={form.etat}
                    onChange={handleChange}
                    required
                  >
                    <option value="available">Available</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="reserved">Reserved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Battery (%)</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="batterie"
                    type="number"
                    min="0"
                    max="100"
                    value={form.batterie}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    name="ville_id"
                    value={form.ville_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a city</option>
                    {villes.map(v => (
                      <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    name="en_location"
                    checked={form.en_location}
                    onChange={handleChange}
                  />
                  <label className="ml-2 block text-sm text-gray-700">Available for rent</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
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

export default ScooterEdit;