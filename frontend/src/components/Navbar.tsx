'use client';

import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Auto-UML
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-[#3A2990] transition-colors">
            Home
          </Link>
          <Link to="/generate" className="hover:text-[#3A2990] transition-colors">
            Generate
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="ml-2 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
