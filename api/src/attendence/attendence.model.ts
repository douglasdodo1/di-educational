import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FrequencyModel } from 'src/frequency/frequency.model';

@ObjectType()
export class AttendenceModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Date)
  date!: Date;

  @Field(() => Int)
  courseId!: number;

  @Field(() => [FrequencyModel], { nullable: true })
  frequencies?: FrequencyModel[];
}
