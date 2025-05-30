"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useData } from "../Context/page";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [movie, setMovie] = useState("");
  const { data, setData } = useData();
  const router = useRouter();

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
  return (
    <div className="px-6 py-4 flex items-center justify-between text-red shadow-md">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignin}
        >
          Sign In
        </Button>
        <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Films
        </Button>
        <Button
          variant="ghost"
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold"
        >
          Member
        </Button>
        <Button
          variant="ghost"
          onClick={goToProfile}
          className="text-md hover:underline underline-offset-4 transition-all duration-200 font-semibold pr-16"
        >
          Profile
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search Movies, Series..."
          className="w-64"
          onChange={handleChange}
          value={movie}
        />
        <Button onClick={handleNav}>Submit</Button>
      </div>
    </div>
  );
};
