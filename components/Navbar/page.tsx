"use client";

import { Button } from "@/componentsShadcn/ui/button";
import { Input } from "@/componentsShadcn/ui/input";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useMediaQuery } from "@mui/material";


export const Navbar = () => {
  const [movie, setMovie] = useState("");
  const router = useRouter();
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(e.target.value);
  };

  const handleSignin = () => {
    sessionStorage.setItem("showHome","true")
    signIn(undefined, { callbackUrl: "/v1/home" });
  };
  const handleSignUp = ()=>{
    router.push('/v1/signup')
  }
  const handleNav = () => {
    if (!movie.trim()) return;
    router.push(`/v1/recommendation?movie=${encodeURIComponent(movie)}`);
  };
  const goToProfile = ()=>{
    router.push('/v1/profile')
  }
  const goToHome= ()=>{
    router.push('/v1/home')
  }
  return (
    <div className="px-1 py-1 md:px-6 md:py-4 flex items-center justify-between text-red shadow-md">
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          className="text-md hidden md:block hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignin}
        >
          Sign In
        </Button>
        <Button
          variant="ghost"
          className="text-md  hidden md:block hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          onClick={goToHome}
          className="text-md  hidden md:block hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Home
        </Button>
        <Button
          variant="ghost"
          className="text-md  hidden md:block hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Member
        </Button>
        <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hidden md:block hover:underline underline-offset-4 transition-all duration-200 font-semibold pr-16"
        >
          Profile
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Input
          placeholder="Search Movies, Series..."
          className="w-40 md:w-64"
          onChange={handleChange}
          value={movie}
        />
        {isLargeScreen ? 
         <Button onClick={handleNav}>Submit</Button>
        :
        <div>
          <FaSearch onClick={handleNav}/>
        </div>
        }
       
      </div>
       <div className="md:hidden block">
        <DropdownMenu >
          <div className="p-2">
        <DropdownMenuTrigger><BsThreeDotsVertical/></DropdownMenuTrigger>

          </div>
        <DropdownMenuContent>
          
          <DropdownMenuItem>
             <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md  hover:underline underline-offset-4 transition-all duration-200 font-semibold pr-16"
        >
          Profile
        </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignin}
        >
          Sign In
        </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Member
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <Button
            onClick={()=>signOut()}
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Logout
        </Button>
          </DropdownMenuItem>
           
        </DropdownMenuContent>
       </DropdownMenu>
      </div>
    </div>
  );
};
