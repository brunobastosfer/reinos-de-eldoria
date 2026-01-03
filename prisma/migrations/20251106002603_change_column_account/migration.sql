-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "premmiumAccountId" TEXT,
ALTER COLUMN "account_status" SET DEFAULT 'NORMAL',
ALTER COLUMN "account_type" SET DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "premmium_account" (
    "id" TEXT NOT NULL,
    "activated_at" TIMESTAMP(3) NOT NULL,
    "expirated_at" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,

    CONSTRAINT "premmium_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_premmiumAccountId_fkey" FOREIGN KEY ("premmiumAccountId") REFERENCES "premmium_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
