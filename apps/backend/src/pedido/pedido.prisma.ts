import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { Pedido as PedidoModel } from '@prisma/client';
import { CriarPedidoDto } from 'src/dto/pedido/criar-pedido.dto';

@Injectable()
export class PedidoPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async obter(): Promise<PedidoModel[]> {
    try {
      return await this.prisma.pedido.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao obter pedidos: ' + error.message,
      );
    }
  }

  async obterPorId(id: number): Promise<PedidoModel> {
    try {
      const pedido = await this.prisma.pedido.findUnique({
        where: { id },
        include: {
          usuario: true,
          entrega: true,
          itens: {
            include: {
              produto: true,
            },
          },
        },
      });
      if (!pedido) throw new NotFoundException('Pedido não encontrado');

      return pedido;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao obter pedido: ' + error.message,
      );
    }
  }

  async salvar(pedido: CriarPedidoDto): Promise<PedidoModel> {
    try {
      const produtos = await this.prisma.produto.findMany({
        where: { id: { in: pedido.itens.map((item) => item.produtoId) } },
      });

      let valorTotal = 0;
      const produtosMapeados = pedido.itens.map((item) => {
        const produto = produtos.find(
          (produto) => produto.id === item.produtoId,
        );
        if (!produto) throw new NotFoundException('Produto não encontrado');
        valorTotal += produto.precoBase * item.quantidade;

        return {
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: produto.precoBase,
        };
      });

      const novoPedido = await this.prisma.pedido.create({
        data: {
          status: pedido.status,
          formaPagamento: pedido.formaPagamento,
          entrega: {
            create: { ...pedido.entrega },
          },
          usuario: {
            connect: { id: pedido.usuarioId },
          },
          valorTotal: valorTotal,
          itens: {
            createMany: {
              data: produtosMapeados,
            },
          },
        },
      });

      return novoPedido;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar pedido: ' + error.message,
      );
    }
  }

  async excluir(id: number): Promise<PedidoModel> {
    try {
      const pedido = await this.prisma.pedido.findUnique({
        where: { id },
        include: { entrega: true, itens: { include: { produto: true } } },
      });

      if (!pedido) throw new NotFoundException('Pedido não encontrado');
      await this.prisma.$transaction([
        this.prisma.itemPedido.deleteMany({
          where: { pedidoId: id },
        }),
        this.prisma.pedido.delete({
          where: { id },
        }),
        this.prisma.pedidoEntrega.deleteMany({
          where: { id: pedido.entregaId },
        }),
      ]);

      return pedido;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao excluir pedido: ' + error.message,
      );
    }
  }
}
