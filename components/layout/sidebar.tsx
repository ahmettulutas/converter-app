'use client';
import { useState } from 'react';
import { Menu, X, Home, Settings, User } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 space-y-6 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white focus:outline-none" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>

        {/* Sidebar Links */}
        <nav className="mt-8 space-y-4">
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
            <Home size={20} /> <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
            <User size={20} /> <span>Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
            <Settings size={20} /> <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 text-gray-900 bg-gray-200 p-2 rounded-full shadow-md focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>
    </div>
  );
}
