/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeSkillBenefity" AS ENUM ('SHIELD_INCREASE', 'ATTACK_INCREASE', 'LIFE_DRAIN', 'MANA_DRAIN');

-- CreateEnum
CREATE TYPE "ClasseType" AS ENUM ('KNIGHT', 'MAGE', 'HEALER', 'ARCHER');

-- CreateEnum
CREATE TYPE "SkillUtilityType" AS ENUM ('STUN', 'SNARE', 'FEAR');

-- CreateEnum
CREATE TYPE "skillType" AS ENUM ('ATACK', 'DEFENSE', 'HEAL');

-- CreateEnum
CREATE TYPE "Attribute" AS ENUM ('DISTANCE', 'SWORD', 'MAGIC');

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nacionality" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "account_status" "AccountStatus" NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "type" "ClasseType" NOT NULL,
    "mana_base" INTEGER NOT NULL,
    "life_base" INTEGER NOT NULL,
    "damage_base" INTEGER NOT NULL,
    "defense_base" INTEGER NOT NULL,
    "attribute" "Attribute" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mana" INTEGER NOT NULL,
    "type" "skillType" NOT NULL,
    "utility" "SkillUtilityType",
    "class_id" TEXT,
    "skill_value_id" TEXT NOT NULL,
    "skill_benefity_id" TEXT,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_benefities" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" "TypeSkillBenefity" NOT NULL,

    CONSTRAINT "skill_benefities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_values" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "skill_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "mana" INTEGER NOT NULL,
    "life" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "nivel_attribute" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "magic" INTEGER NOT NULL,
    "stamina" INTEGER NOT NULL,
    "lvl" INTEGER NOT NULL,
    "actual_experience" DOUBLE PRECISION NOT NULL,
    "account_id" TEXT NOT NULL,
    "classe_id" TEXT NOT NULL,
    "character_progress_id" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters_progresses" (
    "id" TEXT NOT NULL,
    "actual_experience" DOUBLE PRECISION NOT NULL,
    "to_next_lvl" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "characters_progresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invetories" (
    "id" TEXT NOT NULL,

    CONSTRAINT "invetories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_key" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "characters_character_progress_id_key" ON "characters"("character_progress_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skill_benefity_id_fkey" FOREIGN KEY ("skill_benefity_id") REFERENCES "skill_benefities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skill_value_id_fkey" FOREIGN KEY ("skill_value_id") REFERENCES "skill_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_classe_id_fkey" FOREIGN KEY ("classe_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_character_progress_id_fkey" FOREIGN KEY ("character_progress_id") REFERENCES "characters_progresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
