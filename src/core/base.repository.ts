import { PageInfo } from '@/interfaces/request/page-info.interface';
import { PrismaService } from '@/prisma/prisma.service';

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

  async findMany(pageInfo: PageInfo) {
    const queryMetadata: any = {
      where: {
        deletedAt: null,
      },
    };

    if (!pageInfo.getAll) {
      queryMetadata.take = pageInfo.pageSize;
      queryMetadata.skip = (pageInfo.pageNumber - 1) * pageInfo.pageSize;
    }

    return await this.prisma[this.tableName].findMany(queryMetadata);
  }

  async update(id: number, data: any) {
    return await this.prisma[this.tableName].update({
      where: { id, deletedAt: null },
      data,
    });
  }

  async softDelete(id: number) {
    return await this.prisma[this.tableName].update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
