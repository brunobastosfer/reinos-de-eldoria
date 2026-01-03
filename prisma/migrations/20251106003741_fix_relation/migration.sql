/*
  Warnings:

  - You are about to drop the column `premmiumAccountId` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the `premmium_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."accounts" DROP CONSTRAINT "accounts_premmiumAccountId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "premmiumAccountId";

-- DropTable
DROP TABLE "public"."premmium_account";

-- CreateTable
CREATE TABLE "premium_account" (
    "id" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "premium_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "premium_to_account" (
    "id" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL,
    "expirated_at" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "premiumId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "premium_to_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "premium_to_account" ADD CONSTRAINT "premium_to_account_premiumId_fkey" FOREIGN KEY ("premiumId") REFERENCES "premium_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "premium_to_account" ADD CONSTRAINT "premium_to_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
