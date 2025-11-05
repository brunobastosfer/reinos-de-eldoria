/*
  Warnings:

  - The `attack` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `defense` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `vocation` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "vocation" "ClasseType" NOT NULL,
DROP COLUMN "attack",
ADD COLUMN     "attack" INTEGER,
DROP COLUMN "defense",
ADD COLUMN     "defense" INTEGER;
