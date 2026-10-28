import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookApi } from '../services/api';
import { 
  BookOpen, 
  PlusCircle, 
  ArrowRight, 
  Star, 
  BookmarkCheck, 
  Layers 
} from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({ total: 0, categories: 0, avgRating: '0.0' });
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const books = await bookApi.getAll();
        const total = books.length;
        const categories = new Set(books.map(b => b.category)).size;
        const avg = total > 0
          ? (books.reduce((acc, b) => acc + (parseFloat(b.rating) || 0), 0) / total).toFixed(1)
          : '0.0';

        setStats({ total, categories, avgRating: avg });
        // Display up to 3 featured books
        setFeaturedBooks(books.slice(0, 3));
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 text-white shadow-xl mt-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold tracking-wide uppercase">
              <BookmarkCheck className="w-4 h-4 text-indigo-300" /> Complete Library Solution
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">Book Collection</span> effortlessly.
            </h1>

            <p className="text-indigo-100 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              A comprehensive React & JSON Server CRUD application. Organize your reading library, track ratings, update book metadata, and add new titles seamlessly.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/books"
                className="px-6 py-3.5 rounded-xl bg-white text-indigo-900 font-bold shadow-lg hover:bg-indigo-50 hover:shadow-indigo-500/20 transition-all flex items-center gap-2 group"
              >
                <span>Browse All Books</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/create"
                className="px-6 py-3.5 rounded-xl bg-indigo-700/80 hover:bg-indigo-700 text-white font-semibold border border-indigo-500/40 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5 text-indigo-300" />
                <span>Add New Book</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-violet-500 rounded-2xl blur-lg opacity-30" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1507842229451-7f01be777a26?auto=format&fit=crop&q=80&w=1000"
                  alt="Modern Library Hall"
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 text-white/90 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">Featured Archive</p>
                    <h3 className="text-lg font-bold">Curated Bookshelf</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-semibold rounded-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> 4.9 Top Rated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Total Titles</p>
            <h3 className="text-2xl font-extrabold text-slate-800">{loading ? '...' : stats.total}</h3>
            <p className="text-xs text-emerald-600 font-medium">Available in database</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Categories</p>
            <h3 className="text-2xl font-extrabold text-slate-800">{loading ? '...' : stats.categories}</h3>
            <p className="text-xs text-violet-600 font-medium">Genres & Topics</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-7 h-7 fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Average Rating</p>
            <h3 className="text-2xl font-extrabold text-slate-800">{loading ? '...' : `${stats.avgRating} / 5.0`}</h3>
            <p className="text-xs text-amber-600 font-medium">Community feedback</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED BOOKS CARDS */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Featured Books</h2>
            <p className="text-sm text-slate-500">A quick glimpse of titles currently in your catalog</p>
          </div>
          <Link
            to="/books"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            View all ({stats.total}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading catalog...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group"
              >
                <div className="h-48 overflow-hidden bg-slate-100 relative">
                  <img
                    src={book.coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-sm">
                    ${parseFloat(book.price || 0).toFixed(2)}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 mt-2 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">by {book.author}</p>
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2">{book.description}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {book.rating || 'N/A'}
                    </span>
                    <Link
                      to={`/books/${book.id}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}