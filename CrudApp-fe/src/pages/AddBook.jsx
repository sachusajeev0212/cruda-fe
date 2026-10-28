import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { bookApi } from '../services/api';
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react';

const SAMPLE_PRESET_COVERS = [
  { label: 'Minimalist Book', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600' },
  { label: 'Vintage Cover', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600' },
  { label: 'Technology / Code', url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=600' },
  { label: 'Nature / Green', url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600' },
  { label: 'Open Pages', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600' }
];

export default function AddBook() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Technology',
    isbn: '',
    price: '',
    rating: '4.5',
    publishedYear: new Date().getFullYear(),
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Please provide both Title and Author.');
      return;
    }

    try {
      setSubmitting(true);
      const newBook = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rating: parseFloat(formData.rating) || 0,
        publishedYear: parseInt(formData.publishedYear) || new Date().getFullYear()
      };
      const created = await bookApi.create(newBook);
      navigate(`/books/${created.id}`);
    } catch (err) {
      alert('Failed to save book to JSON Server. Make sure the backend server is running on port 5000.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <Link
        to="/books"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel and Back
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="border-b border-slate-200 pb-5 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Add New Book</h1>
          <p className="text-sm text-slate-500 mt-1">Enter book metadata to catalog it into your library system.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Book Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Design Patterns"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Author *</label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Erich Gamma"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
              >
                <option value="Technology">Technology</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Classic Literature">Classic Literature</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="History">History</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Price ($ USD)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="19.99"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Rating (0.0 to 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Published Year</label>
              <input
                type="number"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">ISBN Code</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="978-3-16-148410-0"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Cover Image & Presets */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Image URL</label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs font-mono"
              />

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Presets:
                </span>
                {SAMPLE_PRESET_COVERS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: preset.url }))}
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 px-2.5 py-1 rounded-md text-slate-600 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {formData.coverImage && (
                <div className="mt-3 flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={formData.coverImage}
                    alt="Preview"
                    className="w-16 h-20 object-cover rounded-lg border shadow-sm"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'; }}
                  />
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">Cover Image Preview</p>
                    <p>Live preview from entered URL.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Synopsis of the book..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{submitting ? 'Cataloging...' : 'Save Book'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
