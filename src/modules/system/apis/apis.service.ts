import { BaseService } from '@/core/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ApisRepository } from './apis.repository';
import { CreateApiDto } from './dtos/create-api.dto';

@Injectable()
export class ApisService extends BaseService {
  constructor(private readonly apisRepo: ApisRepository) {
    super(apisRepo);
  }

  async create(data: any) {
    const _data = data as CreateApiDto;

    const api = await this.apisRepo.findOne('path', _data.path);
    if (api) {
      throw new BadRequestException('Api already exists');
    }

    return await super.create(data);
  }
}
