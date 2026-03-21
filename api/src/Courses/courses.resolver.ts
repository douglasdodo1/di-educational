import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesModel } from './courses.model';
import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { ClassModel } from 'src/classes/classes.model';
import { CoursesService } from './courses.service';
import { CreateClassInput } from 'src/classes/inputs/create.class.input';

@Resolver(() => CoursesModel)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Mutation(() => CoursesModel, { nullable: true })
  createCourse(
    @Args('data', { type: () => CreateCourseInput }) data: CreateCourseInput,
  ): Promise<CoursesModel | null> {
    return this.coursesService.create(data);
  }

  @Query(() => [CoursesModel])
  Courses(): Promise<CoursesModel[]> {
    return this.coursesService.findAll();
  }

  @Query(() => CoursesModel)
  course(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CoursesModel | null> {
    return this.coursesService.findById(id);
  }

  @Mutation(() => Boolean)
  updateCourse(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateCourseInput }) data: UpdateCourseInput,
  ): Promise<boolean> {
    return this.coursesService.update(id, data);
  }

  @Mutation(() => Boolean)
  deleteCourse(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.coursesService.delete(id);
  }

  @Mutation(() => Boolean)
  enrollmentStudents(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.coursesService.enrollmentStudents(courseId, ids);
  }

  @Mutation(() => Boolean)
  unrollmentStudents(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.coursesService.unrollmentStudents(courseId, ids);
  }

  @Mutation(() => ClassModel)
  createClass(
    @Args('courseId', { type: () => Int }) courseId: number,

    @Args('data', { type: () => CreateClassInput }) data: CreateClassInput,
  ): Promise<boolean> {
    return this.coursesService.createClass(courseId, data);
  }

  @Mutation(() => Boolean)
  updateTeacher(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.coursesService.updateTeacher(courseId, id);
  }

  @Mutation(() => Boolean)
  updateIsActive(
    @Args('courseId', { type: () => Int }) courseId: number,
    @Args('state', { type: () => Boolean }) state: boolean,
  ): Promise<boolean> {
    return this.coursesService.updateIsActive(courseId, state);
  }
}
