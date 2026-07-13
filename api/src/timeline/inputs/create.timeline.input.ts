import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateTimelineInput {
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @Field()
  @IsBoolean()
  is_done!: boolean;

  @Field(() => Int)
  @IsNumber()
  courseId!: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  contentId?: number | null;
}
