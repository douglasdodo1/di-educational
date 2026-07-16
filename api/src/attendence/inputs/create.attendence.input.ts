import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAttendenceInput {
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @Field(() => Int)
  @IsNumber()
  courseId!: number;
}
