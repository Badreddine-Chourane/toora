import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Check, Save, User } from 'lucide-react';
import userAPI from '../../../api/users';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if user is admin first
        const token = localStorage.getItem('authToken');
        const userRole = localStorage.getItem('userRole');
        
        if (!token || userRole !== 'admin') {
          alert('Unauthorized. Only admins can edit users.');
          navigate('/');
          return;
        }

        const response = await userAPI.get(id);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || 'user'
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
        if (error.response?.status === 403) {
          alert('Unauthorized. Only admins can edit users.');
          navigate('/');
        } else {
          navigate('/users');
        }
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Log the data being sent
      console.log('Submitting form data:', formData);

      // Client-side validation
      if (!formData.name?.trim()) {
        throw new Error('Name is required');
      }
      if (!formData.email?.trim()) {
        throw new Error('Email is required');
      }
      if (!formData.role?.trim()) {
        throw new Error('Role is required');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send the update request
      const response = await userAPI.update(id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role.trim()
      });
      console.log('Update response:', response.data);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/users');
      }, 1500);    } catch (error) {
      console.error('Error updating user:', error);
      
      // Handle validation errors from the server
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors;
        console.log('Validation errors:', validationErrors);
        const errorMessages = Object.values(validationErrors).flat().join('\n');
        alert(`Validation errors:\n${errorMessages}`);
      } 
      // Handle client-side validation errors
      else if (error.message) {
        alert(error.message);
      }
      // Handle other errors
      else {
        alert('An error occurred while updating the user');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <svg className="animate-spin w-full h-full text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/users"
            className="no-underline flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Users</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <User size={24} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit User
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role || 'user'}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isSubmitting || showSuccess}
                className={`
                  w-full relative overflow-hidden py-3 px-4 rounded-lg font-medium text-white 
                  ${isSubmitting ? 'bg-gray-400' : showSuccess ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}
                  transition-all duration-300 flex items-center justify-center
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : showSuccess ? (
                  <span className="flex items-center">
                    <Check size={18} className="mr-2" />
                    User updated successfully
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;