import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorityDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
