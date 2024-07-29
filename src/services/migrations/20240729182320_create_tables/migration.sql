-- CreateEnum
CREATE TYPE "PostgresType" AS ENUM ('text', 'integer', 'bigint', 'real', 'boolean', 'date', 'json');

-- CreateEnum
CREATE TYPE "MongoType" AS ENUM ('string', 'number', 'boolean', 'date', 'object', 'array');

-- CreateEnum
CREATE TYPE "PostgresConstraint" AS ENUM ('primaryKey', 'foreignKey', 'notNull', 'unique');

-- CreateEnum
CREATE TYPE "MongoConstraint" AS ENUM ('primaryKey', 'unique');

-- CreateTable
CREATE TABLE "PostgresTable" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostgresTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MongoTable" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MongoTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostgresRow" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "PostgresType" NOT NULL,
    "constraints" "PostgresConstraint" NOT NULL,

    CONSTRAINT "PostgresRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MongoRow" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "MongoType" NOT NULL,
    "constraints" "MongoConstraint" NOT NULL,

    CONSTRAINT "MongoRow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostgresTable_id_key" ON "PostgresTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostgresTable_title_key" ON "PostgresTable"("title");

-- CreateIndex
CREATE UNIQUE INDEX "PostgresTable_createdAt_key" ON "PostgresTable"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MongoTable_id_key" ON "MongoTable"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MongoTable_title_key" ON "MongoTable"("title");

-- CreateIndex
CREATE UNIQUE INDEX "MongoTable_createdAt_key" ON "MongoTable"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PostgresRow_id_key" ON "PostgresRow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostgresRow_tableId_key" ON "PostgresRow"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "MongoRow_id_key" ON "MongoRow"("id");

-- AddForeignKey
ALTER TABLE "PostgresRow" ADD CONSTRAINT "PostgresRow_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "PostgresTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MongoRow" ADD CONSTRAINT "MongoRow_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "MongoTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
