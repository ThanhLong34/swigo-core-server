import { BaseRepository } from '@/core/base.repository';
import { PrismaService } from '@/prisma/prisma.service';
import { PageInfo } from '@/types/request/page-info.type';
import { Injectable } from '@nestjs/common';
import { Menu } from './menus.type';
import { QueryMetadata } from '@/types/request/query-metadata.type';

@Injectable()
export class MenusRepository extends BaseRepository {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'sys_menus' /* table name */);
  }

  async findMany(pageInfo: PageInfo & Menu) {
    const queryMetadata: QueryMetadata = {
      where: {},
    };

    if (pageInfo.name) {
      queryMetadata.where.name = pageInfo.name;
    }

    if (pageInfo.path) {
      queryMetadata.where.path = pageInfo.path;
    }

    if (pageInfo.hidden) {
      queryMetadata.where.hidden = pageInfo.hidden;
    }

    if (pageInfo.title) {
      queryMetadata.where.group = pageInfo.title;
    }

    return await super.findMany(pageInfo, queryMetadata);
  }
}
