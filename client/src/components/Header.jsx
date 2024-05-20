import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../mylogo.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-900 text-white flex justify-between items-center p-4">
      <Link to="/" className="flex items-center text-xl font-bold">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        Dashboard
      </Link>
      <div className="flex items-center relative">
        <Link to="/dashboard/create-post" className="mr-4 bg-blue-500 py-2 px-4 rounded text-white">
          Write a Post
        </Link>
        <FaBell className="mr-4 cursor-pointer" />
        <button onClick={toggleDropdown} className="focus:outline-none">
          <FaUserCircle className="cursor-pointer" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-10">
            <ul>
              <li className="border-b p-2 hover:bg-gray-200">
                <Link to="dashboard/profile">Profile</Link>
              </li>
              <li className="border-b p-2 hover:bg-gray-200">
                <Link to="dashboard/settings">Settings</Link>
              </li>
              <li className="p-2 hover:bg-gray-200">
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

