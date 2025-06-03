"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/componentsShadcn/ui/button";
import { useRouter } from "next/navigation";
import LoaderComponent from "../Loader/page";
import { useMediaQuery } from "@mui/material";
import { Card, CardContent } from "@/componentsShadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Movie {
  filmname: string;
  watched: boolean;
  poster: string;
}

const Watchlist = ({ user }: { user: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${url}/api/pages/getWatchlist`);
        const rawList = res.data.filmWatchlist || [];

        const newList: Movie[] = [];
        for (const item of rawList) {
          if (!item.watched && newList.length < 10) {
            const omdbRes = await axios.get(
              `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(
                item.filmName
              )}`
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
       
        <Carousel
          opts={{ align: "start" }}
          className="relative w-full max-w-[1000px] mx-auto"
        >
         
          <CarouselContent className="gap-1">
            {movies.map((movie, index) => (
             
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-0">
                  <Card className="p-0 border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                      <img
                        src={movie.poster || "/fallback-poster.jpg"}
                        alt={`Poster of ${movie.filmname}`}
                        className="rounded-md
                          w-[144px] h-[216px]
                          md:w-[192px] md:h-[288px]
                          object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

         
         <CarouselPrevious
  className="
    absolute top-1/2 left-0
    -translate-x-[50%] -translate-y-1/2
    sm:left-2 sm:translate-x-0
    bg-black/30 text-white
    p-2 rounded-full
    z-20
  "
/>




         
          <CarouselNext
            className="
              absolute top-1/2 right-1
              transform -translate-y-1/2
              sm:right-2
              bg-black/30 text-white
              p-2 rounded-full
              z-10
            "
          />
        </Carousel>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full mt-4">
          <div className="font-bold text-2xl text-black">
            Welcome, {user}! Start by creating your WatchList.
          </div>
          <Button onClick={() => handleNav("/api/v1/watchlist")}>WatchList</Button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
