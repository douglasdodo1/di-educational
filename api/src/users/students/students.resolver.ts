import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './inputs/create-student.input';
import { StudentsService } from './students.service';
import { StudentsModel } from './students.model';

@Resolver(() => StudentsModel)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Mutation(() => StudentsModel)
  createStudent(
    @Args('data', { type: () => CreateStudentInput }) data: CreateStudentInput,
  ) {
    return this.studentsService.create(data);
  }
}
