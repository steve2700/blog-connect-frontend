// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistrationForm from './components/User/UserRegistrationForm';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

