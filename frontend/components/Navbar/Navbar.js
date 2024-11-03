import React, { useState } from 'react';

const Navbar = () => {
  const [isOnline, setIsOnline] = useState(true); // You can manage this state as needed

  return (
    <nav className="bg-violet-700 p-2 px-10 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/app.png" alt="Icon" className="h-6 w-6 mr-2" />
        <span className="text-white font-bold">My App</span>
      </div>

      <div className="flex-0 mx-4 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md"
        />
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <span
            className={`h-3 w-3 rounded-full mr-2 ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></span>
          <span className="text-white">{isOnline ? 'Online' : 'Offline'}</span>
        </div>

        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Account
        </button>
      </div>
    </nav>
  );
};

export default Navbar;