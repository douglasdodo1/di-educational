import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class EditTimelineInput {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  contentId?: number | null;
}
