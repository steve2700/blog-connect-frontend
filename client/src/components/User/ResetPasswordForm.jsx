import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaLock } from 'react-icons/fa'; // Importing required icons
import Message from './Message';

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!newPassword.trim()) {
        setMessage('New password is required.');
        setMessageType('error');
        return;
      }

      // Make the backend API call to reset password
      const response = await axios.post(`http://localhost:3001/auth/reset-password/${token}`, { newPassword });

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
        <h2 className="text-2xl mb-6 font-bold text-center">Reset Password</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            <FaLock className="inline-block mr-2" />
            New Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3"
            id="newPassword"
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;

