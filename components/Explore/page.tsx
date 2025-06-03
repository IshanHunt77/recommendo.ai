"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  Title: string;
  Poster: string;
  imdbID: string;
}

const ExploreMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const exploreTitles = [
    "Inception",
    "The Hangover",
    "The Godfather",
    "The Conjuring",
    "The Notebook",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies: Movie[] = [];

      for (const title of exploreTitles) {
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(title)}`
          );
          if (response.data && response.data.Response !== "False") {
            fetchedMovies.push(response.data);
          }
        } catch (err) {
          console.error("Error fetching movie:", title, err);
        }
      }

      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Explore Movies</h2>
      <div className="flex flex-row gap-2 md:gap-6 justify-center">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="w-40 flex flex-col items-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-24 h-30 md:w-full md:h-auto object-cover rounded-md shadow-md"
            />
            <p className="mt-2 text-center text-sm text-gray-700">{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMovies;
