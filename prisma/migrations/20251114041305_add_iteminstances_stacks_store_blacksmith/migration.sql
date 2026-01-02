/*
  Warnings:

  - You are about to drop the column `itemsDropped` on the `drop_logs` table. All the data in the column will be lost.
  - Added the required column `to_next_attribute` to the `characters_progresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_type` to the `items` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rarity` on the `items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rarity` on the `monster_drop_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "CharacterStatus" AS ENUM ('BLOCKED', 'BANISHED', 'TRAINING', 'TRAVELING', 'IN_MISSION');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('LEG', 'ARMOR', 'WEAPON', 'SHIELD', 'HELMET', 'AMULET', 'RING');

-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "expires_status_at" TIMESTAMP(3),
ADD COLUMN     "status" "CharacterStatus";

-- AlterTable
ALTER TABLE "characters_progresses" ADD COLUMN     "nivel_attribute" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "to_next_attribute" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "drop_logs" DROP COLUMN "itemsDropped",
ADD COLUMN     "item_instance_ids" TEXT[],
ADD COLUMN     "item_template_ids" TEXT[];

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "characterEquipmentsId" TEXT,
ADD COLUMN     "craftable" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item_type" "ItemType" NOT NULL,
ADD COLUMN     "stackCategory" TEXT,
ADD COLUMN     "stackable" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "rarity",
ADD COLUMN     "rarity" "ItemRarity" NOT NULL,
ALTER COLUMN "vocation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "monster_drop_items" DROP COLUMN "rarity",
ADD COLUMN     "rarity" "ItemRarity" NOT NULL;

-- DropEnum
DROP TYPE "public"."RarityType";

-- CreateTable
CREATE TABLE "characters_equipments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "characters_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterInventory" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "CharacterInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_instances" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "inventory_id" TEXT,
    "serial" TEXT,
    "boundToAccount" BOOLEAN NOT NULL DEFAULT true,
    "level" INTEGER NOT NULL DEFAULT 1,
    "rarity" "ItemRarity" NOT NULL,
    "attackBonus" DOUBLE PRECISION DEFAULT 0,
    "durability" INTEGER,
    "createdFrom" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_instances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_stacks" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "inventory_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_stacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "refreshed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_items" (
    "id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "craft_recipes" (
    "id" TEXT NOT NULL,
    "result_item_id" TEXT NOT NULL,
    "requiredStones" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "craft_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blacksmith_rarity_attempts" (
    "id" TEXT NOT NULL,
    "item_instance_id" TEXT NOT NULL,
    "fromRarity" "ItemRarity" NOT NULL,
    "toRarity" "ItemRarity" NOT NULL,
    "success" BOOLEAN NOT NULL,
    "used_stone_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blacksmith_rarity_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_instances_serial_key" ON "item_instances"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "item_stacks_template_id_inventory_id_key" ON "item_stacks"("template_id", "inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "stores_character_id_key" ON "stores"("character_id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_characterEquipmentsId_fkey" FOREIGN KEY ("characterEquipmentsId") REFERENCES "characters_equipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_instances" ADD CONSTRAINT "item_instances_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_instances" ADD CONSTRAINT "item_instances_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "invetories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stacks" ADD CONSTRAINT "item_stacks_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stacks" ADD CONSTRAINT "item_stacks_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "invetories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_items" ADD CONSTRAINT "store_items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_items" ADD CONSTRAINT "store_items_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
