import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { UsersRepository } from './users.repository';
import { PrismaModule } from '@/prisma/prisma.module';
import { AuthService } from '@system/auth/auth.service';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UsersRepository, AuthService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
