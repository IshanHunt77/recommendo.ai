import { authOptions } from "@/app/lib/autho"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db"

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId") || '';
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 })
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
      }
    })

    return NextResponse.json({
      username : userInfo?.username,
      profilephoto : userInfo?.profilephoto
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", detail: error }, { status: 500 })
  }
}
