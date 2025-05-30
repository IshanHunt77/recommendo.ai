import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
 

export const POST = async (req: NextRequest) => {
  try {
    
    const body = await req.json();

   
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    
    await prisma.user.create({
      data:{
        username:body.username,
        password:body.password
      }
    })

   
    return NextResponse.json({ msg: "Signup Success" }, { status: 201 });
  } catch (error) {
    console.log("Error creating user:", error);

   
    return NextResponse.json(
      { error: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
};
