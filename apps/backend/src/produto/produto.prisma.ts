import { Produto } from '@gstore/core';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { CriarProdutoDto } from 'src/dto/produto/criar-produto.dto';

@Injectable()
export class ProdutoPrisma {
  constructor(private readonly prisma: PrismaProvider) {}

  async salvar(produto: CriarProdutoDto): Promise<void> {
    await this.prisma.produto.upsert({
      where: { id: produto.id ?? -1 },
      update: produto,
      create: produto,
    });
  }

  async obter(): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany();
    return produtos as any;
  }

  async obterPorId(id: number): Promise<Produto | null> {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    return produto as any;
  }

  async excluir(id: number): Promise<void> {
    await this.prisma.produto.delete({ where: { id } });
  }
}
