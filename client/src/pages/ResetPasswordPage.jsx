import React from 'react';
import { useParams } from 'react-router-dom';
import ResetPasswordForm from '../components/User/ResetPasswordForm';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Extract token from URL parameters

  return (
    <div>
      <h1>Reset Password</h1>
      <ResetPasswordForm token={token} /> {/* Pass token to ResetPasswordForm */}
    </div>
  );
};

export default ResetPasswordPage;

