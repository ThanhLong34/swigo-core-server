import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dtos/create-report.dto';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class BlogsService {
  create(reportDto: CreateBlogDto, user: UserDto) {
    console.log(reportDto);
    console.log(user);
    return {
      message: 'Blog created successfully',
    };
  }
}
