import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from './inputs/auth.response.input';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UserModel } from 'src/users/models/users.model';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

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
    it('should return auth response with a Student profile when user is a student', async () => {
      const email = 'student@test.com';
      const password = 'password';

      const expectedResponse: AuthResponse = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: {
          id: 1,
          email: 'student@test.com',
          first_name: 'Student',
          last_name: 'Test',
          phones: [],
          password: 'hash',
          student: { id: 1, enrollmentNumber: 'STU1234' },
        },
      };

      mockAuthService.login.mockResolvedValueOnce(expectedResponse);

      const result = await resolver.login(email, password);

      expect(result).toEqual(expectedResponse);
      expect(result.user.student).toHaveProperty('enrollmentNumber');
      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    });

    it('should return auth response with a Teacher profile when user is a teacher', async () => {
      const email = 'teacher@test.com';
      const password = 'password';

      const expectedResponse: AuthResponse = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
        user: {
          id: 2,
          email: 'teacher@test.com',
          first_name: 'Teacher',
          last_name: 'Test',
          phones: [],
          password: 'hash',
          teacher: { id: 2, salary: 5000 },
        },
      };

      mockAuthService.login.mockResolvedValueOnce(expectedResponse);

      const result = await resolver.login(email, password);

      expect(result).toEqual(expectedResponse);
      expect(result.user.teacher).toHaveProperty('salary');
      expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    });
  });

  describe('register', () => {
    it('should return auth response when user registers successfully', async () => {
      const data: CreateUserInput = {
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        password: 'password',
        phones: ['123456789'],
      };

      const expectedResponse: AuthResponse = {
        access_token: 'access',
        refresh_token: 'refresh',
        user: {
          id: 1,
          email: 'test@test.com',
          first_name: 'Student',
          last_name: 'User',
          phones: [],
          password: 'hash',
          student: { id: 1, enrollmentNumber: '123' },
        },
      };

      mockAuthService.register.mockResolvedValue(expectedResponse);

      const result = await resolver.register(data);

      expect(result).toEqual(expectedResponse);
      expect(mockAuthService.register).toHaveBeenCalledWith(data);
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
});
