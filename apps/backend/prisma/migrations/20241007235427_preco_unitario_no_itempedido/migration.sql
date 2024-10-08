/*
  Warnings:

  - Added the required column `precoUnitario` to the `item_pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item_pedido" ADD COLUMN     "precoUnitario" DOUBLE PRECISION NOT NULL;
