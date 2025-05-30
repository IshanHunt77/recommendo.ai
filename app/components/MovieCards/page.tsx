"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CardComponent from "../CardComponent/page";

interface Movie {
  filmname: string;
}

const MovieCards = () => {
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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4 p-4">
      {posters.map((poster, index) => (
        <CardComponent key={index} imageUrl={poster} h={40} w={32} watchlist={false}/>
      ))}
    </div>
  );
};

export default MovieCards;
