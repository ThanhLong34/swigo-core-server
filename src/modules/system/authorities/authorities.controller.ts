import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { CreateAuthoritiesDto } from './dtos/create-authorities.dto';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private readonly authoritiesSrv: AuthoritiesService) {}

  @Post()
  async create(@Body() data: CreateAuthoritiesDto) {
    return await this.authoritiesSrv.create(data);
  }

  @Get()
  async find(@Query('k') k: string, @Query('v') v: any) {
    return await this.authoritiesSrv.findOne(k, v);
  }
}
