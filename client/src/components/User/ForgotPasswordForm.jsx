// ForgotPasswordForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!email.trim()) {
        setMessage('Email is required.');
        setMessageType('error');
        return;
      }

      // Check for valid email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email.trim())) {
        setMessage('Email is invalid.');
        setMessageType('error');
        return;
      }

      const response = await axios.post('http://localhost:3001/auth/forgot-password', { email });

      if (response.status === 200) {
        setMessage(response.data.message);
        setMessageType('success');
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage('User not found.');
      } else {
        setMessage(error.response.data.message || 'An unexpected error occurred.');
      }
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {message && <Message message={message} type={messageType} />}

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3" onSubmit={handleResetPassword}>
        <h2 className="text-2xl mb-6 font-bold text-center">Forgot Password</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;

