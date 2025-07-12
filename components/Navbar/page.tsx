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

interface NavbarProps {
  page?: string;
}

export const Navbar = ({ page = "home" }: NavbarProps) => {
  const [movie, setMovie] = useState("");
  const router = useRouter();
  const isLargeScreen = useMediaQuery("(min-width: 768px)")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(e.target.value);
  };
  
  const colorMap = new Map<string, string>();
  colorMap.set("home", "#00d735");
  colorMap.set("user", "#00d735");
  colorMap.set("recommendation", "#e50914");
  colorMap.set("profile", "#00d735");
  colorMap.set("signup", "#3D1766");
  colorMap.set("recommendo", "#8F43EE");

  const currentColor = colorMap.get(page) || "#3D1766";
  const lighterColor = getLighterShade(currentColor);

  function getLighterShade(hex: string): string {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Make it lighter by increasing each component
    const lighterR = Math.min(255, r + 40);
    const lighterG = Math.min(255, g + 40);
    const lighterB = Math.min(255, b + 40);
    
    // Convert back to hex
    return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
  }

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
          className="text-md hidden md:block transition-all duration-200 font-semibold text-white hover:text-white"
          style={{
            background: `linear-gradient(to right, ${currentColor}20, ${lighterColor}20)`,
          }}
        >
          User
        </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0d0d0d] backdrop-blur-lg border shadow-xl" style={{ borderColor: `${currentColor}50` }}>
            <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
          onClick={handleSignin}
        >
          Sign In
        </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
              <Button
          variant="ghost"
          className="text-md hidden md:block hover:underline hover:bg-transparent transition-all duration-200 font-semibold w-full justify-start"
          style={{ color: currentColor }}
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
          className="text-md hidden md:block transition-all duration-200 font-semibold text-white hover:text-white"
          style={{
            background: `linear-gradient(to right, ${currentColor}20, ${lighterColor}20)`,
          }}
        >
          Home
        </Button>
        <Button
          variant="ghost"
          className="text-md hidden md:block transition-all duration-200 font-semibold text-white hover:text-white"
          style={{
            background: `linear-gradient(to right, ${currentColor}20, ${lighterColor}20)`,
          }}
        >
          Member
        </Button>
        <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hidden md:block  transition-all duration-200 font-semibold text-white hover:text-white mr-4"
          style={{
            background: `linear-gradient(to right, ${currentColor}20, ${lighterColor}20)`,
          }}
        >
          Profile
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Input
          placeholder="Search Movies, Series..."
          className="w-30 md:w-64 bg-[#1a1a1a]/50 text-white placeholder:text-gray-300"
          style={{
            borderColor: `${currentColor}30`,
            '--tw-ring-color': `${currentColor}20`,
          } as React.CSSProperties}
          onChange={handleChange}
          value={movie}
        />
        {isLargeScreen ? 
         <Button 
           onClick={handleNav}
           className="text-white font-semibold transition-all duration-200 shadow-lg"
           style={{
             background: `${currentColor}`,
             boxShadow: `0 4px 14px 0 ${currentColor}25`,
           }}
         >
           Submit
         </Button>
        :
        <div className="p-1 rounded-full cursor-pointer transition-all duration-200 shadow-lg" >
          <FaSearch onClick={handleNav} className="text-white"/>
        </div>
        }
       
      </div>
       <div className="md:hidden block">
        <DropdownMenu >
          <div className="p-2">
        <DropdownMenuTrigger className="p-0 transition-all duration-200">
          <PersonIcon className="text-white"/>
        </DropdownMenuTrigger>

          </div>
        <DropdownMenuContent className="bg-[#0d0d0d] backdrop-blur-lg border shadow-xl" style={{ borderColor: `${currentColor}50` }}>
          
          <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
             <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
        >
          Profile
        </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator style={{ backgroundColor: `${currentColor}30` }} />
          <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
            <Button
          variant="ghost"
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
          onClick={handleSignin}
        >
          Sign In
        </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
            <Button
          variant="ghost"
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
            <Button
          variant="ghost"
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
          onClick={goToHome}
        >
          Home
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
            <Button
          variant="ghost"
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold text-white w-full justify-start"
          style={{ '--tw-text-opacity': '1', color: 'white' } as React.CSSProperties}
        >
          Member
        </Button>
          </DropdownMenuItem>
           <DropdownMenuItem className="rounded-md" style={{ '--tw-bg-opacity': '0.2', backgroundColor: `${currentColor}20` } as React.CSSProperties}>
            <Button
            onClick={handleLogout}
          variant="ghost"
          className="text-md hover:underline hover:bg-transparent transition-all duration-200 font-semibold w-full justify-start"
          style={{ color: currentColor }}
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
