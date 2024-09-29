import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
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
    @Query(
      'getAll',
      new ParseBoolPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: getAll`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    getAll: boolean = false,
    @Query(
      'pageNumber',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: pageNumber`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    pageNumber: number = 1,
    @Query(
      'pageSize',
      new ParseIntPipe({
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: pageSize`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
      }),
    )
    pageSize: number = 10,
    @Query(
      'sort',
      new ParseArrayPipe({
        items: String,
        separator: ',',
        errorHttpStatusCode: 400,
        exceptionFactory: (err: string) => {
          throw new HttpException(`${err}: sort`, HttpStatus.BAD_REQUEST);
        },
        optional: true,
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
      const result = await this.apisSrv.softDeleteById(+id);
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
