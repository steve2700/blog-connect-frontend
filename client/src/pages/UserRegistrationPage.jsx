import React from 'react';
import UserRegistrationForm from '../components/User/UserRegistrationForm';

const UserRegistrationPage = () => {
  return (
    <div className="registration-container bg-gray-200"> {/* Set background color to gray */}
      {/* Colorful Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        <span className="text-red-500">J</span>
        <span className="text-blue-500">o</span>
        <span className="text-green-500">i</span>
        <span className="text-yellow-500">n</span> our Community
      </h1>

      <UserRegistrationForm />
    </div>
  );
};

export default UserRegistrationPage;

