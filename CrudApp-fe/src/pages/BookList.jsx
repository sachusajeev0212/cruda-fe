import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookApi } from '../services/api';
import { Search, Plus, Eye, Edit2, Trash2, Star, Calendar, Filter, AlertCircle } from 'lucide-react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load books
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookApi.getAll();
      setBooks(data);
    } catch (err) {
      setError('Could not connect to JSON Server. Make sure the backend server is running on port 5000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Delete book handler
  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await bookApi.delete(id);
        setBooks(prev => prev.filter(book => book.id !== id));
      } catch (err) {
        alert('Failed to delete book. Please check server status.');
      }
    }
  };

  // Filter categories
  const categories = ['All', ...new Set(books.map(b => b.category).filter(Boolean))];

  // Filtering and sorting logic
  const filteredBooks = books
    .filter(book => {
      const matchSearch =
        (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.author || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'price-asc') return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
      if (sortBy === 'price-desc') return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
      if (sortBy === 'rating') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
      if (sortBy === 'year') return (b.publishedYear || 0) - (a.publishedYear || 0);
      return 0;
    });

  return (
    <div className="space-y-8 pb-16">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Library Catalog</h1>
          <p className="text-sm text-slate-500 mt-1">Explore, search, edit and manage all cataloged books.</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Error state alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        {/* Category Select */}
        <div className="md:col-span-3">
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none font-medium text-slate-700"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition appearance-none font-medium text-slate-700"
          >
            <option value="title">Sort by Title (A-Z)</option>
            <option value="rating">Sort by Rating (High to Low)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="year">Newest First</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse space-y-4">
              <div className="h-56 bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-lg font-semibold text-slate-700">No books found</p>
          <p className="text-sm text-slate-500 mt-1">Try tweaking your search term or category filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Cover Image Container */}
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-xs font-bold text-slate-800 px-2.5 py-1 rounded-md shadow-sm">
                  {book.category || 'General'}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                  ${parseFloat(book.price || 0).toFixed(2)}
                </div>
              </div>

              {/* Book Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">by {book.author}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {book.rating ? `${book.rating}/5.0` : 'N/A'}
                    </span>
                    {book.publishedYear && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {book.publishedYear}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {book.description || 'No description available for this volume.'}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/books/${book.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-semibold text-slate-700 transition"
                    title="View Book Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>

                  <Link
                    to={`/edit/${book.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-xs font-semibold text-slate-700 transition"
                    title="Edit Book"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(book.id, book.title)}
                    className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                    title="Delete Book"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
