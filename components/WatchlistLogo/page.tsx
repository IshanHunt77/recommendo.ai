"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

export const Watchlistlogo = ({ filmName }: { filmName: string }) => {
  const [watchedLogo, setWatched] = useState(false);
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(()=>{
    setWatched(false)
  },[filmName])

  const handleWatchlist = async () => {
    await axios.post(`${url}/api/pages/updateWatchlist`, {
      filmName,
      watched: false,
    });
    setWatched(true);
  };

  return (
    <button
      className="inline-flex items-center justify-center text-xl text-gray-800 rounded-full border border-red-600 hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
      style={{ width: "36px", height: "36px",backgroundColor:"##181818" }}
      onClick={handleWatchlist}
      title="Add to Watchlist"
    >
      {!watchedLogo ? <CiBookmark style={{color:"#e50914"}} /> : <FaBookmark style={{color:"#e50914"}} />}
    </button>
  );
};
