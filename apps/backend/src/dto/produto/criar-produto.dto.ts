import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
class Especificacoes {
  destaque: string;
  [key: string]: any;
}

export class CriarProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsString()
  marca: string;

  @IsString()
  modelo: string;

  @IsString()
  imagem: string;

  @IsNumber()
  nota: number;

  @IsString()
  videoReview: string;

  @IsNumber()
  quantidade: number;

  @IsNumber()
  precoBase: number;

  @IsNumber()
  precoPromocional: number;

  @IsNumber()
  maiorPreco: number;

  @IsNumber()
  menorPreco: number;

  @IsNumber()
  precoMedio: number;

  @IsNotEmpty()
  @Type(() => Especificacoes)
  especificacoes: Especificacoes;
}
