import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDraftingCompass, FaCog, FaCaretDown, FaBookmark } from 'react-icons/fa'; // Import FaBookmark icon
import { MdCategory } from 'react-icons/md';

const Sidebar = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const toggleCategories = () => {
    setCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <nav className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <NavLink to="/dashboard" className="text-white text-2xl font-semibold flex items-center space-x-2 px-4">
        <FaHome />
        <span>Dashboard</span>
      </NavLink>
      <div className="space-y-1">
        <NavLink
          to="/dashboard/all-posts"
          className={({ isActive }) =>
            isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
          }
        >
          <FaHome className="mr-2" />
          All Posts
        </NavLink>
        <div className="relative">
          <button
            onClick={toggleCategories}
            className="block w-full text-left py-2 hover:bg-gray-700 flex items-center focus:outline-none"
            aria-expanded={isCategoriesOpen}
          >
            <MdCategory className="mr-2" />
            Categories
            <FaCaretDown className="ml-2 h-4 w-4" />
          </button>
          {isCategoriesOpen && (
            <ul className="list-none mt-2 ml-4">
              <li>
                <NavLink
                  to="/categories/category1"
                  className={({ isActive }) =>
                    isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
                  }
                >
                  <MdCategory className="mr-2" />
                  Category 1
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories/category2"
                  className={({ isActive }) =>
                    isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
                  }
                >
                  <MdCategory className="mr-2" />
                  Category 2
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <NavLink
          to="/dashboard/drafts"
          className={({ isActive }) =>
            isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
          }
        >
          <FaDraftingCompass className="mr-2" />
          Drafts
        </NavLink>
        <NavLink
          to="/dashboard/bookmarks" // Add the link to the bookmarks page
          className={({ isActive }) =>
            isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
          }
        >
          <FaBookmark className="mr-2" /> {/* Add the FaBookmark icon */}
          Bookmarks
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            isActive ? "block py-2 bg-gray-700 flex items-center" : "block py-2 hover:bg-gray-700 flex items-center"
          }
        >
          <FaCog className="mr-2" />
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;

