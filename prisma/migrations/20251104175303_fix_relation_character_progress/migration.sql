/*
  Warnings:

  - A unique constraint covering the columns `[characterId]` on the table `characters_progresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `characterId` to the `characters_progresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."characters" DROP CONSTRAINT "characters_character_progress_id_fkey";

-- AlterTable
ALTER TABLE "characters_progresses" ADD COLUMN     "characterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "characters_progresses_characterId_key" ON "characters_progresses"("characterId");

-- AddForeignKey
ALTER TABLE "characters_progresses" ADD CONSTRAINT "characters_progresses_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
