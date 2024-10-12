import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriarUsusarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  senha: string;
}
