import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.provider';
import { JwtModule } from '@nestjs/jwt';
import { PrismaProvider } from 'src/db/prisma.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthProvider, PrismaProvider],
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthProvider],
})
export class AuthModule {}
