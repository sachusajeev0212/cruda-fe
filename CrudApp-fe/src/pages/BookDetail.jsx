import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookApi } from '../services/api';
import { ArrowLeft, Edit, Trash2, Star, Calendar, Barcode, ShieldAlert } from 'lucide-react';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await bookApi.getById(id);
        setBook(data);
      } catch (err) {
        setError('Book not found or could not connect to server.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await bookApi.delete(id);
        navigate('/books');
      } catch (err) {
        alert('Failed to delete book.');
      }
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

  if (error || !book) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Book Not Found</h2>
        <p className="text-slate-500 text-sm">{error || "The book could not be located."}</p>
        <Link
          to="/books"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Books
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={`/edit/${book.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-semibold transition"
          >
            <Edit className="w-4 h-4" /> Edit Book
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-semibold transition"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 bg-slate-100 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
          <div className="w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white">
            <img
              src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";
              }}
            />
          </div>
        </div>

        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {book.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {book.rating ? `${book.rating} / 5.0 Rating` : 'Not Rated'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {book.title}
            </h1>
            <p className="text-base text-slate-600 font-medium">
              Written by <span className="text-slate-900 font-semibold">{book.author}</span>
            </p>

            <div className="text-3xl font-extrabold text-indigo-600 pt-2">
              ${parseFloat(book.price || 0).toFixed(2)}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-slate-700">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Published</p>
                  <p className="text-sm font-bold">{book.publishedYear || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 text-slate-700">
                <Barcode className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">ISBN</p>
                  <p className="text-sm font-bold truncate max-w-[130px]">{book.isbn || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Synopsis / Description</h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {book.description || 'No detailed synopsis provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
