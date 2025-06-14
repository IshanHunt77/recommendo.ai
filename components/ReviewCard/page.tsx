"use client"
import { Card } from "@/componentsShadcn/ui/card";
import CardComponent from "../CardComponent/page";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../Rating/page";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";

interface ReviewType {
  dp: string;
  review: string;
  author: string;
  likes: number;
  rating: number;
  filmname: string;
  year: string;
  reviewId:number
}

interface Comment {
  id : number;
  comment:string;
  commentAuthorId:number;
  reviewId:number
}

const omdbApiKey = "37e36d9a"; 

const ReviewCard = ({ dp, review, author, likes, year, filmname ,rating,reviewId}: ReviewType) => {
  const [poster, setPoster] = useState<string>("");
  const [comment,setComment] = useState<Comment[]>([])
  const [likesUpdate,setLikesUpdate] = useState(false)
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const h = isLargeScreen ? 40 : 40;
  const w = isLargeScreen ? 28 : 24
  
  useEffect(() => {
    const getPosterComments = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(filmname)}`
        );
        setPoster(res.data?.Poster || "");
        const CommentCount =  await axios.get(
          `${url}/api/pages/getReviewComments?reviewId=${reviewId}`
        );
        setComment(CommentCount.data.result || "");
      } catch (error) {
        console.error("Failed to fetch poster:", error);
      }
    };

    getPosterComments();
  }, [filmname]);

  const handleUpvote = async() => {
     await axios.post(`${url}/api/pages/updateFilmReview`,{
      id : reviewId
    })
    setLikesUpdate(true)
  };
  const router = useRouter()
  const handleComment = ()=>{
      router.push(`/v1/comments?reviewId=${reviewId}`)
  }

  return (
    <Card className="w-96 md:w-full max-w-4xl flex flex-col mb-6 p-2 pt-6 md:p-6 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
  <div className="grid grid-cols-5 gap-10">
    <CardComponent imageUrl={poster} h={h} w={w} watchlist={false} movieCards={false} />
    <div className="flex flex-col col-span-4 justify-between ml-6 md:ml-0">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">{filmname} <span className="text-lg font-medium text-gray-300">({year})</span></h1>
      </div>

      <div className="flex items-center mb-2">
        <img
          src={dp || "/EmptyImage.png"}
          alt="User avatar"
          className="rounded-full w-9 h-9 mr-3 border-2 border-green-500"
        />
        <p className="text-sm font-semibold">by {author}</p>
      </div>

      <p className="text-md text-gray-200 italic mt-2 mb-3">{review}</p>
      <Rating rating={rating} />
    </div>
  </div>

  <div className="flex justify-start items-center gap-2 mt-0 md:mt-4 border-t border-gray-600 pt-3">
    <FavoriteIcon
      onClick={(e) => {
        e.stopPropagation();
        handleUpvote();
      }}
      sx={{ color: "#4ade80", cursor: "pointer" }}
    />
    {likesUpdate ? <span className="text-sm text-gray-300">{likes+1}</span>:<span className="text-sm text-gray-300">{likes}</span>}
    
    <ModeCommentIcon
      onClick={(e) => {
        e.stopPropagation();
        handleComment();
      }}
      sx={{ color: "#4ade80", cursor: "pointer" }}
    />
        <span className="text-sm text-gray-300">{comment.length}</span>

  </div>
</Card>

  );
};

export default ReviewCard;
