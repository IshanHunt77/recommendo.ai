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
    router.push("/member");
  };
  // if(status==="authenticated"){
  //   return <Home2/>
  // }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between p-2 md:p-4">
        <div className="italic text-2xl md:text-6xl mt-1 font-bold text-black underline decoration-black">Recommend'o</div>
        <Navbar />
      </div>

      <div className="relative w-full h-102 md:h-150 overflow-hidden">
  <img 
    src="/thurman.jpg"
    alt="Pulp Fiction"
    className="absolute w-full h-full object-cover"
  />

  {/* Darker gradient from top to bottom */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />

  <div className="absolute inset-0 flex items-end md:items-center md:items-end mb-10 justify-center md:justify-end md:pr-16">
    <h1 className="text-white text-lg md:text-5xl font-bold text-right max-w-lg">
      "Not sure what to watch next?<br />Recommendo’s got your back."
    </h1>
  </div>
</div>


      <div className="flex gap-2 p-1 md:p-4">
        <MovieCards />
      </div>

      <div className="flex-col md:p-4 md:grid grid-cols-2 gap-4 ">
        <div className="col-span-1">
          <h1 className="italic text-lg font-bold mb-2 ml-1">Famous Reviews</h1>
          <div className="flex flex-col gap-2">
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
          <h1 className="text-lg font-bold text-black">What Recommendo Offer's</h1>
          <Card className="w-full h-32 p-4 bg-white text-black shadow-md hover:bg-gray-200">
            <h1 className="text-lg font-bold text-black">One-stop hub</h1>
            <p className="text-md">Your single place for all your movie needs – reviews, ratings, and recommendations.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-white text-black shadow-md hover:bg-gray-200">
            <h1 className="text-lg font-bold text-black">AI-Powered Suggestions</h1>
            <p className="text-md">Get curated movie picks based on your preferences and viewing history.</p>
          </Card>
          <Card className="w-full h-32 p-4 bg-white text-black shadow-md hover:bg-gray-200">
            <h1 className="text-lg font-bold text-black">Community Reviews</h1>
            <p className="text-md">Read what real movie lovers think, and share your own opinions too.</p>
          </Card>
        </div>
      </div>

      <div className="justify-center items-center text-center flex flex-col gap-4 mt-8 p-4">
        <h1 className="font-bold text-lg max-w-2xl">
          Start your movie journey now with Recommendo. Become a member and get a chance to receive recommendations from great stars in the industry.
        </h1>
        <Button variant="contained" color="primary" onClick={handleNav}>
          Get Started
        </Button>
      </div>

      <Footer/>
     

    </div>
  );
};

export default Home;
