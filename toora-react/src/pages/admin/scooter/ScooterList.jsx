import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, RefreshCw, QrCode, Eye } from 'lucide-react';
import scooterAPI from '../../../api/scooters';
import { QRCodeCanvas } from "qrcode.react";

const ScooterList = () => {
  const [scooters, setScooters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    scooterAPI.list()
      .then(response => {
        console.log(response.data); 
        setScooters(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setScooters([]);
        setIsLoading(false);
      });
  }, [refresh]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this scooter?')) {
      scooterAPI.delete(id)
        .then(() => setRefresh(r => !r));
    }
  };

  const refreshList = () => {
    setRefresh(r => !r);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <QrCode className="mr-2 text-blue-500" size={24} />
            Scooters Management
          </h2>
          <div className="flex space-x-3">
            <button 
              onClick={refreshList}
              className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link
              to="/scooters/create"
              className="flex items-center px-3 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add Scooter
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-500">Loading scooters...</p>
              </div>
            </div>
          ) : scooters.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <QrCode size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">No scooters found</p>
              <Link
                to="/scooters/create"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Add Scooter
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Battery</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Code</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scooters.map(scooter => (
                    <tr key={scooter.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{scooter.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{scooter.modele}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          scooter.etat === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {scooter.etat}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                scooter.batterie > 70 ? 'bg-green-500' : 
                                scooter.batterie > 30 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${scooter.batterie}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{scooter.batterie}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center">
                          <QRCodeCanvas
                            value={`http://localhost:3000/trottinettes/${scooter.id}/reserver`}
                            size={64}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/trottinettes/${scooter.id}`)}
                            className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/scooters/${scooter.id}/edit`)}
                            className="p-1.5 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(scooter.id)}
                            className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScooterList;