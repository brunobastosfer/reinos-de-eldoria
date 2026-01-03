/*
  Warnings:

  - You are about to drop the `MonsterBattle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."MonsterBattle";

-- CreateTable
CREATE TABLE "monster_battles" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "currentLife" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "monster_battles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "monster_battles_characterId_monsterId_idx" ON "monster_battles"("characterId", "monsterId");
