import { BaseService } from '@/core/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MenusRepository } from './menus.repository';
import { CreateMenuDto } from './dtos/create-menu.dto';

@Injectable()
export class MenusService extends BaseService {
  constructor(private readonly menusRepo: MenusRepository) {
    super(menusRepo);
  }

  async create(data: any) {
    const _data = data as CreateMenuDto;

    let existedRecord = await this.menusRepo.findOne('name', _data.name);
    if (existedRecord) {
      throw new BadRequestException('Menu name already exists');
    }

    existedRecord = await this.menusRepo.findOne('path', _data.path);
    if (existedRecord) {
      throw new BadRequestException('Menu path already exists');
    }

    return await super.create(data);
  }
}
