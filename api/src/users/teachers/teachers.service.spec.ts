import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from './teachers.service';
import { TeachersRepository } from './teachers.repository';
import { UsersService } from '../users.service';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeacherModel } from './teachers.model';
import { UserRole } from 'src/generated/prisma/enums';

describe('TeachersService', () => {
  let service: TeachersService;
  let teachersRepository: jest.Mocked<TeachersRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        {
          provide: TeachersRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeachersService>(TeachersService);
    teachersRepository = module.get(TeachersRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a new teacher and return the created model', async () => {
      const input: CreateTeacherInput = {
        email: 'teacher@test.com',
        first_name: 'Teacher',
        last_name: 'Test',
        phones: [],
        password: '123456',
        salary: 2000,
      };

      const mockedTeacher: TeacherModel = {
        id: 1,
        salary: input.salary || 0,
        user: {
          id: 1,
          role: 'TEACHER',
          teacher: {
            id: 1,
            salary: input.salary || 0,
          },
          email: input.email,
          first_name: input.first_name,
          last_name: input.last_name,
          phones: [],
          password: input.password,
        },
      };

      teachersRepository.create.mockResolvedValue(mockedTeacher);

      const result = await service.create(input);
      const salary = input.salary || 0;

      expect(teachersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: input.email,
          first_name: input.first_name,
          last_name: input.last_name,
          phones: input.phones,
          password: input.password,
          salary: input.salary,
        }),
        salary,
        input.phones,
      );

      expect(result).toEqual(mockedTeacher);
    });
  });

  describe('findAll', () => {
    it('should return an array of teachers', async () => {
      const teachers: TeacherModel[] = [
        {
          id: 1,
          salary: 2000,
          user: {
            id: 1,
            email: 'teacher@test.com',
            role: UserRole.TEACHER,
            first_name: 'Teacher',
            last_name: 'Test',
            phones: [],
            password: '123456',
          },
        },
        {
          id: 2,
          salary: 2000,
          user: {
            id: 2,
            email: 'teacher@test.com',
            role: UserRole.TEACHER,
            first_name: 'Teacher',
            last_name: 'Test',
            phones: [],
            password: '123456',
          },
        },
      ];

      teachersRepository.findAll.mockResolvedValue(teachers);

      const result = await service.findAll();

      expect(teachersRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(teachers);
    });
  });

  describe('findById', () => {
    it('should return a teacher by id', async () => {
      const teacher: TeacherModel = {
        id: 1,

        salary: 2000,
        user: {
          id: 1,
          role: 'TEACHER',
          teacher: {
            id: 1,
            salary: 2000,
          },
          email: 'teacher@test.com',
          first_name: 'Teacher',
          last_name: 'Test',
          phones: [],
          password: '123456',
        },
      };
      teachersRepository.findById.mockResolvedValue(teacher);

      const result = await service.findById(1);

      expect(teachersRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(teacher);
    });
  });

  describe('update', () => {
    it('should call repository.update and return true', async () => {
      (teachersRepository.update as jest.Mock).mockResolvedValue(undefined);

      const result = await service.update(1, { salary: 3000 });

      expect(teachersRepository.update).toHaveBeenCalledWith(1, {
        salary: 3000,
      });
      expect(result).toBe(true);
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return true', async () => {
      (teachersRepository.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(teachersRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
