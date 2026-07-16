import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateAttendenceInput {
  @Field(() => Int)
  @IsNumber()
  id!: number;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  date!: Date;
}
