import { IsEmail, IsString } from 'class-validator';

export class loginUsuarioDto {
  @IsEmail()
  email?: string;

  @IsString()
  username?: string;

  @IsString()
  senha: string;
}
