import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../users/students/students.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

jest.mock('argon2', () => ({
  verify: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;
  let studentsService: jest.Mocked<StudentsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            verifyPassword: jest.fn(),
          },
        },
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
    studentsService = module.get(StudentsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      const mockedUser = {
        id: 1,
        email: 'student@test.com',
        role: 'student',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: 'hash',
        student: { id: 1, enrollmentNumber: 'STU1234' },
      };

      usersService.findByEmail.mockResolvedValue(mockedUser);
      usersService.verifyPassword.mockResolvedValue(true);

      (argon2.verify as jest.Mock).mockResolvedValue(true);

      jwtService.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const result = await service.login('student@test.com', 'password');

      expect(usersService.findByEmail).toHaveBeenCalledWith('student@test.com');

      expect(usersService.verifyPassword).toHaveBeenCalledWith(
        mockedUser.password,
        'password',
      );

      expect(jwtService.sign).toHaveBeenCalledTimes(2);

      expect(jwtService.sign).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          sub: mockedUser.id,
          email: mockedUser.email,
        }),
      );

      expect(result.access_token).toBe('mock-access-token');
      expect(result.refresh_token).toBe('mock-refresh-token');
      expect(result.user).toEqual(mockedUser);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login('wrong@email.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);

      expect(usersService.findByEmail).toHaveBeenCalledWith('wrong@email.com');
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const mockedUser = {
        id: 1,
        email: 'student@test.com',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: 'incorrect-hash',
        student: { id: 1, enrollmentNumber: 'STU1234' },
      };

      usersService.findByEmail.mockResolvedValue(mockedUser);
      usersService.verifyPassword.mockResolvedValue(false);

      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login('student@test.com', 'wrong-password'),
      ).rejects.toThrow(UnauthorizedException);

      expect(usersService.verifyPassword).toHaveBeenCalledWith(
        mockedUser.password,
        'wrong-password',
      );
    });

    it('should throw UnauthorizedException when user profile not found', async () => {
      const mockedUser = {
        id: 1,
        email: 'example@test.com',
        first_name: 'Example',
        last_name: 'Test',
        phones: [],
        password: 'hash',
      };

      usersService.findByEmail.mockResolvedValue(mockedUser);
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      await expect(
        service.login('example@test.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create a new student and return tokens', async () => {
      const input = {
        email: 'student@test.com',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: '123456',
      };

      const mockedUser = {
        id: 1,
        email: 'student@test.com',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: '123456',
        student: { id: 1, enrollmentNumber: 'STU1234' },
      };

      usersService.findByEmail.mockResolvedValue(null);

      const createdStudent = {
        id: mockedUser.id,
        enrollmentNumber: mockedUser.student.enrollmentNumber,
        user: mockedUser,
      };

      studentsService.create.mockResolvedValue(createdStudent);

      jwtService.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const result = await service.register(input);

      expect(usersService.findByEmail).toHaveBeenCalledWith('student@test.com');

      expect(studentsService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: input.email,
          first_name: input.first_name,
          last_name: input.last_name,
          phones: input.phones,
          password: input.password,
        }),
      );

      expect(jwtService.sign).toHaveBeenCalledTimes(2);

      expect(result.access_token).toBe('mock-access-token');
      expect(result.refresh_token).toBe('mock-refresh-token');
      expect(result.user).toEqual(mockedUser);
    });
  });
});
