-- CreateTable
CREATE TABLE "MonsterBattle" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "currentLife" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "MonsterBattle_pkey" PRIMARY KEY ("id")
);
