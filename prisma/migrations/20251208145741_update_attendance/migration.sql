/*
  Warnings:

  - Added the required column `preferableInTime` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "preferableInTime" TIMESTAMP(3) NOT NULL;
