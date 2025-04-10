/*
  Warnings:

  - You are about to alter the column `assignToUserId` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assignToUserId_fkey";

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "assignToUserId" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignToUserId_fkey" FOREIGN KEY ("assignToUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
