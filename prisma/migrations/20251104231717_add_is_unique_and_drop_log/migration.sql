/*
  Warnings:

  - You are about to drop the column `character_id` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `monster_id` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `success` on the `drop_logs` table. All the data in the column will be lost.
  - You are about to drop the column `drop_chance` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `isUnique` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `monster_drops` table. All the data in the column will be lost.
  - You are about to drop the column `monster_id` on the `monster_drops` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[monsterId]` on the table `monster_drops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `goldDropped` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luckApplied` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monsterId` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `drop_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monsterId` to the `monster_drops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_character_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_monster_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drops" DROP CONSTRAINT "monster_drops_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drops" DROP CONSTRAINT "monster_drops_monster_id_fkey";

-- DropIndex
DROP INDEX "public"."monster_drops_monster_id_item_id_key";

-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "gold" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "drop_logs" DROP COLUMN "character_id",
DROP COLUMN "item_id",
DROP COLUMN "monster_id",
DROP COLUMN "quantity",
DROP COLUMN "success",
ADD COLUMN     "characterId" TEXT,
ADD COLUMN     "goldDropped" INTEGER NOT NULL,
ADD COLUMN     "itemId" TEXT,
ADD COLUMN     "itemsDropped" TEXT[],
ADD COLUMN     "luckApplied" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monsterId" TEXT NOT NULL,
ADD COLUMN     "playerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "monster_drops" DROP COLUMN "drop_chance",
DROP COLUMN "isUnique",
DROP COLUMN "item_id",
DROP COLUMN "monster_id",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "itemId" TEXT,
ADD COLUMN     "maxGold" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "minGold" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "monsterId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "monster_drop_items" (
    "id" TEXT NOT NULL,
    "monsterDropId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "rarity" "RarityType" NOT NULL,
    "baseChance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "monster_drop_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monster_drops_monsterId_key" ON "monster_drops"("monsterId");

-- AddForeignKey
ALTER TABLE "monster_drops" ADD CONSTRAINT "monster_drops_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drops" ADD CONSTRAINT "monster_drops_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drop_items" ADD CONSTRAINT "monster_drop_items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drop_items" ADD CONSTRAINT "monster_drop_items_monsterDropId_fkey" FOREIGN KEY ("monsterDropId") REFERENCES "monster_drops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
