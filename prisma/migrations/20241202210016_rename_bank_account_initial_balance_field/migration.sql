/*
  Warnings:

  - You are about to drop the column `initial_value` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `initial_balance` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "initial_value",
ADD COLUMN     "initial_balance" DOUBLE PRECISION NOT NULL;
