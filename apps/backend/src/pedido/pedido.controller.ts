import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PedidoPrisma } from './pedido.prisma';
import { CriarPedidoDto } from 'src/dto/pedido/criar-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly repo: PedidoPrisma) {}

  @Get('')
  async obterPedidos() {
    return this.repo.obter();
  }

  @Get(':id')
  async obterPedidoPorId(@Param('id') id: string) {
    return this.repo.obterPorId(+id);
  }

  @Post('')
  async criarPedido(@Body() pedido: CriarPedidoDto) {
    return this.repo.salvar(pedido);
  }

  @Delete(':id')
  async excluirPedido(@Param('id') id: string) {
    return this.repo.excluir(+id);
  }
}
