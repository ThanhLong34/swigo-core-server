import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthoritiesService } from './authorities.service';
import { CreateAuthoritiesDto } from './dtos/create-authorities.dto';
import { UpdateAuthoritiesDto } from './dtos/update-authorities.dto';
import { Response } from '@/interfaces/response/response.interface';
import { ResponseCode } from '@/enums/response.enum';

@Controller('authorities')
export class AuthoritiesController {
  constructor(private readonly authoritiesSrv: AuthoritiesService) {}

  @Post()
  async create(@Body() data: CreateAuthoritiesDto): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.create(data);
      return {
        code: ResponseCode.OK,
        message: 'Created successfully',
        data: result,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Get()
  async findMany(
    @Query('getAll') getAll: string = '',
    @Query('pageNumber') pageNumber: string = '',
    @Query('pageSize') pageSize: string = '',
    @Query('name') name: string = '',
  ): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        name,
      });
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: {
          list: result,
          total: result.length,
        },
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.findOne('id', +id);
      return {
        code: ResponseCode.OK,
        message: 'Found',
        data: result,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAuthoritiesDto,
  ): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.update(+id, data);
      return {
        code: ResponseCode.OK,
        message: 'Updated successfully',
        data: result,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Response> {
    try {
      const result = await this.authoritiesSrv.softDelete(+id);
      return {
        code: ResponseCode.OK,
        message: 'Deleted successfully',
        data: result,
      };
    } catch (err) {
      return {
        code: ResponseCode.FAILED,
        message: err.message,
        data: null,
      };
    }
  }
}
