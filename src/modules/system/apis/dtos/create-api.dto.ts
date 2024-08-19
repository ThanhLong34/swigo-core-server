import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApiDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsIn(['POST', 'GET', 'PUT', 'DELETE', 'PATCH'])
  @IsNotEmpty()
  method: string;
}
