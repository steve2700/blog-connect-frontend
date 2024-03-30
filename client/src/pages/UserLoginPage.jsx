import React from 'react';
import UserLoginForm from '../components/User/UserLoginForm';

const UserLoginPage = () => {
  return (
    <div className="login-container bg-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6">User Login</h1>
      <UserLoginForm />
    </div>
  );
};

export default UserLoginPage;

