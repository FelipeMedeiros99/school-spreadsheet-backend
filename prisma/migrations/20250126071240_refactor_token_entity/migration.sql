/*
  Warnings:

  - Added the required column `token` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tokens" ADD COLUMN     "token" TEXT NOT NULL;
