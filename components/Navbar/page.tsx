"use client";
import { CgProfile } from "react-icons/cg";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
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
  const handleLogout =async ()=>{
    await signOut()
    router.push('/')
  }
  return (
    <div className="px-1 py-1 md:px-6 md:py-4 flex items-center justify-between bg-transparent">
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
          <Button
          variant="ghost"
          className="text-md hidden md:block hover:bg-gradient-to-r hover:from-[#22c55e]/20 hover:to-[#16a34a]/20 transition-all duration-200 font-semibold text-white hover:text-white"
          
        >
          User
        </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0d0d0d] backdrop-blur-lg border border-[#22c55e]/50 shadow-xl">
            <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
          onClick={handleSignin}
        >
          Sign In
        </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:bg-transparent transition-all duration-200 font-semibold text-[#22c55e] hover:text-[#16a34a] w-full justify-start"
          onClick={handleLogout}
        >
          Logout
        </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="ghost"
          onClick={goToHome}
          className="text-md hidden md:block hover:bg-gradient-to-r hover:from-[#22c55e]/20 hover:to-[#16a34a]/20 transition-all duration-200 font-semibold text-white hover:text-white"
        >
          Home
        </Button>
        <Button
          variant="ghost"
          className="text-md hidden md:block hover:bg-gradient-to-r hover:from-[#22c55e]/20 hover:to-[#16a34a]/20 transition-all duration-200 font-semibold text-white hover:text-white"
        >
          Member
        </Button>
        <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hidden md:block hover:bg-gradient-to-r hover:from-[#22c55e]/20 hover:to-[#16a34a]/20 transition-all duration-200 font-semibold text-white hover:text-white pr-8"
        >
          Profile
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Input
          placeholder="Search Movies, Series..."
          className="w-30 md:w-64 bg-[#1a1a1a]/50 border-[#22c55e]/30 text-white placeholder:text-gray-300 focus:border-[#22c55e]/50 focus:ring-[#22c55e]/20"
          onChange={handleChange}
          value={movie}
        />
        {isLargeScreen ? 
         <Button 
           onClick={handleNav}
           className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-[#22c55e]/25"
         >
           Submit
         </Button>
        :
        <div className="p-1bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full cursor-pointer hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200 shadow-lg hover:shadow-[#22c55e]/25">
          <FaSearch onClick={handleNav} className="text-white"/>
        </div>
        }
       
      </div>
       <div className="md:hidden block">
        <DropdownMenu >
          <div className="p-2">
        <DropdownMenuTrigger className="p-1bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full hover:from-[#16a34a] hover:to-[#15803d] transition-all duration-200">
          <PersonIcon className="text-white"/>
        </DropdownMenuTrigger>

          </div>
        <DropdownMenuContent className="bg-[#0d0d0d] backdrop-blur-lg border border-[#22c55e]/50 shadow-xl">
          
          <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
             <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
        >
          Profile
        </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#22c55e]/30" />
          <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
            <Button
          variant="ghost"
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
          onClick={handleSignin}
        >
          Sign In
        </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
            <Button
          variant="ghost"
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
            <Button
          variant="ghost"
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
          onClick={goToHome}
        >
          Home
        </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
            <Button
          variant="ghost"
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-white hover:text-[#22c55e] w-full justify-start"
        >
          Member
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem className="hover:bg-[#22c55e]/20 focus:bg-[#22c55e]/20 rounded-md">
            <Button
            onClick={handleLogout}
          variant="ghost"
          className="text-md hover:bg-transparent transition-all duration-200 font-semibold text-[#22c55e] hover:text-[#16a34a] w-full justify-start"
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
