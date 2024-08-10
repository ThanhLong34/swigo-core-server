export class BaseService {
  constructor(protected readonly repo: any) {}

  async create<T>(data: T) {
    return await this.repo.create(data);
  }

  async findOne(k: string, v: any) {
    return await this.repo.findOne(k, v);
  }
}
