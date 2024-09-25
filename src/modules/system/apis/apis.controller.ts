import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dtos/create-api.dto';
import { Response } from '@/types/response/response.type';
import { ResponseCode } from '@/enums/response.enum';
import { UpdateApiDto } from './dtos/update-api.dto';

@Controller('apis')
export class ApisController {
  constructor(private readonly apisSrv: ApisService) {}

  @Post()
  async create(@Body() data: CreateApiDto): Promise<Response> {
    try {
      const result = await this.apisSrv.create(data);
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
    @Query(
      'sort',
      new ParseArrayPipe({
        items: String,
        separator: ',',
      }),
    )
    sort: string[] = [],
    @Query('path') path: string = '',
    @Query('description') description: string = '',
    @Query('group') group: string = '',
    @Query('method') method: string = '',
  ): Promise<Response> {
    try {
      const result = await this.apisSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        sort,
        path,
        description,
        group,
        method,
      });
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Response> {
    try {
      const result = await this.apisSrv.findOne('id', +id);
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
    @Body() data: UpdateApiDto,
  ): Promise<Response> {
    try {
      const result = await this.apisSrv.update(+id, data);
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
      const result = await this.apisSrv.softDelete(+id);
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
