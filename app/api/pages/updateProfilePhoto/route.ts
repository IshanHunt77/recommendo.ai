import { authOptions } from "@/app/lib/autho";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const body = await req.json();
    if (!body.profilephoto) {
      return NextResponse.json({ error: "Profilephoto required" }, { status: 400 });
    }
    console.log(body.profilephoto)
    const result = await prisma.user.update({
      where: {
        id: parseInt(session.user.id),
      },
      data: {
        profilephoto: body.profilephoto,
      },
    });

    return NextResponse.json({ message: "Profile photo updated", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", detail: error }, { status: 500 });
  }
};
