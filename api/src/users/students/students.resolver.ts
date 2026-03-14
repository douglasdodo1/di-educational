import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { StudentsModel } from './students.model';

@Resolver(() => StudentsModel)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Mutation(() => StudentsModel)
  createTeacher(@Args('data') data: CreateStudentDTO) {
    return this.studentsService.create(data);
  }
}
