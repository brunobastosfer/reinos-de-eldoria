/*
  Warnings:

  - Made the column `characterCurrentLife` on table `monster_battles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `characterMaxLife` on table `monster_battles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monsterCurrentLife` on table `monster_battles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `monsterMaxLife` on table `monster_battles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `monster_battles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "monster_battles" ALTER COLUMN "characterCurrentLife" SET NOT NULL,
ALTER COLUMN "characterMaxLife" SET NOT NULL,
ALTER COLUMN "monsterCurrentLife" SET NOT NULL,
ALTER COLUMN "monsterMaxLife" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
