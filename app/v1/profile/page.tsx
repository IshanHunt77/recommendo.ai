"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/componentsShadcn/ui/input";
import { Button } from "@/componentsShadcn/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/componentsShadcn/ui/avatar";
import { signIn, signOut } from "next-auth/react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const url = process.env.NEXT_PUBLIC_BASE_URL;

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace this with your actual upload endpoint or 3rd party like Cloudinary
      const res = await axios.post(`${url}/api/pages/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.profilephoto; // ensure your backend returns { imageUrl }
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    }
  };

  const handleUpdate = async () => {
    if (!username.trim()) return;

    setLoading(true);

    let uploadedUrl = profilePhoto;
    if (file) {
      const url = await uploadImage(file);
      if (url) uploadedUrl = url;

      else {
        setSuccessMsg("Failed to upload image.");
        setLoading(false);
        return;
      }
    }

    try {
      console.log(uploadedUrl)
      await axios.post(`${url}/api/pages/updateProfilePhoto`, {
        username,
        profilephoto: uploadedUrl,
      });
      setSuccessMsg("Profile updated successfully!");
      setProfilePhoto(uploadedUrl);
      setTimeout(()=>signOut(),1000)
      signIn(undefined, { callbackUrl: "/v1/home" });
    } catch (err) {
      console.error("Error updating profile", err);
      setSuccessMsg("Error updating profile.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-white px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 underline underline-offset-4">
        Edit Your Profile
      </h1>

      <div className="mb-6">
        <Avatar className="h-28 w-28 border border-gray-300">
          <AvatarImage src={profilePhoto} />
          <AvatarFallback>{username ? username[0]?.toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <Input
            placeholder="Enter your new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
          <Input
            placeholder="Or paste image URL"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            className="rounded-lg border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Profile Photo</label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="rounded-lg border border-gray-300"
          />
        </div>

        <Button
          onClick={handleUpdate}
          disabled={loading}
          className="mt-4 bg-black text-white rounded-lg py-2 hover:bg-gray-800"
        >
          {loading ? "Updating..." : "Save Changes"}
        </Button>

        {successMsg && (
          <div className="text-sm text-center mt-4 text-green-600 font-medium">
            {successMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
