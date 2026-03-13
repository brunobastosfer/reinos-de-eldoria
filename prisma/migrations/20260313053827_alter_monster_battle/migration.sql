/*
  Warnings:

  - You are about to drop the column `currentLife` on the `monster_battles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."monster_battles_characterId_monsterId_idx";

-- AlterTable
ALTER TABLE "monster_battles" DROP COLUMN "currentLife",
ADD COLUMN     "characterCurrentLife" INTEGER,
ADD COLUMN     "characterMaxLife" INTEGER,
ADD COLUMN     "fleeAttempted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fleeLocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "monsterCurrentLife" INTEGER,
ADD COLUMN     "monsterMaxLife" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "winner" TEXT;

-- CreateIndex
CREATE INDEX "monster_battles_characterId_idx" ON "monster_battles"("characterId");

-- CreateIndex
CREATE INDEX "monster_battles_monsterId_idx" ON "monster_battles"("monsterId");

-- CreateIndex
CREATE INDEX "monster_battles_characterId_finishedAt_idx" ON "monster_battles"("characterId", "finishedAt");
