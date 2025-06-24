"use client"
import { Card } from "@/componentsShadcn/ui/card";
import { useRouter } from "next/navigation";
import LoaderComponent from "../Loader/page";
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "@mui/material";

interface Type {
  imageUrl: string;
  film: string;
}

const RecommendationCard = ({ imageUrl, film }: Type) => {
  const router = useRouter();

  const isLargeScreen = useMediaQuery("(min-width: 768px)")
    const h = isLargeScreen ? 40 : 32;
    const w = isLargeScreen ? 32 : 20;
 
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    
    if (imageUrl) {
      setIsImageLoading(true); 
      setHasImageError(false);
    } else {
     
      setIsImageLoading(true); 
      setHasImageError(false);
    }
  }, [imageUrl]);

  const handleNav = () => {
    if (!film || !film.trim()) return;
    router.push(`/v1/recommendation?movie=${film}`);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasImageError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasImageError(true);
  };

  return (
    <Card className="relative w-18 md:w-48 flex flex-col overflow-hidden rounded-lg shadow-lg p-0 gap-0 bg-[#181818] border border-[#e50914]/30 hover:shadow-2xl hover:shadow-[#e50914]/30 hover:border-[#e50914]/60 transition-all duration-300 group cursor-pointer" onClick={handleNav}>
      <div className="relative h-28 w-full md:h-54 flex items-center justify-center overflow-hidden">
       
        {isImageLoading && !hasImageError ? (
         
          <LoaderComponent />
        ) : hasImageError ? (
         
          <div className="w-full h-full bg-gradient-to-br from-[#181818] to-black flex items-center justify-center text-gray-400 text-xs text-center p-2 border border-[#e50914]/30">
            <div className="text-center">
              <div className="text-[#e50914] mb-1">🎬</div>
              <div>Image Load Error</div>
            </div>
          </div>
        ) : !imageUrl ? (
         
          <div className="w-full h-full bg-gradient-to-br from-[#181818] to-black flex items-center justify-center text-gray-400 text-xs text-center p-2 border border-[#e50914]/30">
            <div className="text-center">
              <div className="text-[#e50914] mb-1">🎬</div>
              <div>No Image Available</div>
            </div>
          </div>
        ) : (
          
          <img
            src={imageUrl}
            alt={film}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

       
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

       
        {imageUrl && ( 
          <img
            src={imageUrl}
            alt={film}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
          />
        )}
       

      </div>
      {isLargeScreen && (
        <div className="bg-gradient-to-r from-[#181818] to-black p-3 border-t border-[#e50914]/30">
        <h3 className="text-white text-center text-sm break-words font-medium group-hover:text-[#e50914] transition-colors duration-200">
          {film.slice(0,15)}
        </h3>
      </div>
      )}
      
    </Card>
  );
};

export default RecommendationCard;