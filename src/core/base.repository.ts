import { PageInfo } from '@/types/request/page-info.type';
import { QueryMetadata } from '@/types/request/query-metadata.type';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginationResponse } from '@/types/response/response.type';

export class BaseRepository {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly tableName: string,
  ) {}

  async create(data: any) {
    return await this.prisma[this.tableName].create({ data });
  }

  async findOne(k: string, v: any) {
    return await this.prisma[this.tableName].findFirst({
      where: {
        [k]: v,
        deletedAt: null,
      },
    });
  }

  async findMany(
    pageInfo: PageInfo,
    queryMetadata: QueryMetadata = {},
  ): Promise<PaginationResponse> {
    queryMetadata.where.deletedAt = null;

    if (!pageInfo.getAll) {
      queryMetadata.take = pageInfo.pageSize;
      queryMetadata.skip = (pageInfo.pageNumber - 1) * pageInfo.pageSize;
    }

    if (pageInfo.sort?.length) {
      queryMetadata.orderBy = pageInfo.sort.map((s) => {
        const [field, order] = s.split(':');
        return {
          [field]: order,
        };
      });
    }

    const [list, totalItems] = await Promise.all([
      this.prisma[this.tableName].findMany(queryMetadata),
      this.prisma[this.tableName].count({
        where: queryMetadata.where,
      }),
    ]);

    const totalPages =
      totalItems && pageInfo.pageSize
        ? Math.ceil(totalItems / pageInfo.pageSize)
        : 0;

    return Promise.resolve({
      list: list ?? [],
      totalPages: totalPages ?? 0,
      totalItems: totalItems ?? 0,
      pageSize: pageInfo.pageSize ?? 0,
      pageNumber: pageInfo.pageNumber ?? 0,
    });
  }

  async update(id: number, data: any) {
    return await this.prisma[this.tableName].update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async softDeleteById(id: number) {
    return await this.prisma[this.tableName].update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async softDeleteByIds(ids: number[]) {
    return await this.prisma[this.tableName].updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
