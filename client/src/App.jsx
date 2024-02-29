// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistrationForm from './components/User/UserRegistrationForm';
import UserLoginForm from './components/User/UserLoginForm';
import ForgotPasswordForm from './components/User/ForgotPasswordForm';
import ResetPasswordForm from './components/User/ResetPasswordForm';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Your header content */}
        </header>

        {/* Use the Routes component and wrap Route components inside it */}
        <Routes>
          {/* Add a route for the UserRegistrationForm */}
          <Route path="/signup" element={<UserRegistrationForm />} />
	  <Route path="/login" element={<UserLoginForm />} />
	  <Route path="/forgot-password" element={<ForgotPasswordForm />} />
	  <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

