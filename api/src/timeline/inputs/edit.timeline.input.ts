import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class EditTimelineInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  is_done?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  contentId?: number | null;
}
