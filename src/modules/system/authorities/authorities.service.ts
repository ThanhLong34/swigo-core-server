import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthoritiesRepository } from './authorities.repository';
import { BaseService } from '@/core/base.service';
import { CreateAuthorityDto } from './dtos/create-authority.dto';

@Injectable()
export class AuthoritiesService extends BaseService {
  constructor(private readonly authoritiesRepo: AuthoritiesRepository) {
    super(authoritiesRepo);
  }

  async create(data: any) {
    const _data = data as CreateAuthorityDto;

    const authority = await this.authoritiesRepo.findOne('name', _data.name);
    if (authority) {
      throw new BadRequestException('Authority already exists');
    }

    return await super.create(data);
  }
}
