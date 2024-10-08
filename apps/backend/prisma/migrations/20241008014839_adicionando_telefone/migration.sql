/*
  Warnings:

  - Added the required column `telefone` to the `pedido_entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedido_entrega" ADD COLUMN     "telefone" TEXT NOT NULL;
