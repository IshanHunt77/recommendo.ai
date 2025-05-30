import { authOptions } from "@/app/lib/autho";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export const POST = async(req:NextRequest)=>{
    try {
        const session = await getServerSession(authOptions)
         if(!session){
                return NextResponse.json({error:"User Unauthorized"},{status:401})
            }
        const body = await req.json()
        if(!body.reviewId){
            return NextResponse.json({error:"Review Id required"},{status:401})
        }
        const result  = await prisma.comment.create({
            data : {
                comment : body.comment,
                reviewId : body.reviewId,
                commentAuthorId : parseInt(session.user.id)
            }
        })
        return NextResponse.json({result},{status:201})
    } catch (e:any) {
        return NextResponse.json({Error:"Error Creating Review",e},{status:500})
    }
}