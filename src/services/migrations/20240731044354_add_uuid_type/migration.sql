/*
  Warnings:

  - The values [any] on the enum `MongoType` will be removed. If these variants are still used in the database, this will fail.
  - The values [any] on the enum `PostgresType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MongoType_new" AS ENUM ('string', 'number', 'boolean', 'date', 'object', 'array', 'uuid');
ALTER TABLE "MongoRow" ALTER COLUMN "type" TYPE "MongoType_new" USING ("type"::text::"MongoType_new");
ALTER TYPE "MongoType" RENAME TO "MongoType_old";
ALTER TYPE "MongoType_new" RENAME TO "MongoType";
DROP TYPE "MongoType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PostgresType_new" AS ENUM ('text', 'integer', 'bigint', 'real', 'boolean', 'date', 'json', 'uuid');
ALTER TABLE "PostgreRow" ALTER COLUMN "type" TYPE "PostgresType_new" USING ("type"::text::"PostgresType_new");
ALTER TYPE "PostgresType" RENAME TO "PostgresType_old";
ALTER TYPE "PostgresType_new" RENAME TO "PostgresType";
DROP TYPE "PostgresType_old";
COMMIT;
