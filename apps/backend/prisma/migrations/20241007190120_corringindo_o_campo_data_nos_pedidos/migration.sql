/*
  Warnings:

  - You are about to drop the column `date` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `data` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "date",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;
