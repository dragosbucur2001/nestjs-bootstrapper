import { IsEnum, IsInt, IsString } from 'class-validator';
import { CompanyContract } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  descriptionRo: string;

  @IsString()
  descriptionEn: string;

  /* @Type(() => Number) */
  /* @IsInt() */
  /* testInt: number; */

  @IsEnum(CompanyContract)
  contract: CompanyContract;
}
