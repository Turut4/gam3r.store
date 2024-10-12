import { Module } from '@nestjs/common';
import { UserProvider } from './user.provider';
import { UserController } from './user.controller';
import { PrismaProvider } from 'src/db/prisma.provider';

@Module({
  providers: [UserProvider, PrismaProvider],
  controllers: [UserController]
})
export class UserModule {}
