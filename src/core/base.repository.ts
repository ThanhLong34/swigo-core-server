import { PrismaService } from '@/prisma/prisma.service';

export class BaseRepository {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly tableName: string,
  ) {}

  async create<T>(data: T) {
    return await this.prisma[this.tableName].create({ data });
  }

  async findOne(k: string, v: any) {
    return await this.prisma[this.tableName].findFirst({
      where: {
        [k]: v,
      },
    });
  }
}
