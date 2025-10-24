/*
  Warnings:

  - You are about to drop the column `sessionId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - Added the required column `billingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPhoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `sessionId`,
    ADD COLUMN `billingAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `billingPhoneNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`;
