import { BaseRepository } from '@/core/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthoritiesRepository extends BaseRepository {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'sys_authorities');
  }
}
