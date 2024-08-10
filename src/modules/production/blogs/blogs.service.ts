import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dtos/create-report.dto';
import { UserDto } from '@system/users/dtos/user.dto';

@Injectable()
export class BlogsService {
  create(reportDto: CreateBlogDto, user: UserDto) {
    return {
      message: 'Blog created successfully',
    };
  }
}
