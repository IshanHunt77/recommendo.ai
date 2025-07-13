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
  // if(status==='authenticated'){
  //   return <Home2/>
  // }
  const handleNav = () => {
    router.push("/v1/signup");
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      
      <div className="relative w-full h-102 md:h-150 overflow-hidden">
        <img 
          src="/landing.jpg"
          alt="Pulp Fiction"
          className="absolute w-full h-full object-cover"
        />
        
        {/* Simple overlay instead of gradients */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between p-2 md:p-4 bg-black/80">
          <div className="italic text-2xl md:text-6xl mt-1 font-bold text-amber-400 underline decoration-amber-400">Recommend'o</div>
          <Navbar page="recommendo" />
        </div>

        <div className="absolute inset-0 flex items-end md:items-center md:items-end mb-10 justify-center md:justify-end md:pr-16">
          <h1 className="text-white text-lg md:text-5xl font-bold text-right max-w-lg drop-shadow-lg">
            "Not sure what to watch next?<br />
            <span className="text-amber-400">Recommendo's got your back.</span>"
          </h1>
        </div>
      </div>

      <div className="flex gap-2 p-1 md:p-4 bg-black">
        <MovieCards />
      </div>

      <div className="flex-col md:p-4 md:grid grid-cols-2 gap-4 bg-black">
        <div className="col-span-1">
          <h1 className="italic text-lg font-bold mb-2 ml-1 text-amber-400">Famous Reviews</h1>
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
          <h1 className="text-lg font-bold text-amber-400">What Recommendo Offers</h1>
          <Card className="w-full h-32 p-4 bg-gray-900 text-white shadow-lg hover:bg-gray-800 border border-amber-400/30 transition-all duration-300">
            <h1 className="text-lg font-bold text-amber-400">One-stop hub</h1>
            <p className="text-md text-gray-300">Your single place for all your movie needs – reviews, ratings, and recommendations.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-gray-900 text-white shadow-lg hover:bg-gray-800 border border-amber-400/30 transition-all duration-300">
            <h1 className="text-lg font-bold text-amber-400">AI-Powered Suggestions</h1>
            <p className="text-md text-gray-300">Get curated movie picks based on your preferences and viewing history.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-gray-900 text-white shadow-lg hover:bg-gray-800 border border-amber-400/30 transition-all duration-300">
            <h1 className="text-lg font-bold text-amber-400">Community Reviews</h1>
            <p className="text-md text-gray-300">Read what real movie lovers think, and share your own opinions too.</p>
          </Card>
        </div>
      </div>

      <div className="justify-center items-center text-center flex flex-col gap-4 mt-8 p-4 bg-black">
        <h1 className="font-bold text-lg max-w-2xl text-white">
          Start your movie journey now with Recommendo. Become a member and get a chance to receive recommendations from great stars in the industry.
        </h1>
        <Button 
          variant="contained" 
          onClick={handleNav}
          sx={{
            background: '#D4AF37',
            color: '#000',
            fontWeight: 'bold',
            padding: '12px 24px',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              background: '#B8860B',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(212, 175, 55, 0.3)',
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