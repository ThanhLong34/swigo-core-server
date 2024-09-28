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
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { Response } from '@/types/response/response.type';
import { ResponseCode } from '@/enums/response.enum';
import { UpdateMenuDto } from './dtos/update-menu.dto';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusSrv: MenusService) {}

  @Post()
  async create(@Body() data: CreateMenuDto): Promise<Response> {
    try {
      const result = await this.menusSrv.create(data);
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
    @Query('getAll') getAll: boolean | undefined = undefined,
    @Query('pageNumber') pageNumber: number | undefined = undefined,
    @Query('pageSize') pageSize: number | undefined = undefined,
    @Query(
      'sort',
      new ParseArrayPipe({
        items: String,
        separator: ',',
        optional: true,
      }),
    )
    sort: string[] = [],
    @Query('name') name: string = '',
    @Query('path') path: string = '',
    @Query('hidden') hidden: boolean = false,
    @Query('title') title: string = '',
  ): Promise<Response> {
    try {
      const result = await this.menusSrv.findMany({
        getAll: !!getAll,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        sort,
        name,
        path,
        hidden,
        title,
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
  async findById(@Param('id') id: number): Promise<Response> {
    try {
      const result = await this.menusSrv.findOne('id', +id);
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
    @Param('id') id: number,
    @Body() data: UpdateMenuDto,
  ): Promise<Response> {
    try {
      const result = await this.menusSrv.update(+id, data);
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
  async delete(@Param('id') id: number): Promise<Response> {
    try {
      const result = await this.menusSrv.softDeleteById(+id);
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
