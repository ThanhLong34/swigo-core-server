import { BaseRepository } from '@/core/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PageInfo } from '@/types/request/page-info.type';
import { QueryMetadata } from '@/types/request/query-metadata.type';
import { Authority } from './authorities.type';

@Injectable()
export class AuthoritiesRepository extends BaseRepository {
  constructor(protected readonly prisma: PrismaService) {
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
