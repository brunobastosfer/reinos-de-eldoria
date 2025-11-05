-- AlterTable
ALTER TABLE "monster_drops" ADD COLUMN     "isUnique" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "drop_logs" (
    "id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "monster_id" TEXT NOT NULL,
    "item_id" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "success" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drop_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_monster_id_fkey" FOREIGN KEY ("monster_id") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drop_logs" ADD CONSTRAINT "drop_logs_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
