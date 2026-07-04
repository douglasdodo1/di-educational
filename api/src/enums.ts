import { registerEnumType } from '@nestjs/graphql';
import { ContentType, UserRole } from 'src/generated/prisma/enums';

registerEnumType(ContentType, {
  name: 'ContentType',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});
