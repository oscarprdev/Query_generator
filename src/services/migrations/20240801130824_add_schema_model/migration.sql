-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "schemaId" TEXT;

-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tables" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schema_id_key" ON "Schema"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Schema_createdAt_key" ON "Schema"("createdAt");

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
