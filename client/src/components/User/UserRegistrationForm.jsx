// UserRegistrationForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Message from './Message';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

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

    // Check for minimum username length
    if (formData.username.trim().length < 3) {
      newErrors.username = 'Username should be at least 3 characters long';
    }

    // Check for password requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (formData.password.trim() && !passwordRegex.test(formData.password.trim())) {
      newErrors.password =
        'Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    try {
      // Make the backend API call to 
      const response = await axios.post('http://localhost:3001/auth/signup', formData);

      // Assuming your backend sends a 201 status code on successful registration
      if (response.status === 201) {
        setSuccessMessage(response.data.message);
        setErrors({});
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrors({ username: 'Username or email already exists' });
      } else {
        setErrors(error.response.data.errors || { generic: 'An error occurred. Please try again.' });
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl mb-6 font-bold text-center">Sign Up</h2>

        {successMessage && <Message message={successMessage} type="success" />}

        {errors.generic && <Message message={errors.generic} type="error" />}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className={`appearance-none border rounded w-full py-2 px-3 ${errors.username && 'border-red-500'}`}
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <Message message={errors.username} type="error" />}
        </div>

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
          {errors.email && <Message message={errors.email} type="error" />}
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
          {errors.password && <Message message={errors.password} type="error" />}
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserRegistrationForm;

