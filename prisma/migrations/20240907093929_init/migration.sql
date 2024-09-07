/*
  Warnings:

  - Added the required column `url` to the `CurrentStream` table without a default value. This is not possible if the table is not empty.
  - Made the column `streamId` on table `CurrentStream` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CurrentStream" ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "streamId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "playedDate" TIMESTAMP(3),
ADD COLUMN     "timesPlayed" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentStream" ADD CONSTRAINT "CurrentStream_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
