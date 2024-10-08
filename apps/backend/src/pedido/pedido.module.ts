import { Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoPrisma } from './pedido.prisma';
import { PrismaProvider } from 'src/db/prisma.provider';

@Module({
  controllers: [PedidoController],
  providers: [PedidoPrisma, PrismaProvider],
})
export class PedidoModule {}
