// auth/inputs/auth-user.union.ts
import { createUnionType } from '@nestjs/graphql';
import { StudentsModel } from 'src/users/students/students.model';
import { TeacherModel } from 'src/users/teachers/teachers.model';

export const AuthUserUnion = createUnionType({
  name: 'AuthUser',
  types: () => [StudentsModel, TeacherModel] as const,
  resolveType(value) {
    if ('enrollmentNumber' in value) return StudentsModel;
    if ('salary' in value) return TeacherModel;
    return null;
  },
});
