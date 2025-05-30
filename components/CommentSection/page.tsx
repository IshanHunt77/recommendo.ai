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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-black">Comments</h2>

      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          rows={3}
        />
        <button
          onClick={handlePostComment}
          disabled={loading}
          className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      {visibleComments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 text-black flex gap-4"
        >
          <img
            src={comment.userInfo?.profilephoto || '/default-avatar.png'}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">{comment.userInfo?.username || 'User'}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm leading-snug">{comment.comment}</p>
            <div className="text-xs text-gray-500 mt-1">👍 {comment.likes} likes</div>
          </div>
        </div>
      ))}

      {comments.length > 5 && !showAll && (
        <button onClick={() => setShowAll(true)} className="text-blue-600 underline mt-2">
          Show all comments
        </button>
      )}
    </div>
  );
};

export default CommentsSection;
