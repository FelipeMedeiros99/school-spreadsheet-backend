/*
  Warnings:

  - You are about to drop the column `addedByUserId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_addedByUserId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "addedByUserId",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
