import { authOptions } from "@/app/lib/autho"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"

export const POST = async(req:NextRequest)=>{
    try {
        const session = await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"User Unauthorized"},{status:401})
            }
                const body = await req.json()
                if(!body.filmName && body.watched){
                    return NextResponse.json({error:"filmName and watched status required"},{status:401})
                }
                const update = await prisma.film.create({
                    data : {
                        filmName : body.filmName,
                        watched : body.watched,
                        userId : parseInt(session.user.id)
                    }
                    
                })
                return NextResponse.json({msg : "film added Successfully",update},{status:201})
    } catch (e:any) {
        return NextResponse.json({Error:"Error Creating Review",e},{status:500})
    }
}
