import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProdutoPrisma } from './produto.prisma';
import { Produto } from '@gstore/core';
import { CriarProdutoDto } from 'src/dto/produto/criar-produto.dto';
import { Produto as ProdutoModel } from '@prisma/client';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly repo: ProdutoPrisma) {}

  @Post()
  async salvarProduto(@Body() produto: CriarProdutoDto) {
    return await this.repo.salvar(produto);
  }

  @Get()
  async obterProdutos() {
    return await this.repo.obter();
  }

  @Get(':id')
  async obterProdutoPorId(@Param('id') id: string) {
    return await this.repo.obterPorId(+id);
  }

  @Delete(':id')
  async excluirProduto(@Param('id') id: string) {
    return await this.repo.excluir(+id);
  }
}
