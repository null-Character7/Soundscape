/*
  Warnings:

  - The primary key for the `CurrentStream` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CurrentStream" DROP CONSTRAINT "CurrentStream_pkey",
ADD CONSTRAINT "CurrentStream_pkey" PRIMARY KEY ("userId");
