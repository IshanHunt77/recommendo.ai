"use client";
import { Card as ShadCard } from "@/componentsShadcn/ui/card";

interface CardProps {
  imageUrl: string;
  h: number;
  w: number;
  watchlist:boolean;
  movieCards:boolean;
}

const CardComponent: React.FC<CardProps> = ({ imageUrl, h, w ,watchlist,movieCards}) => {
  return (
    <ShadCard
      className={`relative w-${w} h-${h} rounded-sm overflow-hidden py-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white ${movieCards ? "": "mt-6"}`}
    >
      
      {imageUrl && (
        <img src={imageUrl} alt="Movie" className="w-full h-full object-cover" />
      )}
      {watchlist && (
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
              
               
      </div>
)}

    </ShadCard>
  );
};

export default CardComponent;


