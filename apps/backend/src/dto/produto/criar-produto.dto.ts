import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CriarProdutoDto {
  @IsOptional()
  id: number;

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
  preco: number;
}
