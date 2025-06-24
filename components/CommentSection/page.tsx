'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Comment {
  id: number;
  comment: string;
  reviewId: number;
  likes: number;
  createdAt: string;
  commentAuthorId: number;
  userInfo?: {
    username: string;
    profilephoto: string;
  };
}

const CommentsSection = () => {
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const idParam = params.get('reviewId');
    if (idParam) {
      setReviewId(parseInt(idParam));
    }
  }, [params]);

  const fetchUserInfo = async (userId: number) => {
    try {
      const res = await axios.get(`${url}/api/pages/getUserInfo?userId=${userId}`);
      return res.data;
    } catch {
      return { username: 'Unknown', profilephoto: '/default-avatar.png' };
    }
  };

  const fetchComments = async () => {
    if (reviewId) {
      try {
        const res = await axios.get(`${url}/api/pages/getReviewComments?reviewId=${reviewId}`);
        const rawComments: Comment[] = res.data.result || [];

        const commentsWithUserInfo = await Promise.all(
          rawComments.map(async (comment) => {
            const userInfo = await fetchUserInfo(comment.commentAuthorId);
            return { ...comment, userInfo };
          })
        );

        setComments(commentsWithUserInfo);
      } catch (err) {
        console.error('Error fetching comments', err);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId]);

  const handlePostComment = async () => {
    if (!newComment.trim() || !reviewId) return;

    setLoading(true);
    try {
      await axios.post(`${url}/api/pages/postReviewComment`, {
        reviewId,
        comment: newComment,
      });

      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error posting comment', err);
    } finally {
      setLoading(false);
    }
  };

  const visibleComments = showAll ? comments : comments.slice(0, 5);

  return (
    <div className="p-4 bg-[#0d0d0d] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-[#22c55e]/30 pb-2">
        Comments
      </h2>

      <div className="mb-8 bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] p-6 rounded-lg border border-[#22c55e]/20 shadow-lg">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-4 bg-[#1a1a1a] border border-[#22c55e]/30 rounded-lg resize-none text-white placeholder:text-gray-400 focus:border-[#22c55e]/50 focus:ring-[#22c55e]/20 focus:outline-none transition-all duration-200"
          rows={3}
        />
        <button
          onClick={handlePostComment}
          disabled={loading}
          className="mt-3 px-6 py-2 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-lg hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200 font-semibold shadow-lg hover:shadow-[#22c55e]/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      <div className="space-y-4">
        {visibleComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gradient-to-r from-[#1a1a1a] to-[#0d0d0d] shadow-lg border border-[#22c55e]/20 rounded-lg p-6 text-white hover:border-[#22c55e]/40 transition-all duration-200"
          >
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={comment.userInfo?.profilephoto || '/default-avatar.png'}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#22c55e]/30"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full border-2 border-[#0d0d0d]"></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm text-[#22c55e]">{comment.userInfo?.username || 'User'}</span>
                  <span className="text-xs text-gray-400 bg-[#1a1a1a] px-2 py-1 rounded-full">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-200 mb-3">{comment.comment}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1 bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#22c55e]/20">
                    <span className="text-[#22c55e]">👍</span>
                    <span>{comment.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length > 5 && !showAll && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => setShowAll(true)} 
            className="text-[#22c55e] hover:text-[#16a34a] underline font-medium transition-colors duration-200 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-[#22c55e]/20 hover:border-[#22c55e]/40"
          >
            Show all comments ({comments.length - 5} more)
          </button>
        </div>
      )}

      {comments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-[#22c55e] text-4xl mb-4">💬</div>
          <p className="text-gray-400 text-lg">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
