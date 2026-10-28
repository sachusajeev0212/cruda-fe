import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/create" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BookSphere Management System — React, Tailwind CSS & JSON Server</p>
        </footer>
      </div>
    </Router>
  );
}
