"use client";

import { useState } from "react";
import { Card } from "@/componentsShadcn/ui/card";
import { Input } from "@/componentsShadcn/ui/input";
import { Button } from "@/componentsShadcn/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";

const Signup = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/auth/signup`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      console.log("Signed up successfully:", res.data);
      
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
          <div className="flex justify-center items-center gap-2 pt-4">
  <p className="text-sm text-gray-700">Already have an account?</p>
  <Button type="button" variant="link" className="text-blue-600 p-0 h-auto" onClick={() => signIn()}>
    Sign In
  </Button>
</div>

        </form>
      </Card>
    </div>
  );
};

export default Signup;
