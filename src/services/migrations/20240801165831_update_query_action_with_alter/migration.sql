/*
  Warnings:

  - The values [aggregate] on the enum `QueryAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QueryAction_new" AS ENUM ('create', 'read', 'update', 'delete', 'upsert', 'count', 'alter');
ALTER TABLE "Query" ALTER COLUMN "action" TYPE "QueryAction_new" USING ("action"::text::"QueryAction_new");
ALTER TYPE "QueryAction" RENAME TO "QueryAction_old";
ALTER TYPE "QueryAction_new" RENAME TO "QueryAction";
DROP TYPE "QueryAction_old";
COMMIT;
