/*
  Warnings:

  - You are about to drop the column `character_progress_id` on the `characters` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."characters_character_progress_id_key";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "character_progress_id";
