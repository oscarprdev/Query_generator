/*
  Warnings:

  - Added the required column `name` to the `MongoRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PostgreRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MongoRow" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostgreRow" ADD COLUMN     "name" TEXT NOT NULL;
