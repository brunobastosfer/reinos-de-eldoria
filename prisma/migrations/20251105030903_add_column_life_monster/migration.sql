/*
  Warnings:

  - Added the required column `life` to the `monsters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "monsters" ADD COLUMN     "life" INTEGER NOT NULL;
