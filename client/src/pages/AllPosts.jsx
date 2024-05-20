import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />}
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="text-sm text-gray-500 mb-2">
                <strong>Author:</strong> {post.author ? post.author.name : 'Unknown'}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                <strong>Categories:</strong> {post.categories && post.categories.length > 0 ? post.categories.map(cat => cat.name).join(', ') : 'Uncategorized'}
              </div>
              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;

