import { PartialType } from '@nestjs/mapped-types';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly password: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly phone: number;

  @IsUrl()
  readonly image: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}
