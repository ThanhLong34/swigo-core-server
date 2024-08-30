import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { MenusRepository } from './menus.repository';

@Module({
  imports: [PrismaModule],
  providers: [MenusService, MenusRepository],
  controllers: [MenusController],
})
export class MenusModule {}
