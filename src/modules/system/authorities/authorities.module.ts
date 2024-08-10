import { Module } from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { AuthoritiesController } from './authorities.controller';
import { AuthoritiesRepository } from './authorities.repository';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthoritiesService, AuthoritiesRepository],
  controllers: [AuthoritiesController],
})
export class AuthoritiesModule {}
