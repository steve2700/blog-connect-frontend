import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import AllPosts from './pages/AllPosts';
import Drafts from './pages/Drafts';
import Settings from './pages/Settings';
import HomePage from './pages/HomePage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import UserLoginPage from './pages/UserLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CreatePost from './pages/CreatePost'; // Import CreatePost component
import BookmarkedPosts from './pages/BookmarkedPosts.jsx';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserRegistrationPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="all-posts" element={<AllPosts />} />
          <Route path="drafts" element={<Drafts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-post" element={<CreatePost />} />
	  <Route path="bookmarks" element={<BookmarkedPosts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

