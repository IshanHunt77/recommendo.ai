"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecommendationCard from '../RecommendationCard/page';
import { GoogleGenerativeAI } from '@google/generative-ai'; 

interface Props {
  movieTitle: string;
}

export const Gemini: React.FC<Props> = ({ movieTitle }) => {
  const [movies, setMovies] = useState<string[]>([]);
  const [posters, setPosters] = useState<Map<string, string>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(true);
  const [loadingPosters, setLoadingPosters] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieRecommendations = async () => {
      setLoadingRecommendations(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''; 

        if (!apiKey) {
          setError("Gemini API Key is missing. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
          setLoadingRecommendations(false);
          return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

        const prompt = `Provide a list of 4 movie names that are similar to "${movieTitle}" and match the following list format exactly:
1. 
2. 
3. 
4. 

Only provide the movie names in this list format, without any additional descriptions or details. Maintain the exact order.The theme of the Movies should be same.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text(); 

        const movieList = text
          .split('\n')
          .map((line:string) => line.trim().replace(/^\d+\.\s*/, '')) 
          .filter((name:string) => name); 

        setMovies(movieList);
      } catch (err) {
        console.error('Error fetching movie recommendations:', err);
        setError('Failed to fetch movie recommendations. Please try again.');
      } finally {
        setLoadingRecommendations(false);
      }
    };

    if (movieTitle) {
      fetchMovieRecommendations();
    } else {
      setMovies([]); 
    }
  }, [movieTitle]);

  useEffect(() => {
    const fetchPosters = async () => {
      if (movies.length === 0) return;
      setLoadingPosters(true);
      const posterMap = new Map<string, string>();
      
      const omdbApiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || ''; 

      if (!omdbApiKey) {
        console.error("OMDb API Key is missing. Please set NEXT_PUBLIC_OMDB_API_KEY.");
        setLoadingPosters(false);
        return;
      }

      for (const title of movies) {
        try {
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(title)}`);
          if (res.data?.Poster && res.data.Poster !== "N/A") {
            posterMap.set(title, res.data.Poster);
          }
        } catch (error) {
          console.error(`Failed to fetch poster for ${title}`, error);
          
        }
      }
      setPosters(posterMap);
      setLoadingPosters(false);
    };

    fetchPosters(); 
  }, [movies]);

  return (
    <div className="w-full lg:w-1/4 xl:w-1/3 px-4 mt-4 lg:mt-0">
      <h1 className="text-black font-bold text-3xl mb-4">Recommendations</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loadingRecommendations ? (
        <p>Loading recommendations...</p>
      ) : movies.length === 0 ? (
        <p>No recommendations found for “{movieTitle}”.</p>

      ) : (
        <div className="flex flex-wrap gap-4">
          {movies.map((title) => (
            <RecommendationCard
              key={title}
              imageUrl={posters.get(title) || ""} 
              film={title}
            />
          ))}
          {loadingPosters && <p>Loading posters...</p>}
        </div>
      )}
    </div>
  );
};