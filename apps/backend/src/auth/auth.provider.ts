import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaProvider } from 'src/db/prisma.provider';
import { CriarUsusarioDto } from 'src/dto/usuario/criar-usuario.dto';
import { loginUsuarioDto } from 'src/dto/usuario/login-usuario.dto';
import { Usuario as UsuarioModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface Token {
  access_token: string;
  token_type: string;
}

interface TokenPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthProvider {
  private saltOrRounds = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaProvider,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async generateToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  private async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }

  async login(loginDto: loginUsuarioDto): Promise<Token> {
    try {
      const { username, senha, email } = loginDto;
      const user = await this.prisma.usuario.findFirst({
        where: { OR: [{ username }, { email }] },
      });

      if (!user) throw new Error('Usuário não encontrado');

      if (!(await this.verifyPassword(senha, user.senha)))
        throw new Error('Senha incorreta');

      const payload: TokenPayload = {
        username: user.username,
        sub: user.email,
      };
      const token = await this.generateToken(payload);

      return {
        access_token: token,
        token_type: 'Bearer',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao logar usuario: ' + error.message,
      );
    }
  }

  async signup(user: CriarUsusarioDto): Promise<Token> {
    try {
      const existingUser = await this.prisma.usuario.findFirst({
        where: { email: user.email },
      });

      if (existingUser) throw new Error('Usuário já existe');
      user.senha = await this.hashPassword(user.senha);

      await this.prisma.usuario.create({ data: user });

      const payload = { username: user.username, sub: user.email };
      const token = await this.generateToken(payload);

      return {
        access_token: token,
        token_type: 'Bearer',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao cadatrar usuario: ' + error.message,
      );
    }
  }
}
