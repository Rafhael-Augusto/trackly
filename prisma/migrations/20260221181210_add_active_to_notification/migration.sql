/*
  Warnings:

  - Added the required column `active` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "active" BOOLEAN NOT NULL;
