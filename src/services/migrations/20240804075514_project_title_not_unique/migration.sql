/*
  Warnings:

  - You are about to drop the column `apiKey` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_title_key";

-- DropIndex
DROP INDEX "Users_apiKey_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "apiKey";
