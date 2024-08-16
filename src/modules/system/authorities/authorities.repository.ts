import { BaseRepository } from '@/core/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PageInfo } from '@/interfaces/request/page-info.interface';
import { QueryMetadata } from '@/interfaces/request/query-metadata.interface';
import { Authority } from './authorities.interface';

@Injectable()
export class AuthoritiesRepository extends BaseRepository {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'sys_authorities' /* table name */);
  }

  async findMany(pageInfo: PageInfo & Authority) {
    const queryMetadata: QueryMetadata = {
      where: {},
    };

    if (pageInfo.name) {
      queryMetadata.where.name = pageInfo.name;
    }

    return await super.findMany(pageInfo, queryMetadata);
  }
}
