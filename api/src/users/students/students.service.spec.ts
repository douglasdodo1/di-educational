import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentsRepository } from './students.repository';
import { CreateUserInput } from '../inputs/create.user.input';
import { StudentsModel } from './students.model';
import { UserRole } from 'src/generated/prisma/enums';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentsRepository: jest.Mocked<StudentsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: StudentsRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentsRepository = module.get(StudentsRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a new student and return the created model', async () => {
      const input: CreateUserInput = {
        email: 'student@test.com',
        first_name: 'Student',
        last_name: 'Test',
        phones: [],
        password: '123456',
      };

      const mockedStudent: StudentsModel = {
        id: 1,
        enrollmentNumber: 'STU1234',
        user: {
          id: 1,
          role: UserRole.STUDENT,
          email: input.email,
          first_name: input.first_name,
          last_name: input.last_name,
          phones: [],
          password: input.password,
        },
      };

      studentsRepository.create.mockResolvedValue(mockedStudent);

      const result = await service.create(input);

      expect(studentsRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: input.email,
          first_name: input.first_name,
          last_name: input.last_name,
          phones: input.phones,
          password: input.password,
        }),
        expect.any(String),
        input.phones,
      );

      expect(result).toEqual(mockedStudent);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students: StudentsModel[] = [
        {
          id: 1,
          enrollmentNumber: 'STU1234',
          user: {
            id: 1,
            role: UserRole.STUDENT,
            email: 'a@test.com',
            first_name: 'A',
            last_name: 'Test',
            phones: [],
            password: '123456',
          },
        },
        {
          id: 2,
          enrollmentNumber: 'STU5678',
          user: {
            id: 2,
            role: UserRole.STUDENT,
            email: 'b@test.com',
            first_name: 'B',
            last_name: 'Test',
            phones: [],
            password: '123456',
          },
        },
      ];

      studentsRepository.findAll.mockResolvedValue(students);

      const result = await service.findAll();

      expect(studentsRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(students);
    });
  });

  describe('findById', () => {
    it('should return a student by id', async () => {
      const student: StudentsModel = {
        id: 1,
        enrollmentNumber: 'STU1234',
        user: {
          id: 1,
          role: UserRole.STUDENT,
          email: 'student@test.com',
          first_name: 'Student',
          last_name: 'Test',
          phones: [],
          password: '123456',
        },
      };
      studentsRepository.findById.mockResolvedValue(student);

      const result = await service.findById(1);

      expect(studentsRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(student);
    });
  });

  describe('update', () => {
    it('should call repository.update and return true', async () => {
      (studentsRepository.update as jest.Mock).mockResolvedValue(undefined);

      const result = await service.update(1, { first_name: 'New' });

      expect(studentsRepository.update).toHaveBeenCalledWith(1, {
        first_name: 'New',
      });
      expect(result).toBe(true);
    });
  });
});
