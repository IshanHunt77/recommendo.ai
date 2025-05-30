-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilephoto" TEXT NOT NULL DEFAULT 'default-profile-photo.png';

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "filmName" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
