/*
  Warnings:

  - You are about to drop the `item_instances` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "ItemType" ADD VALUE 'BOOTS';

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_amulet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_armor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_boot_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_helmet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_leg_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_ring1_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_ring2_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_shield_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."character_equipments" DROP CONSTRAINT "character_equipments_weapon_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_instances" DROP CONSTRAINT "item_instances_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."item_instances" DROP CONSTRAINT "item_instances_template_id_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "canGiveLife" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canGiveMagic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canGiveMana" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."item_instances";

-- CreateTable
CREATE TABLE "ItemInstance" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "inventoryId" TEXT,
    "attackBonus" INTEGER DEFAULT 0,
    "defenseBonus" INTEGER DEFAULT 0,
    "lifeBonus" INTEGER DEFAULT 0,
    "manaBonus" INTEGER DEFAULT 0,
    "magicBonus" INTEGER DEFAULT 0,
    "rarity" "ItemRarity" NOT NULL,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ItemInstance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "invetories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_shield_id_fkey" FOREIGN KEY ("shield_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_helmet_id_fkey" FOREIGN KEY ("helmet_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_armor_id_fkey" FOREIGN KEY ("armor_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_leg_id_fkey" FOREIGN KEY ("leg_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_amulet_id_fkey" FOREIGN KEY ("amulet_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_ring1_id_fkey" FOREIGN KEY ("ring1_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_ring2_id_fkey" FOREIGN KEY ("ring2_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_boot_id_fkey" FOREIGN KEY ("boot_id") REFERENCES "ItemInstance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
