import React from 'react';
import Header from './Header'; // Import the Header component

const HomePage = () => {
  return (
    <div>
      <Header /> {/* Render the Header component */}
      {/* Add other content for your homepage */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Welcome to My Blog!</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    </div>
  );
};

export default HomePage;

