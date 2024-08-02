-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "seedId" TEXT;

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "table" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seed_id_key" ON "Seed"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seed_createdAt_key" ON "Seed"("createdAt");

-- AddForeignKey
ALTER TABLE "Seed" ADD CONSTRAINT "Seed_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
