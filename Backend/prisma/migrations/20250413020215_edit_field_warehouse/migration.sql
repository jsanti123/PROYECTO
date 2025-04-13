/*
  Warnings:

  - You are about to drop the column `description` on the `Warehouse` table. All the data in the column will be lost.
  - Added the required column `location` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "description",
ADD COLUMN     "location" VARCHAR(255) NOT NULL;
