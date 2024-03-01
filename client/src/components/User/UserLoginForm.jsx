// UserLoginForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    // Check for required fields
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Check for valid email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email should be in a valid format';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    try {
      // Make the backend API call to http://localhost:3001/api/users/login
      const response = await axios.post('http://localhost:3001/auth/login', formData);

      // Assuming your backend sends a 200 status code on successful login
      if (response.status === 200) {
        setSuccessMessage('Login successful');
        setErrors({});
        // Redirect to the dashboard/user page
        navigate('/dashboard/user');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrors({ email: 'User not found.' });
      } else if (error.response.status === 401) {
        setErrors({ password: 'Invalid password.' });
      } else if (error.response.status === 422) {
        setErrors({ email: 'Email not confirmed. Please verify your email address.' });
      } else {
        setErrors(error.response.data.errors || { generic: 'An error occurred. Please try again.' });
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl mb-6 font-bold text-center">Log In</h2>

        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}

        {errors.generic && (
          <div className="mb-4 text-red-500">{errors.generic}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${errors.email && 'border-red-500'}`}
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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

