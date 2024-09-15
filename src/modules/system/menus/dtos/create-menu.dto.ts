import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsBoolean()
  @IsOptional()
  hidden: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  sort: number;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
