import { authOptions } from "@/app/lib/autho";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export const GET =async (req:NextRequest)=>{
    try{
        const { searchParams } = new URL(req.url);
        const film = searchParams.get("film");
        console.log(film)
        const sessiosn = getServerSession(authOptions)
        if(!sessiosn){
            return NextResponse.json({error:"Unauthorized"},{status:400})
        }
        if(!film){
            return NextResponse.json({error:"Film required"},{status:401})
        }
        const result  = await prisma.review.findMany({
            where:{
                reviewOfFilm:film
            },
                orderBy : {
                    likes : 'desc',
                },
                take : 4
            })
       
        return NextResponse.json(result)
    }catch(e:any){
        return NextResponse.json({error:"Error finding Reviews",e},{status:500})
    }
}