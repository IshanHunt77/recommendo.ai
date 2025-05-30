import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"
import { authOptions } from "@/app/lib/autho"

export const POST = async(req:NextRequest,res:NextResponse)=>{
    try{
    const body = await req.json()
    const session = await  getServerSession(authOptions)
    console.log(session)
    if(!session){
        return NextResponse.json({error:"User Unauthorized"},{status:401})
    }
    await prisma.review.create({
        data:{
            review : body.review,
            reviewOfFilm : body.reviewOfFilm,
            reviewAuthorId : parseInt(session.user.id)
        }   
    })
    return NextResponse.json({msg:"Review Created Successfully"},{status:200})
    }catch(e:any){
        return NextResponse.json({Error:"Error Creating Review",e},{status:500})
    }
    
}