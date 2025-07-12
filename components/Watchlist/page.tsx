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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

  const handleMarkAsWatched = async (filmName: string) => {
    try {
      const res = await axios.post(`${url}/api/pages/updateWatch`, { filmName });
      console.log(res.data);
    } catch (err) {
      console.error("Error marking as watched", err);
    }
  };

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
    <div className="flex flex-wrap gap-4 justify-center min-h-[150px] md:min-h-[300px] bg-[#0d0d0d] p-6 rounded-lg">
      {loading ? (
        <LoaderComponent />
      ) : movies.length > 0 ? (
       
        <Carousel
          opts={{ align: "start" }}
          className="relative w-full max-w-[1000px] mx-auto"
        >
         
          <CarouselContent className="gap-3">
            {movies.map((movie, index) => (
             
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-0 group">
                  <Card className="p-0 border-none shadow-none bg-transparent hover:scale-105 transition-transform duration-200">
                    <CardContent className="p-0 relative">
                      
                      <img
                        src={movie.poster || "/fallback-poster.jpg"}
                        alt={`Poster of ${movie.filmname}`}
                        className="rounded-md
                          w-[144px] h-[216px]
                          md:w-[192px] md:h-[288px]
                          object-cover shadow-lg hover:shadow-[#00d735]/20 transition-shadow duration-200"
                      />
                      
                      {/* MoreVertIcon positioned at top right */}
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                        <div className="absolute top-2 right-2 z-10">
                        <div className="bg-black/70 backdrop-blur-sm rounded-full p-1 hover:bg-black/90 transition-all duration-200 cursor-pointer">
                              <MoreVertIcon className="text-white text-sm md:text-base" />
                            </div>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#0d0d0d] backdrop-blur-lg border border-[#00d735]/50 shadow-xl">
                          <DropdownMenuItem className="hover:bg-[#00d735]/20 focus:bg-[#00d735]/20 rounded-md">
                            <Button 
                              onClick={() => handleMarkAsWatched(movie.filmname)}
                              variant="ghost" 
                              className="text-white hover:text-[#00d735] w-full justify-start text-sm"
                            >
                              Mark as Watched
                            </Button>
                          </DropdownMenuItem>
                          
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-xs md:text-sm font-medium truncate">
                            {movie.filmname}
                          </p>
                        </div>
                      </div>
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
    bg-[#0d0d0d]/90 backdrop-blur-sm text-[#00d735]
    border border-[#00d735]/30
    p-2 rounded-full
    z-20
    hover:bg-[#00d735] hover:text-[#0d0d0d] transition-all duration-200
  "
/>




         
          <CarouselNext
            className="
              absolute top-1/2 right-[-12px]
              transform -translate-y-1/2
              sm:right-2
              bg-[#0d0d0d]/90 backdrop-blur-sm text-[#00d735]
              border border-[#00d735]/30
              p-2 rounded-full
              z-10
              hover:bg-[#00d735] hover:text-[#0d0d0d] transition-all duration-200
            "
          />
        </Carousel>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full mt-4 text-center">
          <div className="w-16 h-16 bg-[#00d735]/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#00d735]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="font-bold text-xl md:text-2xl text-white">
            Start by searching a Movie
          </div>
          <div className="text-gray-400 text-sm md:text-base">
            Add it to your Watchlist to see it here
          </div>
          <Button 
            onClick={() => handleNav('/v1/recommendo')}
            className="bg-gradient-to-r from-[#00d735] to-[#00b32a] hover:from-[#00b32a] hover:to-[#009925] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#00d735]/25"
          >
            Explore Movies
          </Button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
