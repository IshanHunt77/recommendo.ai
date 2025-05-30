import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/autho';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!, 
      api_key: process.env.CLOUDINARY_API_KEY!, 
      api_secret: process.env.CLOUDINARY_SECRET!,
    });

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64String}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      public_id: file.name.split('.')[0],
    });

    const imageUpload = await prisma.user.update({
      where: {
        id: parseInt(session.user.id),
      },
      data: {
        profilephoto: uploadResult.secure_url,
      },
    });

    return NextResponse.json(
      { msg: "Image uploaded successfully", profilephoto: imageUpload.profilephoto },
      { status: 200 }
    );
  } catch (e: unknown) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}
