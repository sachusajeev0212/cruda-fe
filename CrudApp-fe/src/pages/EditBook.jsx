import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookApi } from '../services/api';
import { ArrowLeft, Save, Sparkles, AlertCircle } from 'lucide-react';

const SAMPLE_PRESET_COVERS = [
  { label: 'Minimalist Book', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600' },
  { label: 'Vintage Cover', url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600' },
  { label: 'Technology / Code', url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=600' },
  { label: 'Nature / Green', url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600' }
];

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    price: '',
    rating: '',
    publishedYear: '',
    coverImage: '',
    description: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await bookApi.getById(id);
        setFormData(data);
      } catch (err) {
        setError('Could not fetch book details to edit.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Title and Author are required fields.');
      return;
    }

    try {
      setSubmitting(true);
      const updatedBook = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rating: parseFloat(formData.rating) || 0,
        publishedYear: parseInt(formData.publishedYear) || new Date().getFullYear()
      };
      await bookApi.update(id, updatedBook);
      navigate(`/books/${id}`);
    } catch (err) {
      alert('Failed to update book.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-3 text-slate-500 text-sm">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Error Loading Book</h2>
        <p className="text-slate-500 text-sm">{error}</p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <Link
        to={`/books/${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Return to Book
      </Link>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        <div className="border-b border-slate-200 pb-5 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Edit Book</h1>
            <p className="text-sm text-slate-500 mt-1">Modify details for <span className="font-semibold text-slate-700">"{formData.title}"</span></p>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
            ID: #{id}
          </span>
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
                value={formData.isbn || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

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
                    alt="Cover preview"
                    className="w-16 h-20 object-cover rounded-lg border shadow-sm"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'; }}
                  />
                  <div className="text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">Cover Image Preview</p>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate(`/books/${id}`)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : 'Update Book'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
