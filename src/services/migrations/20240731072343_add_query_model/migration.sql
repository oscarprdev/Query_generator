-- CreateEnum
CREATE TYPE "QueryAction" AS ENUM ('create', 'read', 'update', 'delete', 'upsert', 'count', 'aggregate');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "queryId" TEXT;

-- CreateTable
CREATE TABLE "Query" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tables" TEXT NOT NULL,
    "action" "QueryAction" NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Query_id_key" ON "Query"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Query_createdAt_key" ON "Query"("createdAt");

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
