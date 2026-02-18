/*
  Warnings:

  - You are about to drop the column `hours` on the `TimeTracker` table. All the data in the column will be lost.
  - You are about to drop the column `minutes` on the `TimeTracker` table. All the data in the column will be lost.
  - You are about to drop the column `seconds` on the `TimeTracker` table. All the data in the column will be lost.
  - Added the required column `duration` to the `TimeTracker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTracker" DROP COLUMN "hours",
DROP COLUMN "minutes",
DROP COLUMN "seconds",
ADD COLUMN     "duration" INTEGER NOT NULL;
