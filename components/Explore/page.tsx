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
    <div className="mt-10 bg-[#0d0d0d] p-2 rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Explore Movies
      </h2>
      <div className="flex gap-2 justify-center">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="w-32 md:w-40 flex flex-col items-center group">
            <div className="relative overflow-hidden rounded-md shadow-lg hover:shadow-[#00d735]/25 transition-all duration-200">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-24 h-32 md:w-32 md:h-48 object-cover rounded-md hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">
                    {movie.Title}
                  </p>
                </div>
              </div>
            </div>
            {/* <p className="mt-3 text-center text-sm text-gray-300 group-hover:text-[#00d735] transition-colors duration-200 font-medium">
              {movie.Title}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMovies;
