-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('HIGH', 'LOW');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "TaskPriority" NOT NULL DEFAULT 'LOW';
