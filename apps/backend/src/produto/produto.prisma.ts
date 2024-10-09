import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { CriarProdutoDto } from 'src/dto/produto/criar-produto.dto';
import { Produto as ProdutoModel } from '@prisma/client';

@Injectable()
export class ProdutoPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async salvar(produto: CriarProdutoDto): Promise<ProdutoModel> {
    try {
      const novoProduto = await this.prisma.produto.create({ data: produto });

      return novoProduto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar produto: ' + error.message,
      );
    }
  }

  async atualizar(id: number, produto: CriarProdutoDto): Promise<ProdutoModel> {
    try {
      const produtoExistente = await this.verificarProdutoExistente(id);

      if (!produtoExistente)
        throw new NotFoundException('Produto não encontrado');

      const produtoAtualizado = await this.prisma.produto.update({
        where: { id },
        data: produto,
      });

      return produtoAtualizado;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar produto: ' + error.message,
      );
    }
  }

  async obter(): Promise<ProdutoModel[]> {
    try {
      const produtos = await this.prisma.produto.findMany();
      return produtos;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao obter produtos: ' + error.message,
      );
    }
  }

  async obterPorId(id: number): Promise<ProdutoModel | null> {
    try {
      const produto = await this.prisma.produto.findUnique({ where: { id } });
      return produto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao obter produto: ' + error.message,
      );
    }
  }

  async excluir(id: number): Promise<ProdutoModel> {
    try {
      const produtoExistente = await this.verificarProdutoExistente(id);
      if (!produtoExistente)
        throw new NotFoundException('Produto não encontrado');

      const produtoDeletado = await this.prisma.produto.delete({
        where: { id },
      });
      return produtoDeletado;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao excluir produto: ' + error.message,
      );
    }
  }

  private async verificarProdutoExistente(id: number): Promise<ProdutoModel> {
    const produtoExistente = await this.prisma.produto.findUnique({
      where: { id },
    });
    if (!produtoExistente) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produtoExistente;
  }
}
