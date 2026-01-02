/*
  Warnings:

  - You are about to drop the column `nivel_attribute` on the `characters_progresses` table. All the data in the column will be lost.
  - You are about to drop the column `to_next_attribute` on the `characters_progresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "characters_progresses" DROP COLUMN "nivel_attribute",
DROP COLUMN "to_next_attribute";

-- CreateTable
CREATE TABLE "skills_character_progress" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "skillType" "Attribute" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "experience" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "toNextLevel" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "skills_character_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_character_progress_character_id_key" ON "skills_character_progress"("character_id");

-- AddForeignKey
ALTER TABLE "skills_character_progress" ADD CONSTRAINT "skills_character_progress_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
