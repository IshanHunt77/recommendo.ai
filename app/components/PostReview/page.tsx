"use client"
import { useState } from "react";
import axios from "axios";

export const PostReview = ({ film, dp }: { film: string; dp: string }) => {
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow border border-gray-200 mt-6">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
          ✅ Review added successfully!
        </div>
      )}

      <form onSubmit={handleReview} className="flex flex-col space-y-3">
        <div className="flex items-start space-x-3">
          <img
            src={dp || "/default.jpg"}
            alt="poster"
            className="w-10 h-10 rounded-full object-cover"
          />
          <textarea
            placeholder="Add a public comment..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 resize-none"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
            disabled={!review.trim()}
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};
