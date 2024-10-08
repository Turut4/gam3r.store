import { produtos, usuarios } from '@gstore/core';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.produto.createMany({
    skipDuplicates: true,
    data: produtos.map((p) => ({ ...p, id: undefined })),
  });

  await prisma.usuario.createMany({
    skipDuplicates: true,
    data: usuarios.map((usuario) => ({ ...usuario, id: undefined })),
  });
}

seed();
