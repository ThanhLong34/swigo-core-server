import { BaseRepository } from '@/core/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PageInfo } from '@/interfaces/request/page-info.interface';

@Injectable()
export class AuthoritiesRepository extends BaseRepository {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'sys_authorities' /* table name */);
  }

  async findMany(pageInfo: PageInfo | any) {
    const queryMetadata: any = {
      where: {
        deletedAt: null,
      },
    };

    if (pageInfo.name) {
      queryMetadata.where.name = pageInfo.name;
    }

    if (!pageInfo.getAll) {
      queryMetadata.take = pageInfo.pageSize;
      queryMetadata.skip = (pageInfo.pageNumber - 1) * pageInfo.pageSize;
    }

    return await this.prisma[this.tableName].findMany(queryMetadata);
  }
}
