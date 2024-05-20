import React from 'react';

const Settings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input type="password" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;

