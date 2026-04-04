import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateStudentInput } from './inputs/update.student.input';
import { StudentsService } from './students.service';
import { StudentsModel } from './students.model';

@Resolver(() => StudentsModel)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [StudentsModel])
  students(): Promise<StudentsModel[]> {
    return this.studentsService.findAll();
  }

  @Query(() => StudentsModel, { nullable: true })
  student(@Args('id') id: number): Promise<StudentsModel | null> {
    return this.studentsService.findById(id);
  }

  @Mutation(() => Boolean)
  updateStudent(
    @Args('id') id: number,
    @Args('data', { type: () => UpdateStudentInput }) data: UpdateStudentInput,
  ): Promise<boolean> {
    return this.studentsService.update(id, data);
  }
}
