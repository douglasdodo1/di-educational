import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from './inputs/auth.response.input';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UserModel } from 'src/users/models/users.model';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';
import { AuthResolver } from './auth.resolver';
import { UserRole } from 'src/generated/prisma/enums';
import { GqlContext } from 'src/common/fastify.type';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refreshToken: jest.fn(),
  };

  const mockSetCookie = jest.fn();

  const mockCtx = {
    req: {} as ReturnType<typeof jest.fn>,
    res: {
      setCookie: mockSetCookie,
    },
  } as unknown as GqlContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtRefreshGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return user and set cookies when user is a student', async () => {
      const email = 'student@test.com';
      const password = 'password';

      const studentUser: UserModel = {
        id: 1,
        email: 'student@test.com',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: 'hash',
        student: { id: 1, enrollmentNumber: 'STU1234' },
      };

      const serviceResponse: AuthResponse = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: studentUser,
      };

      mockAuthService.login.mockResolvedValueOnce(serviceResponse);

      const result = await resolver.login(email, password, mockCtx);

      expect(result).toEqual(studentUser);
      expect(result.student).toHaveProperty('enrollmentNumber');
      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
      expect(mockSetCookie).toHaveBeenCalledWith(
        'access_token',
        'access_token',
        expect.objectContaining({ httpOnly: true }),
      );
      expect(mockSetCookie).toHaveBeenCalledWith(
        'refresh_token',
        'refresh_token',
        expect.objectContaining({ httpOnly: true }),
      );
    });

    it('should return user and set cookies when user is a teacher', async () => {
      const email = 'teacher@test.com';
      const password = 'password';

      const teacherUser: UserModel = {
        id: 2,
        email: 'teacher@test.com',
        first_name: 'Teacher',
        last_name: 'Test',
        phones: [],
        password: 'hash',
        teacher: { id: 2, salary: 5000 },
      };

      const serviceResponse: AuthResponse = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: teacherUser,
      };

      mockAuthService.login.mockResolvedValueOnce(serviceResponse);

      const result = await resolver.login(email, password, mockCtx);

      expect(result).toEqual(teacherUser);
      expect(result.teacher).toHaveProperty('salary');
      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
      expect(mockSetCookie).toHaveBeenCalledTimes(2);
    });
  });

  describe('register', () => {
    it('should return user and set cookies when registration is successful', async () => {
      const data: CreateUserInput = {
        email: 'test@test.com',
        role: UserRole.STUDENT,
        first_name: 'Test',
        last_name: 'User',
        password: 'password',
        phones: ['123456789'],
      };

      const registeredUser: UserModel = {
        id: 1,
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        phones: [],
        password: 'hash',
        student: { id: 1, enrollmentNumber: '123' },
      };

      const serviceResponse: AuthResponse = {
        access_token: 'access',
        refresh_token: 'refresh',
        user: registeredUser,
      };

      mockAuthService.register.mockResolvedValue(serviceResponse);

      const result = await resolver.register(data, mockCtx);

      expect(result).toEqual(registeredUser);
      expect(mockAuthService.register).toHaveBeenCalledWith(data);
      expect(mockSetCookie).toHaveBeenCalledWith(
        'access_token',
        'access',
        expect.objectContaining({ httpOnly: true }),
      );
      expect(mockSetCookie).toHaveBeenCalledWith(
        'refresh_token',
        'refresh',
        expect.objectContaining({ httpOnly: true }),
      );
    });
  });

  describe('me', () => {
    it('should return the current user', () => {
      const user: UserModel = {
        id: 1,
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'hashed',
        phones: [],
      };

      const result = resolver.me(user);

      expect(result).toEqual(user);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens for the current user', () => {
      const user: UserModel = {
        id: 1,
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'hashed',
        phones: [],
      };

      const expectedResponse: AuthResponse = {
        access_token: 'new-access',
        refresh_token: 'new-refresh',
        user,
      };

      mockAuthService.refreshToken.mockReturnValue(expectedResponse);

      const result = resolver.refreshToken(user);

      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(user);
    });
  });
});
