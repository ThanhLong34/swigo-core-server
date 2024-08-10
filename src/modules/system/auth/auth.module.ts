import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from '@system/users/users.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, UsersRepository],
  exports: [AuthService],
})
export class AuthModule {}
