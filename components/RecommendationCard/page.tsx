"use client"
import { Card } from "@/componentsShadcn/ui/card";
import { Checkbox } from "@/componentsShadcn/ui/checkbox";
import { useRouter } from "next/navigation";
import LoaderComponent from "../Loader/page";
import React, { useState, useEffect } from 'react';

interface Type {
  imageUrl: string;
  film: string;
}

const RecommendationCard = ({ imageUrl, film }: Type) => {
  const router = useRouter();
 
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
    <Card className="relative w-48 flex flex-col overflow-hidden rounded-sm shadow-lg p-0 gap-0 hover:shadow-2xl transition-shadow duration-300" onClick={handleNav}>
      <div className="relative h-54 w-full flex items-center justify-center">
       
        {isImageLoading && !hasImageError ? (
         
          <LoaderComponent />
        ) : hasImageError ? (
         
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center p-2">
            Image Load Error
          </div>
        ) : !imageUrl ? (
         
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center p-2">
            No Image Available
          </div>
        ) : (
          
          <img
            src={imageUrl}
            alt={film}
            className="w-full h-full object-cover"
          />
        )}

       
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

      <h3 className="bg-black text-white text-center p-2 text-sm break-words">
        {film}
      </h3>
    </Card>
  );
};

export default RecommendationCard;