/*
  Warnings:

  - The values [postgresSQL] on the enum `Databases` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `PostgresRow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostgresTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostgreConstraint" AS ENUM ('primaryKey', 'foreignKey', 'notNull', 'unique');

-- AlterEnum
BEGIN;
CREATE TYPE "Databases_new" AS ENUM ('mongoDb', 'postgreSQL');
ALTER TABLE "Project" ALTER COLUMN "database" TYPE "Databases_new" USING ("database"::text::"Databases_new");
ALTER TYPE "Databases" RENAME TO "Databases_old";
ALTER TYPE "Databases_new" RENAME TO "Databases";
DROP TYPE "Databases_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "PostgresRow" DROP CONSTRAINT "PostgresRow_tableId_fkey";

-- DropTable
DROP TABLE "PostgresRow";

-- DropTable
DROP TABLE "PostgresTable";

-- DropEnum
DROP TYPE "PostgresConstraint";

-- CreateTable
CREATE TABLE "PostgreTable" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostgreTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostgreRow" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "PostgresType" NOT NULL,
    "constraints" "PostgreConstraint" NOT NULL,

    CONSTRAINT "PostgreRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostgreTable_id_key" ON "PostgreTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostgreTable_title_key" ON "PostgreTable"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PostgreTable_createdAt_key" ON "PostgreTable"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PostgreRow_id_key" ON "PostgreRow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostgreRow_tableId_key" ON "PostgreRow"("tableId");

-- AddForeignKey
ALTER TABLE "PostgreRow" ADD CONSTRAINT "PostgreRow_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "PostgreTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
