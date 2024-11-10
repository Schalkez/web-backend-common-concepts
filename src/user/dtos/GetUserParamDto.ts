import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetUserParamDto {
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  id?: number;
}
