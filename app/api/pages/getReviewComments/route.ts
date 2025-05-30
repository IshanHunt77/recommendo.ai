import { authOptions } from "@/app/lib/autho"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    const { searchParams } = new URL(req.url)
    const reviewId = searchParams.get("reviewId")
    if (!reviewId) {
      return NextResponse.json({ error: "reviewId required" }, { status: 400 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        reviewId: parseInt(reviewId)
      }
    })

    return NextResponse.json({result:comments}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", detail: error }, { status: 500 })
  }
}
