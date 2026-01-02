/*
  Warnings:

  - You are about to drop the column `characterEquipmentsId` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `CharacterInventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `characters_equipments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."items" DROP CONSTRAINT "items_characterEquipmentsId_fkey";

-- AlterTable
ALTER TABLE "item_instances" ADD COLUMN     "equipped" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "characterEquipmentsId",
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "sellPrice" INTEGER;

-- DropTable
DROP TABLE "public"."CharacterInventory";

-- DropTable
DROP TABLE "public"."characters_equipments";

-- CreateTable
CREATE TABLE "character_equipments" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "weapon_id" TEXT,
    "shield_id" TEXT,
    "helmet_id" TEXT,
    "armor_id" TEXT,
    "leg_id" TEXT,
    "amulet_id" TEXT,
    "ring1_id" TEXT,
    "ring2_id" TEXT,
    "boot_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "character_equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_character_id_key" ON "character_equipments"("character_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_weapon_id_key" ON "character_equipments"("weapon_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_shield_id_key" ON "character_equipments"("shield_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_helmet_id_key" ON "character_equipments"("helmet_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_armor_id_key" ON "character_equipments"("armor_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_leg_id_key" ON "character_equipments"("leg_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_amulet_id_key" ON "character_equipments"("amulet_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_ring1_id_key" ON "character_equipments"("ring1_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_ring2_id_key" ON "character_equipments"("ring2_id");

-- CreateIndex
CREATE UNIQUE INDEX "character_equipments_boot_id_key" ON "character_equipments"("boot_id");

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_shield_id_fkey" FOREIGN KEY ("shield_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_helmet_id_fkey" FOREIGN KEY ("helmet_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_armor_id_fkey" FOREIGN KEY ("armor_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_leg_id_fkey" FOREIGN KEY ("leg_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_amulet_id_fkey" FOREIGN KEY ("amulet_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_ring1_id_fkey" FOREIGN KEY ("ring1_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_ring2_id_fkey" FOREIGN KEY ("ring2_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "character_equipments" ADD CONSTRAINT "character_equipments_boot_id_fkey" FOREIGN KEY ("boot_id") REFERENCES "item_instances"("id") ON DELETE SET NULL ON UPDATE CASCADE;
