import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BlogsService {
  create(reportDto: CreateBlogDto, user: User) {
    console.log(reportDto);
    console.log(user);
    return {
      message: 'Blog created successfully',
    };
  }
}
