/*
  Warnings:

  - Added the required column `projectId` to the `MongoTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `PostgreTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MongoTable" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostgreTable" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "mongoTableId" TEXT,
ADD COLUMN     "postgreTableId" TEXT;

-- AddForeignKey
ALTER TABLE "PostgreTable" ADD CONSTRAINT "PostgreTable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MongoTable" ADD CONSTRAINT "MongoTable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
