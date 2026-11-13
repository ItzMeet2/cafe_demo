import React, { useState } from 'react';
import { CAFE_REVIEWS } from '../data/cafeData';
import { CafeReview } from '../types';
import { Star, Plus, Check, Filter, X, ArrowUpDown, ExternalLink } from 'lucide-react';

export const ReviewsAndStorySection: React.FC = () => {
  const [reviews, setReviews] = useState<CafeReview[]>(CAFE_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest'>('recent');
  const [isAddReviewOpen, setIsAddReviewOpen] = useState<boolean>(false);

  // New Review Form State
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCategory, setNewCategory] = useState<'coffee' | 'space' | 'food' | 'service'>('coffee');
  const [newFavorite, setNewFavorite] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const categories = [
    { id: 'all', label: 'All Reviews' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'space', label: 'Quiet Space' },
    { id: 'food', label: 'Artisan Bakery' },
    { id: 'service', label: 'Table Service' }
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: CafeReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      role: newRole.trim() || 'Patron',
      comment: newComment.trim(),
      date: 'Just now',
      rating: newRating,
      category: newCategory,
      favoriteItem: newFavorite.trim() || undefined,
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setIsAddReviewOpen(false);
    setNewName('');
    setNewRole('');
    setNewFavorite('');
    setNewComment('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 4000);
  };

  const filteredReviews = reviews
    .filter((r) => selectedCategory === 'all' || r.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      return 0; // preserve chronological order
    });

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FBF9F5] border-t border-[#E8E3D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-1">
            04 / Craft & Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
            The Architecture of Flavor
          </h2>
          <p className="text-xs text-[#78716C] mt-2 font-light leading-relaxed">
            From altitude to extraction: everything we serve is measured, ethically sourced, and served with intention.
          </p>
        </div>

        {/* Aceternity-Inspired Minimal Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {/* Bento Card 1: Estate Direct Traceability */}
          <div className="md:col-span-2 p-6 rounded-xl bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] transition-all flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C5E3C] bg-[#8C5E3C]/10 px-2 py-0.5 rounded">
                  Estate Coordinates
                </span>
                <span className="text-[11px] font-mono text-[#A8A29E]">13.3153° N, 75.7754° E</span>
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-semibold">
                Direct Trade with Chikmagalur & Biligirirangana Hills
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed max-w-lg">
                We work directly with third-generation grower families under natural canopy shade at 1,250 meters elevation. 
                By bypassing commodity brokers, farmers earn 45% above Fair Trade minimums, ensuring sustainable biodiversity and exceptional harvest lots.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE1] grid grid-cols-3 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#A8A29E] block uppercase">Elevation</span>
                <span className="text-[#1C1917] font-medium text-[11px] mt-0.5 block">1,250m ASL</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A8A29E] block uppercase">Processing</span>
                <span className="text-[#1C1917] font-medium text-[11px] mt-0.5 block">Washed & Natural</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A8A29E] block uppercase">Cupping Score</span>
                <span className="text-[#1C1917] font-medium text-[11px] mt-0.5 block">86.5 Speciality</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Precision Brewing Metrics */}
          <div className="p-6 rounded-xl bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] transition-all flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C1917] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E8E3D8]">
                Extraction Bar
              </span>
              <h3 className="text-base font-serif text-[#1C1917] font-semibold">
                Barista Scientific Standard
              </h3>
              <p className="text-xs text-[#78716C] font-light leading-relaxed">
                TDS controlled water, 9-bar rotary pumps, and precision 28-second extraction profiles.
              </p>
            </div>

            <div className="mt-4 space-y-2 font-mono text-[11px] bg-[#FAF8F3] p-3 rounded-lg border border-[#E8E3D8]">
              <div className="flex justify-between text-[#78716C]">
                <span>Water Temp</span>
                <span className="text-[#1C1917] font-bold">93.5°C</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Brew Ratio</span>
                <span className="text-[#1C1917] font-bold">1:16 V60 / 1:2 Espresso</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Roast Batch</span>
                <span className="text-[#1C1917] font-bold">8kg Cast Iron Drum</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Header & Controls */}
        <div className="pt-8 border-t border-[#E8E3D8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] block mb-1">
                Patron Impressions
              </span>
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917]">
                  Notes from Guests
                </h3>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C1917] text-[#FBF9F5] text-[11px] font-mono font-medium">
                  <Star className="w-3 h-3 fill-[#FBF9F5] text-[#FBF9F5]" />
                  <span>4.9</span>
                  <span className="opacity-70">({reviews.length})</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add Review & Google Review Option */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsAddReviewOpen(true)}
                className="px-3.5 py-1.5 rounded-md bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write a Note</span>
              </button>

              <button
                onClick={() => {
                  alert('Google Review NFC Link: Directing to verified Google Business profile.');
                }}
                className="px-3.5 py-1.5 rounded-md bg-[#FFFFFF] hover:bg-[#F4F0E8] border border-[#DDD7CC] text-[#1C1917] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Google Reviews</span>
                <ExternalLink className="w-3 h-3 text-[#8C5E3C]" />
              </button>
            </div>
          </div>

          {/* Review Options Bar: Category Filter & Sort Options */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-y border-[#E8E3D8] mb-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                      : 'bg-[#FFFFFF] border border-[#E8E3D8] text-[#78716C] hover:text-[#1C1917] hover:border-[#D6CFBF]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#78716C] shrink-0">
              <ArrowUpDown className="w-3 h-3 text-[#A8A29E]" />
              <button
                onClick={() => setSortBy(sortBy === 'recent' ? 'highest' : 'recent')}
                className="hover:text-[#1C1917] transition-colors cursor-pointer text-[11px]"
              >
                Sort: <span className="text-[#1C1917] font-medium">{sortBy === 'recent' ? 'Most Recent' : 'Highest Rated'}</span>
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {submittedToast && (
            <div className="mb-6 p-3 rounded-lg bg-[#FAF8F3] border border-[#8C5E3C]/40 text-xs font-mono text-[#8C5E3C] flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Thank you! Your note has been added to the guestbook.</span>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-lg bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#D6CFBF] transition-all space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-[#8C5E3C]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating ? 'fill-[#8C5E3C] text-[#8C5E3C]' : 'text-[#E8E3D8]'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] text-[#1C1917] font-bold ml-1">{review.rating}.0</span>
                    </div>

                    <span className="text-[10px] text-[#A8A29E]">{review.date}</span>
                  </div>

                  <p className="text-xs text-[#1C1917] font-light leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] font-mono text-[#78716C]">
                  <div>
                    <span className="text-[#1C1917] font-medium">{review.name}</span>
                    <span className="text-[#A8A29E] ml-1.5">— {review.role}</span>
                  </div>

                  {review.favoriteItem && (
                    <span className="text-[10px] text-[#8C5E3C] bg-[#8C5E3C]/10 px-2 py-0.5 rounded truncate max-w-[150px]">
                      {review.favoriteItem}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Modal Form */}
      {isAddReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="absolute inset-0" onClick={() => setIsAddReviewOpen(false)} />

          <div 
            className="relative w-full max-w-md bg-[#FFFFFF] border border-[#E8E3D8] rounded-xl shadow-2xl p-6 z-10 font-sans space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EBE1]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716C] block">
                  Feedback
                </span>
                <h3 className="text-lg font-serif text-[#1C1917] font-semibold">Write a Guest Note</h3>
              </div>
              <button
                onClick={() => setIsAddReviewOpen(false)}
                className="p-1 rounded text-[#78716C] hover:text-[#1C1917] hover:bg-[#F4F0E8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs font-mono">
              {/* Rating Selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#A8A29E] uppercase font-medium">Your Rating</span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newRating ? 'fill-[#8C5E3C] text-[#8C5E3C]' : 'text-[#E8E3D8]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#1C1917] font-bold ml-2">{newRating} of 5 Stars</span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A8A29E] uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya S."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#A8A29E] uppercase">Role / Profession</label>
                  <input
                    type="text"
                    placeholder="e.g. Regular Patron"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              {/* Category & Favorite Item */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#A8A29E] uppercase">Focus Area</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full py-1.5 px-2 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  >
                    <option value="coffee">Specialty Coffee</option>
                    <option value="space">Quiet Space</option>
                    <option value="food">Bakery & Food</option>
                    <option value="service">Table Service</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#A8A29E] uppercase">Favorite Drink</label>
                  <input
                    type="text"
                    placeholder="e.g. Cortado"
                    value={newFavorite}
                    onChange={(e) => setNewFavorite(e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <label className="text-[10px] text-[#A8A29E] uppercase">Review Comment</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience regarding the brews, atmosphere, or table service..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full py-2 px-2.5 rounded bg-[#FAF8F3] border border-[#E8E3D8] text-[#1C1917] focus:outline-none focus:border-[#8C5E3C] resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddReviewOpen(false)}
                  className="px-3 py-1.5 rounded text-[#78716C] hover:text-[#1C1917] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#1C1917] hover:bg-[#2C2724] text-[#FBF9F5] font-medium transition-colors cursor-pointer active:scale-95"
                >
                  Publish Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
