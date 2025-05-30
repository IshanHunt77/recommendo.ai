import { authOptions } from "@/app/lib/autho"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import prisma from "@/db"

export const GET =async ()=>{
    try {
        const session = await getServerSession(authOptions)
            if (!session) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
            }
            const filmWatchlist = await prisma.film.findMany({
                where : {
                    userId :  parseInt(session.user.id)
                }
            })
            return NextResponse.json({filmWatchlist},{status:201})
    } catch (e:any) {
        return NextResponse.json({error:"Error getting watchlist",e},{status:500})
    }
}