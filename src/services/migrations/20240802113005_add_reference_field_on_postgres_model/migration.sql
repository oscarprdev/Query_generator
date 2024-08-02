/*
  Warnings:

  - The values [uuid] on the enum `MongoType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `reference` to the `MongoRow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `PostgreRow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MongoType_new" AS ENUM ('objectId', 'string', 'number', 'boolean', 'date', 'object', 'array', 'any');
ALTER TABLE "MongoRow" ALTER COLUMN "type" TYPE "MongoType_new" USING ("type"::text::"MongoType_new");
ALTER TYPE "MongoType" RENAME TO "MongoType_old";
ALTER TYPE "MongoType_new" RENAME TO "MongoType";
DROP TYPE "MongoType_old";
COMMIT;

-- AlterTable
ALTER TABLE "MongoRow" ADD COLUMN     "reference" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PostgreRow" ADD COLUMN     "reference" TEXT NOT NULL;
