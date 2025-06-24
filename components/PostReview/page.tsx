"use client"
import { useState } from "react";
import axios from "axios";

export const PostReview = ({ film, dp }: { film: string; dp: string }) => {
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/pages/postFilmReview`, {
        reviewOfFilm: film,
        review: review,
      });
      console.log(res.data);
      setSuccess(true);
      setReview("");

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#181818] to-black p-6 rounded-lg shadow-lg border border-[#e50914]/30 mt-6 hover:border-[#e50914]/60 transition-all duration-200">
      {success && (
        <div className="bg-gradient-to-r from-[#e50914]/20 to-[#b0060f]/20 border border-[#e50914]/40 text-[#e50914] px-4 py-3 rounded-lg mb-4 text-sm font-medium backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span>Review added successfully!</span>
          </div>
        </div>
      )}

      <form onSubmit={handleReview} className="flex flex-col space-y-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={dp || "/default.jpg"}
              alt="poster"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#e50914]/40"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#e50914] to-[#b0060f] rounded-full border-2 border-black"></div>
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-sm text-gray-400">Reviewing:</span>
              <span className="text-sm font-medium text-[#e50914] ml-2">{film}</span>
            </div>
            <textarea
              placeholder="Share your thoughts about this film..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full bg-[#181818] border border-[#e50914]/30 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#e50914]/20 focus:border-[#e50914]/50 resize-none text-white placeholder:text-gray-400 transition-all duration-200"
              rows={4}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">
                {review.length}/500 characters
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">⭐</span>
                <span className="text-xs text-gray-400">💭</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!review.trim() || loading}
            className="bg-gradient-to-r from-[#e50914] to-[#b0060f] text-white px-6 py-2 rounded-lg hover:from-[#b0060f] hover:to-[#7f040b] transition-all duration-200 font-semibold shadow-lg hover:shadow-[#e50914]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <span>📝</span>
                <span>Post Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
