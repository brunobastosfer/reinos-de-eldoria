/*
  Warnings:

  - You are about to drop the column `actual_experience` on the `characters` table. All the data in the column will be lost.
  - Added the required column `dodge` to the `monsters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SkillUtilityType" ADD VALUE 'BUFF';
ALTER TYPE "SkillUtilityType" ADD VALUE 'DBUFF';

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "actual_experience";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "agility" INTEGER,
ADD COLUMN     "critChance" INTEGER,
ADD COLUMN     "dodgeChance" INTEGER;

-- AlterTable
ALTER TABLE "monsters" ADD COLUMN     "dodge" INTEGER NOT NULL;
