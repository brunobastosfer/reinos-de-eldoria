/*
  Warnings:

  - You are about to drop the column `boostLucky` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `boostTrainer` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `boostXP` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `characters_progresses` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `goldDropped` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `luckApplied` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `monsterId` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `invetories` table. All the data in the column will be lost.
  - You are about to drop the column `baseChance` on the `monster_drop_items` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `monster_drop_items` table. All the data in the column will be lost.
  - You are about to drop the column `monsterDropId` on the `monster_drop_items` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `maxGold` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `minGold` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `monsterId` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the `Monster` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item_to_player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[character_id]` on the table `characters_progresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[character_id]` on the table `invetories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[monster_id]` on the table `monster_drops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `character_id` to the `characters_progresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gold_dropped` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luck_applied` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monster_id` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_id` to the `invetories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_chance` to the `monster_drop_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `monster_drop_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monster_drop_id` to the `monster_drop_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monster_id` to the `monster_drops` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoostType" AS ENUM ('EXPERIENCE', 'TRAINER', 'LUCKY');

-- DropForeignKey
ALTER TABLE "public"."characters_progresses" DROP CONSTRAINT "characters_progresses_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_monsterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."invetories" DROP CONSTRAINT "invetories_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_to_player" DROP CONSTRAINT "item_to_player_characterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_to_player" DROP CONSTRAINT "item_to_player_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drop_items" DROP CONSTRAINT "monster_drop_items_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drop_items" DROP CONSTRAINT "monster_drop_items_monsterDropId_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drops" DROP CONSTRAINT "monster_drops_itemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drops" DROP CONSTRAINT "monster_drops_monsterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."skills" DROP CONSTRAINT "skills_monsterId_fkey";

-- DropIndex
DROP INDEX "public"."characters_progresses_characterId_key";

-- DropIndex
DROP INDEX "public"."invetories_characterId_key";

-- DropIndex
DROP INDEX "public"."monster_drops_monsterId_key";

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "boostLucky",
DROP COLUMN "boostTrainer",
DROP COLUMN "boostXP";

-- AlterTable
ALTER TABLE "characters_progresses" DROP COLUMN "characterId",
ADD COLUMN     "character_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "drop_logs" DROP COLUMN "characterId",
DROP COLUMN "goldDropped",
DROP COLUMN "itemId",
DROP COLUMN "luckApplied",
DROP COLUMN "monsterId",
DROP COLUMN "playerId",
ADD COLUMN     "character_id" TEXT,
ADD COLUMN     "gold_dropped" INTEGER NOT NULL,
ADD COLUMN     "item_id" TEXT,
ADD COLUMN     "luck_applied" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monster_id" TEXT NOT NULL,
ADD COLUMN     "player_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invetories" DROP COLUMN "characterId",
ADD COLUMN     "character_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "monster_drop_items" DROP COLUMN "baseChance",
DROP COLUMN "itemId",
DROP COLUMN "monsterDropId",
ADD COLUMN     "base_chance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "item_id" TEXT NOT NULL,
ADD COLUMN     "monster_drop_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "monster_drops" DROP COLUMN "itemId",
DROP COLUMN "maxGold",
DROP COLUMN "minGold",
DROP COLUMN "monsterId",
ADD COLUMN     "item_id" TEXT,
ADD COLUMN     "max_gold" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "min_gold" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "monster_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Monster";

-- DropTable
DROP TABLE "public"."item_to_player";

-- CreateTable
CREATE TABLE "boosters" (
    "id" TEXT NOT NULL,
    "type" "BoostType" NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "boosters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character_booters" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "booster_id" TEXT NOT NULL,

    CONSTRAINT "character_booters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monsters" (
    "id" TEXT NOT NULL,
    "lvl" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "monsters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_to_players" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_to_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "characters_progresses_character_id_key" ON "characters_progresses"("character_id");

-- CreateIndex
CREATE UNIQUE INDEX "invetories_character_id_key" ON "invetories"("character_id");

-- CreateIndex
CREATE UNIQUE INDEX "monster_drops_monster_id_key" ON "monster_drops"("monster_id");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "monsters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_booters" ADD CONSTRAINT "character_booters_booster_id_fkey" FOREIGN KEY ("booster_id") REFERENCES "boosters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_booters" ADD CONSTRAINT "character_booters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drops" ADD CONSTRAINT "monster_drops_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drops" ADD CONSTRAINT "monster_drops_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "monsters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drop_items" ADD CONSTRAINT "monster_drop_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drop_items" ADD CONSTRAINT "monster_drop_items_monster_drop_id_fkey" FOREIGN KEY ("monster_drop_id") REFERENCES "monster_drops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "monsters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters_progresses" ADD CONSTRAINT "characters_progresses_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invetories" ADD CONSTRAINT "invetories_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_to_players" ADD CONSTRAINT "item_to_players_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_to_players" ADD CONSTRAINT "item_to_players_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
