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
    <Card className="w-92 md:w-full max-w-4xl flex flex-col mb-6 p-2 pt-6 md:p-6 bg-gradient-to-br from-black to-[#3D1766]/60 text-white rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#6C2EBE]/30 transition-all duration-300 ease-in-out border border-[#6C2EBE]/30 hover:border-[#8F43EE]/60">
  <div className="grid grid-cols-5 gap-10">
    <CardComponent imageUrl={poster} h={h} w={w} watchlist={false} movieCards={false} />
    <div className="flex flex-col col-span-4 justify-between ml-6 md:ml-0">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white">{filmname} <span className="text-lg font-medium text-[#8F43EE]">({year})</span></h1>
      </div>

      <div className="flex items-center mb-2">
        <img
          src={dp || "/EmptyImage.png"}
          alt="User avatar"
          className="rounded-full w-9 h-9 mr-3 border-2 border-[#6C2EBE]"
        />
        <p className="text-sm font-semibold text-gray-200">by <span className="text-[#8F43EE]">{author}</span></p>
      </div>

      <p className="text-md text-gray-300 italic mt-2 mb-3">{review}</p>
      <Rating rating={rating} />
    </div>
  </div>

  <div className="flex justify-start items-center gap-2 mt-0 md:mt-4 border-t border-[#6C2EBE]/30 pt-3">
    <FavoriteIcon
      onClick={(e) => {
        e.stopPropagation();
        handleUpvote();
      }}
      sx={{ color: "#8F43EE", cursor: "pointer" }}
    />
    {likesUpdate ? <span className="text-sm text-[#8F43EE]">{likes+1}</span>:<span className="text-sm text-[#8F43EE]">{likes}</span>}
    
    <ModeCommentIcon
      onClick={(e) => {
        e.stopPropagation();
        handleComment();
      }}
      sx={{ color: "#8F43EE", cursor: "pointer" }}
    />
        <span className="text-sm text-[#8F43EE]">{comment.length}</span>

  </div>
</Card>

  );
};

export default ReviewCard;
