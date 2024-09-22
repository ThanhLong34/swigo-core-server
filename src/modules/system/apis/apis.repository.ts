import { BaseRepository } from '@/core/base.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PageInfo } from '@/types/request/page-info.type';
import { Injectable } from '@nestjs/common';
import { Api } from './apis.type';
import { QueryMetadata } from '@/types/request/query-metadata.type';
import { PaginationResponse } from '@/types/response/response.type';

@Injectable()
export class ApisRepository extends BaseRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'sys_apis' /* table name */);
  }

  async findMany(pageInfo: PageInfo & Api): Promise<PaginationResponse> {
    const queryMetadata: QueryMetadata = {
      where: {},
    };

    if (pageInfo.path) {
      queryMetadata.where.path = pageInfo.path;
    }

    if (pageInfo.description) {
      queryMetadata.where.description = pageInfo.description;
    }

    if (pageInfo.group) {
      queryMetadata.where.group = pageInfo.group;
    }

    if (pageInfo.method) {
      queryMetadata.where.method = pageInfo.method;
    }

    return await super.findMany(pageInfo, queryMetadata);
  }
}
