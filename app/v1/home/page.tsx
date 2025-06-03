"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "../../../components/Navbar/page";
import Watchlist from "../../../components/Watchlist/page";
import ExploreMovies from "@/components/Explore/page";
import Signup from "../signup/page";
import Footer from "@/components/Footer/page";

const Home2 = () => {
  const { data: session,status } = useSession();
    
  if(status!=="authenticated"){
    return <Signup/>
  }

  return (
    
    <div className="flex flex-col min-h-screen bg-white px-6 py-4">
     
      <div className="flex justify-between items-center mb-6 gap-4 ">
        <div className="italic text-2xl md:text-6xl font-bold text-black underline decoration-black">
          Recommend'o
        </div>
        <Navbar />
      </div>

    
      <div className="text-center mb-10 mt-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 text-center">
  {session?.user?.name ? (
    <>
      Welcome back, {session.user.name.split(" ")[0]}!
      <br />
      <span className="text-xl sm:text-2xl font-medium text-gray-700">
        Continue with your watchlist
      </span>
    </>
  ) : (
    "Welcome!"
  )}
</h1>

      </div>

     
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-5xl">
          <Watchlist user={session.user?.name || ""} />
        </div>
      </div>

      
      <ExploreMovies />
      <Footer/>
    </div>
  );
};

export default Home2;
