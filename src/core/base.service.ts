import { PaginationResponse } from '@/types/response/response.type';

export class BaseService {
  constructor(protected readonly repo: any) {}

  async create(data: any) {
    return await this.repo.create(data);
  }

  async findOne(k: string, v: any) {
    const record = await this.repo.findOne(k, v);
    if (!record) {
      throw new Error('Record not found');
    }

    return record;
  }

  async findMany(pageInfo: any): Promise<PaginationResponse> {
    return await this.repo.findMany(pageInfo);
  }

  async update(id: number, data: any) {
    const record = await this.findOne('id', id);
    if (!record) {
      throw new Error('Record not found');
    }

    return await this.repo.update(id, data);
  }

  async softDelete(id: number) {
    const record = await this.findOne('id', id);
    if (!record) {
      throw new Error('Record not found');
    }

    return await this.repo.softDelete(id);
  }
}
