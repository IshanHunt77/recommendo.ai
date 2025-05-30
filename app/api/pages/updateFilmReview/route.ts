import { authOptions } from "@/app/lib/autho"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"


export const POST = async (req:NextRequest)=>{
    try{
         const body = await req.json()
            const session = await  getServerSession(authOptions)
            console.log(session)
            if(!session){
                return NextResponse.json({error:"User Unauthorized"},{status:401})
            }
            console.log(body.id)
            const result = await prisma.review.update({
                where : {
                    id : body.id
                },
                data : {
                    likes : {
                        increment:1
                    }
                }
            })
            return Response.json({msg:"likes updates",status:200})
    } catch (error) {
    return NextResponse.json({ error: "Something went wrong", detail: error }, { status: 500 });
  }
}