import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserRole } from 'src/generated/prisma/enums';

jest.mock('argon2', () => ({
  verify: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

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
  });

  afterEach(() => jest.clearAllMocks());

  describe('login', () => {
    it('should return tokens on successful login', async () => {
      const mockedUser = {
        id: 1,
        email: 'student@test.com',
        role: UserRole.STUDENT,
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
      usersService.verifyPassword.mockResolvedValue(true);

      (argon2.verify as jest.Mock).mockResolvedValue(true);

      await expect(
        service.login('example@test.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create a new user and return tokens', async () => {
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
        password: 'hashed-password',
        student: { id: 1, enrollmentNumber: 'STU1234' },
      };

      usersService.findByEmail.mockResolvedValue(null);

      const createdProfile = {
        id: 1,
        enrollmentNumber: 'STU1234',
        user: mockedUser,
      };

      usersService.create.mockResolvedValue(createdProfile);

      jwtService.sign
        .mockReturnValueOnce('mock-access-token')
        .mockReturnValueOnce('mock-refresh-token');

      const result = await service.register(input);

      expect(usersService.findByEmail).toHaveBeenCalledWith('student@test.com');

      expect(usersService.create).toHaveBeenCalledWith(
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

    it('should throw ConflictException when email already in use', async () => {
      const existingUser = {
        id: 1,
        email: 'existing@test.com',
        first_name: 'Existing',
        last_name: 'User',
        phones: [],
        password: 'hash',
      };

      usersService.findByEmail.mockResolvedValue(existingUser);

      await expect(
        service.register({
          email: 'existing@test.com',
          first_name: 'Test',
          last_name: 'User',
          phones: [],
          password: '123456',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('refreshToken', () => {
    it('should return new tokens for a valid user', () => {
      const user = {
        id: 1,
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        phones: [],
        password: 'hash',
      };

      jwtService.sign
        .mockReturnValueOnce('new-access-token')
        .mockReturnValueOnce('new-refresh-token');

      const result = service.refreshToken(user);

      expect(jwtService.sign).toHaveBeenCalledTimes(2);

      expect(jwtService.sign).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          sub: user.id,
          email: user.email,
        }),
      );

      expect(result.access_token).toBe('new-access-token');
      expect(result.refresh_token).toBe('new-refresh-token');
      expect(result.user).toEqual(user);
    });
  });
});
