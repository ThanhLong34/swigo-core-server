import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { CookieSessionMiddleware } from './middlewares/cookie-session.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

// Import module system
import { UsersModule } from '@system/users/users.module';
import { AuthModule } from '@system/auth/auth.module';
import { AuthoritiesModule } from './modules/system/authorities/authorities.module';

// Import module production
import { BlogsModule } from '@production/blogs/blogs.module';
import { ApisModule } from './modules/system/apis/apis.module';
import { MenusModule } from './modules/system/menus/menus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    UsersModule,
    BlogsModule,
    PrismaModule,
    AuthoritiesModule,
    ApisModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieSessionMiddleware).forRoutes('*');
  }
}
