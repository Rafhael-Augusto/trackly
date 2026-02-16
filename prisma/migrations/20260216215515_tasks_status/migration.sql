-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'STARTED', 'DONE');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'PENDING';
