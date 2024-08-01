/*
  Warnings:

  - You are about to drop the column `tables` on the `Schema` table. All the data in the column will be lost.
  - Added the required column `table` to the `Schema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schema" DROP COLUMN "tables",
ADD COLUMN     "table" TEXT NOT NULL;
