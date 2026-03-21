import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ClassModel } from './classes.model';
import { UpdateClassInput } from './inputs/update.class.input';
import { ClassesService } from './classes.service';
import { UpdateContentInput } from 'src/contents/inputs/update.content.input';

@Resolver(() => ClassModel)
export class ClassesResolver {
  constructor(private classesService: ClassesService) {}

  @Mutation(() => Boolean)
  updateClass(
    @Args('classId', { type: () => Int }) classId: number,
    @Args('data', { type: () => UpdateClassInput }) data: UpdateClassInput,
  ): Promise<boolean> {
    return this.classesService.updateClass(classId, data);
  }

  @Mutation(() => Boolean)
  deleteClasses(
    @Args('classesIds', { type: () => [Int] }) classesIds: number[],
  ): Promise<boolean> {
    return this.classesService.deleteClasses(classesIds);
  }

  @Mutation(() => Boolean)
  updateContent(
    @Args('classId', { type: () => Int }) classId: number,
    @Args('data', { type: () => UpdateContentInput }) data: UpdateContentInput,
  ): Promise<boolean> {
    return this.classesService.updateContent(classId, data);
  }
}
