import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistrationPage from './pages/UserRegistrationPage'; // Import the user registration page
import UserLoginPage from './pages/UserLoginPage'; // Import the user login page
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import the forgot password page
import ResetPasswordPage from './pages/ResetPasswordPage'; // Import the reset password page

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Your header content */}
        </header>

        {/* Use the Routes component and wrap Route components inside it */}
        <Routes>
          {/* Add routes for the different pages */}
          <Route path="/signup" element={<UserRegistrationPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

