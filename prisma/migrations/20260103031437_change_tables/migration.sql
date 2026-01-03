/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[serial]` on the table `ItemInstance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial` to the `ItemInstance` table without a default value. This is not possible if the table is not empty.
  - Made the column `attackBonus` on table `ItemInstance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `defenseBonus` on table `ItemInstance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lifeBonus` on table `ItemInstance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `manaBonus` on table `ItemInstance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `magicBonus` on table `ItemInstance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ItemInstance" DROP CONSTRAINT "ItemInstance_templateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."drop_logs" DROP CONSTRAINT "drop_logs_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_stacks" DROP CONSTRAINT "item_stacks_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_to_players" DROP CONSTRAINT "item_to_players_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drop_items" DROP CONSTRAINT "monster_drop_items_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."monster_drops" DROP CONSTRAINT "monster_drops_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."store_items" DROP CONSTRAINT "store_items_template_id_fkey";

-- AlterTable
ALTER TABLE "ItemInstance" ADD COLUMN     "createdFrom" TEXT,
ADD COLUMN     "durability" INTEGER,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "serial" TEXT NOT NULL,
ALTER COLUMN "attackBonus" SET NOT NULL,
ALTER COLUMN "defenseBonus" SET NOT NULL,
ALTER COLUMN "lifeBonus" SET NOT NULL,
ALTER COLUMN "manaBonus" SET NOT NULL,
ALTER COLUMN "magicBonus" SET NOT NULL;

-- DropTable
DROP TABLE "public"."items";

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requiredLevel" INTEGER NOT NULL DEFAULT 1,
    "attack" INTEGER,
    "defense" INTEGER,
    "rarity" "ItemRarity" NOT NULL,
    "vocation" "ClasseType",
    "itemType" "ItemType" NOT NULL,
    "critChance" INTEGER,
    "dodgeChance" INTEGER,
    "agility" INTEGER,
    "canGiveLife" BOOLEAN NOT NULL DEFAULT false,
    "canGiveMana" BOOLEAN NOT NULL DEFAULT false,
    "canGiveMagic" BOOLEAN NOT NULL DEFAULT false,
    "stackCategory" TEXT,
    "stackable" BOOLEAN NOT NULL DEFAULT false,
    "craftable" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER,
    "sellPrice" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemInstance_serial_key" ON "ItemInstance"("serial");

-- AddForeignKey
ALTER TABLE "monster_drops" ADD CONSTRAINT "monster_drops_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monster_drop_items" ADD CONSTRAINT "monster_drop_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stacks" ADD CONSTRAINT "item_stacks_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_items" ADD CONSTRAINT "store_items_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_to_players" ADD CONSTRAINT "item_to_players_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
