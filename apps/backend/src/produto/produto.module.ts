import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { DbModule } from 'src/db/db.module';
import { ProdutoPrisma } from './produto.prisma';

@Module({
  controllers: [ProdutoController],
  imports: [DbModule],
  providers: [ProdutoPrisma],
})
export class ProdutoModule {}
