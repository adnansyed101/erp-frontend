/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `bankName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `branchName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentDesignation` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfConfirmation` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `disability` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeStatus` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeType` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `joiningDesignation` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `officeEmail` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `officeNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `personalEmail` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `personalNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `walletNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `walletType` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `bankInformationId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalInformationId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_officeEmail_key";

-- DropIndex
DROP INDEX "Employee_personalEmail_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "accountNumber",
DROP COLUMN "bankName",
DROP COLUMN "branchName",
DROP COLUMN "currentDesignation",
DROP COLUMN "dateOfBirth",
DROP COLUMN "dateOfConfirmation",
DROP COLUMN "disability",
DROP COLUMN "employeeStatus",
DROP COLUMN "employeeType",
DROP COLUMN "fullName",
DROP COLUMN "gender",
DROP COLUMN "imageUrl",
DROP COLUMN "joiningDesignation",
DROP COLUMN "nationality",
DROP COLUMN "officeEmail",
DROP COLUMN "officeNumber",
DROP COLUMN "personalEmail",
DROP COLUMN "personalNumber",
DROP COLUMN "religion",
DROP COLUMN "walletNumber",
DROP COLUMN "walletType",
ADD COLUMN     "bankInformationId" TEXT NOT NULL,
ADD COLUMN     "personalInformationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "officeEmail" TEXT NOT NULL,
    "personalEmail" TEXT NOT NULL,
    "personalNumber" TEXT NOT NULL,
    "officeNumber" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "employeeStatus" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "disability" BOOLEAN NOT NULL,
    "gender" "Gender" NOT NULL,
    "religion" TEXT NOT NULL,
    "joiningDesignation" TEXT NOT NULL,
    "currentDesignation" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfConfirmation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankInformation" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "walletType" TEXT NOT NULL,
    "walletNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BankInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_officeEmail_key" ON "PersonalInformation"("officeEmail");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_personalEmail_key" ON "PersonalInformation"("personalEmail");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_bankInformationId_fkey" FOREIGN KEY ("bankInformationId") REFERENCES "BankInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
