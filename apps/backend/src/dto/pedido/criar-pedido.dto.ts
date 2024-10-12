import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  ValidateNested,
  IsArray,
  IsEmail,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FormaPagamento, Status } from '@gstore/core';

class CriarEntregaDTO {
  @IsNotEmpty()
  cidade: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  estado: string;

  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsString()
  logradouro: string;

  @IsString()
  telefone: string;

  @IsString()
  complemento: string;
}

class CriarItemPedidoDTO {
  @IsNotEmpty()
  @IsNumber()
  produtoId: number;

  @IsNotEmpty()
  @IsInt()
  quantidade: number;
}

export class CriarPedidoDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsNumber()
  valorTotal: number;

  @IsNotEmpty()
  @IsEnum(FormaPagamento)
  formaPagamento: FormaPagamento;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CriarEntregaDTO)
  entrega: CriarEntregaDTO;

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriarItemPedidoDTO)
  itens: CriarItemPedidoDTO[];
}
