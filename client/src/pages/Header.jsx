import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-10" src="/mylogo.png" alt="Logo" />
            <h1 className="text-xl font-bold ml-2">Your Blog</h1>
          </div>
          {/* Navigation Links (centered on large screens) */}
          <div className="hidden md:flex flex-grow justify-center">
            <a href="#" className="text-gray-600 hover:text-gray-800 mr-4">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 ml-4">About</a>
          </div>
          {/* Login and Signup Buttons (shown on large screens) */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-800">Login</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-lg text-gray-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded transition duration-300">Home</a>
              <a href="#" className="text-lg text-gray-600 hover:bg-gray-100 font-semibold px-4 py-2 rounded transition duration-300">About</a>
              {/* Login and Signup Buttons */}
              <button className="text-gray-600 hover:text-gray-800 border border-gray-300 px-4 py-2 rounded">Login</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Get Started</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

