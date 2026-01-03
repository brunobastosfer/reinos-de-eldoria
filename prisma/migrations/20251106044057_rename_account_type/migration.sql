/*
  Warnings:

  - The values [PREMMIUM] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('FREE', 'PREMIUM');
ALTER TABLE "public"."accounts" ALTER COLUMN "account_type" DROP DEFAULT;
ALTER TABLE "accounts" ALTER COLUMN "account_type" TYPE "AccountType_new" USING ("account_type"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "public"."AccountType_old";
ALTER TABLE "accounts" ALTER COLUMN "account_type" SET DEFAULT 'FREE';
COMMIT;
