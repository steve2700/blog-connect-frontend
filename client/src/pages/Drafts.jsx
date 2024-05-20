import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/drafts'); // Adjust the URL as needed
        setDrafts(response.data.drafts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Drafts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <div key={draft._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-2">{draft.title}</h3>
            <p className="text-gray-700 mb-4">{draft.content}</p>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">Edit</button>
              <button className="bg-red-500 text-white ml-2 px-4 py-2 rounded-md shadow-md hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;

