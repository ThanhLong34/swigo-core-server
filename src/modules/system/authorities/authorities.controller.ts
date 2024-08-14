import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  async findMany(@Query('k') k: string, @Query('v') v: any) {
    return await this.authoritiesSrv.findMany(k, v);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.authoritiesSrv.findOne('id', +id);
  }
}
