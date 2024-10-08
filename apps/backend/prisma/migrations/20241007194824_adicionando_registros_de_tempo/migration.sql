/*
  Warnings:

  - Added the required column `atualizado` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "atualizado" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pedido" ALTER COLUMN "data" SET DEFAULT CURRENT_TIMESTAMP;
