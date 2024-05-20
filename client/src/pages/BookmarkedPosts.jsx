import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookmarkedPosts = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/bookmarks/bookmarks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookmarkedPosts(response.data.bookmarks);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bookmarked posts.');
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, []);

  const handleUnbookmark = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/posts/${postId}/unbookmark`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBookmarkedPosts(bookmarkedPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Failed to unbookmark post:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bookmarked-posts-container">
      <h2 className="text-2xl font-semibold mb-4">Bookmarked Posts</h2>
      {bookmarkedPosts.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">No bookmarked posts yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedPosts.map(post => (
            <div key={post._id} className="border border-gray-200 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">Author: {post.author}</p>
              <p className="text-gray-600 mb-2">Categories: {post.categories.join(', ')}</p>
              <button 
                onClick={() => handleUnbookmark(post._id)} 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              >
                Unbookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedPosts;

