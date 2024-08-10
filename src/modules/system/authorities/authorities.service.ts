import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthoritiesRepository } from './authorities.repository';
import { BaseService } from '@/core/base.service';

@Injectable()
export class AuthoritiesService extends BaseService {
  constructor(private readonly authoritiesRepo: AuthoritiesRepository) {
    super(authoritiesRepo);
  }

  async create(data: any) {
    const authority = await this.authoritiesRepo.findOne(
      'name',
      data.authority,
    );

    if (authority) {
      return new BadRequestException('Authority already exists');
    }

    return await this.authoritiesRepo.create(data);
  }
}
