import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, PlusCircle, Library, Home } from 'lucide-react';

export default function Navbar() {
  const activeClass = "text-indigo-600 bg-indigo-50 font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition";
  const inactiveClass = "text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-3 py-2 rounded-lg flex items-center gap-1.5 transition";

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text text-transparent">
                BookSphere
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-400 block -mt-1 font-medium">Library Manager</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
              end
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/books"
              className={({ isActive }) => isActive ? activeClass : inactiveClass}
            >
              <Library className="w-4 h-4" />
              <span>All Books</span>
            </NavLink>

            <NavLink
              to="/create"
              className={({ isActive }) =>
                isActive
                  ? "bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm hover:shadow transition"
              }
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Book</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
