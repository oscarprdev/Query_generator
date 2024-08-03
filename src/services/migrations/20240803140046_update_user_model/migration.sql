/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "aiRequests" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "apiKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_apiKey_key" ON "Users"("apiKey");
