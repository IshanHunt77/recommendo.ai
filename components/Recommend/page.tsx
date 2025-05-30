"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSocket } from "@/app/providers";
import { useSession } from "next-auth/react";
import { Gemini } from "@/components/gemini/page";
import { PostReview } from "@/components/PostReview/page";
import Load from "@/app/Load/page";
import { Watchlistlogo } from "@/components/WatchlistLogo/page";
import { Navbar } from "../Navbar/page";
import ReviewCard from "../ReviewCard/page";
import Signup from "@/app/v1/signup/page";

interface MovieDet {
  Title:string;
  Year: string;
  Rated: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
}

interface ReviewType {
  id:number;
  review: string;
  reviewOfFilm: string;
  createdAt: string;
  likes: number;
  reviewAuthorId: number;
}

export default function Recommend() {
  const { data: session ,status} = useSession();
  const params = useSearchParams();
  const paramMovie = params.get("movie") || "Interstellar";
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(url)
  const [movieName, setMovieName] = useState(paramMovie);
  const [info, setInfo] = useState<MovieDet>();
  const [reviews, setReviews] = useState<ReviewType[]>();
  const [username, setUsername] = useState("");
  const [dp, setDp] = useState("");
  const [chats, setChats] = useState<{ id: number; user: string; text: string; dp: string }[]>([]);
  const [users, setUsers] = useState<{ username: string; dp: string }[]>([]);
  const [message, setMessage] = useState("");
  const [l, setL] = useState(0); // Pagination index
  const socket = useSocket();
  const chatRef = useRef<HTMLDivElement>(null);
  console.log(chats)

  useEffect(() => {
    setMovieName(paramMovie);
      console.log(chats)

    setChats([])
    console.log(movieName)
  }, [paramMovie]);


  useEffect(() => {
    if (session?.user?.name) setUsername(session.user.name);
    if (session?.user?.image) setDp(session.user.image);
  }, [session]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("room-name", movieName);
    const handleReceive = (msg: string, user: string, dp: string) => {
      setChats((prev) => [...prev, { id: Date.now(), user, text: msg, dp }]);
    };
    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive)
    };
  }, [socket, movieName]);

  useEffect(() => {
    axios
  .get<MovieDet>(`https://www.omdbapi.com/?apikey=37e36d9a&t=${encodeURIComponent(movieName)}`)
  .then((res) => {
    console.log("Fetched movie:", res.data);
    setInfo(res.data);
  })
  .catch((err) => {
    console.error("Fetch failed:", err);
  });

      

    const getReviewsAndUsers = async () => {
      try {
        const reviewRes = await axios.get<ReviewType[]>(`${url}/api/pages/getfilmReviews?film=${movieName}`);
        setReviews(reviewRes.data);
        console.log(reviewRes)
        const userDetails: { username: string; dp: string }[] = [];

        for (const review of reviewRes.data) {
          const userRes = await axios.get(`${url}/api/pages/getUserInfo?userId=${review.reviewAuthorId}`);
          userDetails.push({
            username: userRes.data.username,
            dp: userRes.data.profilephoto,
          });
        }

        setUsers(userDetails);
      } catch (err) {
        console.error("Error fetching reviews or user info", err);
      }
    };

    getReviewsAndUsers();
  }, [movieName]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;
    socket.emit("sendMessage", { room: movieName, message, username, dp });
    setChats((prev) => [...prev, { id: Date.now(), user: "You", text: message, dp }]);
    setMessage("");
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chats]);

  if(status!=="authenticated"){
    return <Signup/>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between p-4">
        <div className="italic text-6xl font-bold text-black underline decoration-black">
          Recommend'o
        </div>
        <Navbar />
      </div>

     <div className="flex flex-wrap mt-10 px-4">
  <div className="w-full lg:w-3/4 xl:w-2/3 px-4 relative">
   
    <div className="absolute top-4 right-4 z-10 mr-3
    ">
      <Watchlistlogo filmName={movieName} />
    </div>

    <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {!info?.Poster ? (
          <div className="flex justify-center items-center w-full h-80">
            <Load />
          </div>
        ) : (
          <img
            className="rounded-md shadow-md w-80 h-auto object-cover"
            src={info?.Poster}
            alt="Movie Poster"
          />
        )}

      
        <div className="flex flex-col justify-center space-y-3 text-black">
          <h3 className="text-4xl font-bold">{info?.Title}</h3>
          <p className="text-md italic"><strong>Director:</strong> {info?.Director}</p>
          <p className="text-md italic"><strong>Year:</strong> {info?.Year}</p>
          <p className="text-md italic"><strong>Rated:</strong> {info?.Rated}</p>
          <p className="text-md italic"><strong>Genre:</strong> {info?.Genre}</p>
          <p className="text-md italic"><strong>Writer:</strong> {info?.Writer}</p>
          <p className="text-md italic"><strong>Actors:</strong> {info?.Actors}</p>
          <p className="text-md italic"><strong>Plot:</strong> {info?.Plot}</p>
          <p className="text-md italic"><strong>Awards:</strong> {info?.Awards}</p>
          <p className="text-md italic"><strong>IMDb Rating:</strong> {info?.imdbRating}</p>
          <p className="text-md italic">
            <strong>Rotten Tomatoes:</strong>{" "}
            {info?.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  </div>

 
  <Gemini movieTitle={movieName} />
</div>

      <PostReview film={movieName} dp={dp || ''}/>

      <div className="flex flex-row mt-8 px-4 gap-6">
      
        <div className="w-full lg:w-1/2 px-4">
        {reviews && reviews.length > 0 ? (
  <>
    <div className="font-bold text-2xl italic text-white mb-6 ml-2">
      Popular Reviews
    </div>
    {reviews.slice(l, l + 2).map((rev, index) => (
      <ReviewCard
        key={index}
        dp={users[l + index]?.dp || "/default.jpg"}
        review={rev.review}
        author={users[l + index]?.username || "Unknown"}
        likes={rev.likes}
        year={info?.Year || ""}
        filmname={rev.reviewOfFilm}
        rating={4}
        reviewId={rev.id}
      />
    ))}
  </>
) : (
  <div className="font-bold text-2xl text-black italic mt-4 ml-2">
    No Reviews yet. Be the first to write one!
  </div>
)}
 
          

          {reviews && l + 2 < reviews.length && (
            <button
              onClick={() => setL(l + 2)}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Load More Reviews
            </button>
          )}
        </div>

      
        <div className="w-full lg:w-1/2 px-4 flex flex-col justify-end h-96">
          <div className="font-bold text-black text-2xl italic mb-4">Discuss Film</div>
          <div className="border rounded-lg h-64 p-4 overflow-y-auto bg-gray-50 flex-1" ref={chatRef}>
            {chats.map((c) => (
              <div key={c.id} className={`flex ${c.user === "You" ? "justify-end" : "justify-start"}`}>
                <div className="rounded-full h-8 w-8 mr-2 mt-1 overflow-hidden">
                  <img src={c.dp || dp || '/batmanLogo.jpeg'} alt="profilephoto" className="h-full w-full object-cover" />
                </div>
                <div className={`${c.user === "You" ? "bg-blue-400 grid grid-col-4" : "bg-red-400"} mb-2 p-2 rounded shadow-sm max-w-xs`}>
                  <p className="text-md"><strong className="col-span-1">{c.user}:</strong> {c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="mt-2 flex" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow border rounded-l-lg p-2 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="bg-black text-white px-4 rounded-r-lg">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 