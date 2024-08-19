import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateApiDto {
  @IsString()
  @IsOptional()
  path: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  group: string;

  @IsIn(['POST', 'GET', 'PUT', 'DELETE', 'PATCH'])
  @IsOptional()
  method: string;
}
