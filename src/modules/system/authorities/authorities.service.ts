import { Injectable } from '@nestjs/common';
import { AuthoritiesRepository } from './authorities.repository';

@Injectable()
export class AuthoritiesService {
  constructor(private readonly authoritiesRepository: AuthoritiesRepository) {}
}
