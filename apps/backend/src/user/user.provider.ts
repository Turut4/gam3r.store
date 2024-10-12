import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaProvider } from 'src/db/prisma.provider';
import { Usuario as UsuarioModel } from '@prisma/client';
import { CriarUsusarioDto } from 'src/dto/usuario/criar-usuario.dto';

@Injectable()
export class UserProvider {
  constructor(private readonly prisma: PrismaProvider) {}

  async findMany(): Promise<UsuarioModel[]> {
    try {
      return this.prisma.usuario.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar usuários: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<UsuarioModel> {
    try {
      const usuario = this.prisma.usuario.findUnique({
        where: {
          id,
        },
      });

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return usuario;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao buscar usuário: ${error.message}`,
      );
    }
  }

  async createUser(data: CriarUsusarioDto): Promise<UsuarioModel> {
    try {
      return this.prisma.usuario.create({
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Erro ao criar usuário: ${error.message}`,
      );
    }
  }
}
