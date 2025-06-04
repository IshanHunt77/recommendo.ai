"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../CardComponent/page";
import { useMediaQuery } from "@mui/material";

interface Movie {
  filmname: string;
}

const MovieCards = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const h = isLargeScreen ? 40 : 24;
  const w = isLargeScreen ? 32 : 17;
  const [posters, setPosters] = useState<string[]>([]);

  const movies: Movie[] = [
    { filmname: "Mission Impossible: The Final Reckoning" },
    { filmname: "Deadpool" },
    { filmname: "Pather Panchali" },
    { filmname: "The Dark Knight" },
    { filmname: "The Godfather" },
    { filmname: "Fight Club" },
    { filmname: "Inception" },
    { filmname: "3 Idiots" },
    { filmname: "Casablanca" },
    { filmname: "Avengers: Endgame" }
  ];
  

  useEffect(() => {
    const fetchPosters = async () => {
      const omdbApiKey = "c10096d"; 
      const fetchedPosters: string[] = [];

      for (const item of movies) {
        try {
          const res = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(item.filmname)}`
          );
          if (res.data.Poster && res.data.Poster !== "N/A") {
            fetchedPosters.push(res.data.Poster);
          }
        } catch (error) {
          console.error("Error fetching poster for", item.filmname, error);
        }
      }

      setPosters(fetchedPosters);
    };

    fetchPosters();
  }, []);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-2 md:gap-4 p-4">
      {posters.map((poster, index) => (
        <CardComponent key={index} imageUrl={poster} h={h} w={w} watchlist={false} movieCards={true} />
      ))}
    </div>
  );
};

export default MovieCards;
//40,32 grid - 2