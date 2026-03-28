import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './inputs/create.student.input';
import { StudentsService } from './students.service';
import { StudentsModel } from './students.model';
import { UpdateStudentInput } from './inputs/update.student.input';

@Resolver(() => StudentsModel)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [StudentsModel])
  students(): Promise<StudentsModel[]> {
    return this.studentsService.findAll();
  }

  @Query(() => StudentsModel, { nullable: true })
  student(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<StudentsModel | null> {
    return this.studentsService.findById(id);
  }

  @Mutation(() => StudentsModel, { nullable: true })
  createStudent(
    @Args('data', { type: () => CreateStudentInput }) data: CreateStudentInput,
  ): Promise<StudentsModel> {
    return this.studentsService.create(data);
  }

  @Mutation(() => Boolean)
  updateStudent(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateStudentInput }) data: UpdateStudentInput,
  ): Promise<boolean> {
    return this.studentsService.update(id, data);
  }

  @Mutation(() => Boolean)
  deleteStudent(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.studentsService.delete(id);
  }
}
