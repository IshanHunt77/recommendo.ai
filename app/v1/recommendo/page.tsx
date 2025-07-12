"use client";
import { useRouter } from "next/navigation";
import { Card } from "@/componentsShadcn/ui/card";
import MovieCards from "../../../components/MovieCards/page";
import { Navbar } from "../../../components/Navbar/page";
import ReviewCard from "../../../components/ReviewCard/page";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Home2 from "../home/page";
import Footer from "@/components/Footer/page";

const Home = () => {
  const router = useRouter();
  const {data:session,status} = useSession()

  const handleNav = () => {
    router.push("/v1/signup");
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-[#18122B] to-[#3D1766]">
      
      <div className="relative w-full h-102 md:h-150 overflow-hidden">
        <img 
          src="/landing.jpg"
          alt="Pulp Fiction"
          className="absolute w-full h-full object-cover"
        />
        
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3D1766]/40 to-[#18122B]/70" />
        
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C2EBE]/15 via-transparent to-[#8F43EE]/10" />

        
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between p-2 md:p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <div className="italic text-2xl md:text-6xl mt-1 font-bold bg-gradient-to-r from-[#ffffff] to-[#ffffff] bg-clip-text text-transparent underline decoration-[#4B0082]">Recommend'o</div>
          <Navbar page="recommendo" />
        </div>

       
        <div className="absolute inset-0 flex items-end md:items-center md:items-end mb-10 justify-center md:justify-end md:pr-16">
          <h1 className="text-white text-lg md:text-5xl font-bold text-right max-w-lg drop-shadow-lg">
            "Not sure what to watch next?<br />
            <span className="bg-gradient-to-r from-[#6C2EBE] to-[#e50914] bg-clip-text text-transparent">Recommendo's got your back.</span>"
          </h1>
        </div>
      </div>

      <div className="flex gap-2 p-1 md:p-4 bg-gradient-to-b from-[#18122B] to-[#3D1766]">
        <MovieCards />
      </div>

      <div className="flex-col md:p-4 md:grid grid-cols-2 gap-4 bg-gradient-to-b from-[#3D1766] to-[#18122B]">
        <div className="col-span-1">
          <h1 className="italic text-lg font-bold mb-2 ml-1 bg-gradient-to-r from-[#6C2EBE] to-[#8F43EE] bg-clip-text text-transparent">Famous Reviews</h1>
          <div className="flex flex-col justify-center items-center gap-2">
            <ReviewCard
              dp="/batmanLogo.jpeg"
              filmname="Inception"
              author="ishan77"
              likes={123}
              reviewId={1}
              review="Most badass film ever made"
              year="2025"
              rating={8}
            />
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h1 className="text-lg font-bold bg-gradient-to-r from-[#6C2EBE] to-[#8F43EE] bg-clip-text text-transparent">What Recommendo Offer's</h1>
          <Card className="w-full h-32 p-4 bg-gradient-to-br from-[#18122B] to-[#6C2EBE]/20 text-white shadow-lg hover:bg-gradient-to-br hover:from-[#6C2EBE]/30 hover:to-[#18122B] border border-[#6C2EBE]/40 transition-all duration-300">
            <h1 className="text-lg font-bold text-[#8F43EE]">One-stop hub</h1>
            <p className="text-md text-gray-300">Your single place for all your movie needs – reviews, ratings, and recommendations.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-gradient-to-br from-[#18122B] to-[#8F43EE]/20 text-white shadow-lg hover:bg-gradient-to-br hover:from-[#8F43EE]/30 hover:to-[#18122B] border border-[#8F43EE]/40 transition-all duration-300">
            <h1 className="text-lg font-bold text-[#6C2EBE]">AI-Powered Suggestions</h1>
            <p className="text-md text-gray-300">Get curated movie picks based on your preferences and viewing history.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-gradient-to-br from-[#18122B] to-[#6C2EBE]/20 text-white shadow-lg hover:bg-gradient-to-br hover:from-[#6C2EBE]/30 hover:to-[#18122B] border border-[#6C2EBE]/40 transition-all duration-300">
            <h1 className="text-lg font-bold text-[#8F43EE]">Community Reviews</h1>
            <p className="text-md text-gray-300">Read what real movie lovers think, and share your own opinions too.</p>
          </Card>
        </div>
      </div>

      <div className="justify-center items-center text-center flex flex-col gap-4 mt-8 p-4 bg-gradient-to-t from-[#18122B] to-[#3D1766]">
        <h1 className="font-bold text-lg max-w-2xl text-white">
          Start your movie journey now with Recommendo. Become a member and get a chance to receive recommendations from great stars in the industry.
        </h1>
        <Button 
          variant="contained" 
          onClick={handleNav}
          sx={{
            background: 'linear-gradient(135deg, #6C2EBE 0%, #8F43EE 100%)',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px 24px',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              background: 'linear-gradient(135deg, #8F43EE 0%, #3D1766 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(140, 67, 238, 0.5)',
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Get Started
        </Button>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;