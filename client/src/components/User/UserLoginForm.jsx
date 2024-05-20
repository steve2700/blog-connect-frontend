import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing required icons

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '', // Changed from 'email' to 'identifier'
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      identifier: '', // Changed from 'email' to 'identifier'
      password: '',
    });
  };

  const hideMessageAfterDelay = (setter) => {
    setTimeout(() => {
      setter('');
    }, 7000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    // Check for required fields
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email/Username is required'; // Changed from 'email' to 'identifier'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      hideMessageAfterDelay(setErrors);
      return;
    }

    try {
      // Make the backend API call to http://localhost:3001/auth/login
      const response = await axios.post('http://localhost:3001/auth/login', formData);

      // Assuming your backend sends a 200 status code on successful login
      if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        setSuccessMessage('Welcome back! You have logged in successfully.'); // Updated success message
        setErrors({});
        // Redirect to the dashboard/user page (update the route according to your actual route)
        navigate('/dashboard'); 
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrors({ identifier: 'User not found.' }); // Changed from 'email' to 'identifier'
      } else if (error.response.status === 401) {
        setErrors({ password: 'Invalid password.' });
      } else if (error.response.status === 422) {
        setErrors({ identifier: 'Email not confirmed. Please verify your email address.' }); // Changed from 'email' to 'identifier'
      } else {
        setErrors(error.response.data.errors || { generic: 'An error occurred. Please try again.' });
      }
      setSuccessMessage('');
      hideMessageAfterDelay(setErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl mb-6 font-bold text-center">Log In</h2>

        {successMessage && (
          <div className="mb-4 bg-green-200 text-green-800 rounded p-2">{successMessage}</div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 bg-red-200 text-red-800 rounded p-2">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
            <FaEnvelope className="inline-block mr-2" />
            Email/Username 
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${errors.identifier && 'border-red-500'}`}
            id="identifier"
            type="text"
            placeholder="Email/Username" 
            name="identifier" // Changed from 'email' to 'identifier'
            value={formData.identifier}
            onChange={handleChange}
          />
          {errors.identifier && <p className="text-red-500 text-xs italic">{errors.identifier}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            <FaLock className="inline-block mr-2" />
            Password
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${errors.password && 'border-red-500'}`}
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
            type="submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
          <p className="text-sm">
            Forgot your password?{' '}
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Reset it here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLoginForm;

