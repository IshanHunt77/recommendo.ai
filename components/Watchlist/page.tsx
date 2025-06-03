"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../CardComponent/page";
import { Button } from "@/componentsShadcn/ui/button";
import { useRouter } from "next/navigation";
import LoaderComponent from "../Loader/page";
import { useMediaQuery } from "@mui/material";

interface Movie {
  filmname: string;
  watched: boolean;
  poster: string;
}

const Watchlist = ({user}:{user:string}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("User");
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const h = isLargeScreen ? 64 : 32;
  const w = isLargeScreen ? 40 : 20;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${url}/api/pages/getWatchlist`);
        const rawList = res.data.filmWatchlist || [];

        if (rawList.length > 0) {
          setUsername(rawList[0]?.username || "User");
        }

        const newList: Movie[] = [];

        for (const item of rawList) {
          if (!item.watched && newList.length < 10) {
            const omdbRes = await axios.get(
              `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(item.filmName)}`
            );

            newList.push({
              filmname: item.filmName,
              watched: false,
              poster: omdbRes.data.Poster || "",
            });
          }
        }

        setMovies(newList);
      } catch (err) {
        console.error("Error fetching watchlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center min-h-[150px] md:min-h-[300px]">
      {loading ? (
        <LoaderComponent />
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <CardComponent
            key={movie.filmname}
            h={h}
            w={w}
            imageUrl={movie.poster}
            watchlist={true}
          />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full mt-4">
          <div className="font-bold text-2xl text-black">
            Welcome, {user}! Start by creating your WatchList.
          </div>
          <Button onClick={() => handleNav("/api/v1/watchlist")}>
            WatchList
          </Button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
