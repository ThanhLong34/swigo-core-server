import { Module } from '@nestjs/common';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ApisRepository } from './apis.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ApisController],
  providers: [ApisService, ApisRepository],
})
export class ApisModule {}
