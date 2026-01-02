-- AlterTable
ALTER TABLE "monster_drop_items" ADD COLUMN     "maxQuantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "minQuantity" INTEGER NOT NULL DEFAULT 1;
